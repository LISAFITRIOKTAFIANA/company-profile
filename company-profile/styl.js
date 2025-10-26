(function () {
    // ambil elemen
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const btnLihat = document.getElementById('lihat-price');
    const btnBack = document.getElementById('back-from-price');

    // fungsi umum untuk tampilkan section by id
    function showSection(id, event) {
      if (event) event.preventDefault();
      // hide all
      sections.forEach(s => {
        s.classList.remove('fade-in');
        s.classList.remove('active');
      });
      // show target
      const target = document.getElementById(id);
      if (!target) return console.warn('Section not found:', id);
      target.classList.add('active');
      // jika section berisi .price-scroll, fokuskan scroll di dalamnya
      const inner = target.querySelector('.price-scroll');
      if (inner) inner.scrollTop = 0;
      target.classList.add('fade-in');
      // small delay to ensure browser paints
      setTimeout(() => window.scrollTo({top:0, behavior:'instant'}), 10);
    }

    // hook navbar clicks (uses data-target attributes)
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const target = this.getAttribute('data-target');
        showSection(target, e);
      });
    });

    // tombol Lihat Price List
    if (btnLihat) btnLihat.addEventListener('click', e => showSection('price-list', e));
    if (btnBack) btnBack.addEventListener('click', e => showSection('beranda', e));

    // inisialisasi default
    document.addEventListener('DOMContentLoaded', () => showSection('beranda'));
  })();

  // Filter Price List
const filterButtons = document.querySelectorAll('.filter-btn');
const priceCards = document.querySelectorAll('.price-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.getAttribute('data-category');
    priceCards.forEach(card => {
      card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
    });
  });
});

  // jalankan filter default 'satuan'
  const defaultCategory = 'satuan';
  filterButtons.forEach(btn => {
    if(btn.dataset.category === defaultCategory) btn.click();
  });

  const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  const name = this.name.value.trim();
  const message = this.message.value.trim();
  const waNumber = "6285645012237"; // nomor admin
  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent("Halo, saya " + name + ". " + message)}`;
  window.open(url, '_blank'); // buka WA baru
});
