/*
  es5객체지향 변환순서
  1. 생성자 함수 생성
  2. 생성자 함수 안쪽에 this.init(),this.bindingEvent()호출
  3. this.init안쪽 전역변수값을 this로 붙여서 인스턴스 전달
  4. 나머지 모든 함수들을 생성자.prototype에 등록
  5. 각 함수 안쪽에 있는 모든 전역변수값을 this.을 붙여서 인스턴스로 변경
  6. event, each문 ajex, setTimeout, callback, 안쪽에 this값을 인스턴스로 고정시키기위해 
      해당 함수 뒤쪽에 .bind(this)연결
  7. 해당 생성자 함수를 new인스턴스 생성
*/

function Slider(selector,opt){
  let default_opt = {
    btnPrev : '.prev',
    btnNext : '.next',
    speed : 500
  }
  const result_opt = Object.assign({}, default_opt, opt);
    this.initialize(selector,result_opt);
    this.bindingEvent();

}

Slider.prototype.initialize = function(selector ,opt){
    this.frame = document.querySelector(selector);
    this.prev = document.querySelector(opt.btnPrev);
    this.next = document.querySelector(opt.btnNext);
    this.speed = opt.speed;
    this.enableClick = true;
}

Slider.prototype.bindingEvent = function(){
  this.init(this.frame);

  this.next.addEventListener('click',function(e){
      e.preventDefault();
      if(this.enableClick){
          this.enableClick = false;
          this.slide(this.frame,'next');
      }
  }.bind(this));

  this.prev.addEventListener('click',function(e){
      e.preventDefault();
      if(this.enableClick){
          this.enableClick = false;
          this.slide(this.frame,'prev');
      }
  }.bind(this));
}

Slider.prototype.init = function(frame){
  const ul = frame.querySelector('ul');
  const lis = ul.querySelectorAll('li');
  const len = ul.children.length;
  ul.style.left = '-100%';
  ul.style.width = `${100*len}%`;
  lis.forEach (li =>li.style.width = `${100/len}%`);
  ul.prepend(ul.lastElementChild);
}

Slider.prototype.slide = function(frame,direction){
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
      callback: function(){      
        result.callback();
        ul.style.left = '-100%';
        this.enableClick = true;
      }.bind(this)
    })
  
}