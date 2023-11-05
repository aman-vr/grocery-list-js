const itemForm = document.querySelector('#item-form');
const itemInput = itemForm.querySelector('#item-input');
const formBtn = itemForm.querySelector('.btn');
const itemList = document.querySelector('#item-list');
const clearAll = document.querySelector('#clear');
const filter = document.querySelector('#filter');

let isEditMode = false;

function displayItems() {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => addItemToDOM(item));
	checkUI();
}

function onAddItemSubmit(e) {
	e.preventDefault(); // prevents the default behavior of an event

	const inputValue = itemInput.value;

	// Validate input
	if (inputValue === '') {
		alert('Enter the item name!!');
		return;
	}

	// Check for edit mode

	if (isEditMode) {
		const itemToEdit = itemList.querySelector('.edit-mode');
		removeItemFromStorage(itemToEdit.textContent);
		itemToEdit.remove();
		isEditMode = false;
	}

	if (duplicateItemCheck(inputValue)) {
		alert('Item already exists!!');
		return;
	}

	addItemToDOM(inputValue);
	addItemToStorage(inputValue);

	checkUI();

	// Empty input value after addition of item
	itemInput.value = '';
}

function addItemToDOM(item) {
	const newLi = document.createElement('li');
	const liText = document.createTextNode(item);
	newLi.appendChild(liText);

	const liBtn = createButton('remove-item btn-link text-red');
	newLi.appendChild(liBtn);

	itemList.appendChild(newLi);
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

function addItemToStorage(item) {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.push(item);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
	let itemsFromStorage = localStorage.getItem('items');
	itemsFromStorage =
		itemsFromStorage === null ? [] : JSON.parse(itemsFromStorage);
	return itemsFromStorage;
}

function onClickItem(e) {
	const iconBtn = e.target.parentElement;
	if (iconBtn.classList.contains('remove-item')) {
		removeItem(iconBtn.parentElement);
	} else {
		setItemToEdit(e.target);
	}
}

function duplicateItemCheck(item) {
	const itemsFromStorage = getItemsFromStorage();
	return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
	isEditMode = true;

	itemList
		.querySelectorAll('li')
		.forEach((i) => i.classList.remove('edit-mode'));

	item.classList.add('edit-mode');

	formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
	formBtn.style.backgroundColor = '#228B22';
	itemInput.value = item.textContent;
}

function removeItem(item) {
	if (confirm('Are you sure?')) {
		item.remove();
		removeItemFromStorage(item.textContent);

		checkUI();
	}
}

function removeItemFromStorage(item) {
	let itemsFromStorage = getItemsFromStorage();
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearAllItems() {
	itemList.innerHTML = '';
	localStorage.removeItem('items');
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
	itemInput.value = '';

	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearAll.style.display = 'none';
		filter.style.display = 'none';
	} else {
		clearAll.style.display = 'block';
		filter.style.display = 'block';
	}

	formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
	formBtn.style.backgroundColor = '#333';
}

// Event Listeners

itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearAll.addEventListener('click', clearAllItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
