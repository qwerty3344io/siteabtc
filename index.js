
  const openBtn = document.getElementById('openLoginModal');
const modal = document.getElementById('loginModal');
const backdrop = document.getElementById('loginModalBackdrop');
const closeBtn = document.getElementById('closeLoginModal');

// เปิด Modal
openBtn.addEventListener('click', function () {
  modal.classList.add('active');
  backdrop.classList.add('active');
  setTimeout(() => {
    const inp = modal.querySelector('input');
    if (inp) inp.focus();
  }, 120);
});
// ปิด Modal (ปุ่ม X)
closeBtn.addEventListener('click', function () {
  modal.classList.remove('active');
  backdrop.classList.remove('active');
});
// ปิด Modal (คลิกข้างนอก)
backdrop.addEventListener('click', function () {
  modal.classList.remove('active');
  backdrop.classList.remove('active');
});
// ปิด Modal (กด ESC)
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

// Hamburger toggle
const navToggle = document.getElementById('navToggle');
const siteNav   = document.getElementById('siteNav');

if (navToggle && siteNav) {
  const closeMenu = () => {
    siteNav.classList.remove('is-open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', (e) => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    e.stopPropagation();
  });

  // คลิกนอกเมนูให้ปิด
  document.addEventListener('click', (e) => {
    const clickInsideNav = siteNav.contains(e.target);
    const clickToggle = navToggle.contains(e.target);
    if (!clickInsideNav && !clickToggle) closeMenu();
  });

  // กด Esc ให้ปิด
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Improve focus outline for keyboard users
try{document.body.addEventListener('keydown',e=>{if(e.key==='Tab'){document.documentElement.classList.add('using-keyboard');}})}catch{}
getComputedStyle(document.querySelector('.nav-toggle')).display
// ควรได้ "inline-flex" ในมือถือ