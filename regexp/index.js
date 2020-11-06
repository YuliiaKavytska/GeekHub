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
		function link(str, fir){
				return '<a href="' + fir + '">' + fir + '</a>';
		}

		text = text.replace(/(\+\+)([0-9а-щієїґюяьёъы\w]+)(\+\+)/gi, bold);
		text = text.replace(/(\-\-)([0-9а-щієїґюяьёъы\w]+)(\-\-)/gi, italic);
		text = text.replace(/\((https?:\/\/[0-9а-щієїґюяьёъы\w\/.:-]+(\.jpg|\.png)\s?)\)/gi, image);
		text = text.replace( /((?<!")https?:\/\/[\w\/\.:-]+[\w\/])/g, link);
		
		output.innerHTML = text;
		document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
	});
});

// ++lorem++ ipsum--dolor-- sit https://google.com img: (https://static01.nyt.com/images/2018/10/04/magazine/04blackhole1/04blackhole1-articleLarge-v3.jpg) ++againbold++ --linklist-- https://google.com, https://google.com and the last link https://blablabla.ugu.