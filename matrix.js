var player1ScoreText = document.getElementById("player1score");
var player2ScoreText = document.getElementById("player2score");
var restart = document.getElementById("restart");
restart.addEventListener("click", startGame);
var nextLine;
//turn false=Player1=vertical __ true=Player2=horizonal
var turn = false;
var contador
//Score
var player1Score;
var player2Score;
//Arreglos
var matrixValues = [];
var matrixButtons = [];
//Valores de la X
var xRow;
var xColumn;
var oldX;
var oldXId;



function startGame() {
    try {
        document.getElementById("table").parentElement.removeChild(document.getElementById("table"));
        document.getElementById("nextLine").parentElement.removeChild(document.getElementById("nextLine"));
    } catch (error) {

    }
    xRow = random(1, 8);
    xColumn = random(1, 8);
    turn = false;
    player1Score = 0;
    player2Score = 0;
    player1ScoreText.innerHTML = "Score: 0";
    player2ScoreText.innerHTML = "Score: 0";
    contador = 0;
    oldXId = ((xRow - 1) * 8) + xColumn;
    createArrays();
    restart.parentElement.removeChild(restart);
}

function createArrays() {

    //Create bidimesional array with random values (matrixValues)
    for (var i = 0; i < 8; i++) {
        matrixValues[i] = [];
        for (var j = 0; j < 8; j++) {
            matrixValues[i][j] = random(-3, 5);
        }
    }
    //add 10 points X 2 and start cell (X)
    matrixValues[random(0, 7)][random(0, 7)] = 10;
    matrixValues[random(0, 7)][random(0, 7)] = 10;
    //-1 para agregar en el arreglo, pero se va a usar el xRow xColumn como referencia por eso es de random de 1 a 8
    matrixValues[xRow - 1][xColumn - 1] = "X";

    //create buttons
    //id = 1,2,3...64 class = row1,2,3...8 column1,2,3...8

    var text;
    for (var i = 0; i < 8; i++) {
        matrixButtons[i] = [];
        for (var j = 0; j < 8; j++) {
            //Matrix buttons
            matrixButtons[i][j] = document.createElement("button");
            matrixButtons[i][j].setAttribute("value", matrixValues[i][j]);
            matrixButtons[i][j].setAttribute("id", ((i * 8) + (j + 1)));
            matrixButtons[i][j].setAttribute("class", ("row" + (i + 1) + " column" + (j + 1) + " button"));
            matrixButtons[i][j].addEventListener("click", selectNumber);
            //add the text in the button
            text = document.createTextNode(matrixValues[i][j]);
            matrixButtons[i][j].appendChild(text);
        }
    }
    createTable(matrixButtons);
}




function createTable(tableData) {
    var table = document.createElement("table");
    table.setAttribute("id", "table")
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
    document.getElementById("game").appendChild(table);
}

function selectNumber(button) {
    //Calcular la fila y columna del boton clickeado
    var buttonRow = Math.ceil(button.target.id / 8);
    var buttonColumn = button.target.id;
    while (buttonColumn > 8) {
        buttonColumn -= 8;
    }
    //Calcular puntos
    var points = parseInt(button.target.innerHTML);;


    //
    //  PLAYER 1
    //
    if (!turn && xColumn == buttonColumn && button.target.innerHTML != "--" && button.target.innerHTML != "X") {
        //Agregar puntos y cambiar de turno
        player1Score = player1Score + points;
        player1ScoreText.innerHTML = "Score: " + player1Score;
        //transformar boton oprimido en X
        button.target.innerHTML = "X";
        button.target.value = "X";

        //Transformar la vieja X a --
        oldX = document.getElementById(oldXId);
        oldX.firstChild.data = "--";

        oldXId = button.target.id;


        //calcular y actualizar la nueva hilera en donde ira X
        xRow = Math.ceil(button.target.id / 8);


        // ver si existen botones disponibles para el siguente turno, si no entonces fin del juego

        for (var i = 0; i < 8; i++) {
            if (matrixButtons[xRow - 1][i].firstChild.data == "--" || matrixButtons[xRow - 1][i].firstChild.data == "X") {
                contador++;
            }
        }

        if (contador == 8) {
            endGame();
        } else {
            contador = 0;
        }
        //cambiar turno
        turn = !turn;
    }
    //firstChild.srcElement.data

    //
    //  PLAYER 2
    //

    if (turn && xRow == buttonRow && button.target.innerHTML != "--" && button.target.innerHTML != "X") {
        //Agregar puntos y cambiar de turno
        player2Score = player2Score + points;
        player2ScoreText.innerHTML = "Score: " + player2Score;
        //transformar boton oprimido en X
        button.target.innerHTML = "X";
        button.target.value = "X";

        //Transformar la vieja X a --
        oldX = document.getElementById(oldXId);
        oldX.firstChild.data = "--";


        oldXId = button.target.id;

        //calcular y actualizar la nueva hilera en donde ira X
        var newCol = button.target.id;
        while (newCol > 8) {
            newCol -= 8;
        }
        xColumn = newCol;

        // ver si existen botones disponibles para el siguente turno, si no entonces fin del juego

        contdor = 0;
        for (var i = 0; i < 8; i++) {
            if (matrixButtons[i][xColumn - 1].firstChild.data == "--" || matrixButtons[i][xColumn - 1].firstChild.data == "X") {
                contador++;
            }
        }

        if (contador == 8) {
            endGame();
        } else {
            contador = 0;
        }
        //cambiar turno
        turn = !turn;
    }
}


function endGame() {
    if (player1Score > player2Score) {
        alert("Jugador 1 gana");
    }
    if (player1Score < player2Score) {
        alert("Jugador 2 gana");
    }
    if (player1Score == player2Score) {
        alert("Empate");
    }


    //AAAAAAAAAAAA
    restart = document.createElement("button");
    nextLine = document.createElement("br");
    nextLine.setAttribute("id","nextLine");
    restart.setAttribute("id", "restart");
    restart.setAttribute("class", "restart d-flex justify-content-center");
    var t = document.createTextNode("Jugar de nuevo");
    restart.appendChild(t);
    restart.addEventListener("click", startGame);
    document.getElementById("buttnoDiv").appendChild(restart);
    document.getElementById("buttnoDiv").appendChild(nextLine);
}

function random(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}