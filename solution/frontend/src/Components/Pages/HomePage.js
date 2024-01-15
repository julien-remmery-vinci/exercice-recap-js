import { clearPage } from '../../utils/render';

const HomePage = () => {
  clearPage();
  const main = document.querySelector('main');
  const messagesDiv = document.createElement('div');
  messagesDiv.id = "messagesDiv"
  main.appendChild(messagesDiv);
  if(localStorage.getItem('user')){
    displayForm(main);
  };
  displayMessages();
  
}

function displayForm(main) {
  const form = document.createElement('form');
  const message = document.createElement('input');
  const submit = document.createElement('input');
  message.type = 'textarea';
  submit.type = 'submit';
  message.placeholder = 'message';
  form.appendChild(message);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/messages/add', {
      method: "POST",
      body: JSON.stringify({
        message: message.value,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": JSON.parse(localStorage.getItem('user')).token
      }
    })
    .then(displayMessages());
  });
}

function displayMessages(){
  const main = document.querySelector('main');
  const messagesDiv = document.querySelector('#messagesDiv');
  messagesDiv.innerHTML = "";
  main.appendChild(messagesDiv);
  fetch('http://localhost:3000/messages/all')
  .then(response => response.json())
  .then((result) => {
    result.reverse().forEach((e) => {
      const message = `
        <div class="message" style="border: 1px solid black">
          <p value="${e.id}">${e.message}</p>
        </div>
      `;
      messagesDiv.innerHTML += message;
    })
    if(localStorage.getItem('user')){
      const messages = document.querySelectorAll('.message');
      messages.forEach((m) => {
        const modifyButton = document.createElement('button');
        const removeButton = document.createElement('button');
        modifyButton.textContent = "Modidy";
        removeButton.textContent = "Remove";
        m.appendChild(modifyButton);
        m.appendChild(removeButton);
        modifyButton.addEventListener('click', () => {
          m.removeChild(modifyButton);
          m.removeChild(removeButton);
          m.children[0].setAttribute('contenteditable', true);
          const submitButton = document.createElement('button');
          submitButton.textContent = "Submit";
          m.appendChild(submitButton);
          submitButton.addEventListener('click', () => {
            fetch('http://localhost:3000/messages/modify', {
              method: "PATCH",
              body: JSON.stringify({
                id: m.children[0].getAttribute('value'),
                message: m.children[0].textContent,
              }),
              headers:{
                  "Content-Type": "application/json",
                  "Authorization": JSON.parse(localStorage.getItem('user')).token
              }
            })
            m.children[0].setAttribute('contenteditable', false);
            m.removeChild(submitButton);
            m.appendChild(modifyButton);
            m.appendChild(removeButton);
          })
        })
        removeButton.addEventListener('click', () => {
          m.removeChild(modifyButton);
          m.removeChild(removeButton);
          const yesButton = document.createElement('button');
          const noButton = document.createElement('button');
          yesButton.textContent = "Remove";
          noButton.textContent = "Cancel";
          m.appendChild(yesButton);
          m.appendChild(noButton);
          yesButton.addEventListener('click', () => {
            fetch('http://localhost:3000/messages/remove', {
              method: "DELETE",
              body: JSON.stringify({
                id: m.children[0].getAttribute('value'),
              }),
              headers:{
                  "Content-Type": "application/json",
                  "Authorization": JSON.parse(localStorage.getItem('user')).token
              }
            })
            .then(displayMessages())
          })
          noButton.addEventListener('click', () => {
            m.removeChild(yesButton);
            m.removeChild(noButton);
            m.appendChild(modifyButton);
            m.appendChild(removeButton);
          })
        })
      })
    }
  })
}

export default HomePage;
