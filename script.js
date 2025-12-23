const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let tick = 0; // Untuk mengatur ritme detak jantung

class Particle {
    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.color = 'rgba(255, 0, 50, 0.8)';
        this.speed = Math.random() * 0.05 + 0.02;
        this.angle = Math.random() * Math.PI * 2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Efek Berdetak Otomatis (Beating Effect)
        // Math.sin(tick) menciptakan gerakan naik turun yang halus
        let beat = 1 + Math.sin(tick) * 0.1; 
        
        let targetX = this.baseX * beat;
        let targetY = this.baseY * beat;

        // Gerakan halus menuju posisi detak
        this.x += (targetX - this.x) * 0.1;
        this.y += (targetY - this.y) * 0.1;
    }
}

function init() {
    particles = [];
    const step = 0.02; // Semakin kecil angka ini, bintik semakin padat
    
    // Looping untuk membuat bintik-bintik di area hati
    for (let i = 0; i < Math.PI * 2; i += step) {
        // Rumus Parametrik Hati
        const r = 15; // Skala ukuran
        let tx = r * 16 * Math.pow(Math.sin(i), 3);
        let ty = -r * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));

        // Untuk mengisi bagian dalam, kita tarik garis dari pusat (0,0) ke tepi (tx,ty)
        for (let j = 0; j < 1; j += 0
