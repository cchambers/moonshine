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
    variant: String,
    overlay: String
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
      ariaDescID: String,
      loadHtml: `<div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>`
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

    focusFirst() {
      let el = this.$el.querySelectorAll('a, input, button, [tabindex]');
      if (el) el[0].focus()
    },

    focusLast() {
      let el = this.$el.querySelectorAll('a, input, button, [tabindex]');
      if (el) el[el.length].focus()
    },

    events() {
      let self = this;
      this.configureTriggers();

      self.$bus.$on('close-modals', this.close);
      self.$bus.$on('modal-opening', function() {
        self.close(false);
      });

      window.addEventListener('keyup', (e) => {
        let key = e.keyCode;
        if (key == 27) self.$bus.$emit('close-modals'); // esc
      });

      self.$bus.$on('hashchange', this.hashHandler)
    },

    hashHandler(id) {
      if (id == '') {
        if (this.active) this.close(false);
      } else if (id == this.uniqueId) {
        this.open();
      }
    },

    open() {
      let self = this;
      if (!self.loaded && self.contentUrl) self.loadContent()

      if (self.overlay) {
        self.container.setAttribute('overlay', self.overlay);
      } else {
        self.container.removeAttribute('overlay');
      }

      if (!self.active) {
        self.$bus.$emit('modal-opening', self.uniqueId);
        document.documentElement.classList.add('sh-modal-open');
        self.active = true;
        self.$el.focus();
        self.$bus.$emit('modal-opened', self.uniqueId);
      }
    },

    close(clearHash = true) {
      let self = this;
      if (this.active) {
        self.$bus.$emit('modal-closing', this.uniqueId);
        document.documentElement.classList.remove('sh-modal-open');
        this.active = false;
        self.$bus.$emit('modal-closed', this.uniqueId);
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
      for (let x = 0; x < this.triggers.length; x++) {
        let el = this.triggers[x];
        el.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.hash = `#${self.uniqueId}`;
        });
      }

      let closeSelector = `[close-trigger]`;
      this.closeTriggers = this.$el.querySelectorAll(closeSelector);

      for (let y = 0; y < this.closeTriggers.length; y++) {
        let el = this.closeTriggers[y];
        el.addEventListener('click', self.close);
      }
    },

    createContainer() {
      let self = this;
      let container = document.createElement('div');
      container.id = 'sh-modals';
      document.body.appendChild(container);
      this.container = container;
      this.container.addEventListener('click', (e) => {
        if (e.target == this.container) self.$bus.$emit('close-modals');
      })
      this.mountToContainer();
    },

    mountToContainer() {
      let id = this.uniqueId;
      let exists = document.querySelector(`#sh-modals #${id}`);
      if (exists) exists.remove();
      this.container.appendChild(this.$el);
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
            self.loaded = true;
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
          } else {
            // eslint-disable-next-line
            self.$refs.body.innerHTML = `<p class="error">
              There was a problem loading content from <a href='${window.location.host}${this.contentUrl}'>${window.location.host}${this.contentUrl}</a>.
            </p>`;
          }
        }
      }
    }
  }
};
