const appContainer = document.querySelector('.app-container');
const form = document.querySelector('.searching-form');
const input = form.querySelector('.searching-form__input');
const resultSection = document.querySelector('.repos-container');


function createListItem (item) {
    const list = document.createElement('ul');
    list.classList.add('respond-container');
    const listItem = document.createElement('li');
    listItem.classList.add('respond-container__item');
    listItem.textContent = item;
    list.append(listItem);
    form.append(list);
    return list;
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
    // const target = event.target;
    console.log(event.target);
    

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
        console.log(selectMenu);
        selectMenu.addEventListener('click', selectMenuItem);
    }
}

// createReposList({name: 'JOhn', stargazers_count: 333333, owner: {login:'Opera'}});

const debouncingValue = debouncingInput(getValue, 1000);

input.addEventListener('input', debouncingValue);
