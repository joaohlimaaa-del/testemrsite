// ====================================================
// LISTING.JS — página comprar/alugar
// ====================================================

// Detecta finalidade pela URL (comprar.html?aluguel=1 ou alugar.html)
const isAluguel = window.location.pathname.includes('alugar') ||
                  new URLSearchParams(window.location.search).has('aluguel');
const FINALIDADE = isAluguel ? 'Locação' : 'Venda';

// Configurações de UI por modo
if (isAluguel) {
  document.getElementById('pageTitle').textContent = 'Imóveis para alugar em São Luís | MR Imobiliária';
  document.getElementById('bcCategoria').textContent = 'Alugar';
  document.getElementById('listingTitle').textContent = 'Imóveis para alugar em São Luís';
  document.querySelectorAll('.nav-active').forEach(a => a.classList.remove('nav-active'));
  const alugarLink = document.querySelector('nav a[href="alugar.html"]');
  if (alugarLink) alugarLink.classList.add('nav-active');
}

// Estado dos filtros
const filterState = {
  tipo: '',
  bairro: '',
  minPrice: null,
  maxPrice: null,
  quartos: '',
  vagas: '',
  minArea: null,
  maxArea: null,
  fgts: false,
  financ: false,
  mobiliado: false,
  pet: false,
  sort: 'relevance',
  page: 1
};
const PER_PAGE = 9;

function parsePrice(s) {
  if (!s) return 0;
  const n = String(s).replace(/\D/g, '');
  return parseInt(n || 0, 10);
}

function applyFiltersData() {
  let arr = getPublishedImoveis(FINALIDADE);

  if (filterState.tipo) arr = arr.filter(im => im.tipo === filterState.tipo);
  if (filterState.bairro) arr = arr.filter(im => im.bairro === filterState.bairro);

  if (filterState.minPrice) {
    arr = arr.filter(im => parsePrice(isAluguel ? im.valorAluguel : im.valorVenda) >= filterState.minPrice);
  }
  if (filterState.maxPrice) {
    arr = arr.filter(im => parsePrice(isAluguel ? im.valorAluguel : im.valorVenda) <= filterState.maxPrice);
  }

  if (filterState.quartos) {
    const q = parseInt(filterState.quartos, 10);
    if (q === 4) arr = arr.filter(im => (im.quartos || 0) >= 4);
    else arr = arr.filter(im => (im.quartos || 0) === q);
  }
  if (filterState.vagas) {
    const v = parseInt(filterState.vagas, 10);
    if (v === 4) arr = arr.filter(im => (im.vagas || 0) >= 4);
    else arr = arr.filter(im => (im.vagas || 0) === v);
  }
  if (filterState.minArea) arr = arr.filter(im => (im.area || 0) >= filterState.minArea);
  if (filterState.maxArea) arr = arr.filter(im => (im.area || 0) <= filterState.maxArea);

  if (filterState.fgts) arr = arr.filter(im => (im.financia || []).includes('Aceita FGTS'));
  if (filterState.financ) arr = arr.filter(im => (im.financia || []).includes('Aceita financiamento'));
  if (filterState.mobiliado) arr = arr.filter(im => (im.amenities || []).includes('Mobiliado'));
  if (filterState.pet) arr = arr.filter(im => (im.amenities || []).includes('Aceita pet'));

  // Ordenação
  switch (filterState.sort) {
    case 'price-asc':
      arr.sort((a, b) => parsePrice(isAluguel ? a.valorAluguel : a.valorVenda) - parsePrice(isAluguel ? b.valorAluguel : b.valorVenda));
      break;
    case 'price-desc':
      arr.sort((a, b) => parsePrice(isAluguel ? b.valorAluguel : b.valorVenda) - parsePrice(isAluguel ? a.valorAluguel : a.valorVenda));
      break;
    case 'area-desc':
      arr.sort((a, b) => (b.area || 0) - (a.area || 0));
      break;
    case 'recent':
      arr.sort((a, b) => {
        const at = a.criadoEm ? new Date(a.criadoEm).getTime() : 0;
        const bt = b.criadoEm ? new Date(b.criadoEm).getTime() : 0;
        return bt - at;
      });
      break;
  }

  return arr;
}

