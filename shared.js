// ====================================================
// SHARED.JS — sistema comum a todas as páginas
// ====================================================

// ---------- Imóveis mock + custom (compartilhado com dashboard) ----------
const MOCK_IMOVEIS = [
  { id: 'mock-1', codigo: 'MR-2847', titulo: 'Edifício Mirante · Apartamento de 142m²', tipo: 'Apartamento', finalidade: 'Venda', bairro: 'Calhau', cidade: 'São Luís', quartos: 3, suites: 1, banheiros: 3, vagas: 2, area: 142, valorVenda: '1.450.000', valorAluguel: '', condominio: '980', iptu: '410', status: 'publicado', foto: 'https://picsum.photos/seed/imv1/1200/900', photos: ['https://picsum.photos/seed/imv1/1200/900','https://picsum.photos/seed/imv1b/1200/900','https://picsum.photos/seed/imv1c/1200/900','https://picsum.photos/seed/imv1d/1200/900'], amenities: ['Sacada gourmet','Ar condicionado','Armários planejados','Piscina','Academia','Espaço gourmet','Salão de festas','Portaria 24h','Elevador'], financia: ['Aceita FGTS','Aceita financiamento'], descricao: 'Apartamento de alto padrão no Calhau com vista privilegiada. Edifício novo com infraestrutura completa de lazer.', rua: 'Avenida dos Holandeses', numero: '1234' },
  { id: 'mock-2', codigo: 'MR-2812', titulo: 'Cobertura Duplex vista mar · 280m²', tipo: 'Cobertura', finalidade: 'Venda', bairro: 'Renascença', cidade: 'São Luís', quartos: 4, suites: 4, banheiros: 5, vagas: 4, area: 280, valorVenda: '3.890.000', valorAluguel: '', condominio: '2.150', iptu: '890', status: 'publicado', foto: 'https://picsum.photos/seed/imv2/1200/900', photos: ['https://picsum.photos/seed/imv2/1200/900','https://picsum.photos/seed/imv2b/1200/900','https://picsum.photos/seed/imv2c/1200/900','https://picsum.photos/seed/imv2d/1200/900'], amenities: ['Sacada gourmet','Vista mar','Piscina privativa','Espaço gourmet','Mobiliado','Ar condicionado'], financia: ['Aceita financiamento','Aceita permuta'], descricao: 'Cobertura duplex única no Renascença, vista panorâmica para o mar.', rua: 'Avenida Castelo Branco', numero: '880' },
  { id: 'mock-3', codigo: 'MR-2839', titulo: 'Apartamento alto padrão · 178m²', tipo: 'Apartamento', finalidade: 'Venda', bairro: "Ponta D'Areia", cidade: 'São Luís', quartos: 3, suites: 3, banheiros: 4, vagas: 3, area: 178, valorVenda: '2.180.000', valorAluguel: '', condominio: '1.480', iptu: '620', status: 'publicado', foto: 'https://picsum.photos/seed/imv3/1200/900', photos: ['https://picsum.photos/seed/imv3/1200/900','https://picsum.photos/seed/imv3b/1200/900','https://picsum.photos/seed/imv3c/1200/900'], amenities: ['Sacada gourmet','Vista mar','Piscina','Academia','Espaço gourmet','Coworking','Portaria 24h'], financia: ['Aceita FGTS','Aceita financiamento'], descricao: 'Apartamento alto padrão na Ponta D\'Areia, infraestrutura premium.', rua: 'Avenida Litorânea', numero: '450' },
  { id: 'mock-4', codigo: 'MR-2851', titulo: "Apartamento 3 quartos · 95m²", tipo: 'Apartamento', finalidade: 'Locação', bairro: "Olho D'Água", cidade: 'São Luís', quartos: 3, suites: 1, banheiros: 2, vagas: 2, area: 95, valorVenda: '', valorAluguel: '3.500', condominio: '540', iptu: '220', status: 'publicado', foto: 'https://picsum.photos/seed/imv4/1200/900', photos: ['https://picsum.photos/seed/imv4/1200/900','https://picsum.photos/seed/imv4b/1200/900'], amenities: ['Sacada','Ar condicionado','Piscina','Playground','Portaria 24h','Elevador'], financia: [], descricao: 'Apartamento aconchegante no Olho D\'Água, próximo a comércio e escolas.', rua: 'Rua dos Tubarões', numero: '580' },
  { id: 'mock-5', codigo: 'MR-2790', titulo: 'Casa em condomínio · 380m²', tipo: 'Casa', finalidade: 'Venda', bairro: 'Cohama', cidade: 'São Luís', quartos: 4, suites: 4, banheiros: 5, vagas: 4, area: 380, valorVenda: '2.890.000', valorAluguel: '', condominio: '1.800', iptu: '780', status: 'publicado', foto: 'https://picsum.photos/seed/imv5/1200/900', photos: ['https://picsum.photos/seed/imv5/1200/900','https://picsum.photos/seed/imv5b/1200/900','https://picsum.photos/seed/imv5c/1200/900'], amenities: ['Piscina privativa','Espaço gourmet','Quadra','Portaria 24h'], financia: ['Aceita financiamento'], descricao: 'Casa em condomínio fechado com segurança 24h, lazer completo.', rua: 'Cohama Park', numero: '120' },
  { id: 'mock-6', codigo: 'MR-2848', titulo: 'Sala comercial mobiliada · 45m²', tipo: 'Comercial', finalidade: 'Locação', bairro: 'Renascença', cidade: 'São Luís', quartos: 0, suites: 0, banheiros: 1, vagas: 1, area: 45, valorVenda: '', valorAluguel: '2.200', condominio: '380', iptu: '150', status: 'publicado', foto: 'https://picsum.photos/seed/imv6/1200/900', photos: ['https://picsum.photos/seed/imv6/1200/900','https://picsum.photos/seed/imv6b/1200/900'], amenities: ['Mobiliado','Ar condicionado','Portaria 24h','Elevador'], financia: [], descricao: 'Sala comercial pronta para uso, mobiliada e bem localizada.', rua: 'Avenida Colares Moreira', numero: '777' },
  { id: 'mock-7', codigo: 'MR-2855', titulo: 'Apartamento 2 quartos · 78m²', tipo: 'Apartamento', finalidade: 'Venda', bairro: 'Calhau', cidade: 'São Luís', quartos: 2, suites: 1, banheiros: 2, vagas: 1, area: 78, valorVenda: '650.000', valorAluguel: '', condominio: '650', iptu: '280', status: 'publicado', foto: 'https://picsum.photos/seed/imv7/1200/900', photos: ['https://picsum.photos/seed/imv7/1200/900','https://picsum.photos/seed/imv7b/1200/900'], amenities: ['Sacada','Piscina','Academia','Portaria 24h'], financia: ['Aceita FGTS','Aceita financiamento','Casa Verde Amarela'], descricao: 'Apartamento ideal para casal jovem ou investimento. Excelente custo-benefício no Calhau.', rua: 'Rua do Calhau', numero: '300' },
  { id: 'mock-8', codigo: 'MR-2856', titulo: 'Apartamento 4 suítes · 220m²', tipo: 'Apartamento', finalidade: 'Venda', bairro: 'Península', cidade: 'São Luís', quartos: 4, suites: 4, banheiros: 5, vagas: 4, area: 220, valorVenda: '2.950.000', valorAluguel: '', condominio: '1.620', iptu: '710', status: 'publicado', foto: 'https://picsum.photos/seed/imv8/1200/900', photos: ['https://picsum.photos/seed/imv8/1200/900','https://picsum.photos/seed/imv8b/1200/900','https://picsum.photos/seed/imv8c/1200/900'], amenities: ['Sacada gourmet','Vista mar','Piscina','Academia','Espaço gourmet','Coworking','Pet place'], financia: ['Aceita financiamento'], descricao: 'Apartamento luxuoso na Península com vista exclusiva para a Lagoa da Jansen.', rua: 'Avenida Litorânea', numero: '5000' },
  { id: 'mock-9', codigo: 'MR-2860', titulo: 'Casa 3 quartos · 180m²', tipo: 'Casa', finalidade: 'Locação', bairro: 'Cohama', cidade: 'São Luís', quartos: 3, suites: 1, banheiros: 3, vagas: 2, area: 180, valorVenda: '', valorAluguel: '4.800', condominio: '0', iptu: '320', status: 'publicado', foto: 'https://picsum.photos/seed/imv9/1200/900', photos: ['https://picsum.photos/seed/imv9/1200/900','https://picsum.photos/seed/imv9b/1200/900'], amenities: ['Quintal','Churrasqueira','Garagem coberta'], financia: [], descricao: 'Casa térrea com quintal amplo, ideal para famílias.', rua: 'Rua das Margaridas', numero: '85' }
];

