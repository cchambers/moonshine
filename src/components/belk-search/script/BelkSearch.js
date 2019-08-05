export default {
  name: 'BelkSearch',
  props: {
    contentUrl: String
  },

  data() {
    return {
      value: '',
      triggerResults: 3,
      placeholder: 'Submit',
      isActive: false,
      inputEl: {},
      resultsEl: {},
      products: {},
      suggestions: {},
      _timer: null,
      response: {},
      count: 0,
      preloaded: false,
      fullyloaded: false
    };
  },

  watch: {
    response: function (val) {
      this.suggestions = val.response.suggestions || {};
      this.products = val.response.products || {};
      this.count = this.suggestions.length;
    }
  },

  mounted() {
    this.inputEl = this.$refs.input;
    this.resultsEl = this.$refs.results;
  },

  methods: {
    keyupHandler() {
      let len = this.inputEl.value.length;
      if (len >= 3) {
        clearTimeout(this._timer);
        this._timer = setTimeout(this.doRequest, 200);
      }
    },

    clearSearch() {
      this.inputEl.value = '';
      this.response = { response: {} }
    },

    doRequest() {
      let self = this;
      let xhr = new XMLHttpRequest();
      let url = `https://brm-suggest-0.brsrvr.com/api/v1/suggest/?account_id=6082&auth_key=&domain_key=belk&request_type=suggest&q=${this.input.value}`;
      xhr.open('GET', url);
      xhr.send(null);

      xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            self.response = JSON.parse(xhr.responseText);
          }
        }
      }
    }

  },

  doSearch() {
    let url = `https://www.belk.com/search/?q=${this.inputEl.value}&lang=default`;
    window.location.href = url;
  },
};
