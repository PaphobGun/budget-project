import { data } from '../views/base';
import { renderBalance } from '../views/headerView';

// Calculate total amount and add it to data obj
const calcTotal = type => {
  const { lists, totals } = data;

  let totalAmount = 0;

  lists[type].forEach(item => {
    totalAmount += parseFloat(item.amount);
  });
  totals[type] = totalAmount;
};

// Calculate total balance and add it to data obj
const calcBalance = () => {
  const { totals } = data;

  // calculate both
  calcTotal('exp');
  calcTotal('inc');

  // calculate balance
  data.balance = totals.inc - totals.exp;

  // calculate the percentage of income that we spent
  if (totals.inc > 0) {
    data.percent = Math.round((totals.exp / totals.inc) * 100);
  } else {
    data.percent = -1;
  }
};

// Get balance / totals / percent from data obj
const getBalanceData = () => {
  const { balance, totals, percent } = data;

  return {
    balance,
    totalInc: totals.inc,
    totalExp: totals.exp,
    percent
  };
};

export const updateBalance = () => {
  // Calculate total balance
  calcBalance();
  // Get balance
  const balanceData = getBalanceData();
  // Render to DOM
  renderBalance(balanceData);
};
