function Slider(){
    this.init();
    this.nextBtn();
    this.prevBtn();
}
Slider.prototype.init = function(){
    this.slider = document.querySelector('#slider');
    this.ul = this.slider.querySelector('ul');
    this.prev = this.slider.querySelector('.prev');
    this.next = this.slider.querySelector('.next');
    this.speed = 500;
    this.ul.style.left = '-100%';
}
Slider.prototype.nextBtn = function(){
    this.next.addEventListener('click',function(){
        new Anim(this.ul,{
            prop : 'left',
            value : '-200%',
            duration : this.speed,
            callback : function(){
                this.ul.append(this.ul.firstElementChild);
                this.ul.style.left = '-100%';
            }.bind(this)
        });
    }.bind(this));
}
Slider.prototype.prevBtn = function(){
    this.prev.addEventListener('click',function(){
        new Anim(this.ul,{
            prop : 'left',
            value : '0%',
            duration : this.speed,
            callback : function(){
                this.ul.prepend(this.ul.lastElementChild);
                this.ul.style.left = '-100%';
            }.bind(this)
        });
    }.bind(this));
}