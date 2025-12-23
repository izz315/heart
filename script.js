const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let tick = 0; // Untuk mengatur ritme detak jantung
const mouse = {
    x: undefined,
    y: undefined,
    radius: 100 // Radius interaksi mouse
}

// Event listener untuk melacak posisi mouse
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Event listener untuk reset mouse position saat keluar dari window
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor(x, y, color = 'rgba(255, 0, 80, 0.8)') {
        this.baseX = x; // Posisi dasar X (dari bentuk hati)
        this.baseY = y; // Posisi dasar Y (dari bentuk hati)
        
        // Posisi awal partikel di tengah layar
        this.x = canvas.width / 2 + x;
        this.y = canvas.height / 2 + y;

        this.size = Math.random() * 2 + 1; // Ukuran partikel bervariasi
        this.color = color;
        this.density = (Math.random() * 30) + 1; // Untuk efek "dorongan"
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // --- Efek Interaksi Mouse ---
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
            // --- Efek Berdetak Otomatis (Heartbeat Effect) ---
            // Math.sin(tick) menciptakan gerakan naik turun yang halus
            let beat = 1 + Math.sin(tick) * 0.1; 
            
            let targetX = (canvas.width / 2) + (this.baseX * beat);
            let targetY = (canvas.height / 2) + (this.baseY * beat);

            // Gerakan halus kembali ke posisi detak
            this.x += (targetX - this.x) * 0.1;
            this.y += (targetY - this.y) * 0.1;
        }
    }
}

// Fungsi untuk membuat bentuk hati dari partikel
function init() {
    particles = [];
    const step = 0.02; // Semakin kecil angka ini, bintik semakin padat
    const r = 15;      // Skala ukuran hati

    for (let i = 0; i < Math.PI * 2; i += step) {
        // Rumus Parametrik Hati
        let tx = r * 16 * Math.pow(Math.sin(i), 3);
        let ty = -r * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));

        // Untuk mengisi bagian dalam, kita tarik garis dari pusat (0,0) ke tepi (tx,ty)
        // Kita juga bisa menambahkan variasi warna untuk efek "meriah"
        const colors = ['rgba(255, 0, 80, 0.8)', 'rgba(255, 100, 150, 0.7)', 'rgba(255, 200, 220, 0.6)'];
        for (let j = 0; j < 1; j += 0.2) { 
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(tx * j, ty * j, randomColor));
        }
    }
}

// Loop animasi utama
function animate() {
    // Memberikan efek trail yang lebih lembut dengan fillStyle transparan
    ctx.fillStyle = 'rgba(13, 10, 27, 0.1)'; // Warna background transparan
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    tick += 0.05; // Mengatur kecepatan detak jantung dan pergerakan partikel
    requestAnimationFrame(animate);
}

// Panggil fungsi inisialisasi dan animasi
init();
animate();

// Menangani perubahan ukuran layar (responsive)
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Inisialisasi ulang partikel agar menyesuaikan ukuran layar baru
});
