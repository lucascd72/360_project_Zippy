

// REVIEWS 
let isDown = false;
let currentPosition = 0; // of the div
let startingMousePosition = 0;
let div = document.querySelector('#reviewsRow');
let startingPosition = 0; // of the click/dragging
let targetPosition = 0;


// when you "hover" on in:
div.addEventListener('mouseover', function(){
  // if you haven't clicked before, pause the animation:
  if(!isDown)
    div.style.animationPlayState = "paused";
});


// when your mouser "leaves" the div:
div.addEventListener('mouseout', function(){
  // if you haven't clicked before, it resetarts the animation:
    div.style.animation = "marquee-animation 200s linear infinite";
    div.style.animationPlayState = "running";
    // this is where the bugfixing should go, sending the animation directly to a defined time, calculated based on the current position. probably using a NEGATIVE div.style.animationDelay
    let fullDistance = div.offsetWidth;
    let fullAnimationTime = 400;
    let animationSpeed = fullDistance / fullAnimationTime;
    let currentAnimationTime = currentPosition / animationSpeed;
    div.style.animationDelay = `${currentAnimationTime}s`;
});

// when you click the sliding div:
div.addEventListener('mousedown', function(e) {
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
document.addEventListener('mouseup', function() {
  isDown = false;
});

// when you're dragging it:
document.addEventListener('mousemove', function(event) {
  event.preventDefault();
  // if you've clicked inside it before:
  if (isDown) {
    // mouse position on drag:
    let mousePositionX = event.clientX;
    // target position:
    let targetPosition = startingPosition + mousePositionX - startingMousePosition;
    // if the target position is within the defined boundaries, move it:
    if(targetPosition < 0 && targetPosition > -(window.innerWidth * 4)){
        div.style.left = targetPosition + "px";
    }
    currentPosition = targetPosition;
  }
});