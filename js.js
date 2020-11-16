function Csv() {
	this.parse = function(string, separator){
		//  * разбиваем по ентерам
		let array = string.split("\n");
		// * проверяем как нам делать массив
		if(string && separator){
			// * вызываем метод и возвращаем массив разбитый по символу
			return this.symbolCase(array, separator);
		}else if(string){
		// ? делаем массив, чтобы найти какого символа больше всего
			let sumbolArray = [[","], [";"], ["\t"]];
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
			var foundSymbol;
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
					if(sumbolArray[i][j] == sumbolArray[i][1]) count++;
				}
				// * если у нас первый символ больше чем предыдущее значение, перезаписываем максимальное число
				// @ это нужно для того, чтобы избежать ситуации когда у нас , и \т по 0 раз
				if(sumbolArray[i][1] > maxQuant) maxQuant = sumbolArray[i][1];
				// * если у нас количество раз когда мы встретили цифру равно количеству елементов минус знак
				// * и первая цифра равна самой большой цифре. тогда значит мы нашли знак
				if(sumbolArray[i].length - 1 == count && sumbolArray[i][1] == maxQuant){
					foundSymbol = sumbolArray[i][0];
				}
			}
			return this.symbolCase(array, foundSymbol);
		}
	}
	this.symbolCase = function(array, symb){
		// @ стрелочная функция. значения => то что возвращаем. 
		// @ {} - я добавила чтобы видеть что можно писать и с ними функцию, но большего размера
		return array.map((item) => item.split(symb));
	}
	this.generate = function(array, separator){
		// * если у нас есть и массив и знак
		if(array && separator){
			// * вызываем проверку на подмассивы
			array = this.checkArray(array, separator);
			return array.join(separator);
		}else if(array){
			// * если у нас только сам массив
			array = this.checkArray(array, ',');
			return array.join(',');
		}
	}
	this.checkArray = function(arr, s){
		// * проверка на подмассивы
		for(let j = 0; j < arr.length; j++){
			// * прототип етого объекта массив
			if(arr[j] instanceof Array){
				arr[j] = arr[j].join(s);
			}
		}
		return arr;
	}
}


var text = new Csv();

var resultArray = text.parse("Євпак Вік,тор Миколайович;ФО,,П;19,85;2;3;55\nБондар\tенко Анатолій Васильович;міський голова;1974;2;3;55\nМойсієнко Василь Миколайович;перший проректор;1965;2;3;55")
console.log(resultArray);


// var resultString = text.generate(["Євпак Вікasdfтор Миколайович", "ФОsdfП", "19dsf85", "2", "3", "55"], ";")
// console.log(resultString);

// var resultString = text.generate(['asdf', 'gggg', ['sdf', 'ffff', 'gggg'], 'www'], "\t")
// console.log(resultString);

function CsvArray(){
	this.parse = function(string, separator){
		let array = string.split("\n");
		if(string && separator){
			return this.symbolCase(array, separator);
		}else if(string){
			let sumbolArray = [[","], [";"], ["\t"]];
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
					if(sumbolArray[i][j] == sumbolArray[i][1]) count++;
				}
				if(sumbolArray[i][1] > maxQuant) maxQuant = sumbolArray[i][1];
				if(sumbolArray[i].length - 1 == count && sumbolArray[i][1] == maxQuant){
					foundSymbol = sumbolArray[i][0];
				}
			}
			console.log(array);
			console.log(foundSymbol);
			array = this.symbolCase(array, foundSymbol);
			console.log(array);
			for(let j = 0; j < array.length; j++){
				console.log(array[j]);
				this.push(array[j]);
			}
			console.log(this);
		}
	}
	this.generate = function(){

	}
	this.symbolCase = function(array, symb){
		// @ стрелочная функция. значения => то что возвращаем. 
		// @ {} - я добавила чтобы видеть что можно писать и с ними функцию, но большего размера
		return array.map((item) => { item.split(symb) });
	}
}

CsvArray.prototype = Object.create(Array.prototype);

var table = new CsvArray();
table.parse("42,qwe,92\n12,asd,73");
// console.log(table.parse("42,qwe,92\n12,asd,73"));
// console.log(table.length, table[0][0], table[1][2]);
























function Csv() {
	this.parse = function(string, separator){
		let array = string.split("\n");
		if(string && separator){
			return this.symbolCase(array, separator);
		}else if(string){
			let sumbolArray = [[","], [";"], ["\t"]];
			for(let i = 0; i < array.length; i++){
				//! было неправильно. я напрямую обращалась к елементам, ВСЕГДА при добавлении нужно делать пуш
				sumbolArray[0].push(array[i].replace(/[^,]/g, "").length);
				sumbolArray[1].push(array[i].replace(/[^;]/g, "").length);
				sumbolArray[2].push(array[i].replace(/[^\t]/g, "").length);
			}
			let foundSymbol;
			let maxQuant = 0;
			for(let i = 0; i < sumbolArray.length; i++){
				let count = 0;
				for(let j = 1; j < sumbolArray[i].length; j++){
					if(sumbolArray[i][j] == sumbolArray[i][1]) count++;
				}
				if(sumbolArray[i][1] > maxQuant) maxQuant = sumbolArray[i][1];
				console.log(": " + maxQuant);
				console.log("количекство цифри в массиве: " + count);
				if(sumbolArray[i].length - 1 == count && sumbolArray[i][1] == maxQuant){
					foundSymbol = sumbolArray[i][0];
				}
			}
			return this.symbolCase(array, foundSymbol);
		}
	}
	this.symbolCase = function(array, symb){
		
		return array.map((item) => item.split(symb));
	}
	this.generate = function(array, separator){
		if(array && separator){
			array = this.checkArray(array, separator);
			return array.join(separator);
		}else if(array){
			array = this.checkArray(array, ',');
			return array.join(',');
		}
	}
	this.checkArray = function(arr, s){
		for(let j = 0; j < arr.length; j++){
			if(arr[j] instanceof Array){
				arr[j] = arr[j].join(s);
			}
		}
		return arr;
	}
}


var text = new Csv();

var resultArray = text.parse("Євпак Вік,тор Миколайович;ФО,,П;19,85;2;3;55\nБондар\tенко Анатолій Васильович;міський голова;1974;2;3;55\nМойсієнко Василь Миколайович;перший проректор;1965;2;3;55", ";")
console.log(resultArray);


// var resultString = text.generate(["Євпак Вікasdfтор Миколайович", "ФОsdfП", "19dsf85", "2", "3", "55"], ";")
// console.log(resultString);

// var resultString = text.generate(['asdf', 'gggg', ['sdf', 'ffff', 'gggg'], 'www'], "\t")
// console.log(resultString);
// Євпак Віктор Миколайови,ч;,ФОП;1985;2;3;55
// Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
// Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55
// Євпак Віктор Миколайович;ФОП;1985;2;3;55
// Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
// Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55
// Бондаренко Анатолій Васильович;міський голова;1974;2;3;55
// Мойсієнко Василь Миколайович;перший проректор;1965;2;3;55