/**
 * nav.js — Damian Grela Photography
 * No jQuery. No icon CDN — SVGs inline.
 * Logo: Commissioner font, text only, same size on all pages.
 */
(function () {

  var raw  = window.location.pathname.split('/').pop();
  var page = raw.replace(/\.html$/, '') || 'index';

  function active(id) { return page === id ? ' active' : ''; }

  /* ── SVG icons — minimal stroke style, no fill ── */
  var svgInsta =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>' +
    '<circle cx="12" cy="12" r="4"/>' +
    '<circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>' +
    '</svg>';

  var svgLinkedin =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="2" y="2" width="20" height="20" rx="3"/>' +
    '<line x1="8" y1="11" x2="8" y2="16"/>' +
    '<line x1="8" y1="8" x2="8" y2="8.5"/>' +
    '<path d="M12 16v-5"/>' +
    '<path d="M12 11c0-1 1-2 2.5-2S17 10 17 11.5V16"/>' +
    '</svg>';

  var svgDribbble =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="12" cy="12" r="10"/>' +
    '<path d="M6.5 5.5c2 3 3.5 6 4 10"/>' +
    '<path d="M17.5 5.5c-3 2-6.5 3-10.5 3"/>' +
    '<path d="M20 13c-3 0-6.5.5-9 3"/>' +
    '</svg>';

  var socialHTML =
    '<div class="sidebar-social">' +
      '<a href="https://www.instagram.com/damgrela/" target="_blank" rel="noopener" aria-label="Instagram">' + svgInsta + '</a>' +
      '<a href="https://www.linkedin.com/in/damian-grela-2405a31b8/" target="_blank" rel="noopener" aria-label="LinkedIn">' + svgLinkedin + '</a>' +
      '<a href="https://www.damng.com" target="_blank" rel="noopener" aria-label="Dribbble">' + svgDribbble + '</a>' +
    '</div>';

  var workPages = ['street','iceland','australia','ukraine','reportage'];
  var subIsOpen = workPages.indexOf(page) !== -1;

  /* ── Desktop sidebar ── */
  var sidebar =
    '<nav class="sidebar" id="sidebar">' +

      '<a class="sidebar-logo" href="index.html">' +
        '<img src="public/damlogo.svg" alt="Damian Grela">' +
      '</a>' +

      /* Nav links — all at same level, evenly spaced */
      '<div class="nav-links">' +

        /* Work toggle + submenu */
        '<div class="nav-group">' +
          '<span class="nav-label' + (subIsOpen ? ' is-open' : '') + '" id="work-toggle">' +
            'Work <em class="nav-arrow">›</em>' +
          '</span>' +
          '<div class="nav-sub' + (subIsOpen ? ' is-open' : '') + '" id="work-sub">' +
            '<a href="street.html" class="' + active('street') + '">Street</a>' +
            '<a href="iceland.html" class="' + active('iceland') + '">Iceland</a>' +
            '<a href="australia.html" class="' + active('australia') + '">Australia</a>' +
            '<a href="ukraine.html" class="' + active('ukraine') + '">Ukraine</a>' +
            '<a href="reportage.html" class="' + active('reportage') + '">Reportage</a>' +
          '</div>' +
        '</div>' +

        '<a class="nav-link' + active('about') + '" href="about.html">About</a>' +
        '<a class="nav-link' + active('contact') + '" href="contact.html">Contact</a>' +

      '</div>' +

      socialHTML +
    '</nav>';

  /* ── Mobile navbar ── */
  var mobileSocial =
    '<div class="mobile-social">' +
      '<a href="https://www.instagram.com/damgrela/" target="_blank" rel="noopener" aria-label="Instagram">' + svgInsta + '</a>' +
      '<a href="https://www.linkedin.com/in/damian-grela-2405a31b8/" target="_blank" rel="noopener" aria-label="LinkedIn">' + svgLinkedin + '</a>' +
      '<a href="https://www.damng.com" target="_blank" rel="noopener" aria-label="Dribbble">' + svgDribbble + '</a>' +
    '</div>';

  var mobileNav =
    '<nav class="mobile-nav" id="mobile-nav">' +
      '<a class="mobile-logo" href="index.html"><img src="public/damlogo.svg" alt="Damian Grela"></a>' +
      '<button class="burger" id="burger" aria-label="Menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>' +
    '<div class="mobile-menu" id="mobile-menu">' +
      '<span class="m-toggle" id="m-work-toggle">Work <em class="m-chevron">›</em></span>' +
      '<div class="mobile-sub" id="m-work-sub">' +
        '<div class="mobile-sub-inner">' +
          '<a href="street.html" class="' + active('street') + '">Street</a>' +
          '<a href="iceland.html" class="' + active('iceland') + '">Iceland</a>' +
          '<a href="australia.html" class="' + active('australia') + '">Australia</a>' +
          '<a href="ukraine.html" class="' + active('ukraine') + '">Ukraine</a>' +
          '<a href="reportage.html" class="' + active('reportage') + '">Reportage</a>' +
        '</div>' +
      '</div>' +
      '<a href="about.html" class="' + active('about') + '">About</a>' +
      '<a href="contact.html" class="' + active('contact') + '">Contact</a>' +
      mobileSocial +
    '</div>';

  document.write(sidebar + mobileNav);

  /* ── Page transitions — fade out before navigating ── */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || link.target === '_blank') return;
    e.preventDefault();
    document.body.classList.add('is-leaving');
    setTimeout(function () { window.location.href = href; }, 380);
  });

  /* ── Interactions ── */
  document.addEventListener('DOMContentLoaded', function () {

    var workToggle = document.getElementById('work-toggle');
    var workSub    = document.getElementById('work-sub');
    if (workToggle && workSub) {
      workToggle.addEventListener('click', function () {
        workToggle.classList.toggle('is-open');
        workSub.classList.toggle('is-open');
      });
    }

    var burger     = document.getElementById('burger');
    var mobileMenu = document.getElementById('mobile-menu');
    var mWorkTog   = document.getElementById('m-work-toggle');
    var mWorkSub   = document.getElementById('m-work-sub');

    if (burger && mobileMenu) {
      burger.addEventListener('click', function () {
        burger.classList.toggle('is-open');
        mobileMenu.classList.toggle('is-open');
      });
    }

    if (mWorkTog && mWorkSub) {
      mWorkTog.addEventListener('click', function () {
        mWorkSub.classList.toggle('is-open');
        mWorkTog.classList.toggle('is-open');
      });
    }

    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          if (burger)     burger.classList.remove('is-open');
          if (mobileMenu) mobileMenu.classList.remove('is-open');
        });
      });
    }

  });

}());
