/* Product spec-sheet popup.
   Content comes from window.CP_PRODUCTS (set inline in products.html).
   To add spec details once the product file arrives, fill each product's
   "specs" array, e.g. {"label":"Material","value":"..."} */
(function () {
  var modal = document.getElementById('cpModal');
  if (!modal) return;
  var products = window.CP_PRODUCTS || [];
  var lastFocus = null;
  var f = function (id) { return document.getElementById(id); };

  function row(label, value) {
    var tr = document.createElement('tr');
    var th = document.createElement('th'); th.textContent = label;
    var td = document.createElement('td');
    if (Array.isArray(value)) {
      var ul = document.createElement('ul');
      value.forEach(function (v) { var li = document.createElement('li'); li.textContent = v; ul.appendChild(li); });
      td.appendChild(ul);
    } else { td.textContent = value; }
    tr.appendChild(th); tr.appendChild(td);
    return tr;
  }

  function open(i, trigger) {
    var p = products[i]; if (!p) return;
    lastFocus = trigger || null;
    f('cpModalCat').textContent = p.category;
    f('cpModalTitle').textContent = p.name;
    f('cpModalDesc').textContent = p.desc;
    if (p.img && f('cpModalImg')) { f('cpModalImg').src = p.img; f('cpModalImg').alt = p.name; }
    if (p.page && f('cpModalPdf')) { f('cpModalPdf').href = 'documents/ClearPath-Product-Catalogue.pdf#page=' + (p.page + 3); }
    var body = f('cpModalSpecs'); body.innerHTML = '';
    body.appendChild(row('Category', p.category));
    body.appendChild(row('Focus', p.focus));
    (p.specs || []).forEach(function (s) { body.appendChild(row(s.label, s.value)); });
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.cp-modal-close').focus();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.cp-product-card').forEach(function (card) {
    card.addEventListener('click', function () { open(+card.getAttribute('data-product'), card); });
  });
  modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
})();
