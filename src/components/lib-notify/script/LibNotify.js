import { EventBus } from "../../event-bus";

export default {
  name: 'LibNotify',
  props: {
    baseCode: String
  },
  data() {
    return {
      active: false,
      message: '',
      type: 'default',
      timeout: 0
    }
  },
  
  mounted() {
    EventBus.$on('notify', this.doNotify)
  },

  methods: {
    doNotify(data) {
      let self = this;
      self.type = data.type || "default";
      self.message = data.message;
      self.active = true;
      clearTimeout(self.timeout);
      self.timeout = setTimeout(function() {
        self.active = false;
      }, 2300);
    }
  }
}