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

  // กดลิงก์ในเมนู ให้ปิดเมนู (แต่ไม่ block การเปลี่ยนหน้า)
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e){
      closeMenu();
      // ไม่ต้อง preventDefault!
    });
  });

  // คลิกรอบๆ ให้ปิด
  document.addEventListener('click', (e)=>{
    if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
  });

  // กด Esc ให้ปิด
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMenu(); });
})();