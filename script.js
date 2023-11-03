const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

function addItem(e) {
	e.preventDefault(); // prevents the default behavior of an event

	const inputValue = itemInput.value;

	//Validate input
	if (inputValue === '') {
		alert('Enter the item name!!');
		return;
	}

	const newLi = document.createElement('li');
	const liText = document.createTextNode(inputValue);
	newLi.appendChild(liText);

	const liBtn = createButton('remove-item btn-link text-red');
	newLi.appendChild(liBtn);

	itemList.appendChild(newLi);

	// Empty input value after addition of item
	itemInput.value = '';
}

function createButton(classes) {
	const btn = document.createElement('button');
	btn.className = classes;

	const icon = createIcon('fa-solid fa-xmark');
	btn.appendChild(icon);

	return btn;
}

function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;

	return icon;
}

// Event Listeners

itemForm.addEventListener('submit', addItem);
