const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let tick = 0;

class Particle {
    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = canvas.width / 2 + x; // Pindah ke tengah horizontal
        this.y = canvas.height / 2 + y; // Pindah ke tengah vertikal
        this.size = Math.random() * 2 + 1;
        this.color = 'rgba(255, 0, 80, 0.8)';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        // Efek detak jantung menggunakan Math.sin
        let beat = 1 + Math.sin(tick) * 0.1;
        
        let targetX = (canvas.width / 2) + (this.baseX * beat);
        let targetY = (canvas.height / 2) + (this.baseY * beat);

        this.x += (targetX - this.x) * 0.1;
        this.y += (targetY - this.y) * 0.1;
    }
}

function init() {
    particles = [];
    const step = 0.1; 
    const r = 15; // Ukuran hati

    for (let i = 0; i < Math.PI * 2; i += step) {
        // Rumus Parametrik Hati
        let tx = r * 16 * Math.pow(Math.sin(i), 3);
        let ty = -r * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));

        // Mengisi bagian dalam hati
        for (let j = 0; j <= 1; j += 0.2) { // JANGAN gunakan j += 0
            particles.push(new Particle(tx * j, ty * j));
        }
    }
}

function animate() {
    // Membersihkan layar setiap frame
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    tick += 0.05;
    requestAnimationFrame(animate);
}

// Jalankan program
init();
animate();

// Respon jika ukuran window berubah
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
