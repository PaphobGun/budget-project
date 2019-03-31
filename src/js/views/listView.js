import { elements, data } from './base';

const {
  selectForm,
  descriptionForm,
  amountForm,
  addBtn,
  incBox,
  expBox
} = elements;

// Handle color select
export const renderInputColor = () => {
  selectForm.addEventListener('change', e => {
    if (e.target.value === 'inc') {
      selectForm.classList.remove('red');
      descriptionForm.classList.remove('red');
      amountForm.classList.remove('red');
      addBtn.classList.remove('redColor');
      selectForm.classList.add('green');
      descriptionForm.classList.add('green');
      amountForm.classList.add('green');
      addBtn.classList.add('greenColor');
    } else {
      selectForm.classList.remove('green');
      descriptionForm.classList.remove('green');
      amountForm.classList.remove('green');
      addBtn.classList.remove('greenColor');
      selectForm.classList.add('red');
      descriptionForm.classList.add('red');
      amountForm.classList.add('red');
      addBtn.classList.add('redColor');
    }
  });
};

// Get item from DOM
export const getItem = () => {
  return {
    // inc or exp
    type: selectForm.value,
    description: descriptionForm.value,
    amount: amountForm.value
  };
};

export const formatNumber = (num, type) => {
  // Set to 2 decimal points
  num = Math.abs(num);
  num = num.toFixed(2);

  // Convert to array with point
  // 200.00 >> [200, 00]
  let numSplit = num.split('.');

  // first index should be integer
  let int = numSplit[0];

  // Regexp to format in currency form
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // seconde index should be decimal
  let dec = numSplit[1];

  // Add '+' or '-' based on type
  if (type === 'inc') {
    return `+ ${int}.${dec}`;
  } else if (type === 'exp') {
    return `- ${int}.${dec}`;
  }
};

// Render item
export const renderItem = (item, type) => {
  let markup, element;

  // Create Markup for inject to DOM
  if (type === 'inc') {
    element = incBox;
    markup = `<div class="inc__list" id="${item.id}">
    <div class="description">${item.description}</div>
    <div class="inc__list--amount amount">${formatNumber(
      item.amount,
      type
    )}</div>
    <span><i class="fas fa-trash inc__list--del del"></i></span>
  </div>`;
  } else if (type === 'exp') {
    element = expBox;
    markup = `<div class="exp__list" id="${item.id}">
    <div class="description">${item.description}</div>
    <div class="exp__list--amount amount">${formatNumber(
      item.amount,
      type
    )}</div>
    <div class="exp__list--percent">100%</div>
     <span><i class="fas fa-trash exp__list--del del"></i></span>
  </div>`;
  }

  // Insert the markup into the DOM
  element.insertAdjacentHTML('beforeend', markup);
};

// Clear Input Fields
export const clearInput = () => {
  descriptionForm.value = '';
  amountForm.value = '';

  descriptionForm.focus();
};

// calculate for each item
const calcAllPercent = () => {
  const { exp } = data.lists;
  const { inc } = data.totals;

  exp.forEach(item => {
    item.calcPercent(inc);
  });
};

// Get array that contains each percent of exp item
const getTotalPercent = () => {
  const { exp } = data.lists;

  const totalPercent = exp.map(item => item.getPercent());
  // array of each percent
  return totalPercent;
};

// Render percent on each exp item
export const renderEachPercent = percentages => {
  const percentNode = document.querySelectorAll('.exp__list--percent');

  percentNode.forEach((item, index) => {
    if (percentages[index] > 0) {
      item.textContent = `${percentages[index]}%`;
    } else {
      item.textContent = '--';
    }
  });
};

// Update percent of each exp items
export const updateAllPercent = () => {
  // Calculate All Percent of each expense items
  calcAllPercent();

  // Get array of each percent
  const percentages = getTotalPercent();

  // Render each percent to DOM
  renderEachPercent(percentages);
};

export const deleteFromDom = id => {
  const el = document.getElementById(id);
  el.parentNode.removeChild(el);
};
