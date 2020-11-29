import React from 'react';

export default function Table(props) {
	let {columns, rows, cell, data} = props;

	const alpha = 'abcdefghijklmnopqrstuvwxyz';

	const tableHead = [];
	for (let rowsNumber = 0; rowsNumber< columns + 1; rowsNumber += 1) {
		(rowsNumber === 0) ?
			tableHead.push(<td key={'head' + rowsNumber}>{'\u00A0'}</td>) :
			tableHead.push(
				<td 
					key={alpha.charAt(rowsNumber - 1)}
				>
				{alpha.charAt(rowsNumber - 1).toLocaleUpperCase()}
				</td>
			);
	}
	let i = 0;
	let col = 0;
	let row = 0;
	if (cell) {
		col = (alpha.indexOf(cell.charAt(0).toLocaleLowerCase())) + 1;
		row = Number(cell.replace(cell[0], '')) - 1;
	}

	const tableBody = [];
	for (let rowsNumber = 0; rowsNumber< rows; rowsNumber += 1) {
		const column = [];
		let forCol = col;
		let j = 0;
		for (let colNumber = 0; colNumber< columns + 1; colNumber += 1) {
			if (colNumber === 0) {
				column.push(<td key={'body' + (rowsNumber + 1) + colNumber}>{rowsNumber + 1}</td>)
			} else {
					if (colNumber === forCol && rowsNumber === row) {
						column.push(
							<td
								key={alpha.charAt(colNumber - 1) + (rowsNumber + 1)}
							>
								<input
									name={alpha.charAt(colNumber - 1) + (rowsNumber + 1)}
									value= {data[i][j]}
								/>
							</td>
						);
						j += 1;
						forCol += 1
					} else {
						column.push(
							<td
								key={alpha.charAt(colNumber - 1) + (rowsNumber + 1)}
							>
								<input
									name={alpha.charAt(colNumber - 1) + (rowsNumber + 1)}
								/>
							</td>
						);
					}
			}
		}
		if (rowsNumber === row) {
			i += 1;
			row += 1;
		}

		tableBody.push(
			<tr key={rowsNumber}>
				{column}
			</tr>
		);
	}

	return(
		<table>
			<thead>
				<tr>{tableHead}</tr>
			</thead>

			<tbody>
				{tableBody}
			</tbody>
		</table>
	);
};
/*
Євпак Віктор Миколайович;ФОП;1985;2;3;55
Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55
Євпак Віктор Миколайович;ФОП;1985;2;3;55
Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55
Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55
*/