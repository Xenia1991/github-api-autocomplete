const appContainer = document.querySelector('.app-container');
const form = document.querySelector('.searching-form');
const input = form.querySelector('.searching-form__input');

function debouncingInput (fn, debounceTime) {
    let timeout;
    return function () {
        const event = () => {fn.apply(this, arguments)};
        clearTimeout(timeout);
        timeout = setTimeout(event, debounceTime);
    }
}

async function getValue () {
    const queryValue = `q=${input.value}&per_page=5`;
    const respond = await fetch(`https://api.github.com/search/repositories?${queryValue}`);
        if (respond.ok) {
            const users = await respond.json();
            users.items.map((item) => {
                createListItem(item.name);
        });
    }

}

const debouncingValue = debouncingInput(getValue, 1000);

function createListItem (obj) {
    const list = document.createElement('ul');
    list.classList.add('respond-container');
    const listItem = document.createElement('li');
    listItem.classList.add('respond-container__item');
    listItem.textContent = obj;
    list.appendChild(listItem);
    appContainer.appendChild(list);
}

// createList();
input.addEventListener('input', debouncingValue);

