function Slider(){
    this.init1();
    this.init2(this.slider1);
    this.init2(this.slider2);
    this.slide(frame,direction);
    this.next();
    this.prev();
}
Slider.prototype.init1 = function(){
    this.slider1 = document.querySelector('#slider');
    this.slider2 = document.querySelector('#slider2');
    this.prev = document.querySelector('.prev');
    this.next = document.querySelector('.next');
    this.speed = 500;
    this.enableClick = true;
}

Slider.prototype.init2 = function(frame){
  this.ul = frame.querySelector('ul');
  this.lis = this.ul.querySelectorAll('li');
  this.len = this.ul.children.length;
  this.ul.style.left = '-100%';
  this.ul.style.width = `${100*this.len}%`;
  this.lis.forEach (li =>li.style.width = `${100/this.len}%`);
  this.ul.prepend(this.ul.lastElementChild);
}

Slider.prototype.next = function(){
  this.next.addEventListener('click',e => {
    e.preventDefault();

    if(enableClick){
        enableClick = false;
        slide(slider1,'next');
        slide(slider2,'next');
    }
  });
}
Slider.prototype.prev = function(){
  this.prev.addEventListener('click',e => {
    e.preventDefault();

    if(enableClick){
        enableClick = false;
        slide(slider1,'prev');
        slide(slider2,'prev');
    }
  });
}
Slider.prototype.slide = function(frame,direction){
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
      duration: this.speed,
      callback: () => {      
        result.callback();
        ul.style.left = '-100%';
        enableClick = true;
      }
    })
  
}