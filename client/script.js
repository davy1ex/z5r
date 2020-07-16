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
			accordionItemBody.style.maxHeight = "100%";
		}
		else {
			accordionItemBody.style.maxHeight = 0;
		}

	});
});

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let btn_cust = document.getElementsByClassName("customization")[0];
let span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
	modal.style.display = "block";
	modal.style.zIndex = "1000";
}
btn_cust.onclick = function() {
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
// .................................................................

let control_btn = document.getElementById("control_btn");
let control = document.getElementById("control");
control_btn.onclick = function() {
	container.style.display = "none";
	control.style.display = "flex";
}


// .................................................................
// если авторизирован
if (document.cookie != '') {
	let mainEl = document.querySelector('.main'); // главный селектор
	let outField = document.querySelector('.overlay-left'); // главный селектор

	var outButton = document.createElement('button');
	// <button class="log_out" name='log_out' type="submit" >Выход</button>
	// outButton.type = 'submit';
	// outButton.name="log_out";
	// outButton.classList.add("log_out");
	// outButton.onclick()
	// outField.appendChild(outButton);


	let signInEl = document.querySelector('#signIn'); // кнопка настроек

	let remTextEl = document.querySelector('.overlay-left p')
	let remButtonEl = document.querySelector('#signIn')
	remTextEl.remove();
	remButtonEl.remove();

	mainEl.classList.add('right-panel-active');	// смещает фокус на настройки
	signInEl.setAttribute("disabled", "disabled");	// смещает фокус на настройки
}

// если не авторизирован
else if (document.cookie == '') {
	let mainEl = document.querySelector('.main'); // селектор с частью где вход

	let settingsEl = document.querySelector('#signUp'); // кнопка настроек
	settingsEl.remove(); // удаляет кнопку настроек


	mainEl.classList.add('lef-panel-active'); // смещает фокус на авторизацию

}

let tab1 = document.getElementById("tab1");
let tab2 = document.getElementById("tab2");
let tab3 = document.getElementById("tab3");
let tab4 = document.getElementById("tab4");

$('#option-one-door').click(function() {
	if ($(this).is(":checked")) {
	tab1.setAttribute('checked','test');
	tab1.removeAttribute("disabled");

	tab2.removeAttribute("checked");
	tab3.removeAttribute("checked");
	tab4.removeAttribute("checked");
	tab2.setAttribute('disabled','test1');
	tab3.setAttribute('disabled','test1');
	tab4.setAttribute('disabled','test1');
	}


})
$('#option-two-door').click(function() {
	if ($(this).is(":checked")) {
	tab2.setAttribute('checked','test');
	tab2.removeAttribute("disabled");

	tab3.removeAttribute("checked");
	tab1.removeAttribute("checked");
	tab4.removeAttribute("checked");
	tab1.setAttribute('disabled','test1');
	tab3.setAttribute('disabled','test1');
	tab4.setAttribute('disabled','test1');
	}


})
$('#option-three-tab').click(function() {
	if ($(this).is(":checked")) {
	tab3.setAttribute('checked','test');
	tab3.removeAttribute("disabled");

	tab2.removeAttribute("checked");
	tab1.removeAttribute("checked");
	tab4.removeAttribute("checked");
	tab2.setAttribute('disabled','test1');
	tab1.setAttribute('disabled','test1');
	tab4.setAttribute('disabled','test1');
	}


})
$('#option-four-tab').click(function() {
	if ($(this).is(":checked")) {
	tab4.setAttribute('checked','test');
		tab4.removeAttribute("disabled");

		tab2.removeAttribute("checked");
		tab1.removeAttribute("checked");
		tab3.removeAttribute("checked");
		tab2.setAttribute('disabled','test1');
		tab3.setAttribute('disabled','test1');
		tab1.setAttribute('disabled','test1');
	}


})

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
