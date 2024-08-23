const appContainer = document.querySelector('.app-container');
const form = document.querySelector('.searching-form');
const input = form.querySelector('.searching-form__input');
const respondList = document.querySelector('.respond-container');
const resultSection = document.querySelector('.repos-container');
let items = [];

function createListItem (item) {
    const listItem = document.createElement('li');
    listItem.classList.add('respond-container__item');
    listItem.textContent = item.name;
    listItem.setAttribute('id', `${item.id}`)
    respondList.append(listItem);
    return respondList;
}

function createReposList (item) {
    const {owner} = item;

    const reposItem = document.createElement('div');
    reposItem.classList.add('repos-container__item');
    reposItem.setAttribute('id', `${item.id}`);

    const closeButton = document.createElement('button');
    closeButton.classList.add('repos-container__button');
    closeButton.setAttribute('id', `${item.id}`);

    const infoWrapper = document.createElement('p');
    infoWrapper.classList.add('repos-container__wrapper');

    const reposListName = document.createElement('span');
    reposListName.classList.add('repos-container__repo-info');
    reposListName.textContent = `Name: ${item.name}`;

    const reposListOwner = document.createElement('span');
    reposListOwner.classList.add('repos-container__repo-info');
    reposListOwner.textContent = `Owner: ${owner.login}`;

    const reposListStars = document.createElement('span');
    reposListStars.classList.add('repos-container__repo-info');
    reposListStars.textContent = `Stars: ${item.stargazers_count}`;

    infoWrapper.append(reposListName, reposListOwner, reposListStars);
    reposItem.append(infoWrapper, closeButton);
    resultSection.append(reposItem);
    return infoWrapper;
}

function selectMenuItem (event) {
    const target = event.target;
    const asd = items.find((item) => item.id === Number(target.id));
    createReposList(asd);
    input.value = null;
    respondList.innerHTML = null;
}

function removeReposItem (event) {
    const target = event.target;
    if (target.tagName !== 'BUTTON') {
        return;
    }
    target.parentNode.remove();
}

function clearValue () {
    respondList.innerHTML = null;
    if (respondList.children.length !== 0) {
        respondList.innerHTML = null;
        getValue();
    } 
}

function debouncingInput (fn, debounceTime) {
    let timeout;
    return function () {
        const event = () => {fn.apply(this, arguments)};
        clearTimeout(timeout);
        timeout = setTimeout(event, debounceTime);
    }
}

async function getValue () {
    if (!input.value.trim()) {
        return;
    }
    const queryValue = `q=${input.value.trim()}&per_page=5`;
    const respond = await fetch(`https://api.github.com/search/repositories?${queryValue}`);
    const repos = await respond.json();
    items = repos.items;
    items.forEach((item) => {
        createListItem(item);
    });
}

const debouncingValue = debouncingInput(getValue, 800);

input.addEventListener('input', debouncingValue);
resultSection.addEventListener('click', removeReposItem);
respondList.addEventListener('click', selectMenuItem);
input.addEventListener('input', clearValue);
