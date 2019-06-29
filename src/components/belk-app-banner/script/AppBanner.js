import { EventBus } from '../../event-bus';

export default {
  name: 'AppBanner',

  props: {
    daysAfterClose: {
      type: Number,
      default: 0
    },
    daysAfterView:  {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'Belk',
    },
    price: {
      type: String,
      default: 'free'
    },
    ctaText: {
      type: String,
      default: 'View'
    }
  },

  data() {
    return {
      active: true,
      mobile: false,
      which: String,
      appLink: String
    };
  },

  mounted() {
    this.setup();
  },

  methods: {
    setup() {
      let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      let Android = /(android)/i.test(navigator.userAgent);

      if (iOS || Android) {
        document.body.insertAdjacentElement('afterbegin', this.$el)
        this.which = (iOS) ? 'iOS' : 'Android';
        switch(this.which) {
          case 'Android':
            this.link = 'http://androidlink'
            break;
          case 'iOS':
            this.link = 'http://ioslink'
            break;
        }
        this.checkConditions();
      }
    },

    checkConditions() {
      let show = false;
      let cookie = this.cookie();
      let now = new Date().getTime();
      let len = ((cookie - now) / 86400000);
      if (len > this.daysAfterClose) show = true;
      if (len > this.daysAfterView) show = true;
      if (show) this.open();
    },

    cookie() {
      let value = "; " + document.cookie;
      let parts = value.split("; app-banner-cookie=");
      if (parts.length == 2) {
        return parts.pop().split(";").shift();
      } else {
        let now = new Date().getTime();
        document.cookie = `app-banner-cookie=${now}`;
        return now;
      }
    },

    open() {
      if (!this.active) {
        EventBus.$emit('app-banner-opening', this);
        document.documentElement.classList.add('app-banner-open');
        this.active = true;
        EventBus.$emit('app-banner-opened', this);
      }
    },

    navigate() {
      window.location.href = this.appLink;
    },

    close() {
      if (this.active) {
        EventBus.$emit('app-banner-closing', this);
        document.documentElement.classList.remove('app-banner-open');
        this.active = false;
        EventBus.$emit('app-banner-closed', this);
      }
    },
  }
};
