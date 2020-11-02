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

		document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
	});
});