/* script.js – Hotell Bright */

// Hamburgermeny (mobilanpassning)
document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('hamburger');
  var navInner  = document.getElementById('nav-inner');

  if (hamburger && navInner) {
    hamburger.addEventListener('click', function () {
      var oppet = navInner.classList.toggle('oppet');
      hamburger.setAttribute('aria-expanded', oppet ? 'true' : 'false');

      // Animera hamburger-ikonens tre streck till ett X
      var strecken = hamburger.querySelectorAll('span');
      if (oppet) {
        strecken[0].style.transform = 'translateY(8px) rotate(45deg)';
        strecken[1].style.opacity   = '0';
        strecken[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        strecken[0].style.transform = '';
        strecken[1].style.opacity   = '';
        strecken[2].style.transform = '';
      }
    });
  }

  // Stäng menyn om man klickar utanför
  document.addEventListener('click', function (e) {
    if (navInner && navInner.classList.contains('oppet')) {
      if (!navInner.contains(e.target) && !hamburger.contains(e.target)) {
        navInner.classList.remove('oppet');
        hamburger.setAttribute('aria-expanded', 'false');
        var strecken = hamburger.querySelectorAll('span');
        strecken[0].style.transform = '';
        strecken[1].style.opacity   = '';
        strecken[2].style.transform = '';
      }
    }
  });

  // Bekräftelsemeddelande vid formulärinlämning
  var formuler = document.querySelectorAll('.formular');
  formuler.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Ta bort eventuellt tidigare meddelande
      var gammalt = form.querySelector('.bekraftelse');
      if (gammalt) gammalt.remove();

      // Skapa bekräftelsemeddelandets element
      var meddelande = document.createElement('p');
      meddelande.className = 'bekraftelse';
      meddelande.textContent = 'Tack för att du kontaktade oss – vi återkommer strax!';

      // Lägg till under knappen
      form.appendChild(meddelande);

      // Rulla ner så meddelandet syns
      meddelande.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // Bildspel (slideshow) på startsidan
  var bilder = document.querySelectorAll('.slideshow-bild');
  if (bilder.length > 0) {
    var aktuell = 0;

    function visaBild(index) {
      bilder.forEach(function (bild, i) {
        bild.classList.toggle('aktiv-bild', i === index);
      });
    }

    function nasta() {
      aktuell = (aktuell + 1) % bilder.length;
      visaBild(aktuell);
    }

    visaBild(aktuell);
    setInterval(nasta, 3500);
  }
});
