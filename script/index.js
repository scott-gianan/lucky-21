const buttons = document.querySelectorAll('button');


buttons.forEach(button => {
    button.addEventListener('click', () => {
        //use innerText;
        localStorage.setItem('playerMoney',button.innerText);
        window.location = window.location.origin+'/game.html';
    })
})

// function redirect(){
    
// }

