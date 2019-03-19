  //turn false=Player1=vertical __ true=Player2=horizonal
  var turn = false;
  //Score
  var player1Score = 0;
  var player2Score = 0;
  //Arreglos
  var matrixValues = [];
  var matrixButtons = [];
  //Valores de la X
  var xRow = random(1, 8);
  var xColumn = random(1, 8);

startGame();
function startGame() {
  createArrays();
}

function createArrays() {
  //Create bidimesional array with random values (matrixValues)
  for (var i = 0; i < 8; i++) {
    matrixValues[i] = [];
    for (var j = 0; j < 8; j++) {
      matrixValues[i][j] = random(-3, 5);
    }
  }
  //add 10 points X 2 and start cell
  matrixValues[random(0, 7)][random(0, 7)] = 10;
  matrixValues[random(0, 7)][random(0, 7)] = 10;
  matrixValues[xRow-1][xColumn-1] = "X";

  //create buttons
  //id = 1,2,3...64 class = row1,2,3...8 column1,2,3...8
  
  var text;
  for (var i = 0; i < 8; i++) {
    matrixButtons[i] = [];
    for (var j = 0; j < 8; j++) {
      matrixButtons[i][j] = document.createElement("button");
      matrixButtons[i][j].setAttribute("value", matrixValues[i][j]);
      matrixButtons[i][j].setAttribute("id", ((i * 8) + (j + 1)));
      matrixButtons[i][j].setAttribute("class", ("row" + (i + 1) + " column" + (j + 1)));
      matrixButtons[i][j].addEventListener("click", selectNumber);
      //add the value text in the button
      text = document.createTextNode(matrixValues[i][j]);
      matrixButtons[i][j].appendChild(text);
      //insert button in body
      // document.body.appendChild(matrixButtons[i][j]);
    }
  }
  createTable(matrixButtons);

}


function createTable(tableData) {
  var table = document.createElement("table");
  var tableBody = document.createElement("tbody");

  tableData.forEach(rowData => {
    var row = document.createElement("tr");

    rowData.forEach(cellData => {
      var cell = document.createElement("td");
      cell.appendChild(cellData);
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);
  document.body.appendChild(table);
}




// create buttons functions

// funcion mouse sobre el boton
//ver turno
//obtener caillas dispinibles


function selectNumber(button) {
  // if (turn==0&&){

  // }
  var buttonRow = Math.ceil(button.target.id / 8);
  var buttonColumn = button.target.id;
  var points;
  //Calcular la columna
  while (buttonColumn > 8) {
    buttonColumn -= 8;
  }

  if (turn==0&&xColumn==buttonColumn&&button.target.innerHTML!="--"&&button.target.innerHTML!="X"){
        //transformar boton oprimido en X
    button.target.innerHTML="X";
    //Transformar la vieja X a --
    oldX=document.getElementById(((xRow-1)*8)+xColumn);
    console.log(oldX);
    oldX.appendChild(document.createTextNode("--"));
    oldX.target.innerHTML="--";
    oldX.value="--";





    //calcular y actualizar la nueva hilera en donde ira X
    var newRow =  button.target.id;
    while (newRow > 8) {
      newRow -= 8;
    }
    xRow=newRow;
    //Agregar puntos y cambiar de turno
    points = parseInt(button.target.innerHTML);
    player1Score = player1Score + points;

    // ver si existen botones disponibles para el siguente turno, si no entonces fin del juego



    turn= !turn;
  }
}

// funcion click
//obtener el boton
// Ver turno
//ver casillas disponibles
//verificar que esta en la columna/fila de X 
// verificar que la casilla no ha sido seleccionada anteriormente, que no sea (--)
//agregar puntos al jugador en turno
//transformar X en --
//transformar boton oprimido en X
// ver si existen botones disponibles para el siguente turno, si no entonces fin del juego
// ver 

//create table



//create turns


// btn.onclick = sf;

function random(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}