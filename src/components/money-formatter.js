const MoneyFormatter = {
  methods: {
    format(money, debug = '') {
      if (!money) {
        this.log(`Formatter error, value: ${money} ${debug}`);
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
