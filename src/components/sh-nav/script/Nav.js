import { EventBus } from '../../event-bus.js';

export default {
  name: 'Nav',
  data() {
    return {
      primaryItems: [{
        name: 'Shine',
        href: '/',
      },
      {
        name: 'Button',
        children: [
          {
            name: 'Button',
            href: 'components/button'
          }
        ]
      },
      {
        name: 'Components',
        children: [
          {
            category: '',
            links: [{
              name: 'Component Template',
              href: 'components/component-template'
            }]
          }
        ]
      }],
      secondaryItems: [],
    }
  },
  mounted() {
    this.events();
  },
  methods: {
    events() {
      let links = this.$el.querySelectorAll('a[href^="#"]');
      for (let x = 0, l = links.length; x < l; x++) {
        let link = links[x];
        link.addEventListener('click', (e) => {
          e.preventDefault();
        });

        link.addEventListener('mouseover', () => {
          this.clearSecondaries();
          link.classList.add('active');
          let target = link.getAttribute('href');
          let targetEl = this.$el.querySelector(target);
          targetEl.classList.add('active');
        });
      }
      EventBus.$on('nav-closed', this.clearSecondaries);
    },
    closeNav() {
      EventBus.$emit('close-nav');
    },
    clearSecondaries() {
      let others = this.$el.querySelectorAll('.active');
      if (others) {
        for (var y = 0, m = others.length; y < m; y++) {
          others[y].classList.remove('active');
        }
      }
    }
  }
}