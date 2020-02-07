<template>
  <div class="belk-coupon"
    :class="{ printable: print, 'to-spend': toSpend }"
    :variant="variant">
    <div v-if="!noType" class="coupon-type">
      {{badge}}
    </div>
    <div class="coupon-spacer">
      <div v-if="extra" class="coupon-extra">extra</div>
      <div class="coupon-discount">
        <div class="actual">
          <span v-if="toSpend" class="dollar">$</span>
          {{discount}}
          </div>
        <div v-if="!toSpend" class="coupon-secondary">
          <div class="s-t">%</div>
          <div class="s-b">off</div>
        </div>
        <div v-else class="coupon-secondary">
          <div class="s-t">off</div>
          <div class="s-b">${{toSpend}}</div>
        </div>
      </div>
      <div v-if="eventName" class="coupon-event-name">{{eventName}}</div>
      <div class="coupon-use-code"
        v-if="code">Use Code: <span class="actual">{{code}}</span></div>
      <div v-if="ends" class="coupon-ends">{{ends}}</div>
      <div v-if="description" class="coupon-description">{{description}}</div>
      <div class="coupon-exclusions" :hidden="!exclusions && !print">
        <template v-if="!print">
          <a :href="'#'+exclusionsId">View Exclusions</a>
          <sh-modal :unique-id="exclusionsId">
            <div>
              <slot name="exclusions"></slot>
            </div>
          </sh-modal>
        </template>
        <div class="coupon-exclusions-actual" v-else>
          <slot name="exclusions"></slot>
        </div>

      </div>
      <div class="coupon-buttons" v-if="!print">
        <sh-button variant="primary" @click="addCoupon">
          Add Coupon to bag
        </sh-button>
        <sh-button variant="primary" outline
          @click="printCoupon"
          v-if="printable">
          View In-Store Coupon
        </sh-button>
        <div hidden class="modal"></div>
      </div>
      <div v-if="upc" class="coupon-upc">
        <belk-barcode :code="upc"></belk-barcode>
        <div class="coupon-logo" v-if="print">
          <belk-logo width="120"></belk-logo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkCoupon',

  props: {
    badge: String,
    upc: {
      type: String,
      default: 'none-given',
    },
    eventName: String,
    code: String,
    description: {
      type: String,
      default: 'Description text. Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs.',
    },
    discount: {
      type: String,
      default: '00',
    },
    extra: {
      type: Boolean,
      default: false,
    },
    ends: {
      type: String,
      default: 'ends 1/1/79',
    },
    noType: {
      type: Boolean,
      default: false,
    },
    toSpend: Number,
    print: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      exclusions: false,
      exclusionsId: 'defaultid',
      exclusionsHTML: '',
      printId: 'defaultid',
      printable: false,
    };
  },

  created() {
    this.setUUID();
    this.exclusionsId = `em-${this.uuid}`;
    this.printId = `pr-${this.uuid}`;
    if (this.$slots.exclusions !== undefined) this.exclusions = true;
  },

  mounted() {
    if (this.badge) {
      if (this.badge.indexOf('Store') >= 0) {
        this.printable = true;
        this.makeModal();
      }
    } 
    
    if (this.exclusions) {
      this.exclusionsHTML = this.$slots.exclusions[0].elm.outerHTML || '';
      
    }
  },

  methods: {
    addCoupon() {
      this.log('add coupon click handler');
    },

    printCoupon() {
      this.$bus.$emit('open-modal', this.printId);
    },

    makeModal() {
      let self = this;
      const el = self.$el.querySelector('.modal[hidden]');
      if (el) {
        el.innerHTML = `<sh-modal printable unique-id="${self.printId}">
          <div>
            <belk-coupon print no-type
              extra="${self.extra}"
              event-name="${self.eventName}"
              discount="${self.discount}"
              code="${self.code}" 
              ends="${self.ends}"
              upc="${self.upc}">
              <div slot="exclusions">${self.exclusionsHTML}</div>
            </belk-coupon>  
          </div>
        </sh-modal>`;
      }
    }
  },

};

</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
