// ideia retirada no site: https://stackoverflow.com/questions/53799108/how-to-add-a-loading-animation-while-fetch-data-from-api-vanilla-js
let loadingStatus = false;
function verifyRequestAPI() {
  if (loadingStatus) {
    const spanLoading = document.createElement('span');
    spanLoading.className = 'loading';
    spanLoading.innerText = 'loading...';
    document.body.appendChild(spanLoading);
  } else if (loadingStatus === false) {
    document.querySelector('.loading').remove();
  }
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

let sum = 0;
let arr = [];

function cartItemClickListener(event) {
  const spanSum = document.getElementsByClassName('total-price')[0];
  event.target.remove();
  
  const liText = event.target.innerText;
  const price = Number(liText.substring(liText.indexOf('$') + 1, liText.length));
  sum -= price;
  console.log(arr);
  
  spanSum.innerText = `${Math.abs(sum.toFixed(2))}`;
  arr = [Math.abs(sum)]; // acho que tenho que alterar esse arr. Pensar em como remover apenas o item clicado do array
  
  localStorage.setItem('listCart', document.getElementsByClassName('cart__items')[0].innerHTML);
  localStorage.setItem('sum', Math.abs(sum));
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const cartItems = document.getElementsByClassName('cart__items')[0];
  const spanSum = document.querySelector('.total-price');
  const li = document.createElement('li');

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  
  const liText = li.innerText;
  arr.push(Number(liText.substring(liText.indexOf('$') + 1, liText.length)));
  console.log(arr);
  sum = arr.reduce((acumulator, currentValue) => acumulator + currentValue);
  
  spanSum.innerHTML = `${Math.abs(sum.toFixed(2))}`;
  cartItems.appendChild(li);

  localStorage.setItem('listCart', cartItems.innerHTML);
  localStorage.setItem('sum', Math.abs(sum));
}

function fetchID(id) {
  loadingStatus = true;
  verifyRequestAPI();

  fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((data) => data.json())
  .then((product) => {
    loadingStatus = false;
    verifyRequestAPI();
    createCartItemElement(product);
 });
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const sectionItems = document.querySelector('.items'); 
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', () => {
      fetchID(sku);
    });

  sectionItems.appendChild(section); 
}

function fetchProduct(product) {
  loadingStatus = true;
  verifyRequestAPI();

  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((response) => response.json())
    .then(({ results }) => {
      loadingStatus = false;
      verifyRequestAPI();

      results.forEach((data) => createProductItemElement(data));
    });
}

function removeAllItems() {
  const cartItems = document.getElementsByClassName('cart__items')[0];
  const btnRemove = document.querySelector('.empty-cart');
  btnRemove.addEventListener('click', () => {
    cartItems.innerHTML = '';
    const spanSum = document.getElementsByClassName('total-price')[0];
    spanSum.innerHTML = 0;
    arr = [];
    localStorage.setItem('listCart', cartItems.innerHTML);
    localStorage.setItem('sum', 0);
  });
}

function loadStorage() {
  const items = document.getElementsByTagName('ol')[0];
  const spanSum = document.querySelector('.total-price');
  const sumLocalStorage = Number(localStorage.getItem('sum'));
  spanSum.innerHTML = Math.abs(sumLocalStorage.toFixed(2));
  
  items.addEventListener('click', (event) => {
    event.target.remove();
    
    const liText = event.target.innerText;
    const price2 = Number(liText.substring(liText.indexOf('$') + 1, liText.length));
    // ao recarregar a página nao consigo somar e subtrair os valores.
    localStorage.setItem('listCart', items.innerHTML);
  });
  
  localStorage.setItem('sum', sum);
  items.innerHTML = localStorage.getItem('listCart');
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

window.onload = function onload() {
  loadStorage();
  removeAllItems();
  const btnSearch = document.querySelector('.btn-search');
  btnSearch.addEventListener('click', () => {
    document.querySelector('.items').innerHTML = '';
    const input = document.getElementById('input__product').value;
    fetchProduct(input);
  });
  /*   const btnSearch = document.querySelector('.btn-search');
  const input = document.getElementById('#input__product');
    input.addEventListener('input', () => {
      console.log(input.value);
    }); */
};
