const InputPrototype = {
  props: {
    uniqueId: String,
    name: String
  },

  data() {
    return {
      inputId: String,
      value: ''
    }
  },

  created() {
    this.inputId = (this.uniqueId) ? this.uniqueId : `input-${this.uuid}`;
  },

  methods: {
    changeHandler(e) {
      this.value = e.target.value;
      this.$bus.$emit('value-changed', this.value);
    }
  }
};

export default InputPrototype