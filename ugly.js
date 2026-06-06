document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const ritualBtn = document.getElementById('ritual-btn');
    const glitchOverlay = document.getElementById('glitch-overlay');
    const draggables = document.querySelectorAll('.draggable');

    // 1. Audio Control
    audioToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioToggle.style.background = 'var(--safety)';
        } else {
            audio.pause();
            audioToggle.style.background = 'var(--acid)';
        }
    });

    // 2. Simple Dragging Logic
    draggables.forEach(el => {
        let isDragging = false;
        let offsetX, offsetY;

        const header = el.querySelector('.window-header');
        
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - el.offsetLeft;
            offsetY = e.clientY - el.offsetTop;
            el.style.zIndex = 1001; // Bring to front
            
            // Randomly change header color on drag
            header.style.background = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                el.style.left = (e.clientX - offsetX) + 'px';
                el.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });

    // 3. Ritual Easter Egg
    ritualBtn.addEventListener('click', () => {
        glitchOverlay.style.display = 'flex';
        audio.playbackRate = 2.0;

        // Visual Chaos
        const colors = ['#BFFF00', '#FF6B00', '#0000FF', '#FF0000', '#000000'];
        let count = 0;
        const interval = setInterval(() => {
            document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            glitchOverlay.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            count++;
            
            if (count > 30) {
                clearInterval(interval);
                glitchOverlay.style.display = 'none';
                document.body.style.backgroundColor = 'white';
                audio.playbackRate = 1.0;
            }
        }, 50);
    });

    // 4. Constant Aberrations
    setInterval(() => {
        if (Math.random() > 0.97) {
            document.body.style.filter = 'invert(1) contrast(5)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 100);
        }
        
        if (Math.random() > 0.95) {
            const marquee = document.querySelector('marquee');
            marquee.style.color = `rgb(${Math.random()*255}, 0, 0)`;
        }
    }, 1500);
});
