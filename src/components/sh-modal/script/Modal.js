import { EventBus } from '../../event-bus';

export default {
  name: 'Modal',

  props: {
    id: {
      type: String,
      required: true
    },
    contentUrl: String,
    contentSelector: String,
    header: String,
    footer: String,
  },

  data() {
    return {
      triggers: [],
      container: null,
      loaded: false,
      loading: false,
      ariaID: String,
      ariaHeaderID: String,
      ariaDescID: String,
    };
  },

  mounted() {
    this.modals = this.$el.querySelectorAll('.modal');
    this.ariaID = `aria-${this.id}`;
    this.ariaHeaderID = `aria-header-${this.id}`;
    this.ariaDescID = `aria-desc-${this.id}`;
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
    },

    open() {
      if (!this.loaded && this.contentUrl) this.loadContent()

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

    loadContent() {
      this.loading = true;
      this.ajax();
    },

    configureTriggers() {
      let self = this;
      let selector = `[modal-trigger="${this.id}"]`;
      this.triggers = document.querySelectorAll(selector);
      this.triggers.forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          EventBus.$emit('close-modals')
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
      let id = this.id;
      let exists = document.querySelector(`#sh-modals #${id}`);
      if (exists) exists.remove();
      this.container.appendChild(this.$el);
      this.events();
    },

    ajax() {
      let self = this;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.contentUrl);
      xhr.send(null);
      xhr.onreadystatechange = function () {
        let DONE = 4; // readyState 4 means the request is done.
        let OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            let response = xhr.responseText;
            var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
            var arr = pattern.exec(response);
            if (arr[1].length) response = arr[1];
            let html = document.createElement('div');
            html.innerHTML = response;

            if (self.contentSelector) {
              let contentTarget = html.querySelector(self.contentSelector)
              if (contentTarget) html = contentTarget;
              html = contentTarget;
            }

            self.$refs.body.appendChild(html);
            self.loaded = true;
          } else {
            // eslint-disable-next-line
            console.log(`Content isn't available from: ${this.contentUrl}`);
          }
        }
      }
    }
  }
};
