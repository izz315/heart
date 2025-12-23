const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let tick = 0; 

class Particle {
    constructor(x, y) {
        // Offset ke tengah layar agar hati tidak muncul di pojok kiri atas (0,0)
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.baseX = x;
        this.baseY = y;
        this.x = this.centerX + x;
        this.y = this.centerY + y;
        this.size = Math.random() * 2 + 1;
        this.color = 'rgba(255, 0, 80, 0.8)';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Efek Detak Jantung
        let beat = 1 + Math.sin(tick) * 0.1; 
        
        let targetX = this.centerX + (this.baseX * beat);
        let targetY = this.centerY + (this.baseY * beat);

        // Gerakan halus menuju posisi target
        this.x += (targetX - this.x) * 0.1;
        this.y += (targetY - this.y) * 0.1;
    }
}

function init() {
    particles = [];
    const step = 0.1; // Mengurangi kepadatan sedikit agar performa terjaga
    const r = 15;    // Skala ukuran hati

    for (let i = 0; i < Math.PI * 2; i += step) {
        // Rumus Parametrik Tepi Hati
        let tx = r * 16 * Math.pow(Math.sin(i), 3);
        let ty = -r * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));

        // Mengisi bagian dalam hati dengan partikel acak di antara pusat dan tepi
        for (let j = 0; j < 1; j += 0.2) { // PERBAIKAN: j += 0.2 agar tidak infinite loop
            particles.push(new Particle(tx * j, ty * j));
        }
    }
}

function animate() {
    // Memberikan efek trail sedikit dengan fillStyle transparan
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    tick += 0.1; // Menambah kecepatan detak
    requestAnimationFrame(animate);
}

init();
animate();

// Menangani perubahan ukuran layar
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
