import { EventBus } from '../../event-bus';

export default {
  name: "Modal",

  props: {
    id: String,
    header: String,
    footer: String,
  },

  data() {
    return {
      triggers: [],
      container: null
    };
  },

  mounted() {
    this.modals = this.$el.querySelectorAll('.modal');
    let container = document.querySelector('#sh-modals');
    if (container) {
      this.container = container;
      this.mountToContainer();
    } else {
      this.createContainer();
    }
  },

  methods: {
    events() {
      EventBus.$on('close-modals', this.close);
      this.configureTriggers();

      if (!window.sh_closeBound) {
        let closeButtons = document.querySelectorAll('[close-trigger]');
        window.sh_closeBound = closeButtons.length;
        closeButtons.forEach(function(el) {
          el.addEventListener('click', function() {
            EventBus.$emit('close-modals', el);
          })
        });
      }
    },

    open() {
      if (!this.$el.classList.contains('active')) {
        EventBus.$emit('modal-opening', this.id);
        document.documentElement.classList.add('sh-modal-open');
        this.$el.classList.add('active');
        EventBus.$emit('modal-opened', this.id);
      }
    },

    close() {
      if (this.$el.classList.contains('active')) {
        EventBus.$emit('modal-closing', this.id);
        document.documentElement.classList.remove('sh-modal-open');
        this.$el.classList.remove('active');
        EventBus.$emit('modal-closed', this.id);
      }
    },

    configureTriggers() {
      let self = this;
      let selector = `[modal-trigger="${this.id}"]`;
      this.triggers = document.querySelectorAll(selector);
      this.triggers.forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          self.open();
        });
      });
    },

    createContainer() {
      let container = document.createElement('div');
      container.id = 'sh-modals';
      document.body.appendChild(container);
      this.container = container;
      this.mountToContainer();
    },

    mountToContainer() {
      this.container.appendChild(this.$el);
      this.events();
    }
  }
};
