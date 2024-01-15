import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
    clearPage();
    const form = document.createElement('form');
    const username = document.createElement('input');
    const password = document.createElement('input');
    const submit = document.createElement('input');
    username.type = 'text';
    password.type = 'password';
    submit.type = 'submit';
    username.placeholder = 'username';
    password.placeholder = 'password';
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(submit);
    const main = document.querySelector('main');
    main.appendChild(form);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/auths/login', {
            method: "POST",
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
            headers:{
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then((result) => {
            localStorage.setItem('user', JSON.stringify(result));
            Navbar();
            Navigate('/');
        })
    })
  };
  
  export default HomePage;
  