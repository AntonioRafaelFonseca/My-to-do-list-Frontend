const red = document.querySelector('#red');
const green = document.querySelector('#green');
const yellow = document.querySelector('#yellow');
const sendBtn = document.querySelector('#Sbtn');
const apiURL = 

const list = document.querySelector('#MsgList');

red.addEventListener('click', Pred);
yellow.addEventListener('click', Pyellow);
sendBtn.addEventListener('click', send)

function Pred()
{
  if(!yellow.checked){
    yellow.checked = true;
  }
  if(!green.checked){
    green.checked = true;
  }
}

function Pyellow()
{
  if(!green.checked){
    green.checked = true;
  }
  if(red.checked){
    red.checked = false;
  }
}


async function send(){
  let msg;
  fetch(apiURL)
  .then((resp) => resp.json())
  .then((txt) => {
    msg = txt[0];

    tba = `<li>${msg}</li>`;
    list.innerHTML = list.innerHTML + tba;
  })
  .catch((err) => {console.log(err)})
}