const user = {
	name: "Yuliia",
	age: 21,
	scils: ['html', 'css', 'scss', 'js', 'php', 'laravel', 'prepros'],
	showInformation: function(phrase){
		console.log(this);
		console.group(`Information about ${this.name}`)
		console.log(`User name is ${this.name}`);
		console.log(`User age is ${this.age}`);
		console.log(`User favorite phrase is ${phrase}`);
		for(let i = 0; i < this.scils.length; i++){
			console.log(`Strong knowladge of: ${this.scils[i - 1]}`);
		}
		console.groupEnd();
	}
}

// ! Создаем новый объект с прототипом юзер
const parent = new Object(user);

const teacher = new Object({ // * Это конструктор
	name: "Tatiana",
	age: 55,
	scils: ['php', 'laravel', 'prepros'],
});

// ! Это не правильно
// teacher.showInformation.bind(this);
// ! Это не правильно

// * Это правильно
user.showInformation.bind(teacher, "Work is beautiful!")();
// * Это правильно

user.showInformation("I hate my life...");