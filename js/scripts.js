function assertEqual(testDescription, expected, actual) {
  if (JSON.stringify(expected) === JSON.stringify(actual)) {
    return 'Succress! ' + testDescription + ' worked!'
  }
  return '' + testDescription + ' failed. Expected: ' + expected + ' but got ' + actual;
}

//setup the player points//
var X = 10;
var O = 100;

function Board(){
  //set up the gameboard with values at each spot//
  //figure out how to link to clickable buttons//
  this[0] = '0',
  this[1] = '1',
  this[2] = '2',
  this[3] = '3',
  this[4] = '4',
  this[5] = '5',
  this[6] = '6',
  this[7] = '7',
  this[8] = '8';

}
//setup win conditions into arrays//
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

//assign either X or O to a square when it's clicked.
function assignX(square, boardObj){
  boardObj[square] = X;
}

function assignO(square, boardObj){
  boardObj[square] = O;
}


//changes the players turn//
function changeTurn(oturn){
  oturn = !oturn;
  return oturn;
}

function makeTotalArray(winScenario){
  var totalArray = []
  var arrayOfEntries = Object.values(winScenario);
  for(var i = 0; i <= arrayOfEntries.length - 1; i++){
    var total = arrayOfEntries[i].reduce(function(a, b) {return parseInt(a) + parseInt(b)});
    totalArray.push(total);
  }
  return totalArray;
}

function isThereAWinner(winScenario) {
  for (let i = 0; i <= makeTotalArray(winScenario).length -1; i++) {
    var total = makeTotalArray(winScenario)[i];
    if (total === 30 || total === 300) {
      return [true, total]
    }
  }
  return false;
}


function equalTo10or100(element){
  return (element ===10 || element ===100);
}


function checkGameResult(winScenario, boardObj) {
  var isBoardFull = Object.values(boardObj).every(equalTo10or100);
  var isThereWinner = isThereAWinner(winScenario);
  var outcome = ''

  if(!isBoardFull && !isThereWinner){
    outcome = 'continue';
  } else if (isThereWinner[0]) {
    $('#gameOver').show();
    if (isThereWinner[1] === 30) {
      outcome = 'Xwin';
      console.log('x has won');
    } else if (isThereWinner[1] === 300) {
      outcome = 'Owin';
      console.log("o has won");
    } else {
      console.log('Something in wrong in the checkGameResult function');
    }
  }else if(isBoardFull && !isThereWinner){
    console.log('game is a draw');
    outcome = 'draw';
  
  }
  return outcome
}


$(function(){
  var spotClicked = '';
  var blankBoard = new Board();
  var gameWin = new WinScenario(blankBoard);
  var Oturn = false;
  var outcome = '';

  $('.col-4').on('click', function(){

    if(!$(this).find('i').hasClass('fa-robot') && !$(this).find('i').hasClass('fa-dragon')) {
      spotClicked = $(this).attr('value');

      if(Oturn){
        assignO(spotClicked, blankBoard)
        $(this).find('i').addClass('fa-robot');
        gameWin = new WinScenario(blankBoard);
      }else {
        assignX(spotClicked, blankBoard);
        $(this).find('i').addClass('fa-dragon');
        gameWin = new WinScenario(blankBoard);
      }
      Oturn = changeTurn(Oturn);
      outcome = checkGameResult(gameWin,blankBoard);
      if (outcome === 'Xwin') {
        $('#gameOver').show();
        $('.result').hide();
        $('#Xwin').show();
      } else if (outcome === 'Owin') {
        $('#gameOver').show();
        $('.result').hide();
        $('#Owin').show();
      } else if (outcome === 'draw'){
        $('#gameOver').show();
        $('.result').hide();
        $('#lose').show();
      }
    }
  });
})
