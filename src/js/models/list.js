import uuidv1 from 'uuid/v1';
import { data } from '../views/base';
import { renderItem, clearInput, updateAllPercent } from '../views/listView';
import { updateBalance } from './header';

// Income constructor
class Income {
  constructor(id, description, amount) {
    this.id = id;
    this.description = description;
    this.amount = amount;
  }
}

// Expense constructor
class Expense {
  constructor(id, description, amount) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    // Init percent to 1
    this.percent = -1;
  }

  // calcualte for percent of each instace
  calcPercent(totalInc) {
    if (totalInc > 0) {
      this.percent = Math.round((this.amount / totalInc) * 100);
    } else {
      this.percent = -1;
    }
  }

  getPercent() {
    return this.percent;
  }
}

// Add new item to data obj
const addToData = (type, description, amount) => {
  const { lists } = data;

  let newItem;

  // Generate uniq id for each item
  const id = uuidv1();

  // Create new Item based on type
  if (type === 'exp') {
    newItem = new Expense(id, description, amount);
  } else if (type === 'inc') {
    newItem = new Income(id, description, amount);
  }

  // Inject into data obj
  lists[type].push(newItem);

  // Return that item
  return newItem;
};

// Add
export const addItem = item => {
  // Validation
  if (item.description !== '' && !isNaN(item.amount) && item.amount > 0) {
    // Add to data obj and get that new data
    const newItem = addToData(item.type, item.description, item.amount);
    // Render item to DOM
    renderItem(newItem, item.type);

    // Clear the input fields
    clearInput();

    // Update Balance on Header
    updateBalance();

    // Calculate and update percentages
    updateAllPercent();
  }
};

// delete from data obj
export const deleteIncItem = id => {
  data.lists.inc = data.lists.inc.filter(item => {
    return item.id !== id;
  });
};

export const deleteExpItem = id => {
  data.lists.exp = data.lists.exp.filter(item => {
    return item.id !== id;
  });
};
