document.querySelector('#user-form').addEventListener('submit', function (e) {
	e.preventDefault();

	var name = document.querySelector("input[name='full_name']");
	var email = document.querySelector("input[name='email']");
	var password = document.querySelector("input[name='password']");

	var nameRule = /^[а-щієїґюяь]+\s+[а-щієїґюья]+\s+[а-щієьїґюя]+$/i;
	var emailRule = /^[^\.][a-zA-Z\d\.\-]+(?<!\.)@(?!\.)([a-z]|[A-Z]|[0-9]|\.)+\.+[a-zA-Z0–9\-]+$/;
	var passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	
	name.style.backgroundColor = nameRule.test(name.value) ? "#C2E0C6" : "#F9D0C4";
	email.style.backgroundColor = emailRule.test(email.value) ? "#C2E0C6" : "#F9D0C4";
	password.style.backgroundColor = passwordRule.test(password.value) ? "#C2E0C6" : "#F9D0C4";

});

document.querySelectorAll('[data-show]').forEach(function (button) {
	button.addEventListener('click', function (e) {
		document.querySelector('#description').classList.add('d-none');
		document.querySelector('#preview').classList.add('d-none');

		var desc = document.querySelector('button[data-show="description"]');
		var prew = document.querySelector('button[data-show="preview"]');

		desc.classList.toggle("active");
		prew.classList.toggle("active");

		var text = 	document.querySelector('#description').value;
		var output = 	document.querySelector('#preview');

		function bold(str, first, sec, th){
			return "<strong>" + sec +"</strong>";
		}
		function italic(str, first, sec, th){
			return "<i>" + sec +"</i>";
		}
		function image(str, fir){
			return '<img src="' + fir + '"/>';
		}
		function link(str, fir, sec){
			console.log(str);
			// if(end !== ".jpg" && end !== ".png"){
				return '<a href="' + sec + '">' + sec + '</a>';
			// }else{
			// 	return str;
			// }
		}

		text = text.replace(/(\+\+)([а-щієїґюяь]+)(\+\+)/g, bold);
		text = text.replace(/(\-\-)([а-щієїґюяь]+)(\-\-)/g, italic);
		text = text.replace(/\((https:\/\/[\w/.-]+(\.jpg|\.png))\)/g, image);
		text = text.replace(/([^"(])(https:\/\/[\w/.-]+)/g, link);
		// text = text.replace(/[^"(](https:\/\/[\w/.-]+)(\.jpg|\.png)?/g, link);
		
		output.innerText = text;
		
		document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
	});
});