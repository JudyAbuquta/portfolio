// ---- FLIP CARD TOUCH SUPPORT ----
const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!isTouchDevice()) return;
        const isFlipped = card.classList.toggle('flipped');
        if (!isFlipped) e.preventDefault();
    });
});

// ---- MOBILE NAV TOGGLE ----
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');

navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
});

// Close menu when a link is tapped
navMobile.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
    });
});

const bg = document.getElementById('sunrise-bg');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        function updateBackground() {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = window.scrollY / (scrollTotal || 1);
            const p = Math.max(0, Math.min(1, scrollProgress));

            const white = '#f7f7f7';
            const softWarm = '#f5ede8';
            const softCool = '#ecf1f3';

            const warmAmt = 100 - (p * 40); 
            const glowAmt = 70 - (p * 50);  
            const coolAmt = 20 - (p * 20);  

            bg.style.background = `linear-gradient(180deg, 
                ${white} 0%, 
                ${softCool} ${coolAmt}%, 
                ${white} ${glowAmt}%, 
                ${softWarm} ${warmAmt}%)`;

            let index = sections.length;
            while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
            navLinks.forEach((link) => link.classList.remove('active'));
            if(navLinks[index]) navLinks[index].classList.add('active');
        }

        window.addEventListener('scroll', updateBackground);
        window.addEventListener('load', updateBackground);
        updateBackground();

        // --- NEURAL NETWORK INTERACTIVE LOGIC ---
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let neurons = [];
const mouse = { x: null, y: null, radius: 180 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Neuron {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
    }

    draw() {
        ctx.fillStyle = '#dba58f';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 15;
            }
        }
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    neurons = [];
    const numberOfNeurons = (canvas.width * canvas.height) / 10000;
    for (let i = 0; i < numberOfNeurons; i++) {
        neurons.push(new Neuron());
    }
}

