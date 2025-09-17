/* ABTC nav force-navigation patch */
(function(){
  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');
  var backdrop = document.getElementById('navBackdrop');
  if(!nav) return;

  function closeMenu(){
    nav.classList.remove('is-open');
    if(toggle){ toggle.classList.remove('active'); toggle.setAttribute('aria-expanded','false'); }
    if(backdrop){ backdrop.hidden = true; }
    try{ document.body.classList.remove('no-scroll'); }catch(_){}
  }

  // Ensure links navigate even if something intercepts the click
  var links = nav.querySelectorAll('a[href]');
  links.forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      if(!href || href === '#' || href.trim() === ''){ return; }
      e.preventDefault();         // stop any other handler from blocking
      closeMenu();
      setTimeout(function(){ window.location.href = href; }, 0);
    }, {passive:false});
  });

  // Safety: make sure menu stays above everything and clickable
  nav.style.pointerEvents = 'auto';
  links.forEach(function(a){ a.style.pointerEvents = 'auto'; a.style.position='relative'; a.style.zIndex='1'; });
})();

a.addEventListener('click', function(e){
  var href = a.getAttribute('href');
  if(!href || href === '#' || href.trim() === ''){ return; }
  e.preventDefault();
  closeMenu();
  var target = a.getAttribute('target');
  setTimeout(function(){
    if(target === '_blank'){
      window.open(href, '_blank');
    }else{
      window.location.href = href;
    }
  }, 0);
}, {passive:false});
