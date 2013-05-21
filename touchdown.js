var touchy = require('./touchy.js')
,   uuid = require('node-uuid')
;

module.exports = (function(){

  if(window._touch) return window._touch;

  else return new touch()

}());

function touch(){

  window._touch = this;

  this.elements = [];

  this.touchy = touchy(window, touchtest);

};

touch.prototype.start = touch.prototype.listen = function(el){

    if(!el.touch_id) el.touch_id = ('function' == typeof uuid.v1) ? uuid.v1() : uuid();

    this.elements.push(el);

    el.touch = 1;

		return el

};

touch.prototype.register = function(el){

    if(!el.touch_id) el.touch_id = uuid.v1();

    this.elements.push(el);

    el.touch = 0; // needs to be started

		return el

};


function touchtest(hand, finger){
	
	var lastPoint = [], allPoints = [];

  finger.on('start', function(point){
	
		var element = document.elementFromPoint(point.x, point.y);
			
    var el = search(element);

    if(el){
	
		  lastPoint = [point.x, point.y]
		
		  allPoints.push(lastPoint.slice(0))

      this.is = true;

      this.el = el;

      this.event.id = this.id;

      var evt = new CustomEvent('touchdown', { cancelable: true, bubbles: false, detail : point});
      
      el.dispatchEvent(evt);

    }

  });
 
  finger.on('move', function(point){

    if(this.is){
	
	
      var evt = new CustomEvent('deltavector', { cancelable: true, bubbles: false, detail : point});

			evt.detail.delta = [point.x - lastPoint[0], point.y - lastPoint[1]];

			evt.detail.vector = [point.x, point.y];

			evt.detail.allPoints = allPoints;
		
			evt.detail.lastPoint = lastPoint.splice(0)
						
			lastPoint = [point.x, point.y]
		
		  allPoints.push(lastPoint.slice())

      this.el.dispatchEvent(evt);

    }

  });

  finger.on('end', function(point){
 
    if(this.is){

      var evt = new CustomEvent('liftoff', { cancelable: true, bubbles: false, detail : point});

			evt.detail.delta = [point.x - lastPoint[0], point.y - lastPoint[1]];

			evt.detail.vector = [point.x, point.y];

			evt.detail.allPoints = allPoints;
		
			evt.detail.lastPoint = lastPoint.splice(0)
						
			lastPoint = [point.x, point.y]
		
		  allPoints.push(lastPoint.slice())

      this.el.dispatchEvent(evt);

    }

  });

};

function search(el){

  return scan(el)

  function scan(el){

    if(!el) return false;
  
    var x = window._touch.elements.reduce(function(val, i){	

      if(i.touch_id == el.touch_id && i.touch){

        val = i

      };

      return val

    }, false)

    return x || scan(el.parentElement)

  }

};


touch.prototype.pause = function(el){

  el.touch = 0

  return el

};

touch.prototype.resume = function(el){

  el.touch = 1

	return el

};

touch.prototype.end = function(el){

  delete el.touch

  delete el.touch_id

	return el

};

touch.prototype.handleMouse = function(x){

  if(Modernizr) Modernizr.touch = true;

  this.touchy.handleMouse(x);

};
