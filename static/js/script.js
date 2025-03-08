$(document).ready(function() {
    console.log("JavaScript Loaded! ✅");

// Add modern animation effects to icons
$(document).ready(function() {
    // Add animation classes to icons
    function addAnimationClasses() {
        // Randomly select some icons for animation
        $('.fas.fa-fire').addClass('fa-beat-fade');
        $('.fas.fa-crown').addClass('fa-bounce');
        $('.fas.fa-rocket').addClass('fa-shake');
        
        // Add pulse effect to buttons periodically
        setInterval(() => {
            const buttons = $('.btn').toArray();
            if (buttons.length > 0) {
                const randomBtn = buttons[Math.floor(Math.random() * buttons.length)];
                $(randomBtn).addClass('btn-pulse');
                setTimeout(() => {
                    $(randomBtn).removeClass('btn-pulse');
                }, 1000);
            }
        }, 3000);
    }
    
    // Call the function after a short delay
    setTimeout(addAnimationClasses, 1000);
});



    // Dark mode toggle
    $(document).on('click', '#toggleDarkMode', function() {
        console.log("Dark mode toggle clicked");
        $('body').toggleClass('dark-mode');
        localStorage.setItem('darkMode', $('body').hasClass('dark-mode'));
    });

    // Load saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        $('body').addClass('dark-mode');
    }

    // Change background
    $(document).on('click', '#changeBackground', function() {
        console.log("Background change clicked");
        // Use different backgrounds with direct URLs to avoid caching issues
        const backgrounds = [
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80',
            'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80',
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80',
            'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80',
            'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80',
            'https://images.unsplash.com/photo-1507499739999-097706ad8914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80'
        ];
        const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        
        // Clear existing background first
        $('.background-overlay').css('background-image', 'none');
        
        // Force a repaint before setting new background
        setTimeout(function() {
            $('.background-overlay').css({
                'background-image': `url(${randomBg})`,
                'background-size': 'cover',
                'background-position': 'center',
                'opacity': '1'
            });
            localStorage.setItem('background', randomBg);
        }, 50);
    });

    // Load saved background
    if (localStorage.getItem('background')) {
        $('.background-overlay').css('background-image', `url(${localStorage.getItem('background')})`);
    }

    // Toggle transparency
    $(document).on('click', '#toggleTransparency', function() {
        console.log("Transparency toggle clicked");
        $('body').toggleClass('transparent-mode');
        localStorage.setItem('transparentMode', $('body').hasClass('transparent-mode'));
    });

    // Load saved transparency setting
    if (localStorage.getItem('transparentMode') === 'true') {
        $('body').addClass('transparent-mode');
    }

    // Font size functionality
    $('#fontSize').on('input', function() {
        let size = $(this).val() + "px";
        $('body').css('font-size', size);
        $('#fontSizeValue').text(size);
        localStorage.setItem('fontSize', size);
    });

    if (localStorage.getItem('fontSize')) {
        let savedSize = localStorage.getItem('fontSize');
        $('body').css('font-size', savedSize);
        $('#fontSizeValue').text(savedSize);
        $('#fontSize').val(parseInt(savedSize));
    }

    // Font selector functionality
    $('#fontSelector').on('change', function() {
        let fontFamily = $(this).val();
        $('body').css('font-family', fontFamily);
        localStorage.setItem('fontFamily', fontFamily);
    });

    if (localStorage.getItem('fontFamily')) {
        let savedFont = localStorage.getItem('fontFamily');
        $('body').css('font-family', savedFont);
        $('#fontSelector').val(savedFont);
    }

    // Box size adjustment
    $('#boxSize').on('input', function() {
        let size = $(this).val();
        $('.card').css('transform', `scale(${size})`);
        $('#boxSizeValue').text(`${size}x`);
        localStorage.setItem('boxSize', size);
    });

    if (localStorage.getItem('boxSize')) {
        let savedBoxSize = localStorage.getItem('boxSize');
        $('.card').css('transform', `scale(${savedBoxSize})`);
        $('#boxSizeValue').text(`${savedBoxSize}x`);
        $('#boxSize').val(savedBoxSize);
    }

    // Theme color picker
    $('#themeColorPicker').on('input', function() {
        let color = $(this).val();
        document.documentElement.style.setProperty('--theme-color', color);
        localStorage.setItem('themeColor', color);
    });

    if (localStorage.getItem('themeColor')) {
        let savedColor = localStorage.getItem('themeColor');
        document.documentElement.style.setProperty('--theme-color', savedColor);
        $('#themeColorPicker').val(savedColor);
    }

    // Secondary color picker
    $('#secondaryColorPicker').on('input', function() {
        let color = $(this).val();
        document.documentElement.style.setProperty('--secondary-color', color);
        localStorage.setItem('secondaryColor', color);
    });

    if (localStorage.getItem('secondaryColor')) {
        let savedColor = localStorage.getItem('secondaryColor');
        document.documentElement.style.setProperty('--secondary-color', savedColor);
        $('#secondaryColorPicker').val(savedColor);
    }

    // Border radius adjustment
    $('#borderRadius').on('input', function() {
        let radius = $(this).val() + "px";
        document.documentElement.style.setProperty('--border-radius', radius);
        $('#borderRadiusValue').text(radius);
        localStorage.setItem('borderRadius', radius);
    });

    if (localStorage.getItem('borderRadius')) {
        let savedRadius = localStorage.getItem('borderRadius');
        document.documentElement.style.setProperty('--border-radius', savedRadius);
        $('#borderRadiusValue').text(savedRadius);
        $('#borderRadius').val(parseInt(savedRadius));
    }

    // Shadow level adjustment
    $('#shadowLevel').on('input', function() {
        let level = $(this).val() + "px";
        document.documentElement.style.setProperty('--shadow-intensity', level);
        $('#shadowLevelValue').text(level);
        localStorage.setItem('shadowLevel', level);
    });

    if (localStorage.getItem('shadowLevel')) {
        let savedLevel = localStorage.getItem('shadowLevel');
        document.documentElement.style.setProperty('--shadow-intensity', savedLevel);
        $('#shadowLevelValue').text(savedLevel);
        $('#shadowLevel').val(parseInt(savedLevel));
    }

    // Animation speed adjustment
    $('#animationSpeed').on('input', function() {
        let speed = $(this).val();
        document.documentElement.style.setProperty('--animation-speed', speed);
        let speedText = "";
        if (speed < 0.5) speedText = speed + "x (Slow)";
        else if (speed <= 1.5) speedText = speed + "x (Normal)";
        else speedText = speed + "x (Fast)";
        $('#animationSpeedValue').text(speedText);
        localStorage.setItem('animationSpeed', speed);
    });

    if (localStorage.getItem('animationSpeed')) {
        let savedSpeed = localStorage.getItem('animationSpeed');
        document.documentElement.style.setProperty('--animation-speed', savedSpeed);
        let speedText = "";
        if (savedSpeed < 0.5) speedText = savedSpeed + "x (Slow)";
        else if (savedSpeed <= 1.5) speedText = savedSpeed + "x (Normal)";
        else speedText = savedSpeed + "x (Fast)";
        $('#animationSpeedValue').text(speedText);
        $('#animationSpeed').val(savedSpeed);
    }

    // Transparency level adjustment
    $('#transparencyLevel').on('input', function() {
        let level = $(this).val();
        document.documentElement.style.setProperty('--transparency-level', level);
        let percent = Math.round(level * 100);
        $('#transparencyLevelValue').text(percent + "% " + (percent === 0 ? "(Off)" : ""));
        localStorage.setItem('transparencyLevel', level);

        // Apply transparency class if needed
        if (parseFloat(level) > 0) {
            $('body').addClass('transparency-custom');
        } else {
            $('body').removeClass('transparency-custom');
        }
    });

    if (localStorage.getItem('transparencyLevel')) {
        let savedLevel = localStorage.getItem('transparencyLevel');
        document.documentElement.style.setProperty('--transparency-level', savedLevel);
        let percent = Math.round(savedLevel * 100);
        $('#transparencyLevelValue').text(percent + "% " + (percent === 0 ? "(Off)" : ""));
        $('#transparencyLevel').val(savedLevel);

        // Apply transparency class if needed
        if (parseFloat(savedLevel) > 0) {
            $('body').addClass('transparency-custom');
        }
    }

    // Enable neon effect
    $('#enableNeonEffect').change(function() {
        if ($(this).is(':checked')) {
            $('body').addClass('neon-mode');
        } else {
            $('body').removeClass('neon-mode');
        }
        localStorage.setItem('neonMode', $(this).is(':checked'));
    });

    if (localStorage.getItem('neonMode') === 'true') {
        $('#enableNeonEffect').prop('checked', true);
        $('body').addClass('neon-mode');
    }

    // Enable hover effects
    $('#enableHoverEffects').change(function() {
        if (!$(this).is(':checked')) {
            $('.card, .btn').addClass('no-hover-effect');
        } else {
            $('.card, .btn').removeClass('no-hover-effect');
        }
        localStorage.setItem('hoverEffects', $(this).is(':checked'));
    });

    if (localStorage.getItem('hoverEffects') === 'false') {
        $('#enableHoverEffects').prop('checked', false);
        $('.card, .btn').addClass('no-hover-effect');
    }

    // Table style
    $('#tableStyle').change(function() {
        let style = $(this).val();
        $('.table').removeClass('table-bordered table-striped table-borderless table-hover');

        if (style !== 'default') {
            $('.table').addClass('table-' + style);
        }

        localStorage.setItem('tableStyle', style);
    });

    if (localStorage.getItem('tableStyle')) {
        let savedStyle = localStorage.getItem('tableStyle');
        $('#tableStyle').val(savedStyle);

        if (savedStyle !== 'default') {
            $('.table').addClass('table-' + savedStyle);
        }
    }

    // Custom title
    $('#customTitle').on('input', function() {
        let title = $(this).val();
        if (title) {
            $('#titleText').text(title);
            localStorage.setItem('customTitle', title);
        }
    });

    if (localStorage.getItem('customTitle')) {
        let savedTitle = localStorage.getItem('customTitle');
        $('#titleText').text(savedTitle);
        $('#customTitle').val(savedTitle);
    }

    // Custom footer
    $('#customFooter').on('input', function() {
        let footer = $(this).val();
        if (footer) {
            $('#footerContent').text(footer);
            localStorage.setItem('customFooter', footer);
        }
    });

    if (localStorage.getItem('customFooter')) {
        let savedFooter = localStorage.getItem('customFooter');
        $('#footerContent').text(savedFooter);
        $('#customFooter').val(savedFooter);
    }

    // Button position
    $('#buttonPosition').change(function() {
        let position = $(this).val();

        // Remove existing button containers
        $('.buttons-top, .buttons-bottom').remove();

        if (position === 'top') {
            // Move buttons to top
            let buttonGroup = $('<div class="buttons-top"></div>');
            $('.d-flex.justify-content-between.mb-3').children().clone().appendTo(buttonGroup);
            $('body').prepend(buttonGroup);
            $('.d-flex.justify-content-between.mb-3').hide();
        } else if (position === 'bottom') {
            // Move buttons to bottom
            let buttonGroup = $('<div class="buttons-bottom"></div>');
            $('.d-flex.justify-content-between.mb-3').children().clone().appendTo(buttonGroup);
            $('body').append(buttonGroup);
            $('.d-flex.justify-content-between.mb-3').hide();
        } else {
            // Restore original position
            $('.d-flex.justify-content-between.mb-3').show();
        }

        localStorage.setItem('buttonPosition', position);
    });

    if (localStorage.getItem('buttonPosition')) {
        let savedPosition = localStorage.getItem('buttonPosition');
        $('#buttonPosition').val(savedPosition).trigger('change');
    }

    // Particle background
    $('#enableParticles').change(function() {
        if ($(this).is(':checked')) {
            initParticles();
            $('#particle-background').show();
        } else {
            $('#particle-background').hide();
        }
        localStorage.setItem('particlesEnabled', $(this).is(':checked'));
    });

    if (localStorage.getItem('particlesEnabled') === 'true') {
        $('#enableParticles').prop('checked', true);
        initParticles();
        $('#particle-background').show();
    } else {
        $('#particle-background').hide();
    }

    // Reset settings
    $('#resetSettings').click(function() {
        localStorage.clear();
        location.reload();
    });

    // Save settings button
    $('#saveSettings').click(function() {
        $('#settingsModal').modal('hide');
        showToast('Settings saved successfully!', 'success');
    });

    // Open settings modal
    $('#openSettings').click(function() {
        $('#settingsModal').modal('show');
    });

    // Progress bar animation
    setTimeout(function() {
        $('.animated-progress-bar').css('width', '100%').text('100%');
    }, 1000);

    // Task management
    $('.start-task').click(function() {
        const taskId = $('#taskId').val().trim();
        if (!taskId) {
            showToast('Please enter a task ID', 'warning');
            return;
        }

        $.ajax({
            url: `/start/${taskId}`,
            method: 'POST',
            success: function(response) {
                showToast(response.message, 'success');
                setTimeout(refreshTasks, 1000);
            },
            error: function(xhr) {
                showToast(xhr.responseJSON?.message || 'Failed to start task', 'danger');
            }
        });
    });

    $('.stop-task').click(function() {
        const taskId = $('#taskId').val().trim();
        if (!taskId) {
            showToast('Please enter a task ID', 'warning');
            return;
        }

        $.ajax({
            url: `/stop/${taskId}`,
            method: 'POST',
            success: function(response) {
                showToast(response.message, 'success');
                setTimeout(refreshTasks, 1000);
            },
            error: function(xhr) {
                showToast(xhr.responseJSON?.message || 'Failed to stop task', 'danger');
            }
        });
    });

    $('#refreshTasks').click(refreshTasks);

    // Auto-refresh tasks
    $('#autoRefreshSelect').change(function() {
        const interval = parseInt($(this).val());
        localStorage.setItem('autoRefreshInterval', interval);
        setupAutoRefresh(interval);
    });

    if (localStorage.getItem('autoRefreshInterval')) {
        const savedInterval = localStorage.getItem('autoRefreshInterval');
        $('#autoRefreshSelect').val(savedInterval);
        setupAutoRefresh(parseInt(savedInterval));
    } else {
        setupAutoRefresh(10); // Default to 10 seconds
    }

    // View task logs
    $(document).on('click', '.view-log', function() {
        const taskId = $(this).data('task-id');

        $.ajax({
            url: `/log/${taskId}`,
            method: 'GET',
            success: function(response) {
                $('#modalLogContent').text(response.log);
                $('#logModal').modal('show');
            },
            error: function(xhr) {
                showToast(xhr.responseJSON?.message || 'Failed to load log', 'danger');
            }
        });
    });

    // Initialize particles
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particle-background', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle",
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                    },
                    size: {
                        value: 3,
                        random: true,
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "repulse"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                }
            });
        }
    }

    // Helper functions
    function refreshTasks() {
        $.ajax({
            url: '/tasks',
            method: 'GET',
            success: function(tasks) {
                $('#taskTable').empty();

                if (Object.keys(tasks).length === 0) {
                    $('#taskTable').append('<tr><td colspan="7" class="text-center">No active tasks</td></tr>');
                    return;
                }

                $.each(tasks, function(taskId, task) {
                    const progressValue = task.messages_sent ?
                        Math.round((task.messages_sent / (task.messages_sent + task.messages_failed)) * 100) : 0;

                    const row = `
                        <tr>
                            <td>${taskId}</td>
                            <td>
                                <span class="status-badge status-${task.status}">${task.status}</span>
                            </td>
                            <td>${task.created_at}</td>
                            <td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar"
                                         style="width: ${progressValue}%;"
                                         aria-valuenow="${progressValue}"
                                         aria-valuemin="0" aria-valuemax="100">
                                        ${progressValue}%
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-primary view-log" data-task-id="${taskId}">
                                    <i class="fas fa-file-alt"></i> Logs
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-info copy-task-id" data-task-id="${taskId}">
                                    <i class="fas fa-copy"></i> Copy ID
                                </button>
                            </td>
                            <td>
                                ${task.status === 'running' ?
                                    `<button class="btn btn-sm btn-danger stop-single-task" data-task-id="${taskId}">
                                      <i class="fas fa-stop"></i> Stop
                                  </button>` :
                                    `<button class="btn btn-sm btn-success start-single-task" data-task-id="${taskId}">
                                      <i class="fas fa-play"></i> Start
                                  </button>`
                                }
                            </td>
                        </tr>
                    `;

                    $('#taskTable').append(row);
                });
            }
        });
    }

    $(document).on('click', '.copy-task-id', function() {
        const taskId = $(this).data('task-id');
        navigator.clipboard.writeText(taskId).then(function() {
            showToast('Task ID copied to clipboard', 'success');
        });
    });

    $(document).on('click', '.start-single-task', function() {
        const taskId = $(this).data('task-id');
        $.ajax({
            url: `/start/${taskId}`,
            method: 'POST',
            success: function(response) {
                showToast(response.message, 'success');
                setTimeout(refreshTasks, 1000);
            },
            error: function(xhr) {
                showToast(xhr.responseJSON?.message || 'Failed to start task', 'danger');
            }
        });
    });

    $(document).on('click', '.stop-single-task', function() {
        const taskId = $(this).data('task-id');
        $.ajax({
            url: `/stop/${taskId}`,
            method: 'POST',
            success: function(response) {
                showToast(response.message, 'success');
                setTimeout(refreshTasks, 1000);
            },
            error: function(xhr) {
                showToast(xhr.responseJSON?.message || 'Failed to stop task', 'danger');
            }
        });
    });

    function setupAutoRefresh(seconds) {
        // Clear existing refresh timer
        if (window.refreshTimer) {
            clearInterval(window.refreshTimer);
        }

        // Set up new timer if interval > 0
        if (seconds > 0) {
            window.refreshTimer = setInterval(refreshTasks, seconds * 1000);
        }
    }

    function showToast(message, type) {
        // Remove existing toasts
        $('.toast').remove();

        // Create new toast
        const toast = `
            <div class="toast bg-${type} text-white" role="alert">
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;

        // Add to body and show
        $('body').append(toast);
        $('.toast').addClass('show');

        // Auto hide after 3 seconds
        setTimeout(function() {
            $('.toast').removeClass('show');
            setTimeout(function() {
                $('.toast').remove();
            }, 500);
        }, 3000);
    }

    // ✅ CONVO Assistant Chatbot
    // Variables to store user guides
    const userGuides = {
        welcome: "👋 स्वागत है CONVO Assistant में! आप निम्नलिखित विकल्पों में से चुन सकते हैं या अपना प्रश्न टाइप कर सकते हैं:",
        guide: `📚 <strong>CONVO APP उपयोगकर्ता मार्गदर्शिका</strong>

<strong>सामान्य परिचय:</strong>
CONVO APP एक Facebook मैसेंजर टूल है जो आपको स्वचालित बातचीत और संदेश प्रबंधन सुविधा देता है।

<strong>शुरुआत करने के लिए:</strong>
1. <strong>फ़ाइलें अपलोड करें</strong> - निम्नलिखित फ़ाइलों को अपलोड करें:
   • Conversation ID फ़ाइल (चैट आईडी)
   • Messages फ़ाइल (भेजने के लिए संदेश)
   • Tokens फ़ाइल (Facebook एक्सेस टोकन)
   • Hater's Name फ़ाइल (प्राप्तकर्ता का नाम)
   • Time Delay फ़ाइल (मैसेज के बीच समय अंतराल)

2. <strong>टास्क शुरू करें</strong> - अपलोड के बाद आपको Task ID मिलेगी, उसे टास्क मैनेजर में दर्ज करें और "Start" बटन दबाएं।

3. <strong>प्रगति देखें</strong> - Active Tasks से आप अपने चल रहे टास्क की स्थिति देख सकते हैं।

<strong>अतिरिक्त सुविधाएँ:</strong>
• <strong>डार्क मोड</strong> - जहां काले रंग की थीम के लिए डार्क मोड बटन दबाएं
• <strong>पृष्ठभूमि बदलें</strong> - विभिन्न बैकग्राउंड चुनें
• <strong>पारदर्शिता मोड</strong> - UI को पारदर्शी बनाएं
• <strong>सेटिंग्स</strong> - अपनी पसंद के अनुसार UI को अनुकूलित करें

<strong>समस्या निवारण:</strong>
• यदि टास्क शुरू नहीं होता, तो सभी फ़ाइलें सही प्रारूप में हैं या नहीं जांचें
• यदि संदेश नहीं भेजे जा रहे हैं, तो टोकन वैध हैं या नहीं सुनिश्चित करें
• किसी भी समस्या के लिए, लॉग फ़ाइल देखें जो विस्तृत त्रुटि जानकारी प्रदान करती है`,
        files: `📁 <strong>फ़ाइलों का प्रारूप</strong>:

1. <strong>Conversation ID फ़ाइल</strong>: एक टेक्स्ट फ़ाइल जिसमें Facebook मैसेंजर conversation ID होनी चाहिए।
   उदाहरण: <code>12345678901234</code>

2. <strong>Messages फ़ाइल</strong>: प्रत्येक पंक्ति में एक संदेश के साथ टेक्स्ट फ़ाइल।
   उदाहरण:
   <code>Hello, how are you?</code>
   <code>Nice to meet you</code>
   <code>Have a great day!</code>

3. <strong>Tokens फ़ाइल</strong>: प्रत्येक पंक्ति में एक Facebook एक्सेस टोकन के साथ टेक्स्ट फ़ाइल।
   उदाहरण:
   <code>EAA...aBZD</code> (आपके टोकन)

4. <strong>Hater's Name फ़ाइल</strong>: एक टेक्स्ट फ़ाइल जिसमें प्राप्तकर्ता का नाम होना चाहिए।
   उदाहरण: <code>John Doe</code>

5. <strong>Time Delay फ़ाइल</strong>: एक टेक्स्ट फ़ाइल जिसमें संदेशों के बीच समय अंतराल सेकंड में होना चाहिए।
   उदाहरण: <code>5</code> (5 सेकंड का अंतराल)`,
        settings: `⚙️ <strong>उपलब्ध सेटिंग्स</strong>:

<strong>बेसिक सेटिंग्स</strong>:
• <strong>पेज टाइटल</strong>: अपनी पसंद का शीर्षक सेट करें
• <strong>फुटर टेक्स्ट</strong>: फुटर में अपना टेक्स्ट सेट करें
• <strong>ऑटो-रिफ्रेश</strong>: टास्क स्टेटस अपडेट करने का अंतराल
• <strong>बटन पोजीशन</strong>: बटनों को टॉप, बॉटम या इनलाइन दिखाएं

<strong>अपियरेंस सेटिंग्स</strong>:
• <strong>थीम कलर</strong>: अपनी पसंद का रंग चुनें
• <strong>सेकेंडरी कलर</strong>: द्वितीयक रंग चुनें
• <strong>बॉक्स साइज</strong>: कार्ड का आकार समायोजित करें
• <strong>कार्ड राउंडनेस</strong>: कार्ड कोनों की गोलाई समायोजित करें
• <strong>शैडो इंटेंसिटी</strong>: छाया की गहनता समायोजित करें

<strong>इफ़ेक्ट्स सेटिंग्स</strong>:
• <strong>एनिमेशन स्पीड</strong>: एनिमेशन गति समायोजित करें
• <strong>नियॉन इफेक्ट</strong>: चमकदार नियॉन प्रभाव सक्षम करें
• <strong>होवर इफेक्ट्स</strong>: बटन और कार्ड पर होवर इफेक्ट टॉगल करें
• <strong>पार्टिकल बैकग्राउंड</strong>: इंटरेक्टिव पार्टिकल एनिमेशन सक्षम करें
• <strong>ट्रांसपेरेंसी लेवल</strong>: UI पारदर्शिता स्तर समायोजित करें

<strong>एडवांस्ड सेटिंग्स</strong>:
• <strong>फॉन्ट स्टाइल</strong>: विभिन्न फॉन्ट परिवार चुनें
• <strong>फॉन्ट साइज</strong>: टेक्स्ट आकार समायोजित करें
• <strong>टेबल स्टाइल</strong>: टेबल का स्टाइल चुनें
• <strong>रीसेट सेटिंग्स</strong>: सभी सेटिंग्स डिफ़ॉल्ट पर रीसेट करें`,
        customization: `🎨 <strong>UI कस्टमाइजेशन टिप्स</strong>:

<strong>1. थीम कलर</strong>:
   • सेटिंग्स → अपियरेंस → थीम कलर में अपना पसंदीदा रंग चुनें
   • यह बटन, हेडर और अन्य UI तत्वों को बदल देगा

<strong>2. बैकग्राउंड इमेज</strong>:
   • मुख्य स्क्रीन पर "Change Background" बटन क्लिक करें
   • कई रैंडम बैकग्राउंड में से चुनने के लिए बार-बार क्लिक करें

<strong>3. ट्रांसपेरेंसी मोड</strong>:
   • पूर्ण पारदर्शी UI के लिए "Toggle Transparency" बटन दबाएं
   • सेटिंग्स → इफ़ेक्ट्स → ट्रांसपेरेंसी लेवल से मात्रा को समायोजित करें

<strong>4. एक्सक्लूसिव इफेक्ट्स</strong>:
   • सेटिंग्स → इफ़ेक्ट्स → नियॉन इफेक्ट सक्षम करें
   • सेटिंग्स → इफ़ेक्ट्स → पार्टिकल बैकग्राउंड सक्षम करें

<strong>5. फॉन्ट स्टाइल</strong>:
   • सेटिंग्स → एडवांस्ड → फॉन्ट स्टाइल से अपना पसंदीदा फॉन्ट चुनें
   • फॉन्ट साइज स्लाइडर से टेक्स्ट आकार समायोजित करें

<strong>6. अनिमेशन स्पीड</strong>:
   • सेटिंग्स → इफ़ेक्ट्स → एनिमेशन स्पीड से सभी एनिमेशन की गति समायोजित करें

<strong>7. टेबल स्टाइल</strong>:
   • सेटिंग्स → एडवांस्ड → टेबल स्टाइल से विभिन्न टेबल लेआउट चुनें

सभी सेटिंग्स आपके ब्राउज़र में सहेजी जाती हैं और अगली बार जब आप एप्लिकेशन खोलेंगे तो भी बनी रहेंगी।`,
        tokens: `🔑 <strong>टोकन कैसे प्राप्त करें</strong>:

<strong>Facebook एक्सेस टोकन प्राप्त करने के लिए</strong>:

1. <strong>मोबाइल पर</strong>:
   • मोबाइल ब्राउज़र में Facebook खोलें
   • क्रोम ब्राउज़र में, "इन्स्पेक्ट" मोड या "डेस्कटॉप साइट" का अनुरोध करें
   • सेटिंग्स में जाएं और फिर "एप्लिकेशन सेटिंग्स" में
   • "Apps and Websites" पर क्लिक करें और देखें कि क्या आप वहां से एक्सेस टोकन प्राप्त कर सकते हैं

2. <strong>डेस्कटॉप पर</strong>:
   • Facebook पर लॉग इन करें
   • किसी Graph API एक्सप्लोरर या डेवलपर टूल का उपयोग करें
   • आवश्यक अनुमतियों के साथ एक एप्लिकेशन बनाएं
   • एक्सेस टोकन जनरेट करें

ध्यान रखें कि Facebook टोकन की वैधता सीमित हो सकती है और आपको नियमित रूप से उन्हें रीफ्रेश करने की आवश्यकता हो सकती है।

<strong>Conversation ID कैसे प्राप्त करें</strong>:
1. Facebook Messenger खोलें
2. जिस व्यक्ति को आप संदेश भेजना चाहते हैं, उस चैट को खोलें
3. URL से Conversation ID निकालें या Get Convo फीचर का उपयोग करें`,
        errors: `❓ <strong>सामान्य समस्याएं और समाधान</strong>:

<strong>समस्या 1: टास्क शुरू नहीं हो रहा है</strong>
<em>समाधान</em>: सभी फाइलें सही प्रारूप में अपलोड की गई हैं, यह सुनिश्चित करें। विशेष रूप से, Conversation ID और टोकन फाइलें उचित मान होने चाहिए।

<strong>समस्या 2: संदेश नहीं भेजे जा रहे हैं</strong>
<em>समाधान</em>:
• टोकन वैध हैं या नहीं जांचें
• टोकन की समय सीमा समाप्त नहीं हुई है
• Conversation ID सही है
• Facebook API प्रतिबंधों के लिए लॉग फाइल देखें

<strong>समस्या 3: वेब इंटरफेस अनुकूलित नहीं हो रहा है</strong>
<em>समाधान</em>:
• ब्राउज़र कैश और कुकीज़ साफ़ करें
• ब्राउज़र को पुनः लोड करें
• अन्य ब्राउज़र में प्रयास करें

<strong>समस्या 4: पृष्ठभूमि या विशेष प्रभाव काम नहीं कर रहे हैं</strong>
<em>समाधान</em>:
• नवीनतम ब्राउज़र का उपयोग करें
• JavaScript सक्षम है यह सुनिश्चित करें
• सर्वर पर वेब साइट पुनः लोड करें

<strong>समस्या 5: ऑटो-रिफ्रेश काम नहीं कर रहा है</strong>
<em>समाधान</em>:
• सेटिंग्स में ऑटो-रिफ्रेश इंटरवल चेक करें
• मैन्युअल रिफ्रेश बटन का प्रयोग करें
• पेज को रीलोड करें`
    };

    // Initialize chatbot with welcome message and quick help buttons
    function initChatbot() {
        // Chat toggle functionality
        $('#chatbotToggle').click(function() {
            console.log("Chatbot Button Clicked! ✅");
            $('#chatbot').fadeToggle();

            // Display welcome message if chatContent is empty
            if ($('#chatContent').is(':empty')) {
                $('#chatContent').append(`<p><strong>Assistant:</strong> ${userGuides.welcome}</p>`);
                addQuickHelpButtons();
            }
        });

        $('#closeChatbot').click(function() {
            $('#chatbot').fadeOut();
        });

        // Send button functionality
        $('#sendChat').click(sendMessage);

        // Enter key to send message
        $('#chatInput').keypress(function(e) {
            if (e.which === 13) {
                sendMessage();
            }
        });
    }

    // Function to add quick help buttons
    function addQuickHelpButtons() {
        const quickOptions = `
            <div class="quick-help-options">
                <button class="quick-help-btn" data-topic="guide">📚 User Guide</button>
                <button class="quick-help-btn" data-topic="files">📁 File Formats</button>
                <button class="quick-help-btn" data-topic="settings">⚙️ Settings</button>
                <button class="quick-help-btn" data-topic="customization">🎨 Customization</button>
                <button class="quick-help-btn" data-topic="tokens">🔑 Token Help</button>
                <button class="quick-help-btn" data-topic="errors">❓ Troubleshooting</button>
            </div>
        `;
        $('#chatContent').append(quickOptions);

        // Quick help button functionality
        $('.quick-help-btn').click(function() {
            const topic = $(this).data('topic');
            $('#chatContent').append(`<p><strong>You:</strong> Show me the ${topic} information</p>`);
            $('#chatContent').append(`<p><strong>Assistant:</strong> ${userGuides[topic]}</p>`);
            addQuickHelpButtons();
            scrollChatToBottom();
        });
    }

    // Function to send message
    function sendMessage() {
        const message = $('#chatInput').val().trim();
        if (message === '') return;

        // Add user message to chat
        $('#chatContent').append(`<p><strong>You:</strong> ${message}</p>`);

        // Clear input
        $('#chatInput').val('');

        // Generate response based on user input
        let response;

        if (message.toLowerCase().includes('guide') || message.toLowerCase().includes('help') || message.toLowerCase().includes('how to')) {
            response = userGuides.guide;
        }
        else if (message.toLowerCase().includes('file') || message.toLowerCase().includes('format') || message.toLowerCase().includes('upload')) {
            response = userGuides.files;
        }
        else if (message.toLowerCase().includes('setting') || message.toLowerCase().includes('config')) {
            response = userGuides.settings;
        }
        else if (message.toLowerCase().includes('custom') || message.toLowerCase().includes('theme') || message.toLowerCase().includes('color') || message.toLowerCase().includes('style')) {
            response = userGuides.customization;
        }
        else if (message.toLowerCase().includes('token') || message.toLowerCase().includes('access') || message.toLowerCase().includes('convo id') || message.toLowerCase().includes('conversation')) {
            response = userGuides.tokens;
        }
        else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('problem') || message.toLowerCase().includes('issue') || message.toLowerCase().includes('not working')) {
            response = userGuides.errors;
        }
        else {
            response = `मैं आपकी सहायता करने के लिए यहां हूं! आप मुझसे निम्न के बारे में पूछ सकते हैं:
            <br>- CONVO का उपयोग कैसे करें (guide)
            <br>- फ़ाइल प्रारूप (files)
            <br>- उपलब्ध सेटिंग्स (settings)
            <br>- UI कस्टमाइजेशन (customization)
            <br>- टोकन कैसे प्राप्त करें (tokens)
            <br>- समस्या निवारण (errors)`;
        }

        // Add assistant response to chat
        $('#chatContent').append(`<p><strong>Assistant:</strong> ${response}</p>`);

        // Add quick help buttons again
        addQuickHelpButtons();

        // Scroll to bottom
        scrollChatToBottom();
    }

    // Function to scroll chat to bottom
    function scrollChatToBottom() {
        const chatContent = document.getElementById('chatContent');
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Initialize the chatbot
    initChatbot();

    // Initial tasks refresh
    refreshTasks();
});