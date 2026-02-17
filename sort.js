const URLAPI = 'https://artftodol.onrender.com/items'
const ul = document.querySelector('#MsgList');
const sorterList = document.querySelector('#sorterlist')

const vi = document.querySelector('#vi')
const ki = document.querySelector('#ki')
const ni = document.querySelector('#ni')

let g= 1;

vi.addEventListener('click', () => {g = 3})
ki.addEventListener('click', () => {g = 2})
ni.addEventListener('click', () => {g = 1})

class Task{
  constructor(imp, prompt){
    this.importance = imp;
    this.prompt = prompt;
  }
}

async function getAll()
{
  let l = []
  return fetch(URLAPI)
  .then((res) => res.json())
  .then((data) => {
    for(t of data) {
      let task = new Task(t.importance, t.prompt);
      l.push(task)
    }
    return l
  }).catch((er) => {console.log(er)});
  
}

function sort(array) {
  arr = array;
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j].importance < arr[j + 1].importance) {
        // Troca (Destructuring assignment)
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function CheckS(arr){
  for(let i = 0; i < arr.lenght();i++){
    if(arr[i].importance < arr[i+1].importance){
      return false
    }
  }
  return true
}


function insertAll()
{
  getAll().then((arra) => {
    let newArr = sort(arra);
    for(tsk of newArr){
      let color;
      if(tsk.importance == 3){
        color = "red" 
      }else if(tsk.importance == 2){
        color = "yellow"
      }else{
        color = "green"
      }
      let newTxt = `<li style="border-color: ${color};">${tsk.prompt}</li>`
      if(!ul.innerHTML.includes(newTxt)){
        ul.innerHTML = ul.innerHTML + newTxt;
      }
    }
  })
}

function addOnly(goal)
{
  getAll().then((arra) => {
    let newArr = sort(arra);
    for(tsk of newArr){
      
      if(tsk.importance == 3){
        color = "red" 
      }else if(tsk.importance == 2){
        color = "yellow"
      }else{
        color = "green"
      }
      if(tsk.importance == goal){
        let newTxt = `<li style="border-color: ${color};">${tsk.prompt}</li>`
        if(!sorterList.innerHTML.includes(newTxt)){
          sorterList.innerHTML = sorterList.innerHTML + newTxt;
        }
      }
    }
  });
}

function renderLista(array, container) {
  // Limpamos o container antes de renderizar para não duplicar nem acumular filtros antigos
  container.innerHTML = ""; 
  
  array.forEach(tsk => {
      let color = tsk.importance == 3 ? "red" : (tsk.importance == 2 ? "yellow" : "green");
      
      // Criamos o HTML de forma limpa
      let newTxt = `<li style="border-left: 5px solid ${color}; padding: 5px; margin: 2px; list-style: none;">
                      ${tsk.prompt}
                    </li>`;
      container.innerHTML += newTxt;
  });
}

function doBoth() {
  getAll().then((arra) => {
      if (!arra) return;

      // 1. Ordenar a lista global
      let listaOrdenada = sort(arra);
      
      // 2. Renderizar a lista principal (ul)
      renderLista(listaOrdenada, ul);

      // 3. Filtrar e renderizar a lista de filtros (sorterList)
      let listaFiltrada = listaOrdenada.filter(tsk => tsk.importance == g);
      renderLista(listaFiltrada, sorterList);
      
      console.log(`Atualizado: Filtro atual nível ${g}`);
  });
}

setInterval(doBoth, 5000);

setInterval(doBoth, 5000)