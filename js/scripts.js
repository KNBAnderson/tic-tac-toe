function assertEqual(testDescription, expected, actual) {
  if (JSON.stringify(expected) === JSON.stringify(actual)) {
    return 'Succress! ' + testDescription + ' worked!'
  }
  return '' + testDescription + ' failed. Expected: ' + expected + ' but got ' + actual;
}


var X = 10;
var O = 100;

function Board(){
  //figure out how to link to clickable buttons//
  this.one = '0',
  this.two = '1',
  this.three = '2',
  this.four = '3',
  this.five = '4',
  this.six = '5',
  this.seven = '6',
  this.eight = '7',
  this.nine = '8';
}

function WinScenario(boardObject){
  this.rowOne = [boardObject.one, boardObject.two, boardObject.three],
  this.rowTwo = [boardObject.four ,boardObject.five, boardObject.six],
  this.rowThree = [boardObject.seven, boardObject.eight ,boardObject.nine],

  this.colOne = [boardObject.one ,boardObject.four, boardObject.seven],
  this.colTwo = [boardObject.two ,boardObject.five ,boardObject.eight],
  this.colThree = [boardObject.three ,boardObject.six ,boardObject.nine],

  this.diagOne = [boardObject.one ,boardObject.five ,boardObject.nine],
  this.diagTwo = [boardObject.three ,boardObject.five ,boardObject.seven]
}
//Add while loop to continue game while below is false
function makeTotalArray(object){
  var totalArray = []
  var arrayOfEntries = Object.values(object);
  for(var i = 0; i <= arrayOfEntries.length - 1; i++){
    var total = arrayOfEntries[i].reduce(function(a, b) {return parseInt(a) + parseInt(b)});
    totalArray.push(total);
  }
  return totalArray;
}

function isGameOver(object) {
  for (let i = 0; i <= makeTotalArray(object).length - 1; i++) {
    var total = makeTotalArray(object)[i];
    if (total === 30 || total === 300) {
      return [true, total]
    }
    return false;
  }
}

function checkGameResult(object) {
  if (isGameOver(object)[0]) {
    if (isGameOver(object[1]) === 30) {
      return "X has won"
    } else if (isGameOver(object[1]) === 300) {
      return 'O has won'
    } else {
      console.log('Something in wrong in the checkREsult function')
    }
  }else if(){

  }
}

// console.log(assertEqual('isGameOver prototype', false, win.isGameOver()));
// function to find number that is point on board where x or o is entered. Should only be (0 - 9)

$(function(){
  var spotClicked = '';
  var blankBoard = new Board();
  var gameWin = new WinScenario(blankBoard);

  $('.col-4').on('click', function(){
    spotClicked = $(this).attr('value');

    if (isGameOver(gameWin)) {
      $('#board').hide();
      $('#gameOver').show();

      //if statement for win, lose, or draw
      $('.result').show();
    };

    console.log(assertEqual('isGameOver function', false, isGameOver(gameWin)));
    console.log(assertEqual('makeTotalArray function', [3, 12, 21, 9, 12, 15, 12, 12], makeTotalArray(gameWin)));
    console.log(assertEqual('checkGameResult function', undefined, checkGameResult(gameWin)));
  })
})
