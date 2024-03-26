const formBusca = document.getElementById('form-busca');
const inputBusca = document.getElementById('input-busca');
const containerPersonagens = document.getElementById('container-personagens');
const barraNavegacao = document.getElementById('barra-navegacao');
const botaoVoltar = document.getElementById('botao-voltar');
const botaoProximo = document.getElementById('botao-proximo');

let currentUrl = 'https://rickandmortyapi.com/api/character';

function fetchData() {
  if (currentUrl === 'null') return;

  fetch(currentUrl)
    .then(data => data.json())
    .then(json => {
      setNavigationUrls(json.info.prev, json.info.next);
      printCharacters(json.results);
    });
}

function setNavigationUrls(prev, next) {
  botaoVoltar.value = prev;
  botaoProximo.value = next;
}

function navigationAction() {
  currentUrl = this.value;
  fetchData();
}

function searchByName(e) {
  e.preventDefault();

  currentUrl =
    'https://rickandmortyapi.com/api/character?name=' + inputBusca.value;

  fetchData();
}

function printCharacters(charactersArr) {
  containerPersonagens.innerHTML = '';

  charactersArr.forEach(item => {
    const personagemCard = document.createElement('div');

    personagemCard.className = 'personagem-card';

    const imgElement = document.createElement('img');
    const nomeElement = document.createElement('h3');
    const statusElement = document.createElement('p');
    const vistoPorUltimoElement = document.createElement('h4');
    const locationElement = document.createElement('p');
    const vistoPrimeiroElement = document.createElement('h4');
    const originElement = document.createElement('p');

    imgElement.src = item.image;
    imgElement.alt = item.name + "'s image";
    nomeElement.innerText = item.name;
    statusElement.innerText = item.status + ' - ' + item.species;
    vistoPorUltimoElement.innerText = 'Visto por último em:';
    locationElement.innerText = item.location.name;
    vistoPrimeiroElement.innerText = 'Visto primeiro em:';
    originElement.innerText = item.origin.name;

    personagemCard.appendChild(imgElement);
    personagemCard.appendChild(nomeElement);
    personagemCard.appendChild(statusElement);
    personagemCard.appendChild(vistoPorUltimoElement);
    personagemCard.appendChild(locationElement);
    personagemCard.appendChild(vistoPrimeiroElement);
    personagemCard.appendChild(originElement);

    containerPersonagens.appendChild(personagemCard);
  });
}

botaoVoltar.addEventListener('click', navigationAction);
botaoProximo.addEventListener('click', navigationAction);
formBusca.addEventListener('submit', searchByName);

fetchData();
