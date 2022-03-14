class Slider{
    constructor(){
        this.init();
        this.nextBtn();
        this.prevBtn();
    }
    init(){
        this.slider = document.querySelector('#slider');
        this.ul = this.slider.querySelector('ul');
        this.prev = this.slider.querySelector('.prev');
        this.next = this.slider.querySelector('.next');
        this.speed = 500;
        this.ul.style.left = '-100%';
    }
    nextBtn(){
        this.next.addEventListener('click',()=>{
            new Anim(this.ul,{
                prop : 'left',
                value : '-200%',
                duration : this.speed,
                callback : ()=>{
                    this.ul.append(this.ul.firstElementChild);
                    this.ul.style.left = '-100%';
                }
            });
        });
    }
    prevBtn(){
        this.prev.addEventListener('click',()=>{
            new Anim(this.ul,{
                prop : 'left',
                value : '0%',
                duration : this.speed,
                callback : ()=>{
                    this.ul.prepend(this.ul.lastElementChild);
                    this.ul.style.left = '-100%';
                }
            });
        });
    }
}