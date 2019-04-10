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
  this[0] = '0',
  this[1] = '1',
  this[2] = '2',
  this[3] = '3',
  this[4] =  '4',
  this[5] = '5',
  this[6] = '6',
  this[7] = '7',
  this[8] = '8';
}

function WinScenario(boardObject){
  this.rowOne = [boardObject[0], boardObject[1], boardObject[2]],
  this.rowTwo = [boardObject[3] ,boardObject[4], boardObject[5]],
  this.rowThree = [boardObject[6], boardObject[7] ,boardObject[8]],

  this.colOne = [boardObject[0] ,boardObject[3], boardObject[6]],
  this.colTwo = [boardObject[1] ,boardObject[4] ,boardObject[7]],
  this.colThree = [boardObject[2] ,boardObject[5] ,boardObject[8]],

  this.diagOne = [boardObject[0] ,boardObject[4] ,boardObject[8]],
  this.diagTwo = [boardObject[2] ,boardObject[4] ,boardObject[6]]
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
function assignX(square, boardObj){
  boardObj[square] = X;
}

function assignO(square, boardObj){
  boardObj[square] = O;
}



function changeTurn(oturn){
  console.log(oturn);
  oturn = !oturn;
  console.log(oturn);
  return oturn;
}



function checkGameResult(object) {
  if (isGameOver(object)[0]) {
    $('#board').hide();
    $('#gameOver').show();
    if (isGameOver(object[1]) === 30) {
      $('.result').hide
      $('#win').show
      return "X has won"
    } else if (isGameOver(object[1]) === 300) {
      $('.result').hide
      $('#lose').show
      return 'O has won'
    } else {
      console.log('Something in wrong in the checkREsult function')
    }
    // else if all squares full function equals true
  // }else if(){
  //$('#board').hide();
  //$('#gameOver').show();
  // $('.result').hide
  //$('#lose').show
  // return draw
  }
}



// console.log(assertEqual('isGameOver prototype', false, win.isGameOver()));
// function to find number that is point on board where x or o is entered. Should only be (0 - 9)

$(function(){
  var spotClicked = '';
  var blankBoard = new Board();
  var gameWin = new WinScenario(blankBoard);
  var Oturn = false;

  $('.col-4').on('click', function(){
    if(!$(this).find('i').hasClass('fa-dragon') || !$(this).find('i').hasClass('fa-robot')) {
      spotClicked = $(this).attr('value');
//Problem with dragon being clickable
//Problem with gameWin updating a turn behind everytime
      if(Oturn){
        assignO(spotClicked, blankBoard)
        $(this).find('i').addClass('fa-robot');
      }else {
        assignX(spotClicked, blankBoard);
        $(this).find('i').addClass('fa-dragon');
      }
      Oturn = changeTurn(Oturn);
      console.log(Oturn);

      console.log(blankBoard);
      console.log(gameWin);
      gameWin = new WinScenario(blankBoard);
      //
      // console.log(assertEqual('isGameOver function', false, isGameOver(gameWin)));
      // console.log(assertEqual('makeTotalArray function', [3, 12, 21, 9, 12, 15, 12, 12], makeTotalArray(gameWin)));
      // console.log(assertEqual('checkGameResult function', undefined, checkGameResult(gameWin)));

    }
  });
})
