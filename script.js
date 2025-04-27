// script.js – complete with Interactive Menu Filters

document.addEventListener('DOMContentLoaded', function() {
  // Tab navigation
  const tabButtons = document.querySelectorAll('.nav-tab');
  const pages = document.querySelectorAll('.page');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      tabButtons.forEach(btn => btn.classList.remove('active'));
      pages.forEach(page => page.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
      playRandomMemeSound();
    });
  });

  // Gallery modal handling
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalVideo = document.getElementById('modal-video');
  const closeModal = document.querySelector('.close-modal');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      modal.style.display = 'flex';
      if (item.querySelector('img')) {
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
        modalImg.src = item.querySelector('img').src;
      } else if (item.querySelector('video')) {
        modalImg.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = item.querySelector('video').src;
        modalVideo.play();
      }
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.pause();
  });

  // Theme switch toggling dark/light mode
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;

  themeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    themeSwitch.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
    playRandomMemeSound();
  });

  // Load all meme sounds
  const memeSounds = [
    ...Array.from({ length: 5 }, (_, i) => document.getElementById(`memeSound${i+1}`)),
    document.getElementById('soundLetMeKnow'),
    ...Array.from({ length: 7 }, (_, i) => document.getElementById(`sound${i+1}`))
  ];

  // Function to play a random meme sound
  function playRandomMemeSound() {
    if (memeSounds.some(s => !s.paused && !s.ended)) return;
    const pick = memeSounds[Math.floor(Math.random() * memeSounds.length)];
    pick.currentTime = 0;
    pick.play();
  }

  // Rickroll Easter egg on title click
  document.querySelector('h1').addEventListener('click', () => {
    const r = document.getElementById('rickroll');
    if (r.paused) { r.currentTime = 0; r.play(); }
    showMemeToast('You just got rickrolled!');
  });

  // Double-click to spawn falling memes
  document.addEventListener('dblclick', e => {
    const memes = ['😂','🤣','💀','👁️👄👁️','🗿','👌','🔥','😎','🤔','👀'];
    const emoji = memes[Math.floor(Math.random() * memes.length)];
    const el = document.createElement('div');
    el.textContent = emoji;
    el.className = 'falling-meme';
    el.style.left = `${e.pageX}px`;
    el.style.top = `${e.pageY}px`;
    el.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  });

  // Toast notification helper
  function showMemeToast(msg) {
    const toast = document.getElementById('meme-toast');
    toast.textContent = msg;
    toast.style.opacity = 1;
    setTimeout(() => toast.style.opacity = 0, 3000);
  }

  // Periodic random meme quotes
  const memeQuotes = [
    'One does not simply eat our food without making meme references',
    'Such flavor. Very wow. Much taste.',
    "It's dangerous to go alone, take this food!",
    'All your taste buds are belong to us',
    'Y U NO order more?!',
    "This isn't even my final form",
    'Shut up and take my money!',
    "That's what she said",
    "*chef's kiss* Perfectly balanced, as all things should be",
    "It's over 9000... calories"
  ];
  setInterval(() => showMemeToast(
    memeQuotes[Math.floor(Math.random() * memeQuotes.length)]
  ), 30000);

  // Order form → Discord webhook
  const orderForm = document.querySelector('.order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', async e => {
      e.preventDefault();
      const data = ['name','phone','pickup-time','order-items','special-requests']
        .reduce((o,id) => (o[id] = document.getElementById(id).value || 'None', o), {});
      const payload = {
        content: null,
        embeds: [{
          title: 'New disaster (order)',
          description: 'We got a new customer yipee',
          fields: [
            { name: 'Their name:', value: data['name'] },
            { name: 'Phone number:', value: data['phone'] },
            { name: 'Pickup time:', value: data['pickup-time'] },
            { name: 'Their order:', value: data['order-items'] },
            { name: 'Special Requests:', value: data['special-requests'] }
          ]
        }]
      };
      try {
        const res = await fetch(
          'https://discord.com/api/webhooks/1365802677031927818/2lcjTZqVJ8FqhBHjZhZlDbPRbnp7BnuTA419woenN1pwmtP5m0Xn-0R_R4r9wiroY6RP',
          { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) }
        );
        alert(res.ok ? 'Order received and sent to Discord!' : 'Failed to send order.');
      } catch (err) {
        console.error(err);
        alert('Error sending order.');
      }
      orderForm.reset();
    });
  }

  // Konami code epic mode
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx=0;
  document.addEventListener('keydown', e => {
    if (e.key === konami[idx]) { idx++; if (idx===konami.length) { cookKonami(); idx=0; } }
    else idx=0;
  });
  function cookKonami() {
    const r = document.getElementById('rickroll');
    if (r.paused) { r.currentTime=0; r.play(); }
    for (let i=0;i<100;i++) setTimeout(() => {
      const emo=['😂','🤣','💀','👁️👄👁️','🗿','👌','🔥','😎','🤔','👀'][Math.floor(Math.random()*10)];
      const d=document.createElement('div');
      d.textContent=emo; d.className='falling-meme';
      d.style.left=`${Math.random()*window.innerWidth}px`; d.style.top='0px';
      d.style.animationDuration=`${Math.random()*3+2}s`;
      document.body.appendChild(d);
      setTimeout(()=>d.remove(),5000);
    }, i*50);
    showMemeToast('KONAMI CODE ACTIVATED: Ultimate Meme Mode!');
  }

  // Interactive Menu Filters setup
  initFilters();

  function initFilters() {
    const menu = document.getElementById('menu');
    menu.querySelectorAll('.menu-section').forEach(sec => {
      const cat = sec.querySelector('h2').textContent.replace(/^\W+/,'').trim();
      sec.querySelectorAll('.menu-item').forEach(it => {
        it.dataset.category = cat;
        it.dataset.price = parseFloat(it.querySelector('.menu-item-price').textContent.replace(/[^0-9.]/g,''));
        it.dataset.bestseller = it.classList.contains('bestseller');
      });
    });
    document.getElementById('apply-filters').addEventListener('click', filterMenu);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    resetFilters();
  }

  function filterMenu() {
    const cats = Array.from(document.querySelectorAll('.filter-group.categories input:checked')).map(i=>i.value);
    const min= parseFloat(document.getElementById('min-price').value) || 0;
    const max= parseFloat(document.getElementById('max-price').value) || Infinity;
    document.querySelectorAll('#menu .menu-item').forEach(it => {
      const okCat = cats.includes(it.dataset.category) || (it.dataset.bestseller==='true' && cats.includes('El Morjene Couscous'));
      const pr = parseFloat(it.dataset.price);
      it.style.display = (okCat && pr>=min && pr<=max) ? '' : 'none';
    });
  }

  function resetFilters() {
    document.querySelectorAll('.filter-container input').forEach(i => {
      if(i.type==='checkbox') i.checked=true; else if(i.type==='number') i.value='';
    });
    filterMenu();
  }
});
