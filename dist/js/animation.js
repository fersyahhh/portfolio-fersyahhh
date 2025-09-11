// Typed Text
document.addEventListener('DOMContentLoaded', function () {
  const texts = ["I'm Ferdi Apriansyah", 'Front End Developer'];
  const element = document.querySelector('#typed-text');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    // Rendering texts
    element.textContent = currentText.substring(0, charIndex);

    // Set the speed when letters are typed/remove
    let speed;
    if (isDeleting) {
      speed = 80;
    } else {
      speed = 120;
    }

    if (!isDeleting) {
      charIndex++;
      // Delete when charIndex is full
      if (charIndex > currentText.length) {
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 1500);
        return;
      }
    }

    if (isDeleting) {
      charIndex--;
      // If charIndex is empty, replace texts
      if (charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
        return;
      }
    }

    // Hide Cursor
    const cursor = document.querySelector('#cursor');
    if (charIndex === 0) {
      cursor.style.display = 'none';
    } else {
      cursor.style.display = 'inline';
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
});

// Animation Section
const observers = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('reavel-bottom')) {
          entry.target.classList.add('reavel-bt-show');
        }
        if (entry.target.classList.contains('reavel-left')) {
          entry.target.classList.add('reavel-l-show');
        }
        if (entry.target.classList.contains('reavel-top')) {
          entry.target.classList.add('reavel-tp-show');
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reavel-bottom, .reavel-left, .reavel-top').forEach((el) => observers.observe(el));
