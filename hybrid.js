document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const ritualBtn = document.getElementById('ritual-btn');
    const glitchOverlay = document.getElementById('glitch-overlay');
    const overlayMsg = document.getElementById('overlay-msg');
    const draggables = document.querySelectorAll('.draggable');

    // 1. Audio Control
    audioToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(e => console.log("Audio blocked", e));
            audioToggle.textContent = 'MUTE THE VOID';
            audioToggle.style.background = 'var(--acid-green)';
            audioToggle.style.color = 'var(--black)';
        } else {
            audio.pause();
            audioToggle.textContent = 'UNMUTE THE VOID';
            audioToggle.style.background = 'transparent';
            audioToggle.style.color = 'var(--white)';
        }
    });

    // 2. Dragging Logic (From Ugly Version)
    draggables.forEach(el => {
        let isDragging = false;
        let offsetX, offsetY;

        const header = el.querySelector('.window-header');
        
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - el.offsetLeft;
            offsetY = e.clientY - el.offsetTop;
            
            // Bring to front
            draggables.forEach(d => d.style.zIndex = 10);
            el.style.zIndex = 1000;
            
            // Glitchy header color change on drag start
            header.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
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

    // 3. Logo Mouse Jitter (From Dark Version)
    const logo = document.getElementById('logo-svg');
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.92) {
            const shiftX = (Math.random() - 0.5) * 15;
            const shiftY = (Math.random() - 0.5) * 8;
            logo.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
            setTimeout(() => logo.style.transform = 'translate(0,0)', 50);
        }
    });

    // 4. Ritual Trigger (Combination)
    ritualBtn.addEventListener('click', () => {
        glitchOverlay.style.display = 'flex';
        audio.playbackRate = 0.5; // Slow down audio (Dark V)

        const messages = [
            "KAAMOT ON TÄIS MEID",
            "NÄLJATOOJA",
            "EKSTAAS LÄBI VALU",
            "SÜSTEEMI VIGA"
        ];
        
        let count = 0;
        const msgInterval = setInterval(() => {
            overlayMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
            // Acid Strobe (Ugly V)
            const colors = ['#050505', '#BFFF00', '#FF6B00', '#8c2b1f'];
            glitchOverlay.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            count++;
            if (count > 25) {
                clearInterval(msgInterval);
                glitchOverlay.style.display = 'none';
                audio.playbackRate = 1.0;
            }
        }, 100);
    });

    // 5. Global Aberrations
    setInterval(() => {
        const rand = Math.random();
        if (rand > 0.98) {
            // Hue inversion
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            setTimeout(() => document.body.style.filter = 'none', 100);
        } else if (rand > 0.96) {
            // Screen shake
            document.body.style.transform = `translate(${(Math.random()-0.5)*10}px, ${(Math.random()-0.5)*10}px)`;
            setTimeout(() => document.body.style.transform = 'none', 50);
        }
    }, 1500);
});
