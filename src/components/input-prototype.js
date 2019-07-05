const InputPrototype = {
  props: {
    uniqueId: String
  },

  data() {
    return {
      inputId: String
    }
  },

  created() {
    this.inputId = (this.uniqueId) ? this.uniqueId : `input-${this.uuid}`;
  }
};

export default InputPrototype