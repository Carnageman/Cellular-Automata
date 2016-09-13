var squareSize = 10;
var valeursGUI = [];
valeursGUI.Rule = 73;
valeursGUI.Refresh = main;
valeursGUI.Color = "#337233";

function fullscreenCanvas(canvas) {
  /*Set the Canvas to take all the screen*/

  // Get the widow width and height
  var W = window.innerWidth;
  var H = window.innerHeight;

  // Set the same to the canvas
   canvas.width = W;
   canvas.height = H;
}

function makeInitialArray() {
  /*Generate a random array adapted to the screen*/
  var array = [];
  for(var i = 0; i*squareSize < window.innerWidth; i++) {
    array[i] = Math.floor(Math.random() * 2);
  }
  return array;
}

function drawRow(array,context,nbRow) {
  /*Draw the array in the selected row in the given context*/
  for(var i = 0; i < array.length; i++) {
    if(array[i] == 1) {
      context.fillRect(i*squareSize,nbRow*squareSize,squareSize,squareSize);
    }
  }
}

function getLeftCell(array,i) {
  if (i == 0) {
    return 1;
  }
  else {
    return array[i-1];
  }
}

function getRightCell(array,i) {
  if (i == (array.length - 1)) {
    return 1;
  }
  else {
    return array[i+1];
  }
}

function nextGeneration(array,arrayRule) {
  /*Generate the next Generation based on the generation given as array and the rule number*/
  var oldGen = array.slice(); //Make a clone of the array to keep the previous generation in memory
  for (var i = 0; i < array.length;i++) {
    array[i] = arrayRule[getLeftCell(oldGen,i)*4 + oldGen[i]*2 + getRightCell(oldGen,i)];
  }
  return array;
}

function generateArrayRule(rule) {
  /*Generate the rules array*/
  var array = [];
  var decimal = rule;
  while (decimal > 0) {
      array.push(decimal%2);
      decimal = Math.floor(decimal/2);
  }
  for (var i = array.length;i < 8; i++) {
    array.push(0); //to make sure the array is 8 bit long !
  }

  return array;
}

function drawCellular(context,rule) {
  /*All the draw thingy*/

  //Initialisation
  var cellArray = makeInitialArray();
  var ruleArray = generateArrayRule(rule);
  drawRow(cellArray,context,0);

  //Make all the others generations, stop when the window can't hold no more
  for(var i = 1; i*squareSize < window.innerHeight;i++) {
    cellArray = nextGeneration(cellArray,ruleArray);
    drawRow(cellArray,context,i);
  }
}

function main() {
  var canvas = document.getElementById('canvas');
  fullscreenCanvas(canvas);
  var context = canvas.getContext("2d");
  context.fillStyle = valeursGUI.Color
  drawCellular(context,valeursGUI.Rule);
}
