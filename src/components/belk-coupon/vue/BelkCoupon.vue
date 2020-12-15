<template>
  <div
    class="belk-coupon"
    :id="id"
    :class="{ printable: print, 'to-spend': toSpend, 'has-code': hasCode }"
    :variant="variant">
    <div v-if="badge" class="coupon-type">{{ badge }}</div>
    <div @click="addOrLink" class="coupon-image" v-if="hasImage">
      <img :src="image" />
    </div>
    <div class="coupon-wrapper">
      <template v-if="variant=='default'">
        <div v-if="extra" class="coupon-extra"
          @click="clickAdd"
          :class="headerColor">
          <span>extra</span>
        </div>
        <div class="coupon-discount"
          @click="clickAdd"
          :class="headerColor">
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
      <div class="coupon-use-code" v-if="code">{{codeText}}{{code}}</div>
      <div class="coupon-use-code" v-else>{{codeText}}</div>
      <div v-if="ends" class="coupon-ends">{{ends}}</div>
      <div v-if="hasDescription" class="coupon-description">
        <slot name="description"></slot>
        <span v-html="description"></span>
        <span class="coupon-details-x px-12" :hidden="!hasDetails && !print">
          <template v-if="!print">
            <sh-button variant="belk-link" v-if="details"
              @click="openDetailsModal">Details</sh-button>
          </template>
          <div class="coupon-details-actual" v-else v-html="detailsHTML"></div>
        </span>
      </div>
      <div class="coupon-spacer"></div>
      <div hidden aria-hidden="true">
        <slot name="details"></slot>
      </div>
      <div class="coupon-buttons" v-if="!print && link || !print && code">
        <sh-button
          v-if="variant != 'offer' && code"
          variant="primary"
          toggle="once"
          class="coupon-add-button"
          :ajax="ajaxUrl"
          ref="addButton"
          active-text="Added"
          active-icon="check"
          :unique-id="addCouponId"
          :ajax-success="code + '-data'">Add Coupon</sh-button>
        <sh-button v-if="link" variant="primary" outline @click="doLink">{{ linkText }}</sh-button>
      </div>
      <div
        v-if="!code && !link && upc"
        class="coupon-spacer"
        data-text="In-Store Only"
        style="min-height: 7.5rem"></div>
      <div
        v-else-if="!code && !link && !upc"
        class="coupon-spacer"
        :data-text="spacerText"
        style="height: 16.5rem; margin-top: auto"
      ></div>
      <div v-if="upc" class="coupon-upc">
        <template v-if="print">
          <belk-barcode :code="upc"></belk-barcode>
        </template>
        <template v-else>
          <belk-barcode align-text="right" :code="upc"></belk-barcode>
        </template>
        <div class="coupon-logo" v-if="print">
          <belk-logo width="120" color="lowlight-primary"></belk-logo>
        </div>
      </div>
      <div
        v-else-if="variant != 'offer' && !print && !upc && code"
        class="coupon-spacer"
        style="padding-top: 12%; padding-bottom: 13%; max-height: 0 !important"
        data-text="Online Only"
      ></div>
      <div class="coupon-print low-off" v-if="printable">
        <sh-button variant="belk-link" v-hammer:tap="printCoupon">Print Coupon</sh-button>
      </div>
    </div>
    <div hidden aria-hidden="true" class="coupon-modal">
      <div class="print-modal" ref="ptmodal"></div>
      <div class="details-modal" ref="dtmodal"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ComponentPrototype from "../../component-prototype";

