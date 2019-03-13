alert("A");
function random(min,max){
    return(Math.floor(Math.random()*(max-min+1))+min);
}


var numero;
for(var i=0; i<20;i++){
    numero = random(-6,5);
    document.write(numero);
}




/*
function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

createTable([["row 1, cell 1", "row 1, cell 2"], ["row 2, cell 1", "row 2, cell 2"]]);

*/
/*
function myFunction() {
    var btn = document.createElement('input');
    btn.setAttribute('type', 'button'); // input element of type button
    btn.setAttribute('value', 'FINISH GAME');
    btn.onclick = sf;
    document.body.appendChild(btn);
};

OR

function myFunction() {
    var btn = document.createElement('button'); // button element
    var t = document.createTextNode("FINISH GAME");
    btn.appendChild(t);
    btn.onclick = sf;
    document.body.appendChild(btn);
};
*/