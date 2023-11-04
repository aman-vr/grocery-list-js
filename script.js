const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearAll = document.querySelector('#clear');
const filter = document.querySelector('#filter');

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

	checkUI();

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

function removeItem(e) {
	const iconBtn = e.target.parentElement;
	if (iconBtn.classList.contains('remove-item')) {
		if (confirm('Are you sure?')) {
			iconBtn.parentElement.remove();

			checkUI();
		}
	}
}

function clearAllItems() {
	itemList.innerHTML = '';
	checkUI();
}

function filterItems(e) {
	const items = itemList.querySelectorAll('li');
	const text = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();
		if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
}

function checkUI() {
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearAll.style.display = 'none';
		filter.style.display = 'none';
	} else {
		clearAll.style.display = 'block';
		filter.style.display = 'block';
	}
}

// Event Listeners

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearAll.addEventListener('click', clearAllItems);
filter.addEventListener('input', filterItems);

checkUI();
