const appContainer = document.querySelector('.app-container');
const form = document.querySelector('.searching-form');
const input = form.querySelector('.searching-form__input');
const respondList = document.querySelector('.respond-container');
const resultSection = document.querySelector('.repos-container');

function createListItem (item) {
    const listItem = document.createElement('li');
    listItem.classList.add('respond-container__item');
    listItem.textContent = item;
    respondList.append(listItem);
    return respondList;
}

function createReposList (item) {
    const {owner} = item;

    const reposItem = document.createElement('div');
    reposItem.classList.add('repos-container__item');

    const closeButton = document.createElement('button');
    closeButton.classList.add('repos-container__button');

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

function debouncingInput (fn, debounceTime) {
    let timeout;
    return function () {
        const event = () => {fn.apply(this, arguments)};
        clearTimeout(timeout);
        timeout = setTimeout(event, debounceTime);
    }
}

function selectMenuItem (event) {
    const target = event.target;
    console.log(target);
    console.log(event);
    if (target.tagName !== 'LI') {
        return;
    }
    if (this.name === target.textContent) {
        createReposList(this);
        input.value = null;
        respondList.setAttribute('data-hide', 'hidden');
    }
}

async function getValue () {
    const queryValue = `q=${input.value}&per_page=5`;
    const respond = await fetch(`https://api.github.com/search/repositories?${queryValue}`);
    if (respond.ok) {
        const repos = await respond.json();
        console.log(repos.items);
        repos.items.forEach((item) => {
            createListItem(item.name);
        });
        const selectMenu = document.querySelector('.respond-container');
        repos.items.forEach((item) => {
            console.log(item);  
            selectMenu.addEventListener('click', selectMenuItem.bind(item));
            respondList.removeAttribute('data-hide');
        });
        

    }
}

// createReposList({name: 'JOhn', stargazers_count: 333333, owner: {login:'Opera'}});

const debouncingValue = debouncingInput(getValue, 1000);

input.addEventListener('input', debouncingValue);
