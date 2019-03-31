import '../scss/main.scss';

import { data, elements } from './views/base';
import { renderTime } from './views/headerView';
import {
  renderInputColor,
  getItem,
  updateAllPercent,
  deleteFromDom
} from './views/listView';
import { updateBalance } from './models/header';
import { addItem, deleteIncItem, deleteExpItem } from './models/list';

const { addBtn } = elements;

// Handle Header
renderTime();

// Handle Change Input
renderInputColor();

// Focus on description form
elements.descriptionForm.focus();

const controlAddItem = () => {
  // Get new item from DOM
  const newItem = getItem();
  // Add to Data obj & DOM
  addItem(newItem);
};

// Controller
// Handle Add Button
addBtn.addEventListener('click', () => {
  controlAddItem();
});

// Handle Enter Key
document.addEventListener('keypress', () => {
  // If key is enter key
  if (event.keyCode === 13 || event.which === 13) {
    controlAddItem();
  }
});

const controlDelete = (type, id) => {
  if (type === 'inc') {
    // Delete from data obj
    deleteIncItem(id);
  } else if (type === 'exp') {
    // Delete from data obj
    deleteExpItem(id);
  }
  // Delete from DOM
  deleteFromDom(id);
  // Re Update
  updateBalance();
  updateAllPercent();
};

elements.incBox.addEventListener('click', e => {
  // id of selected item
  const id = e.target.parentNode.parentNode.id;

  if (id) {
    controlDelete('inc', id);
  }
});

elements.expBox.addEventListener('click', e => {
  // id of selected item
  const id = e.target.parentNode.parentNode.id;

  if (id) {
    controlDelete('exp', id);
  }
});
