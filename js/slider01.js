function Slide(selector,opt){
    let default_opt = {
        btnPrev : '.prev',
        btnNext : '.next',
        speed : 500
    }
    const result_opt = Object.assign({},default_opt, opt);
    this.initialize(selector,result_opt);
    this.bindingEvent();
}

Slide.prototype.initialize = function(selector,opt){
    this.slider = document.querySelector(selector);
    this.next = document.querySelector(opt.btnNext);
    this.prev = document.querySelector(opt.btnPrev);
    this.speed = opt.speed;
    this.enableClick = true;
}
Slide.prototype.bindingEvent = function(){
    this.init(this.slider);
    
    this.next.addEventListener('click',function(e){
        e.preventDefault();
        if(this.enableClick){
            this.enableClick =false;
            this.slide(this.slider,'next');
        }
    }.bind(this));

    this.prev.addEventListener('click',function(e) {
        e.preventDefault();
        if(this.enableClick){
            this.enableClick =false;
            this.slide(this.slider,'prev');
        }
    }.bind(this));
}
Slide.prototype.init = function(target){
    const ul = target.querySelector('ul');
    const lis = ul.querySelectorAll('li');
    const len = ul.children.length;

    ul.style.left = '-100%';
    ul.style.width = `${100*len}%`;
    lis.forEach(function(li){
        li.style.width = `${100/len}%`;
    });
    ul.prepend(ul.lastElementChild);
}
Slide.prototype.slide = function(target,arrow){
    const ul = target.querySelector('ul');
    let result =  {
        value: '', callback: null
    }
    if(arrow === 'next'){
        result.value = '-200%';
        result.callback = ()=>{ ul.append(ul.firstElementChild)}

    }
    else if(arrow === 'prev'){
        result.value = '0%';
        result.callback = ()=>{ul.prepend(ul.lastElementChild)}
    }
    new Anim(ul,{
        prop : 'left',
        value : result.value,
        duration : this.speed,
        callback : ()=>{
            result.callback();
            ul.style.left = '-100%';
            this.enableClick = true;
        }
    });
}

