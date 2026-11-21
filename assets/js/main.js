/* Nish Kapoor — site interactions */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- DATA ---------------- */
  // Instagram moments — every post from the folder, captions in Nish's voice
  const POSTS = [
    {id:14, cat:'honours', f:1, t:'National Top 2%, 2025', cap:"Homes start with trust. Grateful for yours! 🙏\nNational Top 2%, 2025, celebrated alongside an incredible Royal LePage family.", tags:'#top2percent #royallepage #grateful'},
    {id:2, cat:'closings', t:'First-time homeowners', cap:"🏡 A little extra to be thankful for this Thanksgiving weekend! 🍁\nSo happy to help good friends become proud first-time homeowners! ❤️ Grateful for their trust and excited for this new chapter.\nMore than selling homes, it's about building lasting relationships! 🔑", tags:'#justclosed #firsttimehomebuyers #ottawalife'},
    {id:1, cat:'life', round:1, t:'The face behind Team NK', cap:"The face behind Team NK. Helping families buy & sell smarter, one handshake at a time. 🤝", tags:'#ottawarealtor #teamnk'},
    {id:20, cat:'honours', t:'The Diamond Award', cap:"The Royal LePage Diamond Award. 💎 Roses, a red carpet and a whole lot of gratitude.", tags:'#diamondaward #royallepage'},
    {id:42, cat:'closings', video:1, t:'A sold story, told by her', cap:"SOLD! 🥂 Hear it straight from my client: the nerves, the journey and the celebration on the front steps. Moments like these make everything worthwhile.", tags:'#justsold #clientstory #ottawarealestate'},
    {id:43, cat:'closings', t:'Mabrook! Her first home', cap:"Mabrook! Helping a friend buy her first 🇨🇦 home feels extra special. SOLD, with smiles! 🏡", tags:'#firsthome #newbeginnings #ottawarealtor'},
    {id:33, cat:'honours', t:'Top 100, again?!', cap:"Top 100 Realtor, again?! Y'all really won't let me rest & I love it! 💪", tags:'#top100 #makingmoves'},
    {id:4, cat:'closings', video:1, t:'A SOLD story worth celebrating', cap:"A SOLD Story Worth Celebrating 🥂🏡\nBehind every successful sale is trust, teamwork, and a client who believes in the journey. Seeing her this happy made every step worthwhile. Cheers to a well-deserved result and an exciting new chapter!", tags:'#SOLD #HappyClient #OttawaRealEstate'},
    {id:40, cat:'honours', video:1, f:1, t:'Awards night', cap:"Awards night with the Royal LePage family. ✨ Red lights, roses and a room full of people who make this city better. This recognition belongs to the journey we've built together.", tags:'#awardsnight #royallepage #grateful'},
    {id:41, cat:'closings', t:'Trust, patience & belief', cap:"🔑 Behind this sold sign is trust, patience and belief. Truly honoured. Best wishes on your new beginning! 🎄", tags:'#sold #newbeginnings #ottawahomes'},
    {id:5, cat:'life', t:'Raise a glass', cap:"Behind every opened door is a story worth raising a glass to. 🥂\nGrateful to help people open the right doors and begin exciting new chapters.", tags:'#NewBeginnings #ottawahomes'},
    {id:35, cat:'honours', t:'Thanks to you', cap:"This milestone is thanks to the amazing people who believed in me. ❤️ Diamond Award, Royal LePage.", tags:'#diamondaward #thankful'},
    {id:39, cat:'seminars', video:1, t:'First-home tips', cap:"If you're planning to buy your first home, watch this. 👇 This is where most people get stuck, and how to get unstuck. Questions? DM me anytime.", tags:'#firsttimehomebuyer #hometips #ottawarealestate'},
    {id:6, cat:'closings', video:1, t:'Closed: 6-bed bungalow', cap:"CLOSED ✅ 6 bed, 3 bath raised bungalow.\nThere's something special about watching my clients move forward into a new chapter. Moments like these make everything worthwhile. ❤️🏡", tags:'#Grateful #HappyClients #NewChapter'},
    {id:19, cat:'honours', t:'Congratulations, Top 100', cap:"Congratulations Top 100! 🏆 Grateful to every client who trusted me with their biggest move.", tags:'#top100 #royallepageteamrealty'},
    {id:7, cat:'closings', t:'Joy, simply', cap:"Joy is learned best from children; they simply know how to be. ☀️🤍\nSome moments remind you that happiness is never complicated. Grateful to be part of stories that begin with smiles.", tags:'#joyinthejourney #newbeginnings #ottawarealtor'},
    {id:3, cat:'community', video:1, t:'Diwali with 613 Events', cap:"✨ Supporting 613 Events in bringing top-quality cultural experiences to the city 🪔🎉\nDiwali is about bringing people together, celebrating our culture, strengthening community and building real connections.", tags:'#ottawa #613events #diwali'},
    {id:15, cat:'honours', f:1, t:'The night we celebrated', cap:"Still smiling about that night 🤍✨\nWe came together to celebrate a real estate milestone, but the best part was you guys. These memories mean more to me than any award ever could.", tags:'#MilestoneMoments #CommunityMatters'},
    {id:9, cat:'seminars', video:1, t:'Seminar night set-up', cap:"Setting up for our First-Time Home Buyer Seminar. Buy Smart · Sell Strong · Invest Wisely, with Team NK. 🏡", tags:'#FirstTimeHomeBuyer #RealEstateEducation'},
    {id:22, cat:'honours', t:'Consistency & trust', cap:"Congratulations! 🏆\nThey say consistency is key. I say it's your trust that keeps the deals closing!", tags:'#top100 #consistency'},
    {id:10, cat:'community', t:'Thank you, Brazily', cap:"Thank you, Brazily Fitness, for welcoming me and trusting me to support your amazing community.\nI'm always here whether you're thinking of buying, selling, or just need real estate advice. Let's grow together. 🏡💛", tags:'#OttawaRealEstate #ThankYou'},
    {id:16, cat:'life', video:1, t:'Hello from Nish', cap:"Hello, this is Nish Kapoor! 👋 A quick hello, and an open invitation: if real estate is in your plans, let's talk your goals.", tags:'#ottawarealtor #letsconnect'},
    {id:17, cat:'honours', t:'Top 100 in lights', cap:"TOP 100 in lights. ✨ Some nights you just have to soak it in.", tags:'#top100 #royallepage'},
    {id:11, cat:'seminars', video:1, t:'First-Time Buyer Seminar', cap:"Grateful for everyone who joined our First-Time Home Buyer Seminar. 🙏\nDown payments, hidden costs, smart buying strategies, and how to position yourself in today's market. Looking forward to helping more people move from renting to owning.", tags:'#HomeBuyingTips #OttawaHomes'},
    {id:18, cat:'closings', t:'5 years of Ottawa homes', cap:"Cheers to 5 years of helping people call Ottawa home & the journey only grows 🌎🏡\nComing soon to REALTOR.ca!", tags:'#comingsoon #ottawarealestate'},
    {id:29, cat:'honours', t:'A milestone cake', cap:"This milestone needed a pause, a moment to stop and say thank you. 🎂\nWhat means the most isn't the award, it's the people who made it possible.", tags:'#celebrationcake #milestone #blessed'},
    {id:12, cat:'closings', video:1, t:'Keys & bubbly', cap:"Keys in hand, bubbly in the air! 🍾🔑\nFrom the first conversation to the keys in hand. Watching my clients trust the process and show up every step is why I love what I do.\nIf you know someone starting their own journey, send them my way.", tags:'#keysinhand #firsthome #homejourney'},
    {id:21, cat:'life', t:'Proud to call Ottawa home', cap:"This city. These people. Proud to call Ottawa home and to help others do the same. 🇨🇦", tags:'#ottawa #ottawalife'},
    {id:13, cat:'seminars', t:'Buy Smart. Sell Strong.', cap:"Buy Smart. Sell Strong. Invest Wisely. That's the Team NK way. Knowledge first, always. 📚🏡", tags:'#ottawarealestate #teamnk'},
    {id:34, cat:'honours', video:1, t:'Roses & recognition', cap:"Awards night. 🌹 This recognition belongs to the journey we've built together.", tags:'#achievements #realtorlifestyle'},
    {id:25, cat:'closings', t:'Another SOLD', cap:"SOLD! ✅ Another happy chapter starts here. Thinking of making your move? I'm here to help.", tags:'#justsold #ottawarealestate'},
    {id:37, cat:'community', t:'Pravasi Bharatiya Divas', cap:"Honoured to attend the 18th Pravasi Bharatiya Divas, celebrating the global Indian community. 🇮🇳🇨🇦", tags:'#pravasibharatiyadivas #community'},
    {id:26, cat:'honours', t:'Top 100 Realtor', cap:"Congratulations to me & a huge thank you to you. 🏆 Top 100, Royal LePage Team Realty.", tags:'#top100 #gratitude'},
    {id:8, cat:'life', t:"Summer won't wait", cap:"A reminder for all my hustlers: summer won't wait, make time for you too ☀️\nHustle hard, but don't forget to live a little this summer.", tags:'#canadiansummer #workhardlivewell'},
    {id:30, cat:'community', t:'Because of people like you', cap:"Homes happen because of people like you. 🏡💛", tags:'#clientlove #communityfirst'},
    {id:28, cat:'community', t:'Good people, good vibes', cap:"Good people, good vibes, heart-shaped glasses. ❤️😎", tags:'#goodvibesonly #celebratetogether'},
    {id:31, cat:'community', t:'On the dance floor', cap:"The laughs, the hugs, the dancing, the conversations. That's what made the night special. 💃🕺", tags:'#partyvibes #GratefulHeart'},
    {id:24, cat:'life', t:'Happy Canada Day', cap:"Red, white and grateful. Happy Canada Day! 🇨🇦🍁", tags:'#canadaday #proudcanadian'},
    {id:32, cat:'community', t:'Dressed up & grateful', cap:"Dressed up and grateful. Thank you for showing up and supporting my journey. 🖤", tags:'#TeamNishKapoor #celebratetogether'},
    {id:36, cat:'life', t:'Joyful New Year', cap:"Joyful New Year 2025! ✨ Dreams grow with time. 2025 will be your year. Let me know how I can help.", tags:'#newyear #ottawarealtor'},
    {id:23, cat:'life', t:'Ho ho home', cap:"Ho ho home! 🎅 Festive season at Royal LePage Team Realty.", tags:'#holidays #royallepage'},
    {id:27, cat:'life', t:'Make your future beautiful', cap:"Make your future so beautiful, even the past wishes it stayed. 🙏", tags:'#mindset #dreambigger'},
    {id:38, cat:'life', t:'The scenic route', cap:"Take the scenic route to success and happiness. 🛵🇮🇹", tags:'#wanderlust #worklifebalance'},
  ];
  const REELS = [
    {id:42, k:'Client story', t:'"It was terrifying." Then it was SOLD.'},
    {id:4, k:'Just sold', t:'A SOLD story worth celebrating'},
    {id:39, k:'Buyer tips', t:'Planning your first home? Watch this'},
    {id:12, k:'Keys day', t:'Keys in hand, bubbly in the air'},
    {id:40, k:'Awards night', t:'A night with the Royal LePage family'},
    {id:6, k:'Closed', t:'6-bed raised bungalow, done'},
    {id:16, k:'Say hello', t:'Meet Nish in 50 seconds'},
  ];
  const CATS = [['all','All moments'],['closings','Closings'],['honours','Honours'],['community','Community'],['seminars','Seminars'],['life','Life']];

  const TESTIS = [
    {q:"If you want a smooth home buying experience, Nish is your guy!!! Transparency is key for me, especially since it was my first time home buying, and Nish provided just that. Any questions I had (and I had a lot!) he was never hesitant to answer; he became my source of truth. He even followed up a month after closing, just to make sure everything was going well!", n:"Sudikshya Karmacharya", d:"First-time buyer · Local Guide", s:"Google"},
    {q:"Nish made himself available 24/7 to help in the search for our home. Arranging for visits as quickly as we requested them, sometimes only hours after a listing went live. He also provided excellent advice in staging our house, ensuring we received top dollar.", n:"Shahrukh Alavi", d:"Bought & sold · Ottawa", s:"Google"},
    {q:"Nish is a really good agent, friendly and professional at the same time. He got the deal within my budget for a freehold when the market was at its peak. The best part of him is he understands what the client is really looking for first and then works accordingly.", n:"Hemant Gupta", d:"Home purchase · Nepean", s:"Google"},
    {q:"Nish really helped us a lot, selling our townhome and buying a single home. He negotiated a very reasonable price on both, and the staging he arranged brought visitors every day until it sold on offer day. I strongly recommend him in my friend circle.", n:"Gayathiri Mathiyalagan", d:"Sold & bought · Nepean", s:"Google"},
    {q:"One of the best out there! Worked with Nish on a condo purchase. Very professional and helpful. Even after the deal was closed, Nish was responsive to all my questions. Had a great experience.", n:"Shivang Sharma", d:"Condo purchase", s:"Google"},
    {q:"Nish is meticulous, knowledgeable, patient and never oversells a deal. We would highly recommend him.", n:"Ritu", d:"Home purchase · Nepean", s:"Rate-My-Agent"},
    {q:"Great guy, very professional and respectful. He really cares about his clients and the community!", n:"James Splinter", d:"Local Guide", s:"Google"},
    {q:"Nish is a stellar realtor. He got us a house in a very competitive market. The entire process was a breeze and never felt stressful. I can not recommend Nish enough.", n:"Anmol", d:"Townhome purchase · Nepean", s:"Rate-My-Agent"},
    {q:"The honest Realtor in Ottawa town, with a lot of knowledge.", n:"Priya Puri", d:"Local Guide", s:"Google"},
    {q:"Very knowledgeable with a quick response time. He has great negotiation skills and thorough knowledge about the neighbourhood. He educated us throughout the process, which resulted in a stress-free experience.", n:"Nick", d:"Townhome purchase · Ottawa", s:"Rate-My-Agent"},
    {q:"Had an amazing experience doing business with him! Great service! He is the best. 👍", n:"Pragati Narang", d:"Local Guide", s:"Google"},
    {q:"My brother and I were looking for a rental in the area. Nish was kind enough to take us on as clients. His professionalism was outstanding and he is a very pleasant agent! If I buy, Nish, you're the guy!", n:"Lorna Schmidtke", d:"Rental search · Ottawa", s:"Google"},
  ];

  /* ---------------- helpers ---------------- */
  const pad = n => String(n).padStart(2, '0');
  const money = n => '$' + Math.round(n).toLocaleString('en-CA');

  /* ---------------- seals ---------------- */
  let sealN = 0;
  $$('[data-seal]').forEach(el => {
    const [top, big, ring] = el.dataset.seal.split('|');
    const id = 'sg' + (++sealN);
    const L = [...big].length;
    const bigSize = L <= 2 ? 34 : L === 3 ? 28 : L === 4 ? 21 : 13;
    el.innerHTML = `<svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe7b0"/><stop offset=".45" stop-color="#e3b65c"/><stop offset="1" stop-color="#a87526"/></linearGradient>
        <path id="${id}p" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/>
      </defs>
      <g class="seal-spin" style="transform-origin:60px 60px">
        ${Array.from({length:36},(_,i)=>`<circle cx="${60+57*Math.cos(i*Math.PI/18)}" cy="${60+57*Math.sin(i*Math.PI/18)}" r="2.6" fill="url(#${id})"/>`).join('')}
      </g>
      <circle cx="60" cy="60" r="53" fill="url(#${id})"/>
      <circle cx="60" cy="60" r="49" fill="none" stroke="#7a521a" stroke-width=".8" opacity=".6"/>
      <circle cx="60" cy="60" r="33" fill="#1a0e26"/>
      <circle cx="60" cy="60" r="30" fill="none" stroke="url(#${id})" stroke-width=".8"/>
      <text font-family="Manrope,sans-serif" font-size="7.2" font-weight="800" letter-spacing="1.6" fill="#3a2508"><textPath href="#${id}p">${ring}${ring}</textPath></text>
      <text x="60" y="${bigSize > 26 ? 52 : 54}" text-anchor="middle" font-family="Manrope,sans-serif" font-size="7" font-weight="800" letter-spacing="1.5" fill="#f7dfa0">${top}</text>
      <text x="60" y="${bigSize > 26 ? 78 : bigSize > 16 ? 73 : 70}" text-anchor="middle" font-family="Fraunces,serif" font-size="${bigSize}" fill="url(#${id})">${big}</text>
    </svg>`;
  });

  /* ---------------- split text ---------------- */
  function splitWords(root) {
    const walk = node => {
      [...node.childNodes].forEach(ch => {
        if (ch.nodeType === 3) {
          const parts = ch.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.textContent = p;
            w.appendChild(i); frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1) walk(ch);
      });
    };
    walk(root);
    // move gradient text classes onto inner word spans (background-clip needs the text node's box)
    $$('.gold-text, .vibe-text', root).forEach(g => {
      const cls = g.classList.contains('gold-text') ? 'gold-text' : 'vibe-text';
      g.classList.remove(cls);
      $$('.w > span', g).forEach(s => s.classList.add(cls));
    });
  }

  /* ---------------- moments wall ---------------- */
  const wall = $('#wall');
  const filters = $('.filters');
  if (wall) {
    CATS.forEach(([k, label], i) => {
      const b = document.createElement('button');
      const count = k === 'all' ? POSTS.length : POSTS.filter(p => p.cat === k).length;
      b.innerHTML = `${label}<sup>${count}</sup>`; b.dataset.f = k;
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      if (i === 0) b.classList.add('on');
      filters.appendChild(b);
    });
    const catLabel = Object.fromEntries(CATS);
    POSTS.forEach((p, idx) => {
      const t = document.createElement('div');
      t.className = 'frame' + (p.f ? ' feature' : ''); t.tabIndex = 0; t.setAttribute('role', 'button');
      t.dataset.cat = p.cat; t.dataset.idx = idx; t.dataset.cursor = 'view'; t.dataset.cursorLabel = p.video ? 'PLAY' : 'VIEW';
      t.setAttribute('aria-label', (p.video ? 'Video: ' : 'Photo: ') + p.t);
      const media = p.video
        ? `<video src="assets/video/${p.id}-preview.mp4" poster="assets/video/${p.id}.jpg" muted loop playsinline preload="none" class="autoplay-inview"></video><span class="vbadge"><svg><use href="#i-play"/></svg></span>`
        : p.round ? `<img class="round" src="assets/img/1-round.png" alt="" loading="lazy">`
        : `<img src="assets/img/${p.id}.jpg" alt="" loading="lazy">`;
      t.innerHTML = `<div class="frame-in"><div class="frame-mat">${media}</div></div><div class="plaque"><small>${catLabel[p.cat]}</small><b>${p.t}</b></div>`;
      wall.appendChild(t);
    });
    filters.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', filters).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      const f = b.dataset.f;
      $$('.frame', wall).forEach((t, i) => {
        const show = f === 'all' || t.dataset.cat === f;
        t.classList.toggle('hidden', !show);
        t.classList.remove('pop');
        if (show) { void t.offsetWidth; t.style.animationDelay = (Math.min(i, 12) * 0.03) + 's'; t.classList.add('pop'); }
      });
      expanded = false; cap();
    });
    // cap the wall so it never becomes an endless scroll
    let expanded = false;
    const gMore = $('#gMore');
    const cap = () => {
      const limit = matchMedia('(max-width:760px)').matches ? 9 : 12;
      const vis = $$('.frame:not(.hidden)', wall);
      vis.forEach((t, i) => t.classList.toggle('capped', !expanded && i >= limit));
      $$('.frame.hidden', wall).forEach(t => t.classList.remove('capped'));
      const rest = vis.length - limit;
      gMore.parentElement.style.display = rest > 0 ? '' : 'none';
      gMore.textContent = expanded ? 'Show fewer' : `Show all ${vis.length} moments`;
      if (window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 400);
    };
    gMore.addEventListener('click', () => {
      expanded = !expanded; cap();
      if (!expanded) { const t = $('#moments'); window.__lenis ? window.__lenis.scrollTo(t, { offset: -70 }) : t.scrollIntoView(); }
    });
    cap();
  }

  /* lightbox */
  const lb = $('#lb');
  let lbIdx = 0, lastFocus = null;
  const visibleIdx = () => $$('.frame:not(.hidden)', wall).map(t => +t.dataset.idx);
  function openLB(idx) {
    lbIdx = idx; lastFocus = document.activeElement;
    renderLB(); lb.classList.add('open'); document.body.style.overflow = 'hidden';
    window.__lenis && window.__lenis.stop();
    $('.lb-close', lb).focus();
  }
  function renderLB() {
    const p = POSTS[lbIdx];
    const m = $('.lb-media', lb);
    m.innerHTML = p.video
      ? `<video src="assets/video/${p.id}.mp4" poster="assets/video/${p.id}.jpg" controls autoplay playsinline></video>`
      : `<img src="assets/img/${p.round ? '1-round.png' : p.id + '.jpg'}" alt="${p.t.replace(/"/g, '&quot;')}">`;
    $('.lb-cap', lb).textContent = p.cap;
    $('.lb-tags', lb).textContent = p.tags + ' #ottawarealestate';
  }
  function closeLB() {
    lb.classList.remove('open'); $('.lb-media', lb).innerHTML = ''; document.body.style.overflow = '';
    window.__lenis && window.__lenis.start();
    lastFocus && lastFocus.focus();
  }
  function stepLB(d) {
    const v = visibleIdx(); const i = v.indexOf(lbIdx);
    lbIdx = v[(i + d + v.length) % v.length]; renderLB();
  }
  if (wall) {
    wall.addEventListener('click', e => { const t = e.target.closest('.frame'); if (t) openLB(+t.dataset.idx); });
    wall.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('frame')) { e.preventDefault(); openLB(+e.target.dataset.idx); } });
    $('.lb-close', lb).addEventListener('click', closeLB);
    $('.lb-prev', lb).addEventListener('click', () => stepLB(-1));
    $('.lb-next', lb).addEventListener('click', () => stepLB(1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  }

  /* video modal */
  const vm = $('#vmodal'), vmv = $('video', vm);
  function openVideo(src) {
    lastFocus = document.activeElement;
    vmv.src = src; vm.classList.add('open'); document.body.style.overflow = 'hidden';
    window.__lenis && window.__lenis.stop();
    vmv.play().catch(() => {}); $('.lb-close', vm).focus();
  }
  function closeVideo() {
    vmv.pause(); vmv.removeAttribute('src'); vmv.load(); vm.classList.remove('open'); document.body.style.overflow = '';
    window.__lenis && window.__lenis.start(); lastFocus && lastFocus.focus();
  }
  $$('.js-video').forEach(el => {
    el.addEventListener('click', () => openVideo(el.dataset.src));
    el.addEventListener('keydown', e => { if (el.tagName !== 'BUTTON' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openVideo(el.dataset.src); } });
  });
  $('.arch')?.addEventListener('click', () => openVideo('assets/video/34.mp4'));
  $('.lb-close', vm).addEventListener('click', closeVideo);
  vm.addEventListener('click', e => { if (e.target === vm) closeVideo(); });

  document.addEventListener('keydown', e => {
    if (lb.classList.contains('open')) {
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowRight') stepLB(1);
      if (e.key === 'ArrowLeft') stepLB(-1);
    } else if (vm.classList.contains('open') && e.key === 'Escape') closeVideo();
    else if (document.documentElement.classList.contains('menu-open') && e.key === 'Escape') toggleMenu(false);
  });

  /* ---------------- video reel ---------------- */
  const reel = $('#reel');
  if (reel) {
    REELS.forEach(r => {
      const c = document.createElement('div');
      c.className = 'rv-card'; c.tabIndex = 0; c.setAttribute('role', 'button');
      c.setAttribute('aria-label', 'Play video: ' + r.t); c.dataset.cursor = 'view'; c.dataset.cursorLabel = 'SOUND ON';
      c.innerHTML = `<div class="rv-media"><video src="assets/video/${r.id}-preview.mp4" poster="assets/video/${r.id}.jpg" muted loop playsinline preload="none" class="autoplay-inview"></video><span class="rv-mute" aria-hidden="true"><svg><use href="#i-mute"/></svg></span><span class="rv-sound"><svg><use href="#i-sound"/></svg>Watch with sound</span></div><div class="rv-cap"><small>${r.k}</small><h4>${r.t}</h4></div>`;
      c.addEventListener('click', () => openVideo(`assets/video/${r.id}.mp4`));
      c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(`assets/video/${r.id}.mp4`); } });
      reel.appendChild(c);
    });
    const step = () => reel.querySelector('.rv-card').offsetWidth + 18;
    $('.r-prev')?.addEventListener('click', () => reel.scrollBy({ left: -step() * 2, behavior: 'smooth' }));
    $('.r-next')?.addEventListener('click', () => reel.scrollBy({ left: step() * 2, behavior: 'smooth' }));
  }

  /* autoplay in-view previews */
  const vio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const v = en.target;
      if (en.isIntersecting && !reduce) { if (v.preload === 'none') v.preload = 'auto'; v.play().catch(() => {}); }
      else v.pause();
    });
  }, { rootMargin: '120px 0px', threshold: 0.15 });
  $$('video.autoplay-inview').forEach(v => vio.observe(v));
  const heroV = $('.js-hero-video');
  if (heroV && reduce) heroV.pause();

  /* ---------------- testimonials: swipeable deck ---------------- */
  const deck = $('.deck');
  if (deck) {
    const n = TESTIS.length;
    let cur = 0;
    const cards = TESTIS.map((t, i) => {
      const c = document.createElement('article'); c.className = 'd-card';
      c.setAttribute('aria-label', `Review ${i + 1} of ${n}, from ${t.n}`);
      c.innerHTML = `<div class="d-top"><span class="stars">★★★★★</span><span class="t-src">${t.s}</span></div><blockquote>${t.q}</blockquote><div class="t-meta"><span class="t-av">${t.n[0]}</span><div><b>${t.n}</b><span>${t.d}</span></div></div>`;
      deck.appendChild(c); return c;
    });
    $('.d-tot').textContent = pad(n);
    const layout = () => {
      cards.forEach((c, k) => {
        const d = (k - cur + n) % n;
        c.style.zIndex = n - d;
        c.style.opacity = d > 3 ? 0 : 1;
        c.style.pointerEvents = d === 0 ? 'auto' : 'none';
        c.setAttribute('aria-hidden', d !== 0);
        c.style.transform = d === 0 ? 'none' : `translateY(${Math.min(d, 3) * 18}px) scale(${1 - Math.min(d, 3) * .05}) rotate(${(d % 2 ? 1 : -1) * Math.min(d, 3) * 1.4}deg)`;
        c.style.filter = d === 0 ? 'none' : `brightness(${1 - Math.min(d, 3) * .18})`;
      });
      $('.d-cur').textContent = pad(cur + 1);
    };
    const fly = dir => {
      const c = cards[cur];
      c.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1), opacity .55s';
      c.style.transform = `translateX(${dir * 130}%) rotate(${dir * 18}deg)`; c.style.opacity = 0;
      setTimeout(() => { c.style.transition = ''; cur = (cur + 1) % n; layout(); }, 380);
    };
    const back = () => { cur = (cur - 1 + n) % n; layout(); };
    // drag
    let sx = 0, dx = 0, drag = false;
    deck.addEventListener('pointerdown', e => {
      const c = cards[cur]; if (!c.contains(e.target)) return;
      drag = true; sx = e.clientX; dx = 0; c.classList.add('dragging'); c.setPointerCapture(e.pointerId);
    });
    deck.addEventListener('pointermove', e => {
      if (!drag) return; dx = e.clientX - sx;
      cards[cur].style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
    });
    const end = () => {
      if (!drag) return; drag = false; const c = cards[cur]; c.classList.remove('dragging');
      if (Math.abs(dx) > 90) fly(dx > 0 ? 1 : -1); else c.style.transform = 'none';
    };
    deck.addEventListener('pointerup', end); deck.addEventListener('pointercancel', end);
    $('.d-next').addEventListener('click', () => fly(-1));
    $('.d-prev').addEventListener('click', back);
    deck.tabIndex = 0;
    deck.addEventListener('keydown', e => { if (e.key === 'ArrowRight') fly(-1); if (e.key === 'ArrowLeft') back(); });
    const fit = () => { deck.style.height = 'auto'; const h = Math.max(...cards.map(c => { c.style.minHeight = '0'; const v = c.offsetHeight; c.style.minHeight = ''; return v; })); deck.style.height = (h + 6) + 'px'; window.ScrollTrigger && ScrollTrigger.refresh(); };
    fit(); addEventListener('resize', fit); document.fonts && document.fonts.ready.then(fit);
    layout();
  }

  /* ---------------- journey step tabs ---------------- */
  const jtabs = $$('.jt'), jpanels = $$('.jp');
  if (jtabs.length) {
    let ji = 0, jStart = 0, jPaused = false, jSeen = false;
    const DUR = 6500;
    const showJ = (i, user) => {
      ji = (i + jtabs.length) % jtabs.length;
      jtabs.forEach((t, k) => { t.setAttribute('aria-selected', k === ji); t.tabIndex = k === ji ? 0 : -1; $('.jt-bar i', t).style.width = k < ji ? '100%' : '0'; });
      jpanels.forEach((p, k) => p.classList.toggle('on', k === ji));
      const list = $('.jt-list'); const t = jtabs[ji];
      if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: t.offsetLeft - 16, behavior: 'smooth' });
      jStart = performance.now(); if (user) jPaused = true;
    };
    jtabs.forEach((t, k) => {
      t.addEventListener('click', () => showJ(k, true));
      t.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); showJ(ji + (e.key === 'ArrowRight' ? 1 : -1), true); jtabs[ji].focus(); }
      });
    });
    new IntersectionObserver(es => es.forEach(en => { jSeen = en.isIntersecting; if (jSeen) jStart = performance.now() - (jStart ? 0 : 0); }), { threshold: .35 }).observe($('.jtabs'));
    (function loop(now) {
      if (jSeen && !jPaused && !reduce) {
        const p = Math.min(1, (now - jStart) / DUR);
        $('.jt-bar i', jtabs[ji]).style.width = (p * 100) + '%';
        if (p >= 1) showJ(ji + 1);
      } else if (!jSeen) jStart = now - (parseFloat($('.jt-bar i', jtabs[ji]).style.width || 0) / 100) * DUR;
      requestAnimationFrame(loop);
    })(performance.now());
    // swipe the panel to change step
    let jx = null;
    const jw = $('.jp-wrap');
    jw.addEventListener('touchstart', e => { jx = e.touches[0].clientX; }, { passive: true });
    jw.addEventListener('touchend', e => { if (jx === null) return; const d = e.changedTouches[0].clientX - jx; if (Math.abs(d) > 45) showJ(ji + (d < 0 ? 1 : -1), true); jx = null; });
    showJ(0);
  }

  /* reel swipe cues */
  const reelEl = $('#reel');
  if (reelEl) {
    const shell = $('.reel-shell'), bar = $('.reel-progress i'), cnt = $('.reel-count');
    const total = reelEl.children.length;
    const upd = () => {
      const max = reelEl.scrollWidth - reelEl.clientWidth;
      const p = max > 0 ? reelEl.scrollLeft / max : 1;
      const vis = Math.max(1, Math.round(reelEl.clientWidth / (reelEl.children[0].offsetWidth + 14)));
      bar.style.width = Math.max(vis / total, p) * 100 + '%';
      shell.classList.toggle('at-end', p > .97);
      const first = Math.min(total, Math.round(p * (total - vis)) + 1);
      const last = Math.min(total, first + vis - 1);
      cnt.textContent = p > .97 ? `All ${total} videos · swipe back ←` : `${first === last ? first : first + '–' + last} of ${total} · swipe for more →`;
    };
    reelEl.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
    $('.reel-arrow').addEventListener('click', () => reelEl.scrollBy({ left: reelEl.children[0].offsetWidth + 14, behavior: 'smooth' }));
    // one-time peek nudge when it first comes into view
    let nudged = false;
    new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting && !nudged && !reduce && reelEl.scrollLeft === 0) {
        nudged = true;
        setTimeout(() => { reelEl.scrollTo({ left: 70, behavior: 'smooth' }); setTimeout(() => reelEl.scrollTo({ left: 0, behavior: 'smooth' }), 650); }, 500);
      }
    }), { threshold: .6 }).observe(reelEl);
  }

  /* ---------------- pillars ---------------- */
  const pillars = $$('.pillar');
  const activate = p => pillars.forEach(x => { x.classList.toggle('active', x === p); x.setAttribute('aria-expanded', x === p); });
  pillars.forEach(p => {
    p.addEventListener('click', () => activate(p));
    p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(p); } });
    if (fine) p.addEventListener('mouseenter', () => activate(p));
  });

  /* help card glow */
  $$('.help-card').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  /* intent links pre-fill form */
  $$('[data-intent]').forEach(a => a.addEventListener('click', () => {
    const v = a.dataset.intent;
    const map = {'Selling my home':'in2','Upsizing / downsizing':'in3','Investing':'in4','Seminar seat':'in5'};
    const radio = document.getElementById(map[v] || 'in1'); if (radio) radio.checked = true;
    const msg = $('#fMsg'); if (msg && !msg.value) msg.value = v === 'Seminar seat' ? "Please save me a seat at your next First-Time Home Buyer Seminar!" : `Hi Nish, I'm interested in: ${v}.`;
  }));

  /* ---------------- calculator ---------------- */
  const cP = $('#cPrice'), cD = $('#cDown'), cR = $('#cRate');
  let amort = 25;
  function fillRange(r) { r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%'); }
  function minDownPct(price) {
    if (price >= 1500000) return 20;
    const min = price <= 500000 ? price * 0.05 : 25000 + (price - 500000) * 0.10;
    return Math.ceil(min / price * 1000) / 10;
  }
  function calc() {
    const price = +cP.value; let pct = +cD.value;
    const minPct = minDownPct(price);
    if (pct < minPct) { pct = Math.ceil(minPct); cD.value = pct; }
    const rate = +cR.value / 100;
    const down = price * pct / 100;
    const base = price - down;
    let prem = 0;
    if (pct < 20) prem = pct < 10 ? 0.04 : pct < 15 ? 0.031 : 0.028;
    const ins = base * prem; const loan = base + ins;
    const mr = Math.pow(1 + rate / 2, 1 / 6) - 1; const n = amort * 12;
    const pay = mr === 0 ? loan / n : loan * mr / (1 - Math.pow(1 + mr, -n));
    $('#oPrice').textContent = money(price);
    $('#oDown').textContent = pct + '%' + (pct === Math.ceil(minPct) && pct < 20 ? ' (min)' : '');
    $('#oRate').textContent = (+cR.value).toFixed(2).replace(/0$/, '') + '%';
    $('#oDownAmt').textContent = money(down);
    $('#oIns').textContent = prem ? money(ins) : 'Not required';
    $('#oLoan').textContent = money(loan);
    const el = $('#oPay'); const from = +(el.dataset.v || pay);
    el.dataset.v = pay;
    if (hasGSAP && !reduce) { const o = {v: from}; gsap.to(o, {v: pay, duration: .6, ease: 'power2.out', onUpdate: () => el.textContent = money(o.v)}); }
    else el.textContent = money(pay);
    [cP, cD, cR].forEach(fillRange);
  }
  if (cP) {
    [cP, cD, cR].forEach(r => r.addEventListener('input', calc));
    $$('#cAmort button').forEach(b => b.addEventListener('click', () => {
      $$('#cAmort button').forEach(x => x.classList.toggle('on', x === b)); amort = +b.dataset.v; calc();
    }));
    calc();
  }

  /* ---------------- form ---------------- */
  const form = $('#leadForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = $('.form-ok', form);
    const name = form.name.value.trim(), email = form.email.value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      ok.textContent = 'Please add your name and a valid email so Nish can get back to you.'; ok.classList.add('show');
      (!name ? form.name : form.email).focus(); return;
    }
    const intent = form.querySelector('input[name=intent]:checked').value;
    const body = `Name: ${name}\nPhone: ${form.phone.value}\nEmail: ${email}\nInterested in: ${intent}\n\n${form.message.value}`;
    window.location.href = `mailto:operations@teamnk.ca?subject=${encodeURIComponent('Website enquiry: ' + intent + ' (' + name + ')')}&body=${encodeURIComponent(body)}`;
    ok.textContent = `Thanks, ${name.split(' ')[0]}! Your email app should open with your message ready to send. Prefer to talk? Call or text 613.263.8223.`;
    ok.classList.add('show');
  });

  /* ---------------- menu ---------------- */
  const burger = $('.burger'), mm = $('#mobileMenu');
  function toggleMenu(force) {
    const open = typeof force === 'boolean' ? force : !document.documentElement.classList.contains('menu-open');
    document.documentElement.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mm.setAttribute('aria-hidden', !open);
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
  }
  burger.addEventListener('click', () => toggleMenu());
  $$('a', mm).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------------- cursor + magnetic ---------------- */
  if (fine && !reduce) {
    const cur = $('.cursor'), dot = $('.cursor-dot');
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    (function loop() { cx += (mx - cx) * .18; cy += (my - cy) * .18; cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor], a, button');
      cur.classList.remove('is-hover', 'is-view'); cur.textContent = '';
      if (!t) return;
      if (t.dataset.cursor === 'view') { cur.classList.add('is-view'); cur.textContent = t.dataset.cursorLabel || 'VIEW'; }
      else cur.classList.add('is-hover');
    });
    $$('.magnetic').forEach(m => {
      m.addEventListener('pointermove', e => {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      m.addEventListener('pointerleave', () => m.style.transform = '');
    });
    // hero chips parallax
    const hero = $('.hero');
    hero.addEventListener('pointermove', e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      $$('.chip', hero).forEach(c => { const d = +c.dataset.depth || .5; c.style.transform = `translate(${x * 40 * d}px,${y * 40 * d}px)`; });
    });
    // award tilt
    $$('[data-tilt]').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      c.addEventListener('pointerleave', () => c.style.transform = '');
    });
  }

  /* ---------------- nav behaviour ---------------- */
  const nav = $('#nav'), mbar = $('.mbar');
  let lastY = 0;
  function onScroll(y) {
    nav.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('hide', y > lastY && y > 500 && !document.documentElement.classList.contains('menu-open'));
    if (mbar) {
      const f = $('#leadForm').getBoundingClientRect();
      const inForm = f.top < innerHeight && f.bottom > 0;
      mbar.classList.toggle('show', y > innerHeight * .7 && !inForm);
    }
    lastY = y;
  }
  addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  // active link
  const links = $$('.nav-links a');
  const secIO = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(l => { const s = $(l.getAttribute('href')); s && secIO.observe(s); });

  $('#yr').textContent = new Date().getFullYear();

  /* ---------------- smooth scroll ---------------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    } else { (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(); }
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(t, { offset: id === '#top' ? 0 : -70 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* ---------------- preloader + animations ---------------- */
  const loader = $('.loader'), bar = $('.loader-bar i');
  let prog = 0;
  const tick = setInterval(() => { prog = Math.min(prog + Math.random() * 18, 92); bar.style.width = prog + '%'; }, 120);
  let started = false;
  function start() {
    if (started) return; started = true;
    clearInterval(tick); bar.style.width = '100%';
    setTimeout(() => { loader.classList.add('done'); intro(); }, reduce ? 0 : 380);
    setTimeout(() => loader.remove(), 1400);
  }
  addEventListener('load', start);
  setTimeout(start, 2600); // never block on slow media

  function intro() {
    if (!hasGSAP || reduce) {
      $$('.rv, .rv-scale').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
      $$('[data-count]').forEach(e => { e.textContent = (e.dataset.prefix || '') + e.dataset.count; });
      $$('.rating-panel').forEach(p => p.classList.add('in'));
      $$('.step').forEach(s => s.classList.add('on'));
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero h1 .line', { opacity: 0, filter: 'blur(18px)', y: 24, duration: 1.5, ease: 'power3.out', stagger: .16 })
      .from('.hero-in', { y: 30, opacity: 0, duration: 1.1, stagger: .1 }, '-=1')
      .from('.arch', { clipPath: 'inset(100% 0 0 0 round 999px 999px 28px 28px)', duration: 1.6, ease: 'expo.inOut' }, 0.1)
      .from('.arch video', { scale: 1.3, duration: 2 }, 0.1)
      .from('.ring-wrap', { scale: 0, rotate: -120, duration: 1.2, ease: 'back.out(1.6)' }, .8)
      .from('.chip', { y: 30, opacity: 0, scale: .9, duration: 1, stagger: .12 }, 1)
      .from('.nav-in > *', { y: -20, opacity: 0, duration: .9, stagger: .08 }, .3);

    setupScroll();
  }

  function setupScroll() {
    // headlines: soft blur-in (whole lines, no word splitting)
    $$('[data-split]').forEach(h => {
      if (h.closest('.hero')) return;
      const lines = $$('.line', h);
      gsap.from(lines.length ? lines : [h], { opacity: 0, filter: 'blur(16px)', y: 18, duration: 1.4, ease: 'power3.out', stagger: .14,
        clearProps: 'filter,transform', scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
    });
    // generic reveals
    let rvQueue = [], rvTimer = null;
    const rvIO = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting) { rvQueue.push(en.target); rvIO.unobserve(en.target); } });
      clearTimeout(rvTimer);
      rvTimer = setTimeout(() => { gsap.to(rvQueue, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .08, overwrite: true }); rvQueue = []; }, 30);
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(e => rvIO.observe(e));
    ScrollTrigger.batch('.rv', { start: 'top 92%', once: true,
      onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .08, overwrite: true }) });
    // parallax images
    $$('.parallax-img').forEach(img => gsap.fromTo(img, { yPercent: -8 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: img.parentElement, scrub: true } }));
    gsap.to('.story-img-2', { y: -60, ease: 'none', scrollTrigger: { trigger: '.story', scrub: true } });
    gsap.to('.story-badge', { y: 40, rotate: -10, ease: 'none', scrollTrigger: { trigger: '.story', scrub: true } });
    // hero exit
    gsap.to('.hero-visual', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-copy', { yPercent: 10, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // counters
    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count, dec = +(el.dataset.dec || 0), pre = el.dataset.prefix || '';
      const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () =>
        gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => el.textContent = pre + o.v.toFixed(dec) }) });
    });
    // rating bars
    $$('.rating-panel').forEach(p => ScrollTrigger.create({ trigger: p, start: 'top 80%', once: true, onEnter: () => p.classList.add('in') }));

    // pillars / tiles / give cards
    gsap.from('.give', { y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: '.give-grid', start: 'top 85%' } });
    ScrollTrigger.batch('.frame', { start: 'top 92%', onEnter: b => gsap.from(b, { y: 50, opacity: 0, duration: 1, ease: 'expo.out', stagger: .05 }), once: true });
    // footer big
    gsap.from('.footer-big', { y: 60, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'top 30%', scrub: true } });

    // refresh after media loads
    addEventListener('load', () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 1500);
  }
})();
