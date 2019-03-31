import { elements } from './base';
import { formatNumber } from './listView';

export const renderTime = () => {
  const { month, year } = elements;

  // Render Month and Year ( real time )
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const now = new Date();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();

  month.textContent = months[nowMonth];
  year.textContent = nowYear;
};

// Render to header
export const renderBalance = BalanceData => {
  const { balance, totalInc, totalExp, percent } = BalanceData;
  const { balanceDom, incDom, expDom, percentHead } = elements;

  let type;

  if (balance > 0) {
    type = 'inc';
  } else {
    type = 'exp';
  }

  // render Balance, total inc, total exp  to the DOM
  balanceDom.textContent = formatNumber(balance, type);
  incDom.textContent = formatNumber(totalInc, 'inc');
  expDom.textContent = formatNumber(totalExp, 'exp');

  // render total percent of exp/inc
  if (percent > 0) {
    percentHead.textContent = `${percent}%`;
  } else {
    percentHead.textContent = `${percent}%`;
  }
};
