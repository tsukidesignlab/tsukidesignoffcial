// TSUKI DESIGN LAB — shared interactions, no third-party dependencies.
(() => {
  const root=document.documentElement;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced)root.classList.add('animate-ready');
  const menuButton=document.querySelector('[data-menu-toggle]');
  const mobilePanel=document.querySelector('[data-mobile-panel]');
  if(menuButton && mobilePanel){
    function setMenu(open){mobilePanel.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'關閉選單':'開啟選單');document.body.classList.toggle('menu-open',open)}
    menuButton.addEventListener('click',()=>setMenu(!mobilePanel.classList.contains('open')));
    mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  }
  let scrollPending=false;
  function onScroll(){
    if(scrollPending)return;scrollPending=true;
    requestAnimationFrame(()=>{const height=Math.max(1,document.documentElement.scrollHeight-innerHeight);root.style.setProperty('--read-progress',(100*scrollY/height).toFixed(2)+'%');scrollPending=false});
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  const revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduced){
    const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');revealObserver.unobserve(entry.target)}})},{threshold:.09});
    revealEls.forEach(el=>revealObserver.observe(el));
  } else revealEls.forEach(el=>el.classList.add('in'));
  // Filter project archive; content is already rendered as HTML for search engines and no-JS resilience.
  const filterBtns=[...document.querySelectorAll('[data-filter]')];
  const tiles=[...document.querySelectorAll('[data-category]')];
  filterBtns.forEach(b=>b.addEventListener('click',()=>{
    const selected=b.dataset.filter;
    filterBtns.forEach(button=>{button.classList.toggle('active',button===b);button.setAttribute('aria-pressed',String(button===b))});
    tiles.forEach(t=>{t.hidden=selected!=='全部'&&t.dataset.category!==selected});
  }));
  // Dynamic stage number for scroll storytelling.
  const storyNo=document.querySelector('[data-story-number]');
  if(storyNo && 'IntersectionObserver' in window){
    const sObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)storyNo.textContent=e.target.dataset.stage||'01'}),{threshold:.55});
    document.querySelectorAll('[data-stage]').forEach(x=>sObs.observe(x));
  }
  // Pointer effect, desktop only.
  if(!reduced && window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    const cursor=document.querySelector('.cursor');
    if(cursor){
      let tx=-100,ty=-100,cx=-100,cy=-100,active=false;
      document.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;active=true;cursor.classList.add('visible')},{passive:true});
      document.addEventListener('pointerleave',()=>cursor.classList.remove('visible'));
      document.querySelectorAll('a,button').forEach(el=>{
        el.addEventListener('mouseenter',()=>cursor.classList.add('hovering'));
        el.addEventListener('mouseleave',()=>cursor.classList.remove('hovering'));
      });
      const follow=()=>{cx+=(tx-cx)*.22;cy+=(ty-cy)*.22;cursor.style.transform=`translate(${cx-10}px,${cy-10}px)`;requestAnimationFrame(follow)};
      requestAnimationFrame(follow);
    }
    // Subtle parallax on homepage only
    const heroArt=document.querySelector('[data-parallax]');
    if(heroArt)heroArt.addEventListener('pointermove',e=>{
      const r=heroArt.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/r.width;const y=(e.clientY-r.top-r.height/2)/r.height;
      heroArt.style.setProperty('--px',`${(x*10).toFixed(1)}px`);heroArt.style.setProperty('--py',`${(y*8).toFixed(1)}px`);
    },{passive:true});
  }
  // Page change curtain only for internal same-tab links, never for download, hash, modified click or external.
  const curtain=document.querySelector('.transition-curtain');
  if(curtain&&!reduced){
    document.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',e=>{
      const href=a.getAttribute('href')||'';
      if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||a.target==='_blank'||a.hasAttribute('download')||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;
      let to;
      try{to=new URL(href,location.href)}catch{return}
      if(to.origin!==location.origin||to.pathname===location.pathname && to.hash)return;
      e.preventDefault();curtain.classList.remove('play');void curtain.offsetWidth;curtain.classList.add('play');
      setTimeout(()=>location.assign(to.href),310);
    }));
  }
  addEventListener('pageshow',()=>curtain?.classList.remove('play'));
})();
