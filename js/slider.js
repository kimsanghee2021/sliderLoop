const slider = document.querySelector('#slider');
const ul = slider.querySelector('ul');
const prev = slider.querySelector('.prev');
const next = slider.querySelector('.next');
const speed = 500;
let enableClick = true;
ul.style.left = '-100%';

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

//공통 슬라이드 함수
function slide(direction){
    let result = {value : '', callback : null}

    //인수로 'next',prev' 일 경우 result값 변경
    if(direction == 'next'){
        result.value = '-200%';
        //콜백함수로 감싸준이유는 즉시실행하는것이 아니라 해당하는곳에 왓을때 실행시키기 위해 callback 함수로 넣어준다.
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
/*
function nextSlide(){
    new Anim(ul,{
        prop : 'left',
        value : '-200%',
        duration : speed,
        callback : function(){
            ul.append(ul.firstElementChild);
            ul.style.left = '-100%';
            enableClick = true;
        }
    });
}
function prevSlide(){
    new Anim(ul,{
        prop : 'left',
        value : '0%',
        duration : speed,
        callback : function(){
            ul.prepend(ul.lastElementChild); 
            ul.style.left = '-100%';
            enableClick = true;
        }
    });
}
*/
