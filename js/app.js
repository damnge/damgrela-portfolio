/**
 * app.js — Damian Grela Photography
 * No jQuery. Vanilla JS only.
 *
 * 1. Loader hide
 * 2. Lazy loading via IntersectionObserver
 * 3. Gallery modal (build from gallery images, open/close, prev/next)
 * 4. Keyboard + touch navigation for modal
 */

/* =========================================================
   1. LOADER
   ========================================================= */

window.addEventListener('load', function () {
  var loader = document.getElementById('loader');
  if (!loader) return;
  loader.classList.add('is-hidden');
  setTimeout(function () {
    if (loader.parentNode) loader.parentNode.removeChild(loader);
  }, 700);
});

/* =========================================================
   2. LAZY LOADING
   ========================================================= */

var imgObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var img = entry.target;
    var src = img.getAttribute('data-src');
    if (!src) return;
    img.onload = function () { img.classList.add('is-visible'); };
    img.src = src;
    if (img.complete) img.classList.add('is-visible');
    observer.unobserve(img);
  });
}, { rootMargin: '200px' });

document.querySelectorAll('[data-src]').forEach(function (img) {
  imgObserver.observe(img);
});

/* =========================================================
   3. MODAL
   ========================================================= */

var modalImages  = [];
var currentIndex = 0;

var modal      = document.getElementById('modal');
var modalImg   = document.getElementById('modal-img');
var modalCount = document.getElementById('modal-count');

(function buildModal() {
  if (!modal) return;

  var figures = document.querySelectorAll('.gallery-grid figure');
  figures.forEach(function (fig, i) {
    var img = fig.querySelector('img');
    if (!img) return;

    modalImages.push({
      src:    img.getAttribute('data-src') || img.src,
      orient: img.getAttribute('data-orient') || 'landscape'
    });

    fig.addEventListener('click', function () { openModal(i); });
  });
}());

function openModal(index) {
  if (!modal) return;
  currentIndex = index;
  showModalImage(currentIndex);
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

var _modalTimer = null;

function showModalImage(index) {
  if (!modalImg || !modalImages.length) return;
  var item = modalImages[index];
  if (!item) return;

  /* Update counter immediately */
  if (modalCount) {
    modalCount.textContent = (index + 1) + ' / ' + modalImages.length;
  }

  /* Cancel any in-flight swap from a previous fast click */
  if (_modalTimer) { clearTimeout(_modalTimer); _modalTimer = null; }

  /* Swap src instantly (no fade) — just re-trigger the CSS fadeModal animation */
  modalImg.src       = item.src;
  modalImg.className = 'modal-img ' + item.orient;

  /* Force animation restart */
  modalImg.style.animation = 'none';
  void modalImg.offsetWidth;
  modalImg.style.animation = '';
}

function modalNext() {
  currentIndex = (currentIndex + 1) % modalImages.length;
  showModalImage(currentIndex);
}

function modalPrev() {
  currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
  showModalImage(currentIndex);
}

var btnClose = document.getElementById('modal-close');
var btnPrev  = document.getElementById('modal-prev');
var btnNext  = document.getElementById('modal-next');

if (btnClose) btnClose.addEventListener('click', closeModal);
if (btnPrev)  btnPrev.addEventListener('click', modalPrev);
if (btnNext)  btnNext.addEventListener('click', modalNext);

if (modal) {
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
}

/* =========================================================
   4. KEYBOARD + TOUCH
   ========================================================= */

document.addEventListener('keydown', function (e) {
  if (!modal || !modal.classList.contains('is-open')) return;
  if (e.key === 'ArrowLeft')  { e.preventDefault(); modalPrev(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); modalNext(); }
  if (e.key === 'Escape')     { closeModal(); }
});

var touchStartX = 0;

document.addEventListener('touchstart', function (e) {
  if (!modal || !modal.classList.contains('is-open')) return;
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function (e) {
  if (!modal || !modal.classList.contains('is-open')) return;
  var diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) < 50) return;
  diff > 0 ? modalNext() : modalPrev();
}, { passive: true });
