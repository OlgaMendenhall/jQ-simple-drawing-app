var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");    /*this is equivalet of document.getElementsByTagName("canvas")[0]. Whaere [0] is its first element like in array. Now a context in 2D graphics or 3D graphics is just a way for the computer to know where to draw*/
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls").on("click", "li", function(){    /*we're binding "on". So on click controls element will feel it, as it were the click, and it will determine whether it's been on a list item or not, and then it will perform the operation.*/
  //Deselect sibling elements (buttons with color)
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //Cache current color here
  color = $(this).css("background-color");  
});
  
//When option "New color" is pressed
$("#revealColorSelect").click(function(){
  //Show color select or hide it
  changeColor();
  $("#colorSelect").toggle();   /* toggle shows and hides pannel with additional colors*/
});

//Update the new color span (so we can see the new color in little window)
function changeColor() {
  var r = $("#red").val();     /* getting value of red color*/
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}

//When color sliders change (when we move them to change color) 
$("input[type=range]").change(changeColor);  /* it selects all the inputs with the type of range. We're calling the change color which should update the new color and it will update when we do this change here.*/

//When "Add color" is pressed
$("#addNewColor").click(function(){
  //Append the color to the controls ul - unordered list
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);  /* it adds new color to controls*/
  //Select the new color
  $newColor.click();
});
  
//On mouse events on the canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //Draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);  /* this will start our line */
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});
  
  
  
  
  
  
  
  
  
  
  
  