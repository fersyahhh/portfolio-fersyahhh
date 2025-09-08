document.addEventListener('DOMContentLoaded', function () {
  const texts = ["I'm Ferdi Apriansyah", 'Web Developer', 'Informatics Engineering Student'];
  const element = document.querySelector('#typed-text');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    // render teks sesuai progress
    element.textContent = currentText.substring(0, charIndex);

    // atur kecepatan
    let speed = isDeleting ? 80 : 120;

    if (!isDeleting) {
      charIndex++;
      // kalau sudah full → delay lalu mulai hapus
      if (charIndex > currentText.length) {
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 1500);
        return;
      }
    } else {
      charIndex--;
      // kalau sudah kosong → ganti teks
      if (charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
        return;
      }
    }

    // Hide Cursor
    if (charIndex === 0) {
      cursor.style.display = 'none';
    } else {
      cursor.style.display = 'inline';
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
});
