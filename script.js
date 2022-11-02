let cart = [];
let modalQt = 1;
let modalKey = 0;

// Retona apenas o item individual.
const c = (el) => document.querySelector(el);
// Retorna um array com os items que foi encontrado.
const cs = (el) => document.querySelectorAll(el);

// Estou mapeando e preenchedo a lista de produtos e modal.
pizzaJson.map((item, index)=> {
  // Aqui estou clonando meu .pizza-item.
  let pizzaItem = c('.models .pizza-item').cloneNode(true);

  // Inserindo qual a chave daquele produto expecifico.
  pizzaItem.setAttribute('data-key', index);
  // Preencher as informações em .pizza-item.
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
  pizzaItem.querySelector('a').addEventListener('click',(e) => {
    e.preventDefault();

    // Pegando as informações do produto.
    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalQt = 1;
    modalKey = key;

    // Preenchendo as informações no Modal.
    c('.pizzaBig img').src = pizzaJson[key].img;
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    c('.pizzaInfo--size.selected').classList.remove('selected');
    cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if(sizeIndex == 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });
    
    // Aqui é a seleção de quantidade do produto.
    c('.pizzaInfo--qt').innerHTML = modalQt;

    // Abrindo o modal.
    c('.pizzaWindowArea').style.opacity = 0;
    c('.pizzaWindowArea').style.display = 'flex';
    // Aqui estou colocando um tempo para abrir o modal.
    setTimeout(() => {
      c('.pizzaWindowArea').style.opacity = 1;
    }, 200);
  });

  // Mostrando na tela.
  c('.pizza-area').append(pizzaItem);
});

// Eventos do MODAL
function closeModal() {
  c('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    c('.pizzaWindowArea').style.display = 'none';
  }, 500);
}
// Aplicando o evento de fechar modal.
cs('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
  item.addEventListener('click', closeModal);
});
// Aqui é a parte de aumetar e diminuir a quantidade do produto.
c('.pizzaInfo--qtmenos').addEventListener('click',() => {
  if(modalQt > 1) {
    modalQt--;
    c('.pizzaInfo--qt').innerHTML = modalQt;
  }
});
c('.pizzaInfo--qtmais').addEventListener('click',() => {
  modalQt++;
  c('.pizzaInfo--qt').innerHTML = modalQt
});
// Aqui é a parte de selecionar o tamanho do produto.
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
  size.addEventListener('click',(e) => {
    c('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
  });
});
// Aqui é a parte de adicionar o produto no carrinho.
c('.pizzaInfo--addButton').addEventListener('click',() => {
  let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

  // Aqui vamos identificar as informações do produto antes de adicionar no carrinho.
  let identifier = pizzaJson[modalKey].id + '@' + size;

  // Essa é uma verificação se o produto já esta adicionado no carrinho.
  let key = cart.findIndex((item) => item.identifier == identifier);

  // Aqui é uma condição de aumentar a quantidade de um produto que já esteja no carrinho ou não.
  if(key > -1) {
    cart[key].qt += modalQt;
  } else {
    cart.push({
      identifier,
      id:pizzaJson[modalKey].id,
      size,
      qt:modalQt
    });
  }

  updateCart();
  closeModal();
});

// Carrinho (Atualização do Carrinho)
function updateCart() {
  if(cart.length > 0) {
    c('aside').classList.add('show');
    c('.cart').innerHTML = '';
    for(let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      let cartItem = c('.models .cart--item').cloneNode(true);

      let pizzaSizeName;
      switch(cart[i].size) {
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
      }
      // Adicionando o nome do produto no carrinho de acordo com o produto que foi selecionado.
      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

      // Preencher as informações em cartItem.
      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

      c('.cart').append(cartItem);
    }
  } else {
    c('aside').classList.remove('show');
  }
}