export const parseLocaleNumber = (stringNumber, locale, option) => {
    const number = Number(stringNumber).toFixed(2);
    return Intl.NumberFormat(locale, option).formatToParts(number).map(({type, value}) => {
      switch (type) {
        case 'group': return `,`;
        case 'decimal': return `.`;
        default : return value;
      }
    }).reduce((string, part) => string + part);
  }