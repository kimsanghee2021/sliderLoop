const slider = document.querySelector('#slider');
const ul = slider.querySelector('ul');
const prev = slider.querySelector('.prev');
const next = slider.querySelector('.next');
const speed = 500;
ul.style.left = '-100%';

//무한 루프 만들기
next.addEventListener('click',function(){
    new Anim(ul,{
        prop : 'left',
        value : '-200%',
        duration : speed,
        callback : function(){
            ul.append(ul.firstElementChild);
            ul.style.left = '-100%';
        }
    });
});
prev.addEventListener('click',function(){
    new Anim(ul,{
        prop : 'left',
        value : '0%',
        duration : speed,
        callback : function(){
            ul.prepend(ul.lastElementChild);
            ul.style.left = '-100%';
        }
    });
});
