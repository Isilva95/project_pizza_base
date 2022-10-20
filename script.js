let modalQt = 1

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