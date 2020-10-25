document.querySelectorAll('[name], #formula').forEach(function(input){
	input.addEventListener('keyup', function(){
		var a1 = document.querySelector('[name="a1"]');
		var b1 = document.querySelector('[name="b1"]');
		var a2 = document.querySelector('[name="a2"]');
		var b2 = document.querySelector('[name="b2"]');

		var formula = document.querySelector('[name="formula"]');
		var result = document.querySelector('[name="result"]');
		var condition = document.querySelector('[name="condition"]');

		try{
			var calc = new Function('a1, b1, a2, b2', 'return ' + formula.value + ';' );
			var color = new Function('a1, b1, a2, b2, result, condition', 'if(' + condition.value + '){ result.style.background = "#b6d7a8"; }else{ result.style.background = "#fff"; }');
			if(formula.value){
				result.value = calc(Number(a1.value), Number(b1.value), Number(a2.value), Number(b2.value));
			}
			color(a1.value, b1.value, a2.value, b2.value, result, condition);
		}catch(error){
			result.value = "#ERROR";
			console.error(error.message);
		}
	});
});