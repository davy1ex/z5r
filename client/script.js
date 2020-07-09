const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
	accordionItemHeader.addEventListener("click", event => {

		accordionItemHeader.classList.toggle("active");
		const accordionItemBody = accordionItemHeader.nextElementSibling;
		if(accordionItemHeader.classList.contains("active")) {
			accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
		}
		else {
			accordionItemBody.style.maxHeight = 0;
		}

	});
});

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
	modal.style.display = "block";
	modal.style.zIndex = "1000";
}
span.onclick = function() {
	modal.style.display = "none";
	modal.style.zIndex = "1";
}
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		modal.style.zIndex = "1";
	}
}


// Фокус на настройки
if (document.cookie != '') {
	let mainEl = document.querySelector('.main'); // главный селектор
	let signInEl = document.querySelector('#signIn'); // кнопка авторизации
	
	mainEl.classList.add('right-panel-active');	// смещает фокус на настройки
	signInEl.setAttribute("disabled", "disabled");	// смещает фокус на настройки
}

// фокус на логин
else if (document.cookie == '') {
	let mainEl = document.querySelector('.main');
	let settingsEl = document.querySelector('#signUp'); // кнопка настроек
	
	mainEl.classList.add('lef-panel-active');
	settingsEl.setAttribute("disabled", "disabled");	// смещает фокус на настройки
}

// let toggle = document.getElementById('container_choice');
// let toggleContainer = document.getElementById('toggle-container');
// let toggleNumber;
//
// toggle.addEventListener('click', function() {
// 	toggleNumber = !toggleNumber;
// 	if (toggleNumber) {
// 		toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
// 		toggleContainer.style.backgroundColor = 'dodgerblue';
// 	} else {
// 		toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
// 		toggleContainer.style.backgroundColor = 'dodgerblue';
// 	}
// 	console.log(toggleNumber)
// });

// let toggle_2 = document.getElementById('container_choice_2');
// let toggleContainer_2 = document.getElementById('toggle-container_2');
// let toggleNumber_2;
//
// toggle_2.addEventListener('click', function() {
// 	toggleNumber_2 = !toggleNumber_2;
// 	if (toggleNumber_2) {
// 		toggleContainer_2.style.clipPath = 'inset(0 0 0 50%)';
// 		toggleContainer_2.style.backgroundColor = 'dodgerblue';
// 	} else {
// 		toggleContainer_2.style.clipPath = 'inset(0 50% 0 0)';
// 		toggleContainer_2.style.backgroundColor = 'dodgerblue';
// 	}
// 	console.log(toggleNumber_2)
// });