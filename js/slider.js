const slider = document.querySelector('#slider');
const ul = slider.querySelector('ul');
const lis = ul.querySelectorAll('li');
const prev = slider.querySelector('.prev');
const next = slider.querySelector('.next');
const speed = 500;
const len = ul.children.length;
let enableClick = true;

init();
//무한 루프 만들기
next.addEventListener('click',function(e){
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        //nextSlide();
        slide('next');
    }
    
});
prev.addEventListener('click',function(e){
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        //prevSlide();
        slide('prev');
    }
});


function init(){
    //반복 돌기위해 첫번째 화면을 뒤로 보내라
    ul.style.left = '-100%';
    //li가 추가될떄마다 ul의 넓이 값이 변경될 수 있도록 작업
    ul.style.width = `${100*len}%`;
    lis.forEach(function(li){
         //li가 추가될떄마다 li의 각각의 넓이 값이 변경될 수 있도록 작업
        li.style.width = `${100/len}%`
    });
    ul.prepend(ul.lastElementChild);
}

function slide(direction){
    let result = {value : '', callback : null}
    if(direction == 'next'){
        result.value = '-200%';
        result.callback = ()=>{ul.append(ul.firstElementChild)};
    }
    else if(direction == 'prev'){
        result.value =' 0%';
        result.callback = ()=>{ul.prepend(ul.lastElementChild)};
    }
    else{
        alert('인수는 prev,next 둘중하나 들어와야합니다.')
    }
    new Anim(ul,{
        prop : 'left',
        value : result.value,
        duration : speed,
        callback : ()=>{
            result.callback();
            ul.style.left = '-100%';
            enableClick = true;
        }
    });
}
