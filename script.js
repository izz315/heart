const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 100 // Jarak interaksi kursor
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y) {
        this.x = Math.random() * canvas.width; // Posisi awal acak
        this.y = Math.random() * canvas.height;
        this.destX = x; // Posisi tujuan (membentuk hati)
        this.destY = y;
        this.size = 1.5;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1; // Kecepatan kembali
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    particles = [];
    // Membuat titik-titik koordinat berbentuk hati
    for (let i = 0; i < Math.PI * 2; i += 0.05) {
        // Rumus Parametrik Hati
        let x = 16 * Math.pow(Math.sin(i), 3);
        let y = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        
        // Skala dan posisi di tengah layar
        particles.push(new Particle(canvas.width/2 + x * 15, canvas.height/2 + y * 15));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
    }
    requestAnimationFrame(animate);
}

init();
animate();

// Resizing canvas jika jendela diubah ukurannya
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});