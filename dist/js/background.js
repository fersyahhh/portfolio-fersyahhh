class InteractiveParticles {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) {
      console.warn('Canvas #particles-canvas tidak ditemukan.');
      return;
    }
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };

    // Config
    this.repulsionRadius = 100;   // jarak dorong
    this.repulsionForce = 0.8;    // kekuatan dorong
    this.attractionRadius = 180;  // jarak tarik
    this.attractionForce = 0.05;  // kekuatan tarik

    this.init();
    this.animate();
    this.bindEvents();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    let numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 12000);
    numberOfParticles = Math.min(numberOfParticles, 150); // batas maksimal

    this.particles.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
      const p = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        originalX: 0,
        originalY: 0,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.3,              // 0.3–0.8
        color: `rgba(0,0,0,${Math.random() * 0.5 + 0.3})`,// hitam transparan
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
      p.originalX = p.x;
      p.originalY = p.y;
      this.particles.push(p);
    }
  }

  updateParticles() {
    this.particles.forEach((p) => {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const distance = Math.hypot(dx, dy);

      // Dorong (repulsion)
      if (distance < this.repulsionRadius) {
        const force = (this.repulsionRadius - distance) / this.repulsionRadius;
        const angle = Math.atan2(dy, dx);
        p.vx -= Math.cos(angle) * force * this.repulsionForce;
        p.vy -= Math.sin(angle) * force * this.repulsionForce;
      }

      // Tarik (attraction)
      if (distance < this.attractionRadius && distance > this.repulsionRadius) {
        const force = (this.attractionRadius - distance) / this.attractionRadius;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * this.attractionForce;
        p.vy += Math.sin(angle) * force * this.attractionForce;
      }

      // Kembali perlahan ke posisi awal
      const returnForce = 0.02;
      p.vx += (p.originalX - p.x) * returnForce;
      p.vy += (p.originalY - p.y) * returnForce;

      // Damping & update posisi
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.x += p.vx;
      p.y += p.vy;

      // Pulse opacity
      p.opacity = 0.3 + (0.4 * (1 + Math.sin(Date.now() * p.pulseSpeed))) / 2;
    });
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p) => {
      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // glow ringan
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.restore();
    });

    this.drawConnections();       // garis antar partikel
    this.drawMouseConnections();  // garis dari mouse ke partikel terdekat
  }

  drawConnections() {
    const maxDistance = 100;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < maxDistance) {
          const opacity = 1 - d / maxDistance;
          this.ctx.save();
          this.ctx.globalAlpha = opacity * 0.2;
          this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  drawMouseConnections() {
    const maxDistance = 150;
    this.particles.forEach((p) => {
      const d = Math.hypot(this.mouse.x - p.x, this.mouse.y - p.y);
      if (d < maxDistance) {
        this.ctx.save();
        this.ctx.globalAlpha = 1 - d / maxDistance;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouse.x, this.mouse.y);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
        this.ctx.restore();
      }
    });
  }

  animate() {
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      this.mouse.x = t.clientX;
      this.mouse.y = t.clientY;
    }, { passive: false });

    document.addEventListener('touchend', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveParticles();
});