export default {
  mixins: [ComponentPrototype],

  name: "BelkCoupon",

  props: {
    badge: String,
    upc: Number,
    eventName: String,
    code: {
      type: String,
      default: '',
    },
    customLink: String,
    description: String,
    discount: Number,
    extra: {
      type: Boolean,
      default: false
    },
    ends: String,
    details: String,
    detailsPrint: String,
    headerColor: String,
    inDrawer: {
      type: Boolean,
      default: false
    },
    image: String,
    link: String,
    noType: {
      type: Boolean,
      default: false
    },
    toSpend: Number,
    pdf: String,
    print: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default'
    },
    spacerText: {
      type: String,
      default: 'Applied Automatically at Checkout'
    }
  },

  watch: {
    code(val, old) {
      if (old) this.$bus.$off(`${old}-data`);
      this.configureDataListener();
    },
  },

  computed: {
    linkText() {
      let text = this.inDrawer && this.variant === 'offer'
        ? 'Learn More' : 'Shop Now';
      if (this.customLink) text = this.customLink;
      return text;
    },

    codeText() {
      if (!this.code) {
        if (this.upc) {
          return 'Scan Barcode in Store';
        } else {
          return 'No Code Needed';
        }
      } else {
        return 'Use Code: ';
      }
    },

    ajaxUrl() {
      const url = `/add-coupon/?couponCode=${this.code}&format=ajax`;
      return url;
    },
  },

  data() {
    return {
      added: true,
      hasDescription: false,
      hasDetails: false,
      hasCode: false,
      hasImage: false,
      hasEd: 'defaultid',
      detailsHTML: '',
      printId: 'defaultid',
      printable: false,
      id: undefined,
      addCouponId: undefined
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
    if (this.code) this.configureDataListener();
    if (this.$slots.details !== undefined || this.details)
      this.hasDetails = true;
    if (this.$slots.description !== undefined || this.description)
      this.hasDescription = true;
    if (this.$slots.image !== undefined || this.image) this.hasImage = true;
    if (this.code) this.hasCode = true;
  },

  mounted() {
    if (this.hasDetails) {
      this.detailsHTML = this.details;
      this.makeDetailsModal();
    }

    if (this.code && !this.print) this.checkApplied();

    if (!this.inDrawer) {
      if (this.badge && this.variant == 'default') {
        if (this.badge.toLowerCase().indexOf('store') >= 0 && this.upc) {
          this.printable = true;
          this.makePrintModal();
        }
      }
    }
  },

  methods: {
    events() {
      this.$bus.$on('ie11', this.checkApplied);
    },

    addOrLink() {
      if (this.code) {
        this.clickAdd();
      } else {
        this.doLink();
      }
    },

    clickAdd() {
      const target = this.$refs.addButton.querySelector('button');
      if (target) target.click()
    },

    doLink() {
      if (this.link) {
        if (this.link.startsWith('/')) {
          window.location.href = this.link;
        } else {
          window.open(this.link, '_blank');
        }
      }
    },

    configureDataListener() {
      this.$bus.$on(`${this.code}-data`, this.handleAddCoupon);
      this.addCouponId = `ac-${this.uuid}`;
    },

    printCoupon() {
      this.$bus.$emit('open-modal', { id: this.printId });
    },

    openDetailsModal(e) {
      this.$bus.$emit('open-modal', { id: this.detailsId });
    },

    handleAddCoupon(data) {
      if (data.cpnDetails) {
        if (data.cpnDetails.isValid === true) {
          this.$bus.$emit('coupon-added', data);
          this.toggleButton();
        } else {
          this.log(`COUPON: invalid code: ${this.code}`);
        }
      } else {
        this.log('COUPON: error in ajax response.');
      }
    },

    checkApplied() {
      if (window.SessionAttributes) {
        if (
          window.SessionAttributes.hasOwnProperty('APPLIED_COUPONS') &&
          Array.isArray(window.SessionAttributes.APPLIED_COUPONS) &&
          window.SessionAttributes.APPLIED_COUPONS.indexOf(
            this.code.toUpperCase()
          ) >= 0
        ) {
          this.toggleButton();
        }
      }
    },

    toggleButton() {
      this.$bus.$emit(`${this.addCouponId}-button-toggle`);
    },

    makeDetailsModal() {
      let self = this;
      const el = self.$refs.dtmodal;
      let header = '';
      if (el) {
        if (self.eventName)
          header += `<p class="bold px-18 margin-b-atomic">${self.eventName}</p>`;
        if (self.description)
          header += `<p class="bold margin-b-atomic">${self.description}</p>`;
        if (self.ends)
          header += `<p class="bold margin-b-atomic">${self.ends}</p>`;
        let html = `<sh-modal unique-id="${self.detailsId}" header="Offer Exclusions & Restrictions"><div>${header}${self.detailsHTML}</div></sh-modal>`;
        if (this.inDrawer) {
          html = html.replace("<sh-modal", "<sh-modal no-events");
        }
        el.innerHTML += html;
      }
    },

    makePrintModal() {
      let self = this;
      const el = self.$refs.ptmodal;
      if (el) {
        if (self.pdf) {
          const html = `<sh-modal printable unique-id="${self.printId}">
          <div>
            ${self.pdf}
          </div>
        </sh-modal>`;
          el.innerHTML += html;
        } else {
          const details = (self.detailsPrint) ? self.detailsPrint : self.detailsHTML;
          const html = `<sh-modal printable unique-id="${self.printId}">
          <div>
            <belk-coupon print no-type
              extra="${self.extra}"
              event-name="${self.eventName}"
              discount="${self.discount}"
              code="${self.code}" 
              ends="${self.ends}"
              upc="${self.upc}"
              description="${self.description}"
              details="${details}">
            </belk-coupon>  
          </div>
        </sh-modal>`;
          el.innerHTML += html;
        }
      }
    }
  }
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/offer.scss"></style>
