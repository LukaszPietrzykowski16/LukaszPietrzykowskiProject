import './style.css';
import { apiurl } from './src/constants';

document.title = 'prework';

const characters = document.querySelector('section');

async function getCharacters() {
  const response = await fetch(apiurl, {
    method: 'GET',
  });

  var loading = false;

  return await response.json();
}

(async () => {
  var loading = true;
  let { results, info } = await getCharacters();

  document.querySelector('.search > input').value = 1;
  document.querySelector('.search > span').innerText = info.pages;

  document.querySelector('.search > input').addEventListener('change', () => {
    fetch(apiurl + '?page=' + this.value)
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        results = res.results;
      });
  });

  function getOnlyAlives() {
    characters.innerHTML = '';

    results.forEach((res, index) => {
      if (res.status === 'Alive') {
        results.splice(index, 1);
      }
    });

    //todo render filtered results!
  }

  function deadsOnly() {
    characters.innerHTML = '';

    results.forEach((res, index) => {
      if (res.status === 'Dead') {
        results.splice(index, 1);
      }
    });

    //todo render filtered results!
  }

  function all2() {
    // todo
  }

  alive.addEventListener('click', getOnlyAlives);
  dead.addEventListener('click', deadsOnly);
  all.addEventListener('click', all2);

  // adding results to DOM!
  for (let index in results) {
    const p = document.createElement('p');
    const lp = document.createElement('span');

    lp.innerText = index + 1;
    const text = document.createTextNode(' ' + results[index].name);
    p.prepend(lp, text);

    characters.append(p);

    p.addEventListener('click', () => {
      const details = document.querySelector('section:not(:first-child)');
      const container = document.querySelectorAll('.container');
      results[index];
      const newDiv = document.createElement('div');
      newDiv.classList.add('newDiv');

      // checking if it's more than 0
      if (container.length > 0) {
        container.forEach((e) => e.remove());
      }

      // displaying images
      newDiv.innerHTML = `
      <div class="container"> 
      <img src="${results[index].image}" style="width: 100px"/>
      <div> imie: ${results[index].name} <div/> 
      <div> status: ${results[index].status} <div/> 
      <div> płeć: ${results[index].gender} <div/> 
      <div/> 
      `;

      details.appendChild(newDiv);
      /*
      const n = document.createElement('div');
      const gender = document.createElement('div');
      const status = document.createElement('div');
      const jpg = document.createElement('img');
      jpg.width = '100';

      n.innerText = 'imie: ' + results[index].name;
      gender.innerText = 'płeć: ' + results[index].gender;
      status.innerText = 'status: ' + results[index].status;
      jpg.src = results[index].image;
      */
      /*
      jpg.onclick = () => {
        const dialog = document.createElement('dialog');
        document.body.append(dialog);

        dialog.append(jpg);
        jpg.width = 300;

        dialog.showModal();

        const close = document.createElement('button');

        close.innerText = 'zamknij';

        close.addEventListener('click', () => {
          dialog.close();
        });

        dialog.append(close);
      };
      */
    });
  }
})();
