/**
 * Set current page title
 *
 * @param {string} title
 */
export const setPageTitle = (title) => {
  if (!_.isEmpty(title)) {
    window.document.title = `${title} | ${process.env.VUE_APP_NAME}`;
    return;
  }

  window.document.title = process.env.VUE_APP_NAME;
};

export const currencyBRL = (price) => {
  const format = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  const value = parseFloat(price);
  return format.format(value);
};

export default {
  setPageTitle,
  currencyBRL,
};
