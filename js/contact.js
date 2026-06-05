/**
 * contact.js — Contact + About pages
 * Handles: loader · async form submit · click-to-copy mailto
 */

$(window).on('load', function () { $('.loader').fadeOut('slow'); });

/* ---- Form submission (contact page only) ---- */
window.addEventListener('DOMContentLoaded', function () {
  var form   = document.getElementById('my-form');
  var status = document.getElementById('status');
  if (!form) return;

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!form.name.value.trim()) { alert('Please provide your name!'); form.name.focus(); return; }
    if (!isValidEmail(form.mail.value)) { alert('Please enter a valid e-mail!'); form.mail.focus(); return; }

    var data = new FormData(form);
    ajax(form.method, form.action, data,
      function () { form.reset(); showStatus('Thanks! I will write back!', 'correct'); },
      function () { showStatus('Oops! There was a problem.', 'wrong'); }
    );
  });

  function showStatus(msg, cls) {
    status.className = 'animate__animated animate__fadeIn ' + cls;
    status.innerHTML = msg;
  }
});

function isValidEmail(email) {
  var at = email.indexOf('@'), dot = email.lastIndexOf('.');
  return at > 0 && dot - at > 1;
}

function ajax(method, url, data, onOk, onErr) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    xhr.status === 200 ? onOk(xhr.response) : onErr(xhr.status, xhr.response);
  };
  xhr.send(data);
}

/* ---- Click-to-copy mailto ---- */
$(document).ready(function () {
  var COPY = 'Click to copy e-mail', COPIED = 'E-mail copied!';
  $('a[href^=mailto]').addClass('mailto-link').append('<span class="mailto-message">' + COPY + '</span>');

  $(document).on('click', '.mailto-link', function (e) {
    e.preventDefault();
    var email = $(this).attr('href').replace('mailto:', '');
    if (navigator.clipboard) { navigator.clipboard.writeText(email); }
    else { var d = document.createElement('input'); document.body.appendChild(d); d.value = email; d.select(); document.execCommand('copy'); document.body.removeChild(d); }
    $(this).find('.mailto-message').text(COPIED);
    var self = this;
    setTimeout(function () { $(self).find('.mailto-message').text(COPY); }, 2000);
  });
});
