
async function getValue () {
    const value = await document.querySelector('#input-id').value;
    console.log(value);
}

getValue();

// обернуть обращение к value внутрь обработчика события change, и туда же нужен дебаунс
