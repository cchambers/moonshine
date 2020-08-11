<template>
  <div class="belk-coupon"
    :class="{ printable: print, 'to-spend': toSpend }"
    :variant="variant">
    <div v-if="!noType" class="coupon-type">
      {{badge}}
    </div>
    <div class="coupon-spacer">
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
      <div v-if="eventName" class="coupon-event-name">{{eventName}}</div>
      <div class="coupon-use-code"
        v-if="code">Use Code: <span class="actual">{{code}}</span></div>
      <div v-if="ends" class="coupon-ends">{{ends}}</div>
      <div v-if="hasDescription" class="coupon-description">
          <slot name="description"></slot>
      </div>
      <div hidden><slot name="exclusions"></slot></div>
      <div class="coupon-push"></div>
      <div class="coupon-exclusions" :hidden="!hasExclusions && !print">
        <template v-if="!print">
          <a :href="'#'+exclusionsId">View Exclusions</a>
        </template>
        <div class="coupon-exclusions-actual" v-else>{{exclusions}}</div>
      </div>
      <div class="coupon-buttons" v-if="!print">
        <sh-button variant="primary" toggle
          @click="addCoupon"
          active-text="Added"
          active-icon="check">
          Add Coupon
        </sh-button>
        <div hidden class="modal"></div>
      </div>
      <div v-if="upc" class="coupon-upc">
        <belk-barcode align-text="right" :code="upc"></belk-barcode>
        <div class="coupon-logo" v-if="print">
          <belk-logo width="120"></belk-logo>
        </div>
      </div>
      <div class="coupon-print" v-if="printable">
        <sh-button variant="belk-link"
          @click="printCoupon">Print Coupon</sh-button>
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
    exclusions: String,
    headerColor: String,
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
      added: true,
      hasDescription: false,
      hasExclusions: false,
      hasEd: 'defaultid',
      exclusionsHTML: '',
      printId: 'defaultid',
      printable: false,
    };
  },

  created() {
    this.setUUID();
    this.exclusionsId = `em-${this.uuid}`;
    this.printId = `pr-${this.uuid}`;
    if (this.$slots.exclusions !== undefined) this.hasExclusions = true;
    if (this.$slots.description !== undefined) this.hasDescription = true;
  },

  mounted() {
    if (this.hasExclusions) {
      this.exclusionsHTML = this.$slots.exclusions[0].elm.innerHTML || '';
      this.makeExclusionsModal();
    }
    
    if (this.badge) {
      if (this.badge.indexOf('Store') >= 0) {
        this.printable = true;
        this.makePrintModal();
      }
    } 
  },

  methods: {
    addCoupon() {
      this.log('add coupon click handler');
    },

    printCoupon() {
      this.$bus.$emit('open-modal', { id: this.printId });
    },

    makeExclusionsModal() {
      let self = this;
      const el = self.$el.querySelector('.modal[hidden]');
      if (el) {
        const html = `<sh-modal unique-id="${self.exclusionsId}">
          <div>${self.exclusionsHTML}</div>
        </sh-modal>`;
        el.innerHTML += html;
      }
    },

    makePrintModal() {
      let self = this;
      const el = self.$el.querySelector('.modal[hidden]');
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
              exclusions="${self.exclusionsHTML}"
              description="${self.descriptionHTML}">
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
