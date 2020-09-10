<template>
  <div class="belk-coupon"
    :id="id"
    :class="{ printable: print, 'to-spend': toSpend }"
    :variant="variant">
    <div v-if="badge" class="coupon-type">{{ badge }}</div>
    <div class="coupon-image" v-if="hasImage"><img :src="image" /></div>
    <div class="coupon-wrapper">
      <template v-if="variant=='default'">
        <div v-if="extra" class="coupon-extra" :class="headerColor">extra</div>
        <div class="coupon-discount" :class="headerColor">
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
      </template>
      <div v-if="eventName" class="coupon-event-name">{{eventName}}</div>
      <div class="coupon-use-code"
        v-if="code">{{code}}</div>
      <div v-if="ends" class="coupon-ends">{{ends}}</div>
      <div v-if="hasDescription" class="coupon-description">
        <slot name="description"></slot>
        <span v-html="description"></span>
        <span class="coupon-details px-10" :hidden="!hasDetails && !print">
          <template v-if="!print">
            <sh-button variant="belk-link"
              v-if="details"
              v-hammer:tap="openDetailsModal">Details</sh-button>
          </template>
          <div class="coupon-details-actual" v-else>{{ details }}</div>
        </span>
      </div>
      <div class="coupon-spacer"></div>
      <div hidden aria-hidden="true">
        <slot name="details"></slot>
      </div>
      <div class="coupon-buttons" v-if="!print && link || !print && code">
        <sh-button v-if="variant != 'offer' && code" variant="primary" toggle="once"
          ajax="/add-coupon/"
          active-text="Added"
          active-icon="check"
          :unique-id="addCouponId"
          :ajax-success="code + '-data'">
          Add Coupon
        </sh-button>
        <sh-button v-if="link" variant="primary" outline
          @click="doLink">{{ linkText }}</sh-button>
        <div hidden aria-hidden="true" class="coupon-modal">
          <div class="print-modal"></div>
          <div class="details-modal"></div>
        </div>
      </div>
      <div v-if="!code && !link && upc"
        class="coupon-spacer"
        data-text="In-Store Only"
        style="height: 10.5rem"></div>
      <div v-else-if="!code && !link && !upc"
        class="coupon-spacer"
        data-text="Applied Automatically at Checkout"
        style="max-height: 18rem; margin-top: auto"></div>
      <div v-if="upc" class="coupon-upc">
        <belk-barcode align-text="right" :code="upc"></belk-barcode>
        <div class="coupon-logo" v-if="print">
          <belk-logo width="120" color="lowlight-primary"></belk-logo>
        </div>
      </div>
      <div v-else-if="variant != 'offer' && !print && !upc && code"
        class="coupon-spacer"
        style="max-height: 5.5rem;"
        data-text="Online Only"></div>
      <div class="coupon-print" v-if="printable">
        <sh-button variant="belk-link"
          v-hammer:tap="printCoupon">Print Coupon</sh-button>
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
      default: undefined,
    },
    eventName: String,
    code: String,
    description: String,
    discount: {
      type: String,
      default: '00',
    },
    extra: {
      type: Boolean,
      default: false,
    },
    ends: String,
    details: String,
    headerColor: String,
    inDrawer: Boolean,
    image: String,
    link: String,
    noType: {
      type: Boolean,
      default: false,
    },
    toSpend: Number,
    print: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'default',
    },
    spacerText: {
      type: String,
      default: 'define [spacer-text]',
    },
  },

  computed: {
    linkText() {
      return (this.inDrawer && this.variant === 'offer') ? 'Learn More' : 'Shop Now';
    },
  },

  data() {
    return {
      added: true,
      hasDescription: false,
      hasDetails: false,
      hasImage: false,
      hasEd: 'defaultid',
      detailsHTML: '',
      printId: 'defaultid',
      printable: false,
      id: undefined,
      addCouponId: undefined,
    };
  },

  created() {
    this.setUUID();
    if (this.uniqueId) {
      this.id = this.uniqueId;
    } else {
      this.id = this.uuid;
    }
    this.detailsId = `em-${this.uuid}`;
    this.printId = `pr-${this.uuid}`;
    if (this.code) {
      this.checkApplied();
      this.$bus.$on(`${this.code}-data`, this.handleAddCoupon);
      this.addCouponId = `ac-${this.uuid}`;
    }
    if (this.$slots.details !== undefined || this.details) this.hasDetails = true;
    if (this.$slots.description !== undefined || this.description) this.hasDescription = true;
    if (this.$slots.image !== undefined || this.image) this.hasImage = true;
  },

  mounted() {
    if (this.hasDetails) {
      this.detailsHTML = (this.$slots.details) ? this.$slots.details[0].elm.innerHTML : this.details;
      this.makeDetailsModal();
    }

    if (!this.inDrawer) {
      if (this.badge && this.variant == 'default') {
        if (this.badge.indexOf('Store') >= 0 && this.upc) {
          this.printable = true;
          this.makePrintModal();
        }
      } 
    }
  },

  methods: {
    doLink() {
      window.location.href = this.link;
    },

    printCoupon() {
      this.$bus.$emit('open-modal', { id: this.printId });
    },

    openDetailsModal() {
      this.$bus.$emit('open-modal', { id: this.detailsId });
    },

    handleAddCoupon(data) {
      if (data.cpnDetails) {
        if (data.cpnDetails.isApplied) this.toggleButton();
      } else {
        this.log('COUPON: error in ajax response.');
      }
    },

    checkApplied() {
      if (window.SessionAttributes) {
        if (window.SessionAttributes.hasOwnProperty('APPLIED_COUPONS') &&
            Array.isArray(window.SessionAttributes.APPLIED_COUPONS) &&
            window.SessionAttributes.APPLIED_COUPONS.indexOf(this.code.toUpperCase()) !== -1) {
              this.toggleButton();
            }
      }
    },

    toggleButton() {
      this.$bus.$emit('button-toggle', { which: this.addCouponId });
    },

    makeDetailsModal() {
      let self = this;
      const el = self.$el.querySelector('.coupon-modal[hidden] .details-modal');
      if (el) {
        let html = `<sh-modal unique-id="${self.detailsId}"><div>${self.detailsHTML}</div></sh-modal>`;
        if (this.inDrawer) {
          html = html.replace('<sh-modal', '<sh-modal no-events');
        }
        el.innerHTML += html;
      }
    },

    makePrintModal() {
      let self = this;
      const el = self.$el.querySelector('.coupon-modal[hidden] .print-modal');
      if (el) {
        const html = `<sh-modal printable unique-id="${self.printId}">
          <div>
            <belk-coupon print no-type
              extra="${self.extra}"
              event-name="${self.eventName}"
              discount="${self.discount}"
              code="${self.code}" 
              ends="${self.ends}"
              upc="${self.upc}"
              details="${self.detailsHTML}"
              description="${self.description}">
            </belk-coupon>  
          </div>
        </sh-modal>`;
        el.innerHTML += html;
      }
    },
  },

};

</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/offer.scss"></style>
