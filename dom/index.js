table = jQuery('table');
var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
jQuery('input').on('paste', function (e) {
	e.preventDefault();

	var text = e.originalEvent.clipboardData.getData('text/plain');
	var input = e.currentTarget;

	
	var array = text.split("\n").map(function (e) {
		return e.split(";").map(String);
	});
	var row = input.parentNode.parentNode.rowIndex;
	var column = input.offsetParent.cellIndex;
	
	console.log(array);
	console.log("row " + row);
	console.log("column " + column);

	var createAdditionalColomns = array[0].length - ((table[0].children[0].children[0].childElementCount - 1) - (column - 1));
	var createAdditionalRows = array.length - ((table[0].children[1].childElementCount) - (row - 1));
	console.log("need add row " + createAdditionalRows);
	console.log("need column " + createAdditionalColomns);

	for (let i = 0; i < createAdditionalColomns; i++) {

		let header = table[0].children[0].children[0];
		let newTitle = document.createElement("th");
		newTitle.innerText = alphabet[i + 2].toLocaleUpperCase();
		header.append(newTitle);
	}

	let body = table[0].children[1];
	console.log(body);
	for (let r = 0; r < createAdditionalRows; r++) {
		let num = r + 3;
		let newRow = "<tr><th>" + num + "</th><td><input type='text' name='" + alphabet[0] + num + "' value=''/></td><td><input type='text' name='" + alphabet[1] + num + "' value=''/></td></tr>";
		body.innerHTML += newRow;
	}
	for (let j = 0; j < table[0].children[1].childElementCount; j++) {
		let row = table[0].children[1].children[j];
		for (let c = 0; c < createAdditionalColomns; c++) {
			let num = j + 1;
			let character = alphabet[c + 2];
			let newInput = "<td><input type='text' name='" + character + num + "' value=''/></td>";
			row.innerHTML += newInput;
		}
	}

	for (let i = 0; i < table[0].children[1].childElementCount - (row - 1); i++) {
		for (let j = 0; j < array[i].length; j++) {
			table[0].children[1].children[row + i - 1].children[j + column].children[0].value = array[i][j];
		}
	}
	addListRowAll();
	addListToAll();
});
// Євпак Віктор Миколайович;ФОП;1985;2;3;55
// Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
// Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55
// Євпак Віктор Миколайович;ФОП;1985;2;3;55
// Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
// Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55
// Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
// Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55

var currentColumn;
var indexColumn;

var menu = jQuery('#column-menu');
function addListToAll(){
	jQuery('thead th').on('contextmenu', function (e) {
		e.preventDefault();
		currentColumn = e.currentTarget;
		indexColumn = currentColumn.cellIndex;
		if(indexColumn != 0){
			menu.addClass('d-block');
			menu.css({
				left: e.clientX,
				top: e.clientY
			});
		}else{
			menu.removeClass('d-block');
		}
	});
}
addListToAll();

jQuery('#column-menu [data-action]').on('click', function (e) {
	e.preventDefault();

	var action = e.currentTarget.getAttribute('data-action');
	
	switch (action) {
		case 'add-left':
			currentColumn.insertAdjacentHTML("beforeBegin", '<th></th>');
			for(let i = 0; i < table[0].children[1].childElementCount; i++){
				table[0].children[1].children[i].children[indexColumn].insertAdjacentHTML("beforeBegin", '<td><input type="text" name="" value=""/></td>');
			}
			break;

		case 'add-right':
			currentColumn.insertAdjacentHTML("afterEnd", '<th></th>');
			for(let i = 0; i < table[0].children[1].childElementCount; i++){
				table[0].children[1].children[i].children[indexColumn].insertAdjacentHTML("afterEnd", '<td><input type="text" name="" value=""/></td>');
			}
			break;

		case 'remove':
			currentColumn.remove();
			for(let i = 0; i < table[0].children[1].childElementCount; i++){
				table[0].children[1].children[i].children[indexColumn].remove();
			}
			break;
	}
	
	addListToAll();
	reriteNames();
	jQuery('#column-menu').removeClass('d-block');
});

function reriteNames() {
	var quantitlyColumn = table[0].children[0].children[0].childElementCount;
	for(let i = 1; i < quantitlyColumn; i++){
		table[0].children[0].children[0].children[i].innerText = alphabet[i - 1].toLocaleUpperCase();
	}

	var quantitlyRows = table[0].children[1].childElementCount;
	
	for(let i = 0; i < quantitlyRows; i++){
		var quantitlyItems = table[0].children[1].children[i].childElementCount;
		for(let j = 0; j < quantitlyItems - 1; j++){
			table[0].children[1].children[i].children[j + 1].name = alphabet[j] + (i + 1);
		}
	}
	for(let i = 0; i < quantitlyRows; i++){
		table[0].children[1].children[i].children[0].innerText = i + 1;
	}
}

var rowMenu = jQuery('#row-menu');
var currentRow;
var indexRow;
function addListRowAll() {
	jQuery('tbody tr th').on('contextmenu', function (e) {
		e.preventDefault();
		currentRow = e.currentTarget;
		indexRow = Number(currentRow.innerText) - 1;
		rowMenu.addClass('d-block');
		rowMenu.css({
				left: e.clientX,
				top: e.clientY
			});
	
		console.dir(currentRow);
	});
}
addListRowAll();

jQuery('#row-menu [data-action]').on('click', function (e) {
	e.preventDefault();
	rowMenu.removeClass('d-block');
	var action = e.currentTarget.getAttribute('data-action');

	switch (action) {
		case 'add-above':
			currentRow.parentNode.insertAdjacentHTML("beforeBegin", '<tr></tr>');
			currentRow.parentNode.previousElementSibling.innerHTML += "<th>" + indexRow + "</th>";
			for(let i = 0; i < table[0].children[1].children[indexRow + 1].childElementCount - 1; i++){
				table[0].children[1].children[indexRow].innerHTML += '<td><input type="text" name="' + alphabet[i] + (indexRow + 1) + '" value=""/></td>';
			}
			break;

		case 'add-under':
			currentRow.parentNode.insertAdjacentHTML("afterEnd", '<tr></tr>');
			currentRow.parentNode.nextElementSibling.innerHTML += "<th>" + indexRow + "</th>";
			for(let i = 0; i < table[0].children[1].children[indexRow].childElementCount - 1; i++){
				table[0].children[1].children[indexRow + 1].innerHTML += '<td><input type="text" name="' + alphabet[i] + (indexRow + 2) + '" value=""/></td>';
			}
			break;

		case 'remove':
			currentRow.parentNode.remove();
			break;
	}
	reriteNames();
	addListRowAll();
	jQuery('#column-menu').removeClass('d-block');
});