<template>
<div></div>
</template>

<script>
export default {
  name: 'BelkHeader',

  data() {
    return {
      bagEl: {},
      navEl: {},
      loggedIn: false,
      data: {
        name: 'Sign In',
        brd: 0, // dollars
        brc: 0, // tier
        cartQty: 0,
      }
    }
  },

  watch: {
    data(val) {
      this.$bus.$emit('user-data', val);
      if (val.name) this.updateUsername(val.name)
    }
  },

  mounted() {
    this.actual = document.querySelector('#header .belk-header');
    this.bagEl = document.querySelector('belk-bag');
    this.getData();
  },

  methods: {
    events() {
      this.$bus.$on('mega-nav-opening');
      this.$bus.$on('bag-update', this.bagupdateHandler);
    },

    getData() {
      let url, brdurl;
      let self = this;
      if (window.Urls) {
        url = window.Urls.headerInfo;
        brdurl = window.Urls.getBrdDetailsForHeader;
      } else {
        url = '//dev29-web-belk.demandware.net/on/demandware.store/Sites-Belk-Site/default/Home-HeaderInfo?format=ajax';
        brdurl = '//dev29-web-belk.demandware.net/on/demandware.store/Sites-Belk-Site/default/BRD-GetBRDDetailsForHeader';
      }
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send(null);
      xhr.onreadystatechange = function() {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            let res = JSON.parse(xhr.responseText);
            self.handleHeader(res);
          }
        }
      };
      
      let brdxhr = new XMLHttpRequest();
      brdxhr.open('GET', brdurl);
      brdxhr.send(null);
      brdxhr.onreadystatechange = function() {
        let DONE = 4;
        let OK = 200;
        if (brdxhr.readyState === DONE) {
          if (brdxhr.status === OK) {
            let res = JSON.parse(brdxhr.responseText);
            self.handleBRD(res);
          }
        }
      };
    },

    handleHeader(data) {
      console.log("HEADER", data)
    },

    handleBRD(data) {
      console.log("BRD", data)
    },

    menuHandler() {
      this.navEl.show();
    },

    bagupdateHandler(data) {
      if (!this.loggedIn) {
        this.bagState(0);
      } else {
        if (data.count == 0) {
          this.bagState(1);
        } else {
          this.bagState(2);
        }
      }
    },

    bagState(num) {
      this.actual.setAttribute('bag-state', num)
    },

    updateUsername(name) {
      let els = this.querySelectorAll('[fill="name"]');
      this.$el.classList.add('is-user');
      els.forEach(element => {
        element.innerText = name;
      });
    }
  },
}
</script>
<style lang="scss" src="../style/default.scss"></style>
