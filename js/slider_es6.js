class Slider{
    constructor(selector,opt){
        let default_opt = {
            btnPrev : '.prev',
            btnNext : '.next',
            speed : 500
        }
        const result_opt = Object.assign({}, default_opt, opt);
        this.initialize(selector,result_opt);
        this.bindingEvent();
    }

    initialize(selector ,opt){
        this.frame = document.querySelector(selector);
        this.prev = document.querySelector(opt.btnPrev);
        this.next = document.querySelector(opt.btnNext);
        this.speed = opt.speed;
        this.enableClick = true;
    }

    bindingEvent(){
        console.log(this.frame);
        this.init(this.frame);

        this.next.addEventListener('click',e =>{
            e.preventDefault();
            if(this.enableClick){
                this.enableClick = false;
                this.slide(this.frame,'next');
            }
        });

        this.prev.addEventListener('click',e =>{
            e.preventDefault();
            if(this.enableClick){
                this.enableClick = false;
                this.slide(this.frame,'prev');
            }
        });
    }

    init(frame){
        const ul = frame.querySelector('ul');
        const lis = ul.querySelectorAll('li');
        const len = ul.children.length;
        ul.style.left = '-100%';
        ul.style.width = `${100*len}%`;
        lis.forEach (li =>li.style.width = `${100/len}%`);
        ul.prepend(ul.lastElementChild);
    }

    slide(frame,direction){
        const ul = frame.querySelector('ul');
        let result =  {
            value: '', callback: null
        }
        if(direction === 'next'){
            result.value = '-200%';
            result.callback = function(){ ul.append(ul.firstElementChild)}
        }
        else if(direction === 'prev'){
            result.value = '0%';
            result.callback = function(){ ul.prepend(ul.lastElementChild)}
        }
        else {
        alert ('인수는 prev, next둘중 하나가 들어와야 합니다.')
        }
        new Anim(ul, {
            prop: 'left',
            value: result.value,
            duration: this.speed,
            callback: ()=>{      
            result.callback();
            ul.style.left = '-100%';
            this.enableClick = true;
            }
        })
    }
}





