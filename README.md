# touchdown!

This module uses a modified [Touchy.js](https://github.com/jairajs89/Touchy.js) to create normalized events for touch and mouse. The focus is on touch events, and this module is for building user interfaces for that paradigm.

Currently only three events are supported, "touchdown", "deltavector", and "liftoff", which are analogous to touchstart, touchmove, and touchend, as well as mousedown, mousedrag, and mouseup. A hover event may added, but that is a mouse-only event until the physical computing space gets a little more intimate. Until then, use [mouse-around](https://github.com/NHQ/mousearound)

```
npm install touchdown
```

This module is the event core for [UXER](https://github.com/NHQ/uxer), a user interface library with same goals as above.

## usage

```js
var event = require('touchdown');
var el = document.getElementById('sweetSpot');
event.start(el);

// element is now registered for three events, so add listeners:
el.addEventListener('touchdown', touchdown)
el.addEventListener('deltavector', vectorChange)
el.addEventListener('liftoff', liftoff)

function touchdown(e){
	var eventDetails = e.detail;
	var pointOfContact = [ eventDetails.x , eventDetails.y ]
	// ...
}

function vectorChange(e){
	var eventDetails = e.detail;
	var pointOfContact = [ eventDetails.x , eventDetails.y ]
	var vector = eventDetails.vector
	var lastPoint = eventDetails.lastPoint
	// ...
}

function liftoff(e){
	var eventDetails = e.detail;
	var pointOfContact = [ eventDetails.x , eventDetails.y ]
	var vector = eventDetails.vector
	var lastPoint = eventDetails.lastPoint
	var allPoints = eventDetails.allPoints
	// ...
}

```

# api

## .start(element)
registers the element for events, and starts
## .register(element)
registers the element, but events will not be fired until resume(element) is called
## .pause(element)
pauses an element, so events will not be called until resumed
## .resume(element)
resumes emitting events on that element
## .end(element)
end emitting events on that element
