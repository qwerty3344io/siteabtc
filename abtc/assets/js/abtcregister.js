
  const openBtn = document.getElementById('openLoginModal');
const modal = document.getElementById('loginModal');
const backdrop = document.getElementById('loginModalBackdrop');
const closeBtn = document.getElementById('closeLoginModal');


openBtn.addEventListener('click', function () {
  modal.classList.add('active');
  backdrop.classList.add('active');
  setTimeout(() => {
    const inp = modal.querySelector('input');
    if (inp) inp.focus();
  }, 120);
});

closeBtn.addEventListener('click', function () {
  modal.classList.remove('active');
  backdrop.classList.remove('active');
});

backdrop.addEventListener('click', function () {
  modal.classList.remove('active');
  backdrop.classList.remove('active');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modal.classList.remove('active');
    backdrop.classList.remove('active');
  }
});

  function playVideo(thumbnail) {
    const wrapper = thumbnail.parentElement;
    const iframe = wrapper.querySelector('iframe');
    iframe.src = iframe.dataset.src;
    iframe.style.display = 'block';
    thumbnail.style.display = 'none';
  }
