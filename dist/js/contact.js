// Send to whatsapp
const contactWA = document.querySelector('#contact-wa');

contactWA.addEventListener('click', function () {
  const text = 'Hello Ferdi, Im interested in your web development services. Could you share more details?';
  const noWa = '6282124298599';

  // Converts strings to url-safe format
  const encodedText = encodeURIComponent(text);

  // Url whatsapp
  const url = `https://wa.me/${noWa}?text=${encodedText}`;

  // Open whatsapp
  window.open(url, '_blank');
});
