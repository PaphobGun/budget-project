export const elements = {
  month: document.querySelector('.month'),
  year: document.querySelector('.year'),
  selectForm: document.querySelector('.input__type'),
  descriptionForm: document.querySelector('.input__description'),
  amountForm: document.querySelector('.input__amount'),
  addBtn: document.querySelector('.input__btn'),
  incBox: document.querySelector('.inc__box'),
  expBox: document.querySelector('.exp__box'),
  balanceDom: document.querySelector('.header__content--balance'),
  incDom: document.querySelector('.header__content__inc--amount'),
  expDom: document.querySelector('.header__content__exp--amount'),
  percentHead: document.querySelector('.header__content__exp--percent')
};

// Data obj
export const data = {
  lists: {
    inc: [],
    exp: []
  },
  totals: {
    inc: 0,
    exp: 0
  },
  balance: 0,
  percent: -1
};
