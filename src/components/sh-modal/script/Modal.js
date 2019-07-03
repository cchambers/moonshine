import { EventBus } from '../../event-bus';

// TODO: Make tablock work.

export default {
  name: 'Modal',

  props: {
    uniqueId: {
      type: String,
      required: true
    },
    contentUrl: String,
    contentSelector: String,
    header: String,
    footer: String,
    reveal: String,
    variant: String
  },

  data() {
    return {
      triggers: [],
      closeTriggers: [],
      container: null,
      loaded: false,
      loading: false,
      active: false,
      ariaID: String,
      ariaHeaderID: String,
      ariaDescID: String
    };
  },

  mounted() {
    this.modals = this.$el.querySelectorAll('.modal');
    this.ariaID = `aria-${this.uniqueId}`;
    this.ariaHeaderID = `aria-header-${this.uniqueId}`;
    this.ariaDescID = `aria-desc-${this.uniqueId}`;
    let container = document.querySelector('#sh-modals');
    if (container) {
      this.container = container;
      this.mountToContainer();
    } else {
      this.createContainer();
    }
    if (window.location.hash) this.hashHandler(window.location.hash.substr(1))
  },

  methods: {
    events() {
      let self = this;
      this.configureTriggers();

      EventBus.$on('close-modals', this.close);
      EventBus.$on('modal-opening', function() {
        self.close(false);
      });
      
      window.addEventListener('keyup', (e) => {
        let key = e.keyCode;
        if (key == 27) EventBus.$emit('close-modals'); // esc
      });

      EventBus.$on('hashchange', this.hashHandler)
    },

    hashHandler(id) {
      if (id == '') {
        if (this.active) this.close(false);
      } else if (id == this.uniqueId) {
        this.open();
      }
    },

    open() {
      if (!this.loaded && this.contentUrl) this.loadContent()

      if (!this.active) {
        EventBus.$emit('modal-opening', this.uniqueId);
        document.documentElement.classList.add('sh-modal-open');
        this.active = true;
        EventBus.$emit('modal-opened', this.uniqueId);
      }
    },

    close(clearHash = true) {
      if (this.active) {
        EventBus.$emit('modal-closing', this.uniqueId);
        document.documentElement.classList.remove('sh-modal-open');
        this.active = false;
        EventBus.$emit('modal-closed', this.uniqueId);
      }
      if (clearHash) window.location.hash = ''; 
    },

    loadContent() {
      this.loading = true;
      this.ajax();
    },

    configureTriggers() {
      let self = this;
      let selector = `[modal-trigger="${this.uniqueId}"]`;
      this.triggers = document.querySelectorAll(selector);
      this.triggers.forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.hash = `#${self.uniqueId}`;
        });
      });

      let closeSelector = `[close-trigger]`;
      this.closeTriggers = this.$el.querySelectorAll(closeSelector);
      this.closeTriggers.forEach(function(el) {
        el.addEventListener('click', self.close);
      });
    },

    createContainer() {
      let container = document.createElement('div');
      container.id = 'sh-modals';
      document.body.appendChild(container);
      this.container = container;
      this.container.addEventListener('click', (e) => {
        if (e.target == this.container) EventBus.$emit('close-modals');
      })
      this.mountToContainer();
    },

    mountToContainer() {
      let id = this.uniqueId;
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