function getAllImoveis() {
  const custom = JSON.parse(localStorage.getItem('mr_imoveis') || '[]');
  const overrides = JSON.parse(localStorage.getItem('mr_mock_overrides') || '{}');
  const deleted = JSON.parse(localStorage.getItem('mr_mock_deleted') || '[]');
  const mocks = MOCK_IMOVEIS
    .filter(m => !deleted.includes(m.id))
    .map(m => ({ ...m, ...(overrides[m.id] || {}) }));
  return [...custom, ...mocks];
}

function getImovelById(id) {
  return getAllImoveis().find(im => im.id === id);
}

function getPublishedImoveis(finalidade) {
  let arr = getAllImoveis().filter(im => im.status === 'publicado');
  if (finalidade) {
    arr = arr.filter(im => im.finalidade === finalidade || im.finalidade === 'Venda + Locação' || im.finalidade === 'Ambos');
  }
  return arr;
}

// ---------- Formata preço ----------
function formatPrice(v) {
  if (!v) return null;
  const n = String(v).replace(/\D/g, '');
  if (!n) return null;
  return Number(n).toLocaleString('pt-BR');
}

// ---------- Lead modal ----------
function ensureLeadModal() {
  if (document.getElementById('leadModalBg')) return;
  const html = `
    <div class="lead-modal-bg" id="leadModalBg">
      <div class="lead-modal" role="dialog" aria-modal="true">
        <div class="lead-modal-head">
          <div>
            <h3 id="leadModalTitle">Falar com corretor</h3>
            <p id="leadModalDesc">Preencha para receber contato.</p>
          </div>
          <button class="lead-modal-close" onclick="closeLeadModal()" aria-label="Fechar">✕</button>
        </div>
        <form class="lead-modal-body" id="leadModalForm" onsubmit="return submitLead(event)">
          <div class="lead-modal-ref" id="leadModalRef"></div>
          <div class="lead-modal-field">
            <label for="leadName">Nome completo <span class="req">*</span></label>
            <input class="lead-modal-input" type="text" id="leadName" placeholder="Como podemos te chamar?" required autocomplete="name">
          </div>
          <div class="lead-modal-field">
            <label for="leadPhone">WhatsApp / Telefone <span class="req">*</span></label>
            <input class="lead-modal-input" type="tel" id="leadPhone" placeholder="(98) 9XXXX-XXXX" required autocomplete="tel">
          </div>
          <div class="lead-modal-field">
            <label for="leadEmail">E-mail (opcional)</label>
            <input class="lead-modal-input" type="email" id="leadEmail" placeholder="seu@email.com" autocomplete="email">
          </div>
          <div class="lead-modal-field">
            <label for="leadMsg">Mensagem</label>
            <textarea class="lead-modal-input" id="leadMsg" placeholder="Como podemos te ajudar?"></textarea>
          </div>
          <label class="lead-modal-consent">
            <input type="checkbox" id="leadConsent" checked>
            <span>Concordo com a Política de Privacidade da MR e autorizo o contato para fins comerciais relacionados ao serviço imobiliário.</span>
          </label>
        </form>
        <div class="lead-modal-success" id="leadModalSuccess" style="display:none;">
          <div class="check">✓</div>
          <h3>Recebemos seu contato!</h3>
          <p>Um corretor da MR vai entrar em contato em breve.<br>Geralmente respondemos em até 30 minutos no horário comercial.</p>
          <button class="lead-modal-secondary" onclick="closeLeadModal()">Fechar</button>
        </div>
        <div class="lead-modal-footer" id="leadModalFoot">
          <button type="submit" form="leadModalForm" id="leadModalSubmit" class="lead-modal-submit">Solicitar contato →</button>
          <a class="lead-modal-secondary" href="https://wa.me/5598981160785" target="_blank" rel="noopener">Prefiro WhatsApp direto</a>
        </div>
      </div>
    </div>
    <div class="site-toast" id="siteToast"></div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  document.getElementById('leadModalBg').addEventListener('click', e => {
    if (e.target.id === 'leadModalBg') closeLeadModal();
  });
}

function openLeadModal(opts) {
  ensureLeadModal();
  opts = opts || {};
  const modal = document.getElementById('leadModalBg');
  const refBox = document.getElementById('leadModalRef');
  const titleEl = document.getElementById('leadModalTitle');
  const descEl = document.getElementById('leadModalDesc');
  const submitBtn = document.getElementById('leadModalSubmit');

  const ctx = opts.context || 'geral';
  const ref = opts.ref || null;

  document.getElementById('leadModalForm').style.display = 'block';
  document.getElementById('leadModalSuccess').style.display = 'none';
  document.getElementById('leadModalFoot').style.display = 'flex';
  document.getElementById('leadName').value = '';
  document.getElementById('leadPhone').value = '';
  document.getElementById('leadEmail').value = '';
  document.getElementById('leadMsg').value = '';
  document.getElementById('leadConsent').checked = true;

  if (ctx === 'imovel') {
    titleEl.textContent = 'Falar sobre este imóvel';
    descEl.textContent = 'Um corretor da MR vai entrar em contato em breve.';
    submitBtn.textContent = 'Solicitar contato →';
    refBox.style.display = 'block';
    refBox.innerHTML = `Imóvel de interesse: <strong>${ref.codigo}</strong> · ${ref.titulo}`;
    document.getElementById('leadMsg').placeholder = 'Quer agendar visita? Tem alguma dúvida específica?';
  } else if (ctx === 'lancamento') {
    titleEl.textContent = 'Solicitar tabela e condições';
    descEl.textContent = 'Receba todas as informações sobre este lançamento.';
    submitBtn.textContent = 'Solicitar tabela →';
    refBox.style.display = 'block';
    refBox.innerHTML = `Empreendimento: <strong>${ref.nome}</strong>`;
    document.getElementById('leadMsg').placeholder = 'Faixa de investimento? Quantos quartos prefere?';
  } else if (ctx === 'b2b') {
    titleEl.textContent = 'Cadastre seu imóvel';
    descEl.textContent = 'Nosso diretor comercial vai falar com você em até 1 dia útil.';
    submitBtn.textContent = 'Agendar conversa →';
    refBox.style.display = 'block';
    refBox.innerHTML = `<strong>Administração de patrimônio</strong> · Atendimento institucional`;
    document.getElementById('leadMsg').placeholder = 'Quantos imóveis pretende cadastrar? Tipo de serviço?';
  } else {
    titleEl.textContent = 'Fale com a MR';
    descEl.textContent = 'Preencha para que possamos te ajudar.';
    submitBtn.textContent = 'Enviar mensagem →';
    refBox.style.display = 'none';
    document.getElementById('leadMsg').placeholder = 'Como podemos te ajudar?';
  }

  modal._opts = opts;
  modal.classList.add('show');
  document.body.classList.add('menu-open');
  setTimeout(() => document.getElementById('leadName').focus(), 200);
}

function closeLeadModal() {
  document.getElementById('leadModalBg').classList.remove('show');
  document.body.classList.remove('menu-open');
}

function submitLead(e) {
  e.preventDefault();
  const modal = document.getElementById('leadModalBg');
  const opts = modal._opts || {};
  const ctx = opts.context || 'geral';
  const ref = opts.ref || null;

  const nome = document.getElementById('leadName').value.trim();
  const phone = document.getElementById('leadPhone').value.trim();
  const email = document.getElementById('leadEmail').value.trim();
  const msg = document.getElementById('leadMsg').value.trim();
  const consent = document.getElementById('leadConsent').checked;

  if (!nome || !phone) { alert('Preencha nome e telefone para continuar.'); return false; }
  if (!consent) { alert('Você precisa concordar com a Política de Privacidade.'); return false; }

  let imovelLabel = 'Contato geral';
  let origem = 'Site (contato)';
  if (ctx === 'imovel') {
    imovelLabel = ref.codigo + ' · ' + ref.titulo;
    origem = 'Site (ficha do imóvel)';
  } else if (ctx === 'lancamento') {
    imovelLabel = 'Lançamento · ' + ref.nome;
    origem = 'Site (lançamento)';
  } else if (ctx === 'b2b') {
    imovelLabel = 'Administração B2B';
    origem = 'Site (B2B)';
  }

  const lead = {
    id: Date.now(),
    nome: nome,
    contato: phone,
    email: email || '—',
    imovel: imovelLabel,
    origem: origem,
    recebido: 'agora mesmo',
    recebidoEm: new Date().toISOString(),
    status: 'new',
    mensagem: msg || '(sem mensagem)',
    lido: false
  };

  const leads = JSON.parse(localStorage.getItem('mr_leads') || '[]');
  leads.unshift(lead);
  localStorage.setItem('mr_leads', JSON.stringify(leads));
  window.dispatchEvent(new CustomEvent('mr-new-lead', { detail: lead }));

  document.getElementById('leadModalForm').style.display = 'none';
  document.getElementById('leadModalFoot').style.display = 'none';
  document.getElementById('leadModalSuccess').style.display = 'block';

  setTimeout(() => closeLeadModal(), 4500);
  return false;
}

// ESC fecha modal
document.addEventListener('keydown', e => {
  const bg = document.getElementById('leadModalBg');
  if (e.key === 'Escape' && bg && bg.classList.contains('show')) closeLeadModal();
});

// ---------- Hamburger menu ----------
(function initMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const overlay = document.querySelector('.mobile-overlay');
  if (!menuToggle || !nav || !overlay) return;

  const close = () => {
    nav.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  const open = () => {
    nav.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  };

  menuToggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) close();
    else open();
  });
  overlay.addEventListener('click', close);
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
  });
})();
