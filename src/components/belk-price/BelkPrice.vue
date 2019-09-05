<template>
  <div class="belk-price"
    :variant="variant">
    <div class="actual">{{ actualPrice }}</div>
    <div class="original">{{ originalPrice }}</div>
    <div v-if="coupon" class="w-coupon">With Coupon</div>
  </div>
</template>

<script>
export default {
  name: 'BelkPrice',
  
  data() {
    return {
      tempData: {
        "priceType": "price",
        "price": 65,
        "productId": "320227240ZK431",
        "found": true,
        "isOrderable": true,
        "coupons": [
          {
            "couponCode": "",
            "displayRequirement": "None",
            "cpnDiscount": 15,
            "promoPrice": {
              "min": 55.25,
              "max": 55.25
            },
            "endDate": "",
            "hidePrice": false
          }
        ]
      },
      data: {},
      actualPrice: '',
      originalPrice: '',
      coupon: '',
    }
  },

  watch: {
    data(val) {
      console.log(val)
      if (val.price) this.actualPrice = val.price
    }
  },

  mounted() {
    this.data = this.tempData;
  }
}
/*
[
  {
    "priceType": "range",
    "original": {
      "min": 65,
      "max": 65
    },
    "sale": {
      "min": 32.5,
      "max": 45.5
    },
    "productId": "320227240L6431",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 27.63,
          "max": 38.67
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "clearance",
    "original": 69.5,
    "sale": 23.99,
    "productId": "320227240L8287",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "clearance",
    "original": 69.5,
    "sale": 23.99,
    "productId": "320227240L8264",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "clearance",
    "original": 69.5,
    "sale": 25.99,
    "productId": "32034434EMW7043PS",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "range",
    "original": {
      "min": 65,
      "max": 65
    },
    "sale": {
      "min": 45.5,
      "max": 65
    },
    "productId": "320227240M6431",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 38.67,
          "max": 55.25
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "price",
    "price": 0,
    "productId": "320227240L6755",
    "found": true,
    "isOrderable": false,
    "coupons": []
  },
  {
    "priceType": "price",
    "price": 65,
    "productId": "320227240ZK297",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 55.25,
          "max": 55.25
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "price",
    "price": 65,
    "productId": "320227240ZK431",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 55.25,
          "max": 55.25
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "price",
    "price": 79.5,
    "productId": "320227240M6918",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 67.58,
          "max": 67.58
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 69.5,
    "sale": 48.65,
    "productId": "320227240M6793",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 41.35,
          "max": 41.35
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 69.5,
    "sale": 48.65,
    "productId": "320227240ZW461",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 41.35,
          "max": 41.35
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "clearance",
    "original": 69.5,
    "sale": 23.99,
    "productId": "320227240L8254",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "price",
    "price": 79.5,
    "productId": "320227240M6731",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 67.58,
          "max": 67.58
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 69.5,
    "sale": 48.65,
    "productId": "320227240M8378",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 41.35,
          "max": 41.35
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 69.5,
    "sale": 48.65,
    "productId": "320227240M8336",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 41.35,
          "max": 41.35
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 65,
    "sale": 32.5,
    "productId": "3200036E80402FF9",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 39.5,
    "sale": 27.65,
    "productId": "3203419SPCLTXL01",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 99.5,
    "sale": 49.75,
    "productId": "3203419SPCLBPXE",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "range",
    "original": {
      "min": 69.5,
      "max": 69.5
    },
    "sale": {
      "min": 23.99,
      "max": 25.49
    },
    "productId": "320227240L2201",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "price",
    "price": 58,
    "productId": "320227240ZB673",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 49.3,
          "max": 49.3
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 55,
    "sale": 27.5,
    "productId": "3200036W02522SNAPPERS",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 55,
    "sale": 27.5,
    "productId": "3200036W02522SNAPPERS7",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 69.5,
    "sale": 34.75,
    "productId": "3203419SPS19SWXSH",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "price",
    "price": 69.5,
    "productId": "320227240ZB055",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 59.08,
          "max": 59.08
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 69.5,
    "sale": 48.65,
    "productId": "3203419SPS19BSXPC",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 79.5,
    "sale": 39.75,
    "productId": "3203419SPS19BSXS",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "price",
    "price": 69.5,
    "productId": "320227240ZB164",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 59.08,
          "max": 59.08
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 69.5,
    "sale": 48.65,
    "productId": "3203419SPS18BSXPC",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "clearance",
    "original": 78,
    "sale": 28.99,
    "productId": "3203630SH08219GRY",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 28,
    "sale": 19.6,
    "productId": "3203419SPCLHXT",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 99.5,
    "sale": 49.75,
    "productId": "3203419SPCLBPXP",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 55,
    "sale": 27.5,
    "productId": "3200036W02545SNAPPERS",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "clearance",
    "original": 79.5,
    "sale": 27.99,
    "productId": "32034434DHB7338PS",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "clearance",
    "original": 75,
    "sale": 25.99,
    "productId": "320227240L2196",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 69.5,
    "sale": 34.75,
    "productId": "320344345SH9060PS",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 29.54,
          "max": 29.54
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "sale",
    "original": 79.5,
    "sale": 39.75,
    "productId": "3203419SPS19SWX02",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 55,
    "sale": 27.5,
    "productId": "3200036W02517SNAPPERS",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 79.5,
    "sale": 39.75,
    "productId": "3203419SPS19SWX01",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "clearance",
    "original": 75,
    "sale": 25.99,
    "productId": "320227240L2206",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 55,
    "sale": 27.5,
    "productId": "3200036W02516SNAPPERS",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "clearance",
    "original": 75,
    "sale": 25.99,
    "productId": "320227240L2198",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 59.5,
    "sale": 29.75,
    "productId": "3200036W810901WJ",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 59.5,
    "sale": 29.75,
    "productId": "3200036W810902WJ",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 45,
    "sale": 19.99,
    "productId": "32036313371615",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "clearance",
    "original": 88,
    "sale": 47.39,
    "productId": "150051657104MG",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 36,
    "sale": 12.99,
    "productId": "32035923442261",
    "found": true,
    "isOrderable": true,
    "coupons": [
      {
        "couponCode": "",
        "displayRequirement": "None",
        "cpnDiscount": 15,
        "promoPrice": {
          "min": 11.04,
          "max": 11.04
        },
        "endDate": "",
        "hidePrice": false
      }
    ]
  },
  {
    "priceType": "clearance",
    "original": 88,
    "sale": 47.39,
    "productId": "150051657121MG",
    "found": true,
    "isOrderable": true,
    "coupons": []
  },
  {
    "priceType": "sale",
    "original": 80,
    "sale": 31.99,
    "productId": "6200348536460783",
    "found": true,
    "isOrderable": true,
    "coupons": []
  }
] */
</script>

<style lang="scss" src="./style/default.scss"></style>
