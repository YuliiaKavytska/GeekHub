function Csv() {
}

Csv.prototype.parse = function(string, separator){
//  * разбиваем по ентерам
	const array = string.split("\n");
// * проверяем как нам делать массив
	if (string && separator) {
// * вызываем метод и возвращаем массив разбитый по символу
		return this.symbolCase(array, separator);
	}else if (string) {
// ? делаем массив, чтобы найти какого символа больше всего
		const sumbolArray = [[","], [";"], ["\t"]];
// * проодимся по строкам
		for(let i = 0; i < array.length; i++){
//! было неправильно. я напрямую обращалась к елементам, ВСЕГДА при добавлении нужно делать пуш
// ? считаем сколько раз в строке встретился символ и записываем в массив
			sumbolArray[0].push(array[i].replace(/[^,]/g, "").length);
// ! все символы которые не ; оно заменяет на пустоту и считает сколько символов осталось
			sumbolArray[1].push(array[i].replace(/[^;]/g, "").length);
			sumbolArray[2].push(array[i].replace(/[^\t]/g, "").length);
		}
// * какой символ мы нашли
		let foundSymbol;
// * какого символа больше всего
		let maxQuant = 0;
// * проходимся по массиву с числами, сколько раз нам встречался знак.
// * идем от 1. потому что 0 это сам символ
		for(let i = 0; i < sumbolArray.length; i++){
// * сколько раз встретилась цифра в массиве. это число должно равняться количеству елементов - сам знак
			let count = 0;
// * проходимся по цифрам
			for(let j = 1; j < sumbolArray[i].length; j++){
// * если символ равен первому символу 
// * (тот который сразу после знака, а вообще можно брать любой, ведь их должно быть одинаковое количество)
// * то плюсуем что он нам встретился 1 раз
// * для каждой итерации каунт разный
				if(sumbolArray[i][j] === sumbolArray[i][1]) count++;
			}
// * если у нас первый символ больше чем предыдущее значение, перезаписываем максимальное число
// @ это нужно для того, чтобы избежать ситуации когда у нас , и \т по 0 раз
			if(sumbolArray[i][1] > maxQuant) maxQuant = sumbolArray[i][1];
// * если у нас количество раз когда мы встретили цифру равно количеству елементов минус знак
// * и первая цифра равна самой большой цифре. тогда значит мы нашли знак
			if(sumbolArray[i].length - 1 === count && sumbolArray[i][1] === maxQuant){
				foundSymbol = sumbolArray[i][0];
			}
		}
		return this.symbolCase(array, foundSymbol);
	}
}

Csv.prototype.symbolCase = function(array, symb){
// @ стрелочная функция. значения => то что возвращаем. 
// @ {} - я добавила чтобы видеть что можно писать и с ними функцию, но большего размера
	return array.map((item) => item.split(symb));
}

Csv.prototype.generate = function(array, separator){
// * если у нас есть и массив и знак
	if(array && separator){
		return array.join(separator);
	}else if(array){
// * если у нас только сам массив
		for(let j = 0; j < array.length; j++){
			array[j] = array[j].join(';');
		}
		return array.join('\n');
	}
}

// var text = new Csv();

// var resultArray = text.parse("Євпак Вік,тор Миколайович;ФО,,П;19,85;2;3;55\nБондар\tенко Анатолій Васильович;міський голова;1974;2;3;55\nМойсієнко Василь Миколайович;перший проректор;1965;2;3;55", ";")
// console.log(resultArray);

// var resultArray = text.parse("Євпак Вік,тор Миколайович;ФО,,П;19,85;2;3;55\nБондар\tенко Анатолій Васильович;міський голова;1974;2;3;55\nМойсієнко Василь Миколайович;перший проректор;1965;2;3;55")
// console.log(resultArray);


// var resultString = text.generate(["Євпак Вікasdfтор Миколайович", "ФОsdfП", "19dsf85", "2", "3", "55"], "\n")
// console.log(resultString);

// var resultString = text.generate([
// 	[
// 	"Lorem Ipsu",
// 	"m - це текст-\"р",
// 	"иба\", що ",
// 	"використовуєть"
// 	],
// 	[
// 	"ся в друкарстві т",
// 	"а дизайні. ",
// 	"Lorem Ipsum є,",
// 	" фактично, стандарт"
// 	],
// 	[
// 	"ною \"рибою\" аж з XV",
// 	"I сторіччя, коли не",
// 	"відомий друка",
// 	"р взяв ш"
// 	]
// 	]);
// console.log(resultString);


// var resultString = text.generate(['asdf', 'gggg', ['sdf', 'ffff', 'gggg'], 'www'], "\t")
// console.log(resultString);

function CsvArray(){
}

CsvArray.prototype = Object.create(Array.prototype);

CsvArray.prototype.parse = function(string, separator){
	let array = string.split("\n");
	if(string && separator){
		array = this.smCase(array, separator);
		for(let j = 0; j < array.length; j++){
			console.log(array[j]);
			this.push(array[j]);
		}
	}else if(string){
		const sumbolArray = [[","], [";"], ["\t"]];
		for(let i = 0; i < array.length; i++){
			sumbolArray[0].push(array[i].replace(/[^,]/g, "").length);
			sumbolArray[1].push(array[i].replace(/[^;]/g, "").length);
			sumbolArray[2].push(array[i].replace(/[^\t]/g, "").length);
		}
		let foundSymbol;
		let maxQuant = 0;
		for(let i = 0; i < sumbolArray.length; i++){
			let count = 0;
			for(let j = 1; j < sumbolArray[i].length; j++){
				if(sumbolArray[i][j] === sumbolArray[i][1]) count++;
			}
			if(sumbolArray[i][1] > maxQuant) maxQuant = sumbolArray[i][1];
			if(sumbolArray[i].length - 1 === count && sumbolArray[i][1] === maxQuant){
				foundSymbol = sumbolArray[i][0];
			}
		}
// * рассоиденяем все ячейки чтобы получить чистый массив
		array = this.smCase(array, foundSymbol);
// * проходимся по строкам 
		for(let j = 0; j < array.length; j++){
// ? записываем в поля объекта значения
			this.push(array[j]);
		}
	}
}

CsvArray.prototype.generate = function(separator){
	if(separator){
// * проходимся по всем полям
		for(let j = 0; j < this.length; j++){
// ? внутри поля объединяем все в строку
			this[j] = this[j].join(separator);
		}
	}else{
// * проходимся по всем полям
		for(let j = 0; j < this.length; j++){
// ? внутри поля объединяем все в строку
			this[j] = this[j].join(",");
		}
	}
// ? объединяем все поля в строку с разделением новой строкой
	return this.join('\n');
}

CsvArray.prototype.smCase = function(ar, s){
	return ar.map(function(i){
		return i.split(s);
	});
}

CsvArray.prototype.getCell = function(exel){
// * массив алфавита
	const alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
// * проходимся по массиву и ищем совпадения
	for(let j = 0; j < alphabet.length; j++){
		if(alphabet[j] == exel[0].toLocaleLowerCase()){
// ? удаляем первый символ чтобы осталось только число колонки
			const column = Number(exel.replace(exel[0], ''));
// * возвращем найденое значние (поле)
			return this[j][column - 1];
		}
	}
}

var table = new CsvArray();
table.parse("42,qwe,92\n12,asd,73");
console.log(table.length, table[0][0], table[1][2]);

table[0][0] = 'zxc';
console.log(table.generate());

// console.log(table.getCell('B2'));