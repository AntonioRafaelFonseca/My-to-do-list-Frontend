const red = document.querySelector('#red');
const green = document.querySelector('#green');
const yellow = document.querySelector('#yellow');
const sendBtn = document.querySelector('#Sbtn');
const apiURL = 'https://artftodol.onrender.com/items'

const textinp = document.querySelector('#TextInput');

const list = document.querySelector('#MsgList');

red.addEventListener('click', Pred);
yellow.addEventListener('click', Pyellow);
sendBtn.addEventListener('click', send)

document.addEventListener('keydown', k => {
  // Verifica se a tecla é 'd' e se o valor no input é um número válido
  if (k.key === 'd' && textinp.value.trim() !== "" && !isNaN(textinp.value)) {
    del();
    textinp.value = "";
  }
});
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

function getInp(){
  if(red.checked){
    return 3;
  }
  else if (yellow.checked){
    return 2;
  }
  else {
    return 1;
  }
}

async function send(){
  let text = textinp.value;
  if(text == 'delall'){
    delAll();
    return
  }
  await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // ISTO resolve o erro 415
    },
    body: JSON.stringify({prompt: text, importance: getInp()})
  })
  get();
}

async function get(){
  var color;
  fetch(apiURL)
  .then((resp) => resp.json())
  .then((tasks) => {
    
    for(t of tasks){      
      if(t.importance == 3){
      color = "red" 
    }else if(t.importance == 2){
      color = "yellow"
    }else{
      color = "green"
    }

    }
    const htmlLinhs = tasks.map(t => {
      return `<li style="border-color: ${color};">${t.id}. ${t.prompt}</li>`;
    }).join('');

    list.innerHTML = htmlLinhs;
  })
  .catch((err) => {console.log(err)});
}

function del(){
  id = textinp.value;
  textinp.value = "";

  fetch(apiURL+'/'+id, {
    method: 'DELETE'
  })
  .then(get)
  .catch(e => {console.log(e)});
}
setInterval(get, 2000);

async function delAll()
{
  if(confirm('Delete All?')){
  await fetch(apiURL+'delete_all', {method: 'DELETE'})
  get();
  }
}