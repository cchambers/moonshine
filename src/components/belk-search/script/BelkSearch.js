export default {
  name: "BelkSearch",
  props: {
    contentUrl: String
  },

  data() {
    return {
      value: "",
      triggerResults: 3,
      placeholder: "Submit",
      isActive: false,
      input: {},
      results: {},
      products: {},
      suggestions: {},
      data: {},
      _timer: null,
      response: {},
    };
  },

  mounted() {
    this.input = this.$refs.input;
    this.results = this.$refs.results;
    this.response = {
      responseHeader: {
        status: 0,
        QTime: 1
      },
      response: {
        q: "shi",
        suggestions: [
          {
            q: "shirts",
            dq: "shirts"
          },
          {
            q: "shift dress",
            dq: "shift dress"
          },
          {
            q: "dress shirts",
            dq: "dress shirts"
          },
          {
            q: "columbia shirts",
            dq: "columbia shirts"
          },
          {
            q: "men dress shirts",
            dq: "men dress shirts"
          },
          {
            q: "men shirts",
            dq: "men shirts"
          },
          {
            q: "men polo shirts",
            dq: "men polo shirts"
          },
          {
            q: "big and tall shirts",
            dq: "big and tall shirts"
          },
          {
            q: "polo shirts",
            dq: "polo shirts"
          },
          {
            q: "shirtdress",
            dq: "shirtdress"
          },
          {
            q: "saddlebred shirts",
            dq: "saddlebred shirts"
          },
          {
            q: "men ralph lauren polo shirts",
            dq: "men ralph lauren polo shirts"
          },
          {
            q: "t shirts",
            dq: "t shirts"
          },
          {
            q: "tuxedo shirt",
            dq: "tuxedo shirt"
          },
          {
            q: "women shirts",
            dq: "women shirts"
          },
          {
            q: "izod shirts",
            dq: "izod shirts"
          },
          {
            q: "boys shirts",
            dq: "boys shirts"
          },
          {
            q: "men s dress shirts",
            dq: "men s dress shirts"
          },
          {
            q: "golf shirts",
            dq: "golf shirts"
          },
          {
            q: "linen shirt",
            dq: "linen shirt"
          }
        ],
        numFound: 21,
        products: [
          {
            title: "PFG Long Sleeve Button Down Bahama Shirt",
            url:
              "https://www.belk.com/p/columbia-pfg-long-sleeve-button-down-bahama-shirt/18015461396561.html?_br_psugg_q=shirts",
            price: 44.99,
            pid: "18015461396561",
            reviews: ["4.8"],
            brand: "Columbia",
            sale_price_range: [44.99, 44.99],
            sale_price: 44.99,
            price_range: [44.99, 44.99],
            thumb_image:
              "https://belk.scene7.com/is/image/Belk?layer=0&src=1801546_1396561_A_100_T10L00&layer=comp&&color_id=100284626987"
          },
          {
            title: "Tidal Tee ll Long Sleeve Shirt",
            url:
              "https://www.belk.com/p/columbia-tidal-tee-ll-long-sleeve-shirt/18015461577661.html?_br_psugg_q=shirts",
            price: 34.99,
            pid: "18015461577661",
            reviews: ["5.0"],
            brand: "Columbia",
            sale_price_range: [34.99, 34.99],
            sale_price: 34.99,
            price_range: [34.99, 34.99],
            thumb_image:
              "https://belk.scene7.com/is/image/Belk?layer=0&src=1801546_1577661_A_106_T10L00&layer=comp&&color_id=106265542948"
          },
          {
            title: "Short Sleeve Fashion Top",
            url:
              "https://www.belk.com/p/kim-rogers-short-sleeve-fashion-top/18018961462446.html?_br_psugg_q=shirts",
            price: 26.0,
            pid: "18018961462446",
            reviews: ["4.5263"],
            brand: "Kim Rogers\u00ae",
            sale_price_range: [10.19, 26.0],
            sale_price: 26.0,
            price_range: [26.0, 26.0],
            thumb_image:
              "https://belk.scene7.com/is/image/Belk?layer=0&src=1801896_1462446_A_814_T10L00&layer=comp&&color_id=814305143395"
          },
          {
            title: "Big & Tall PFG Bahama II Short Sleeve Shirt",
            url:
              "https://www.belk.com/p/columbia-big-tall-pfg-bahama-ii-short-sleeve-shirt/32054651011653.html?_br_psugg_q=shirts",
            price: 44.99,
            pid: "32054651011653",
            reviews: ["5.0"],
            brand: "Columbia",
            sale_price_range: [44.99, 44.99],
            sale_price: 44.99,
            price_range: [44.99, 44.99],
            thumb_image:
              "https://belk.scene7.com/is/image/Belk?layer=0&src=3205465_1011653_A_469_T10L00&layer=comp&&color_id=469256686288"
          },
          {
            title: "Painterly Short Sleeve T Shirt",
            url:
              "https://www.belk.com/p/nike-painterly-short-sleeve-t-shirt/1800980BQ3706.html?_br_psugg_q=shirts",
            price: 30.0,
            pid: "1800980BQ3706",
            brand: "Nike\u00ae",
            sale_price_range: [30.0, 30.0],
            sale_price: 30.0,
            price_range: [30.0, 30.0],
            thumb_image:
              "https://belk.scene7.com/is/image/Belk?layer=0&src=1800980_BQ3706_A_063_T10L00&layer=comp&&color_id=063329824427"
          },
          {
            title: "Men's Nike Dry Training T-Shirt",
            url:
              "https://www.belk.com/p/nike-mens-nike-dry-training-t-shirt/3200193706625.html?_br_psugg_q=shirts",
            price: 25.0,
            pid: "3200193706625",
            reviews: ["5.0"],
            brand: "Nike\u00ae",
            sale_price_range: [18.75, 18.75],
            sale_price: 18.75,
            price_range: [25.0, 25.0],
            thumb_image:
              "https://belk.scene7.com/is/image/Belk?layer=0&src=3200193_706625_A_063_T10L00&layer=comp&&color_id=063278109570"
          },
          {
            title: "3/4 Sleeve Ombre Stripe T Shirt",
            url:
              "https://www.belk.com/p/kim-rogers-3-4-sleeve-ombre-stripe-t-shirt/1801896146789K.html?_br_psugg_q=shirts",
            price: 26.0,
            pid: "1801896146789K",
            brand: "Kim Rogers\u00ae",
            sale_price_range: [26.0, 26.0],
            sale_price: 26.0,
            price_range: [26.0, 26.0],
            thumb_image:
              "https://belk.scene7.com/is/image/Belk?layer=0&src=1801896_146789K_A_658_T10L00&layer=comp&&color_id=658335572297"
          },
          {
            title: "Women's Training T-Shirt",
            url:
              "https://www.belk.com/p/nike-womens-training-t-shirt/1800980AQ3210.html?_br_psugg_q=shirts",
            price: 20.0,
            pid: "1800980AQ3210",
            reviews: ["5.0"],
            brand: "Nike\u00ae",
            sale_price_range: [15.0, 15.0],
            sale_price: 15.0,
            price_range: [20.0, 20.0],
            thumb_image:
              "https://belk.scene7.com/is/image/Belk?layer=0&src=1800980_AQ3210_A_510_T10L00&layer=comp&&color_id=510324694281"
          }
        ]
      }
    };
  },

  methods: {
    keyupHandler() {
      let len = this.input.value.length;
      if (len >= 3) {
        clearTimeout(this._timer);
        this._timer = setTimeout(this.performSearch, 200);
      }
    },

    clearSearch() {
      this.input.value = "";
    },

    performSearch() {
      //pass string
      this.ajax();
    },

    ajax() {
      let self = this;
      let xhr = new XMLHttpRequest();
      xhr.open( 'GET', this.contentUrl );
      xhr.send(null);

      xhr.onreadystatechange = function () {
        let DONE = 4; // readyState 4 means the request is done.
        let OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            self.loaded = true;
            let response = xhr.responseText;
            var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var arr = pattern.exec(response);
            if (arr[1].length) response = arr[1];
            let html = document.createElement('div');
            html.innerHTML = "empty string";

            if (self.contentSelector) {
              let contentTarget = html.querySelector(self.contentSelector)
              if (contentTarget) html = contentTarget;
              html = contentTarget;
            }
            // console.log(self.$refs);
            // self.$refs.body.appendChild(html);
            console.log(html);

          } else {
            // eslint-disable-next-line
            self.$refs.body.innerHTML = `<p class="error">
              There was a problem loading content from <a href='${window.location.host}${this.contentUrl}'>${window.location.host}${this.contentUrl}</a>.
            </p>`;

          }

        }
      }
    }

  },

  watch: {
    response: function(val) {
      this.suggestions = val.response.suggestions;
      this.products = val.response.products;
    }
  }
};
