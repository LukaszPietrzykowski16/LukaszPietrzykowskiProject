import './style.css';
import { apiurl } from './src/constants';

document.title = 'prework';

const characters = document.querySelector('section');
const buttonAll = document.getElementById('all');

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

  const inputValue = (document.querySelector('.search > input').value = 1);

  document.querySelector('.search > span').innerText = info.pages;
 
  document
    .querySelector('.search > input')
    .addEventListener('change', function () {
      // arrow function doesn't have unique this
      fetch(apiurl + '?page=' + this.value)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          results = res.results;
        });
    });

  function pageNotAvailable() {
    const p = document.createElement('p');
    const text = document.createTextNode('Nie ma takiej strony');
    p.prepend(text);
    characters.append(p);
  }

  function pageNotAvailableStatments() {
    return (
      document.querySelector('.search > input').value > 42 ||
      document.querySelector('.search > input').value < 1
    );
  }

  function getOnlyAlives() {
    characters.innerHTML = '';
    const container = document.querySelectorAll('.container');
    // cleaning up szczegoly section
    container.forEach((e) => e.remove());
    // checking if value is correct
    if (pageNotAvailableStatments()) {
      pageNotAvailable();
    } else {
      results.forEach((res, index) => {
        if (res.status === 'Alive') {
          // appearing alive characters
          const p = document.createElement('p');
          const lp = document.createElement('span');

          lp.innerText = index;
          const text = document.createTextNode(' ' + res.name);
          p.prepend(lp, text);

          characters.append(p);

          // details about selected by status alive
          details(p, results, index);
        }
      });
    }
  }

  function deadsOnly() {
    characters.innerHTML = '';
    const container = document.querySelectorAll('.container');
    // cleaning up szczegoly section
    container.forEach((e) => e.remove());
    // checking if value is correct
    if (pageNotAvailableStatments()) {
      pageNotAvailable();
    } else {
      results.forEach((res, index) => {
        if (res.status === 'Dead') {
          // appearing dead characters
          const p = document.createElement('p');
          const lp = document.createElement('span');

          lp.innerText = index;
          const text = document.createTextNode(' ' + res.name);
          p.prepend(lp, text);

          characters.append(p);

          // details about selected by status dead
          details(p, results, index);
        }
      });
    }
  }

  function all() {
    characters.innerHTML = '';
    const container = document.querySelectorAll('.container');
    // cleaning up szczegoly section
    container.forEach((e) => e.remove());
    // checking if value is correct
    if (pageNotAvailableStatments()) {
      pageNotAvailable();
    } else {
      results.forEach((res, index) => {
        // appearing dead characters
        const p = document.createElement('p');
        const lp = document.createElement('span');

        lp.innerText = index;
        const text = document.createTextNode(' ' + res.name);
        p.prepend(lp, text);

        characters.append(p);

        // details about selected by status dead
        details(p, results, index);
      });
    }
  }

  alive.addEventListener('click', getOnlyAlives);
  dead.addEventListener('click', deadsOnly);
  buttonAll.addEventListener('click', all);

  // adding results to DOM!

  for (let index in results) {
    const p = document.createElement('p');
    const lp = document.createElement('span');

    lp.innerText = index;
    const text = document.createTextNode(' ' + results[index].name);
    p.prepend(lp, text);

    characters.append(p);

    details(p, results, index);
  }
})();

// details about clicked link
function details(p, results, index) {
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
    <img src="${results[index].image}" style="width: 100px" alt="${results[index].name}"/>
    <div> imie: ${results[index].name} <div/> 
    <div> status: ${results[index].status} <div/> 
    <div> p??e??: ${results[index].gender} <div/> 
    <div/> 
    `;

    details.appendChild(newDiv);
    // getting image
    const image = document.querySelector('img');
    image.addEventListener('click', () => {
      const dialog = document.createElement('dialog');
      document.body.append(dialog);
      // and that's not deleting our szczeg????y childrean
      dialog.innerHTML = `<img src="${image.src}" style="width: 400px" alt="${results[index].name}"/>`;

      dialog.showModal();

      const close = document.createElement('button');

      close.innerText = 'zamknij';

      close.addEventListener('click', () => {
        dialog.close();
      });

      dialog.append(close);
    });
  });
}
