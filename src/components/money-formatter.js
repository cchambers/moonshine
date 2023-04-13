const MoneyFormatter = {
  methods: {
    format(money) {
      if (!money) {
        console.log(`Formatter error, value: ${money}`);
        return money;
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
      return formatter.format(money);
    },
  },
};

export default MoneyFormatter;
