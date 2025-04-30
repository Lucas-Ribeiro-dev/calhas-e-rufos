const contactForm = document.querySelector('.form-container');
let name = document.getElementById('name');
let whatsapp = document.getElementById('whatsapp');
let email = document.getElementById('email');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = {
        name: name.value,
        whatsapp: whatsapp.value,
        email: email.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            alert('Email Enviado');
            name.value = '';
            whatsapp.value = '';
            email.value = '';
            message.value = '';
        } else {
            alert('Algo deu errado! Tente novamente.')
        }
    }

    xhr.send(JSON.stringify(formData));
})