function connect() {
    for (let a = 0; a < neurons.length; a++) {
        for (let b = a; b < neurons.length; b++) {
            let dx = neurons[a].x - neurons[b].x;
            let dy = neurons[a].y - neurons[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) {
                let opacity = 1 - (distance / 140);
                ctx.strokeStyle = `rgba(135, 164, 171, ${opacity * 0.4})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(neurons[a].x, neurons[a].y);
                ctx.lineTo(neurons[b].x, neurons[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < neurons.length; i++) {
        neurons[i].update();
        neurons[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    init();
});

// Initialize and Start
init();
animate();


//  FADE-IN ANIMATIONS ON SCROLL 
const fadeSections = document.querySelectorAll('section:not(#hero)');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

fadeSections.forEach(section => {
    fadeObserver.observe(section);
});

window.addEventListener('load', () => {
    document.querySelector('#hero').style.opacity = '1';
});


    // ---- JUDY AVATAR SYSTEM ----
    const illustrations = {
        thinking: 'assets/images/judy-thinking.png',
        smirk:    'assets/images/judy-smirk.png',
        progress:    'assets/images/judy-laptop.png',
        music:    'assets/images/judy-music.png',
        cinema:   'assets/images/judy-cinema.png',
        donut:    'assets/images/judy-donut.png',
    };

    const sectionConfig = {
        currently: {
            pose: 'progress',
            quotes: [
                "done is a myth",
                "the to-do list is alive and it's winning",
                "currently: everything, simultaneously",
                "three projects. one brain. no sleep.",
            ]
        },
        about: {
            pose: 'music',
            quotes: [
                "listening to... Don't Stop Me Now by Queen 🎶",
                "started uni at 15, i guess im a fast learner.",
                "in the zone right now 🎧",
            ]
        },
        education: {
            pose: 'donut',
            quotes: [
                "started uni at 15, not your average college experience",
                "yes my classmates thought I was lost 🙂.",
            ]
        },
        projects: {
            pose: 'thinking',
            quotes: [
                "sleep is a suggestion when you're debugging",
                "spent the better part of my teen years on these 🙂. ",
                "Most of my github commits are timestamped at 3am. don't judge.",
            ]
        },
        papers: {
            pose: 'smirk',
            quotes: [
                "peer reviewed by me, determination, and caffeine",
                "read 40 papers so you don't have to 🙂",
                "academic writing at 2am hits different",
            ]
        },
        certifications: {
            pose: 'donut',
            quotes: [
                "every cert = one donut. system works ",
                "whats my goal? to keep broadening my horizons",
                "finished the course. rewarded myself. obviously.",
            ]
        },
        skills: {
            pose: 'smirk',
            quotes: [
                "skill not listed: can name every 80s one-hit wonder",
                "soft skill: looking unbothered while panicking internally",
            ]
        },
        contact: {
            pose: 'cinema',
            quotes: [
                "if i don't reply, you can find me at the cinema 🎬",
                "yes, I paused my movie for your email 🍿 "
            ]
        },
    };

    const avatar = document.getElementById('judy-avatar');
    const bubble = document.getElementById('judy-bubble');
    const bubbleText = document.getElementById('judy-bubble-text');
    const cornerImg = document.getElementById('judy-corner-img');
    let bubbleTimeout;
    let currentPose = 'smirk';
    let currentSection = '';
    let sectionClickIndex = 0;

    cornerImg.style.transition = 'opacity 0.2s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';

    function doWiggle() {
        if (!avatar.classList.contains('visible')) return;
        cornerImg.classList.add('wiggling');
        setTimeout(() => cornerImg.classList.remove('wiggling'), 600);
    }

    function setPose(pose) {
        if (!illustrations[pose] || pose === currentPose) return;
        currentPose = pose;
        cornerImg.classList.add('wiggling');
        setTimeout(() => {
            cornerImg.src = illustrations[pose];
            cornerImg.classList.remove('wiggling');
        }, 300);
    }

    let ignoreMouse = false;

    function showBubble(text) {
        bubbleText.textContent = text;
        bubble.classList.add('visible');
        clearTimeout(bubbleTimeout);
        bubbleTimeout = setTimeout(() => bubble.classList.remove('visible'), 3000);
    }

    function getQuote() {
        const config = sectionConfig[currentSection];
        if (!config) return "hi 👋";
        const q = config.quotes[sectionClickIndex % config.quotes.length];
        sectionClickIndex++;
        return q;
    }

    // Desktop: hover to show, leave to hide
    avatar.addEventListener('mouseenter', () => {
        if (ignoreMouse) return;
        showBubble(getQuote());
        clearTimeout(bubbleTimeout); // keep visible while hovering
    });
    avatar.addEventListener('mouseleave', () => {
        if (isTouchDevice()) return;
        clearTimeout(bubbleTimeout);
        bubble.classList.remove('visible');
    });

    // ---- JUDY DRAG + TAP ----
    // tap 1 = show bubble, tap 2 = close bubble, drag = move
    let wasDragging = false;
    let dragStartX, dragStartY, dragStartRight, dragStartBottom;

    // Start from bottom-right corner positioning
    avatar.style.right = '24px';
    avatar.style.bottom = '0px';

    avatar.addEventListener('touchstart', (e) => {
        ignoreMouse = true;
        setTimeout(() => { ignoreMouse = false; }, 600);
        wasDragging = false;
        const touch = e.touches[0];
        dragStartX = touch.clientX;
        dragStartY = touch.clientY;
        const rect = avatar.getBoundingClientRect();
        dragStartRight = window.innerWidth - rect.right;
        dragStartBottom = window.innerHeight - rect.bottom;
        avatar.style.transition = 'none';
    }, { passive: true });

    avatar.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const dx = touch.clientX - dragStartX;
        const dy = touch.clientY - dragStartY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) wasDragging = true;
        if (!wasDragging) return;
        e.preventDefault();
        bubble.classList.remove('visible');
        const newRight = Math.max(0, Math.min(window.innerWidth - 80, dragStartRight - dx));
        const newBottom = Math.max(0, Math.min(window.innerHeight - 80, dragStartBottom - dy));
        avatar.style.right = newRight + 'px';
        avatar.style.bottom = newBottom + 'px';
    }, { passive: false });

    avatar.addEventListener('touchend', (e) => {
        avatar.style.transition = '';
        if (wasDragging) return;
        e.preventDefault();
        if (bubble.classList.contains('visible')) {
            clearTimeout(bubbleTimeout);
            bubble.classList.remove('visible');
        } else {
            showBubble(getQuote());
        }
    });

    // Wiggle: about = first at 3s then every 6s / all others = every 15s
    let wiggleTimer;
    function scheduleWiggle(isFirst) {
        clearTimeout(wiggleTimer);
        if (currentSection === 'about') {
            const delay = isFirst ? 1000 : 6000;
            wiggleTimer = setTimeout(() => { doWiggle(); scheduleWiggle(false); }, delay);
        } else {
            wiggleTimer = setTimeout(() => { doWiggle(); scheduleWiggle(false); }, 9000);
        }
    }
    scheduleWiggle(true);

    // ---- MUSIC NOTES ----
    const musicNotesEl = document.getElementById('music-notes');
    const noteSymbols = ['♪', '♫', '♩', '♬'];
    let noteInterval;

    function spawnNote() {
        const note = document.createElement('span');
        note.className = 'music-note';
        note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
        const leftPct = 20 + Math.random() * 60;
        const drift = (Math.random() - 0.5) * 30;
        const duration = 2.2 + Math.random() * 1.5;
        const delay = Math.random() * 0.5;
        note.style.cssText = `
            left: ${leftPct}%;
            bottom: 0;
            color: var(--color-orange);
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --drift: ${drift}px;
            opacity: 0;
        `;
        musicNotesEl.appendChild(note);
        setTimeout(() => note.remove(), (duration + delay) * 1000);
    }

    function startNotes() {
        if (noteInterval) return;
        noteInterval = setInterval(spawnNote, 600);
    }

    function stopNotes() {
        clearInterval(noteInterval);
        noteInterval = null;
        musicNotesEl.innerHTML = '';
    }

    const heroBubble = document.getElementById('hero-bubble');
    const heroSequence = [
        { text: "Hi, I'm Judy ", duration: 2300 },
        { text: "Welcome to my portfolio.", duration: 3000 },
        { text: "Hope you enjoy it !!", duration: 3000 },
    ];
    let heroSeqIndex = 0;
    let heroRunning = false;

    function runHeroSequence() {
        const step = heroSequence[heroSeqIndex % heroSequence.length];
        heroBubble.style.opacity = '0';
        setTimeout(() => {
            heroBubble.textContent = step.text;
            heroBubble.style.opacity = '1';
            heroSeqIndex++;
            setTimeout(runHeroSequence, step.duration);
        }, 250);
    }

    heroBubble.style.opacity = '0';
    heroBubble.style.transition = 'opacity 0.25s ease';
    runHeroSequence();

    // Scroll
    const heroSection = document.getElementById('hero');
    const heroJudyWrap = document.getElementById('hero-judy-wrap');
    let lastSection = '';
    let poseDebounce;

    function onScroll() {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom < 80) {
            avatar.classList.add('visible');
            if (heroJudyWrap) { heroJudyWrap.style.opacity = '0'; heroJudyWrap.style.pointerEvents = 'none'; }
        } else {
            avatar.classList.remove('visible');
            bubble.classList.remove('visible');
            if (heroJudyWrap) { heroJudyWrap.style.opacity = '1'; heroJudyWrap.style.pointerEvents = 'all'; }
        }

        clearTimeout(poseDebounce);
        poseDebounce = setTimeout(() => {
            const allSections = document.querySelectorAll('section[id]');
            let current = '';
            allSections.forEach(sec => {
                if (window.scrollY >= sec.offsetTop - 250) current = sec.id;
            });
            if (current !== lastSection) {
                lastSection = current;
                currentSection = current;
                sectionClickIndex = 0;
                if (sectionConfig[current]) setPose(sectionConfig[current].pose);
                scheduleWiggle(true);
                if (current === 'about') startNotes();
                else stopNotes();
            }
        }, isNavJump ? 150 : 300);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    const sparkCanvas = document.getElementById('spark-canvas');
    const sctx = sparkCanvas.getContext('2d');
    sparkCanvas.width = window.innerWidth;
    sparkCanvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        sparkCanvas.width = window.innerWidth;
        sparkCanvas.height = window.innerHeight;
    });
    let sparks = [];
    function Spark(x, y) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        return {
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1.5,
            life: 1,
            decay: Math.random() * 0.03 + 0.02,
            size: Math.random() * 3 + 1,
            color: Math.random() > 0.5 ? '#dba58f' : '#a9c2cf'
        };
    }
    function animateSparks() {
        sctx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
        sparks = sparks.filter(s => s.life > 0);
        sparks.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.08;
            s.life -= s.decay;
            sctx.beginPath();
            sctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
            sctx.fillStyle = s.color;
            sctx.globalAlpha = s.life;
            sctx.fill();
            sctx.globalAlpha = 1;
        });
        requestAnimationFrame(animateSparks);
    }
    animateSparks();

    function spawnSparks(x, y, count = 12) {
        for (let i = 0; i < count; i++) sparks.push(Spark(x, y));
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            if (Math.random() > 0.85) spawnSparks(e.clientX, e.clientY, 3);
        });
        card.addEventListener('click', e => spawnSparks(e.clientX, e.clientY, 20));
    });

    // ---- NAV WHOOSH ----
    let isNavJump = false;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;
            isNavJump = true;
            setTimeout(() => { isNavJump = false; }, 1500);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ---- CONTACT COPY ----
    function copyEmail(el) {
        navigator.clipboard.writeText('judy.abuquta@gmail.com').then(() => {
            const val = el.querySelector('.contact-value');
            const label = el.querySelector('.contact-label');
            const orig = val.textContent;
            const origLabel = label.textContent;
            val.textContent = 'copied! cant wait to hear from you 📧';
            label.textContent = '✓';
            el.style.borderColor = 'var(--color-orange)';
            setTimeout(() => {
                val.textContent = orig;
                label.textContent = origLabel;
                el.style.borderColor = '';
            }, 2000);
        });
    }

    function copyPhone(el) {
        navigator.clipboard.writeText('+966538350023').then(() => {
            const val = el.querySelector('.contact-value');
            const label = el.querySelector('.contact-label');
            const orig = val.textContent;
            const origLabel = label.textContent;
            val.textContent = 'copied! 📞';
            label.textContent = '✓';
            el.style.borderColor = 'var(--color-orange)';
            setTimeout(() => {
                val.textContent = orig;
                label.textContent = origLabel;
                el.style.borderColor = '';
            }, 2000);
        });
    }
