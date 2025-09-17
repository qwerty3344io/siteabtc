
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
  

(() => {
  const img = document.querySelector('.zoom-img');
  if (!img) return;

  let scale = 1, tx = 0, ty = 0;
  let dragging = false, sx = 0, sy = 0;

  const apply = () => {
    // จำกัดไม่ให้ลากเกินขอบ (คำนวณจากขนาดที่ซูม)
    const w = img.clientWidth, h = img.clientHeight;
    const maxX = (w * (scale - 1)) / 2;
    const maxY = (h * (scale - 1)) / 2;
    tx = Math.max(-maxX, Math.min(maxX, tx));
    ty = Math.max(-maxY, Math.min(maxY, ty));
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  };

  // คลิกหนึ่งที = ซูม/ยกเลิกซูม
  img.addEventListener('click', (e) => {
    // อย่าทริกเกอร์ตอนกำลังลาก
    if (dragging) return;
    if (scale === 1) { scale = 1.8; tx = 0; ty = 0; }
    else { scale = 1; tx = 0; ty = 0; }
    img.classList.toggle('is-zoomed', scale !== 1);
    apply();
  });

  // ลากเพื่อแพน (ทั้งเมาส์และทัช ด้วย Pointer Events)
  img.addEventListener('pointerdown', (e) => {
    if (scale === 1) return;               // ยังไม่ซูม ไม่ต้องลาก
    img.setPointerCapture(e.pointerId);
    dragging = true;
    img.classList.add('dragging');
    sx = e.clientX - tx;
    sy = e.clientY - ty;
  });

  img.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    tx = e.clientX - sx;
    ty = e.clientY - sy;
    apply();
  });

  ['pointerup','pointercancel','pointerleave'].forEach(ev => {
    img.addEventListener(ev, () => {
      dragging = false;
      img.classList.remove('dragging');
    });
  });
})();

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

(() => {
  const $ = s => document.querySelector(s);
  const toggle = $('#navToggle');
  const nav    = $('#siteNav');
  const bg     = $('#navBackdrop');

  if (!toggle || !nav) return;

  const open  = () => {
    nav.classList.add('is-open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded','true');
    bg && (bg.hidden = false);
    document.body.classList.add('no-scroll');
  };
  const close = () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded','false');
    bg && (bg.hidden = true);
    document.body.classList.remove('no-scroll');
  };

  toggle.addEventListener('click', e => {
    e.stopPropagation();
    nav.classList.contains('is-open') ? close() : open();
  });
  bg && bg.addEventListener('pointerdown', close);

  // ✅ คลิกที่ลิงก์ในเมนูแล้วค่อยปิดเมนูตามหลัง (ไม่ preventDefault)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    setTimeout(close, 0);   // ปิดเมนูหลังคลิก เพื่อให้ browser นำทางแน่นอน
  }, { passive: true });

  // คลิกนอกเมนูปิด
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) close();
  });

  // Esc ปิด
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// ************
(function(){
  const $ = s => document.querySelector(s);
  const navToggle = $('#navToggle');     // ปุ่ม hamburger
  const siteNav   = $('#siteNav');       // เมนู <nav>
  const backdrop  = $('#navBackdrop');   // ฉากหลัง

  if(!navToggle || !siteNav){ 
    console.log('[ABTC NAV] not found', {navToggle, siteNav}); 
    return; 
  }

  const openMenu = () => {
    siteNav.classList.add('is-open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded','true');
    backdrop.hidden = false;
    document.body.classList.add('no-scroll'); // ล็อกสกรอลล์
  };

  const closeMenu = () => {
    siteNav.classList.remove('is-open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded','false');
    backdrop.hidden = true;
    document.body.classList.remove('no-scroll');
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    siteNav.classList.contains('is-open') ? closeMenu() : openMenu();
  };

  navToggle.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);

  // คลิกรอบๆ ให้ปิด
  document.addEventListener('click', (e)=>{
    if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
  });

  // กด Esc ให้ปิด
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMenu(); });
})();


