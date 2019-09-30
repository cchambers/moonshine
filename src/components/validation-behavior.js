
const ValidationBehavior = {
  methods: {
  },

  computed: {
    hasError() {
      return this.errors.length > 0;
    },
  },

  data() {
    return {
      errors: Array,
      validators: {
        required: {
          pattern: '*',

        },
      },
    };
  },
};

export default ValidationBehavior;
