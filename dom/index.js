jQuery('input').on('paste', function (e) {
	e.preventDefault();

	var text = e.originalEvent.clipboardData.getData('text/plain');
	var input = e.currentTarget;

	var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
	var array = text.split("\n").map(function (e) {
		return e.split(";").map(String);
	});
	var row = input.parentNode.parentNode.rowIndex;
	var column = input.offsetParent.cellIndex;
	table = jQuery('table');
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

	console.log(table[0].children[1].childElementCount);
	for (let i = 0; i < table[0].children[1].childElementCount - (row - 1); i++) {
		for (let j = 0; j < array[i].length; j++) {
			table[0].children[1].children[row + i - 1].children[j + column].children[0].value = array[i][j];
		}
	}
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

jQuery('thead th').on('contextmenu', function (e) {
	e.preventDefault();

	currentColumn = e.currentTarget;

	var menu = jQuery('#column-menu');

	menu.addClass('d-block');

	menu.css({
		left: e.clientX,
		top: e.clientY
	});
});

jQuery('#column-menu [data-action]').on('click', function (e) {
	e.preventDefault();

	var action = e.currentTarget.getAttribute('data-action');

	switch (action) {
		case 'add-left':

			break;

		case 'add-right':

			break;

		case 'remove':

			break;
	}

	jQuery('#column-menu').removeClass('d-block');
});