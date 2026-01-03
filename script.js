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