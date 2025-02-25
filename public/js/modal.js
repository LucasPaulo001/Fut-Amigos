function ativeModal(){
    const window = document.getElementById('windowRegister')
    window.classList.add('ativeWindow')
}

window.addEventListener('click', (btn) => {
    if(btn.target.id === 'close'){
        document.getElementById('windowRegister').classList.remove('ativeWindow')
    }
})
