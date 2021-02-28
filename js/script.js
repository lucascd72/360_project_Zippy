

// REVIEWS 
let isDown = false;
let currentPosition = 0; // of the div
let startingMousePosition = 0;
let div = document.querySelector('#reviewsRow');
let startingPosition = 0; // of the click/dragging
let targetPosition = 0;


// when you "hover" on in:
div.addEventListener('mouseover', function () {
  // if you haven't clicked before, pause the animation:
  if (!isDown)
    div.style.animationPlayState = "paused";
});


// when your mouser "leaves" the div:
div.addEventListener('mouseout', function () {
  // if you haven't clicked before, it resetarts the animation:
  div.style.animation = "marquee-animation 100s linear infinite";
  div.style.animationPlayState = "running";
  // this is where the bugfixing should go, sending the animation directly to a defined time, calculated based on the current position. probably using a NEGATIVE div.style.animationDelay
  let fullDistance = div.offsetWidth;
  let fullAnimationTime = 200;
  let animationSpeed = fullDistance / fullAnimationTime;
  let currentAnimationTime = currentPosition / animationSpeed;
  div.style.animationDelay = `${currentAnimationTime}s`;
});

// when you click the sliding div:
div.addEventListener('mousedown', function (e) {
  isDown = true;
  // save the starting positions:
  currentPosition = div.offsetLeft;
  startingPosition = div.offsetLeft;
  startingMousePosition = e.clientX;
  // remove the animation:
  div.style.animation = "none";
  // set the position again (this goes away when you remove the animation):
  div.style.left = currentPosition + "px";
});

// when release the click:
document.addEventListener('mouseup', function () {
  isDown = false;
});

// when you're dragging it:
document.addEventListener('mousemove', function (event) {
  event.preventDefault();
  // if you've clicked inside it before:
  if (isDown) {
    // mouse position on drag:
    let mousePositionX = event.clientX;
    // target position:
    let targetPosition = startingPosition + mousePositionX - startingMousePosition;
    // if the target position is within the defined boundaries, move it:
    if (targetPosition < 0 && targetPosition > -(window.innerWidth * 4)) {
      div.style.left = targetPosition + "px";
    }
    currentPosition = targetPosition;
  }
});

//Changes label on button

const button1 = document.getElementById("installButton")
const button2 = document.getElementById("installButton2")

const changeLabel1 = () => {
  button1.innerText = "A transferir..."
}

const changeLabel2 = () => {
  button2.innerText = "Transferência em curso..."
} 

// MAIN PART SCROLL
/* just set this variable at start so that we know we are not animating anything at the moment: */
let animating = false;
/*  */
let scrollFunction = (scrollPosition) => {

  
	/* for every ".thescrollything" element (you can add as many as you like, so the code is fairly flexible) */
	document.querySelectorAll( '.scrollingSections' ).forEach(function( scrollyThing ){
		/* 
			inside this loop, three conditions: 
				1. current ".thescrollything" is above
				2. current ".thescrollything" is on the screen
				3. current ".thescrollything" is below
			in each of these conditions, add or remove the appropriate classes (check the CSS for their properties)
			NOTE: you might have to tweak these condition values so that the "cute things" appear or disappear more consistently
		*/
      console.log("Scroll position is " + scrollPosition);
		if( scrollPosition < scrollyThing.offsetTop){
      console.log("FIRST CONDITION");
      console.log("ScrollyThing.offestTop is " + scrollyThing.offsetTop);
      console.log("WINDOW.InnerHeight  is " + window.innerHeight);

     
			scrollyThing.querySelectorAll('.whitePart > div').forEach(function( cuteThing ){
				cuteThing.classList.remove('hiddenup');
				cuteThing.classList.add('hiddendown');
			});
		} else if( scrollPosition >= scrollyThing.offsetTop  && scrollPosition < scrollyThing.offsetTop + window.innerHeight){
      console.log("SECOND CONDITION");
    /*  console.log("ScrollyThing.offestTop is " + scrollyThing.offsetTop);
      console.log("WINDOW.InnerHeight  is " + window.innerHeight);
      console.log("OffsetTop of first id is " + document.getElementById("one").offsetTop);
      console.log("OffsetTop of second id is " + document.getElementById("two").offsetTop);
      console.log("OffsetTop of third id is " + document.getElementById("three").offsetTop);*/
      //console.log("ScrollyThing.offestTop is " + scrollyThing.offsetTop);
			scrollyThing.querySelectorAll('.whitePart > div').forEach(function( cuteThing ){
				cuteThing.classList.remove('hiddendown');
				cuteThing.classList.remove('hiddenup');
			});
		} else {
      console.log("THIRD CONDITION");
      /* console.log("ScrollyThing.offestTop is " + scrollyThing.offsetTop);
      console.log("WINDOW.InnerHeight  is " + window.innerHeight);
      console.log("OffsetTop of first id is " + document.getElementById("one").offsetTop);
      console.log("OffsetTop of second id is " + document.getElementById("two").offsetTop);
      console.log("OffsetTop of third id is " + document.getElementById("three").offsetTop);*/
      
			scrollyThing.querySelectorAll('.whitePart > div').forEach(function( cuteThing ){
				cuteThing.classList.remove('hiddendown');
				cuteThing.classList.add('hiddenup');
			});
		}
	});
}


/* On scroll, get the position, request an animation frame, if none is still active and then call the Scrolling function with the current position as a parameter
The "animating" variable only prevents the browser from being overloaded with animation frames if we scroll too fast */
document.addEventListener('scroll', function (e) {
	let scrollPosition = window.scrollY;
	if (!animating) {
		window.requestAnimationFrame(function () {
			scrollFunction(scrollPosition);
			animating = false;
		});
		animating = true;
	}
});


/* If the page loads with a scroll already set, this helps prevent bugs: */
scrollFunction(window.scrollY);

