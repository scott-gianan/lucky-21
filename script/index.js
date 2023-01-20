const buttons = document.querySelectorAll('button');


buttons.forEach(button => {
    button.addEventListener('click', () => {
        //use innerText;
        localStorage.setItem('playerMoney',button.innerText);
        window.location.href = window.location.href+'game.html';
    })
})