function renderImoveis() {
  const all = applyFiltersData();
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  if (filterState.page > totalPages) filterState.page = 1;

  const startIdx = (filterState.page - 1) * PER_PAGE;
  const slice = all.slice(startIdx, startIdx + PER_PAGE);
  const container = document.getElementById('imoveisList');
  const countEl = document.getElementById('listingCount');

  countEl.textContent = all.length === 0
    ? 'Nenhum imóvel encontrado com os filtros atuais.'
    : `${all.length} ${all.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'} · página ${filterState.page} de ${totalPages}`;

  if (slice.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">🔍</div>
        <h3>Nenhum imóvel encontrado</h3>
        <p>Tente ajustar os filtros ou limpar a busca para ver mais opções.</p>
        <button class="btn btn-primary" onclick="clearFilters()">Limpar filtros</button>
      </div>
    `;
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  container.innerHTML = '<div class="imoveis-grid-3">' + slice.map(im => {
    const valorTexto = isAluguel
      ? `R$ ${formatPrice(im.valorAluguel) || '—'}<small style="font-size:13px;font-weight:600;">/mês</small>`
      : `R$ ${formatPrice(im.valorVenda) || '—'}`;
    const condIptu = im.condominio || im.iptu
      ? `Cond. R$ ${im.condominio || '—'} · IPTU R$ ${im.iptu || '—'}`
      : '';
    const fgts = (im.financia || []).includes('Aceita FGTS');

    return `
      <article class="property-card" onclick="window.location.href='imovel.html?id=${im.id}'">
        <div class="property-image">
          <img src="${im.foto}" alt="" loading="lazy">
          ${fgts ? '<span class="property-badge">Aceita FGTS</span>' : ''}
          <button class="property-heart" onclick="event.stopPropagation(); this.textContent = this.textContent === '♡' ? '♥' : '♡'; this.style.color = this.textContent === '♥' ? '#E1251B' : '';">♡</button>
        </div>
        <div class="property-info">
          <div class="property-location">${im.bairro} · ${im.cidade}</div>
          <h3 class="property-title">${im.titulo}</h3>
          <div class="property-features">
            ${im.quartos ? `<span>🛏 ${im.quartos}q</span>` : ''}
            ${im.vagas ? `<span>🚗 ${im.vagas}v</span>` : ''}
            ${im.area ? `<span>📐 ${im.area}m²</span>` : ''}
          </div>
          <div class="property-price">
            <div class="property-price-label">${isAluguel ? 'Aluguel' : 'Venda'}</div>
            <div class="property-price-value">${valorTexto}</div>
            ${condIptu ? `<div class="property-price-extra">${condIptu}</div>` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('') + '</div>';

  // Paginação
  if (totalPages > 1) {
    let pgHTML = `<button onclick="changePage(${filterState.page - 1})" ${filterState.page === 1 ? 'disabled' : ''}>‹ Anterior</button>`;
    for (let i = 1; i <= totalPages; i++) {
      pgHTML += `<button class="${i === filterState.page ? 'is-active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    pgHTML += `<button onclick="changePage(${filterState.page + 1})" ${filterState.page === totalPages ? 'disabled' : ''}>Próxima ›</button>`;
    document.getElementById('pagination').innerHTML = pgHTML;
  } else {
    document.getElementById('pagination').innerHTML = '';
  }

  updateFilterCount();
}

function changePage(n) {
  filterState.page = n;
  renderImoveis();
  window.scrollTo({ top: document.querySelector('.listing-page').offsetTop - 80, behavior: 'smooth' });
}

function updateFilterCount() {
  let count = 0;
  if (filterState.tipo) count++;
  if (filterState.bairro) count++;
  if (filterState.minPrice) count++;
  if (filterState.maxPrice) count++;
  if (filterState.quartos) count++;
  if (filterState.vagas) count++;
  if (filterState.minArea) count++;
  if (filterState.maxArea) count++;
  if (filterState.fgts) count++;
  if (filterState.financ) count++;
  if (filterState.mobiliado) count++;
  if (filterState.pet) count++;
  const badge = document.getElementById('filterCount');
  if (count > 0) {
    badge.textContent = count;
    badge.hidden = false;
  } else {
    badge.hidden = true;
  }
}

function applyFilters() {
  const num = id => {
    const v = document.getElementById(id).value;
    if (!v) return null;
    return parseInt(String(v).replace(/\D/g, ''), 10) || null;
  };
  filterState.minPrice = num('filterMinPrice');
  filterState.maxPrice = num('filterMaxPrice');
  filterState.bairro = document.getElementById('filterBairro').value;
  filterState.minArea = parseInt(document.getElementById('filterMinArea').value || 0, 10) || null;
  filterState.maxArea = parseInt(document.getElementById('filterMaxArea').value || 0, 10) || null;
  filterState.fgts = document.getElementById('filterFGTS').checked;
  filterState.financ = document.getElementById('filterFinanc').checked;
  filterState.mobiliado = document.getElementById('filterMobiliado').checked;
  filterState.pet = document.getElementById('filterPet').checked;
  filterState.page = 1;
  renderImoveis();
  toggleFilters(false);
}

function clearFilters() {
  filterState.tipo = '';
  filterState.bairro = '';
  filterState.minPrice = null;
  filterState.maxPrice = null;
  filterState.quartos = '';
  filterState.vagas = '';
  filterState.minArea = null;
  filterState.maxArea = null;
  filterState.fgts = false;
  filterState.financ = false;
  filterState.mobiliado = false;
  filterState.pet = false;
  filterState.sort = 'relevance';
  filterState.page = 1;

  document.querySelectorAll('.chip-group .chip').forEach(c => c.classList.remove('is-active'));
  document.querySelectorAll('.chip-group').forEach(g => {
    const first = g.querySelector('.chip[data-val=""]');
    if (first) first.classList.add('is-active');
  });
  document.getElementById('filterBairro').value = '';
  document.getElementById('filterMinPrice').value = '';
  document.getElementById('filterMaxPrice').value = '';
  document.getElementById('filterMinArea').value = '';
  document.getElementById('filterMaxArea').value = '';
  document.getElementById('filterFGTS').checked = false;
  document.getElementById('filterFinanc').checked = false;
  document.getElementById('filterMobiliado').checked = false;
  document.getElementById('filterPet').checked = false;
  document.getElementById('sortBy').value = 'relevance';
  renderImoveis();
}

// Chips clicáveis
document.querySelectorAll('.chip-group').forEach(group => {
  const name = group.dataset.filterName;
  group.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      filterState[name] = chip.dataset.val;
      filterState.page = 1;
      renderImoveis();
    });
  });
});

// Inicializa primeiro chip como ativo
document.querySelectorAll('.chip-group').forEach(g => {
  const first = g.querySelector('.chip[data-val=""]');
  if (first) first.classList.add('is-active');
});

// Sort
document.getElementById('sortBy').addEventListener('change', e => {
  filterState.sort = e.target.value;
  filterState.page = 1;
  renderImoveis();
});

// Toggle filtros mobile
function toggleFilters(force) {
  const sidebar = document.getElementById('filterSidebar');
  if (force === undefined) sidebar.classList.toggle('is-open');
  else if (force) sidebar.classList.add('is-open');
  else sidebar.classList.remove('is-open');
}
document.getElementById('filterToggle').addEventListener('click', () => toggleFilters());

// Aplica filtros vindo da URL (search box da home)
(function applyURLFilters() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('cidade')) { /* não usamos */ }
  if (params.get('bairro')) {
    filterState.bairro = params.get('bairro');
    const sel = document.getElementById('filterBairro');
    if (sel) sel.value = params.get('bairro');
  }
  if (params.get('tipo')) {
    filterState.tipo = params.get('tipo');
    document.querySelectorAll('[data-filter-name="tipo"] .chip').forEach(c => {
      c.classList.toggle('is-active', c.dataset.val === params.get('tipo'));
    });
  }
  if (params.get('maxPrice')) {
    const mp = parseInt(params.get('maxPrice'), 10);
    filterState.maxPrice = mp;
    const inp = document.getElementById('filterMaxPrice');
    if (inp) inp.value = mp.toLocaleString('pt-BR');
  }
})();

// Render inicial
renderImoveis();
