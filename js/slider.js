const slider1 = document.querySelector('#slider');
const slider2 = document.querySelector('#slider2');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const speed = 500;
let enableClick = true;

init(slider1);
init(slider2);

next.addEventListener('click',e => {
    e.preventDefault();

    if(enableClick){
        enableClick = false;
        slide(slider1,'next');
        slide(slider2,'next');
    }
});

prev.addEventListener('click',e => {
    e.preventDefault();

    if(enableClick){
        enableClick = false;
        slide(slider1,'prev');
        slide(slider2,'prev');
    }
});


function init(frame){
    const ul = frame.querySelector('ul');
    const lis = ul.querySelectorAll('li');
    const len = ul.children.length;
    ul.style.left = '-100%';
    ul.style.width = `${100*len}%`;
    lis.forEach (li =>li.style.width = `${100/len}%`);
    ul.prepend(ul.lastElementChild);
}

function slide(frame,direction){
    const ul = frame.querySelector('ul');

    let result =  {
        value: '', callback: null
    }
    if(direction === 'next'){
        result.value = '-200%';
        result.callback = ()=>{ ul.append(ul.firstElementChild)}
    }
    else if(direction === 'prev'){
        result.value = '0%';
        result.callback = ()=>{ ul.prepend(ul.lastElementChild)}
    }
    else {
      alert ('인수는 prev, next둘중 하나가 들어와야 합니다.')
    }
    new Anim(ul, {
      prop: 'left',
      value: result.value,
      duration: speed,
      callback: () => {      
        result.callback();
        ul.style.left = '-100%';
        enableClick = true;
      }
    })
  
}
