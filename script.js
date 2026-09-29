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
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;
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
