/*------LogIn modal-----*/
var modal = document.getElementById('loginModal');
var modalBtn = document.getElementById('modalBtn');
var closeBtn = document.getElementsByClassName('closeBtn')[0];
const signUpButton = document.getElementById('signUp');
const backButton = document.getElementById('back');
const container = document.getElementById('container');

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside)

function openModal()
{
   modal.style.display='block';
}

function closeModal()
{
    modal.style.display='none';
    container.classList.remove('sign-up-active');
}
function clickOutside(e)
{
    if (e.target == modal)
    {
        modal.style.display='none';
    container.classList.remove('sign-up-active');
    }
}

signUpButton.addEventListener('click',()=>container.classList.add('sign-up-active'));
backButton.addEventListener('click',()=>container.classList.remove('sign-up-active'));