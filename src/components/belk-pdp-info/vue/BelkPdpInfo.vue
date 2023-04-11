<template>
  <div class="belk-pdp-info">
    <div class="tabs-desktop-header">
      <div
        v-for="(item, index) in sections"
        class="tab-item pad-t-micro pad-b-little margin-r-little"
        :key='item.id'
        :class="item.displayed ? 'active' : ''"
        @click="toggleSection(index)"
      >
        <span
          class="font-primary text lowlight-primary px-15 pad-x-micro"
          :class="item.displayed ? 'wt-700' : 'wt-400'"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div
      class="belk-pdp-info-section"
      v-for="(item, index) in sections"
      :key='item.id'
    >
      <div
        class="tab-header pad-x-little pad-y-little"
        @click="toggleSection(index)"
      >
        <span class="font-primary text wt-700 lowlight-primary px-15">
          <slot name="name">{{ item.name }}</slot>
        </span>
        <belk-icon
          name="arrow-down"
          width="13" class="lowlight-tertiary"
          :class="item.displayed ? 'opened' : 'closed'"
        />
      </div>
      <div class="tab-content" :hidden="!item.displayed"
        v-if="item.content" v-html="item.content">
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkPdpInfo',

  created() {
    this.sections = [];
    this.lastActiveSectionIndex = 0;

    if (this.productId) {
      this.getSectionsData();
    }
  },

  props: {
    productId: {
      type: String,
    },
  },

  data() {
    return {
      sections: [],
    };
  },

  methods: {
    events() {
      this.$bus.$on('resize-event', () => {
        if (!this.isMobile()) {
          this.toggleSection(this.lastActiveSectionIndex);
        }
      });
    },

    toggleSection(sectionIndex) {
      if (!this.sections[sectionIndex].displayed) {
        this.lastActiveSectionIndex = sectionIndex || 0;

        for (let i = 0; i < this.sections.length; i += 1) {
          this.sections.splice(i, 1, {
            ...this.sections[i],
            displayed: sectionIndex === i ? !this.sections[i].displayed : false,
          });
        }

        this.loadSectionContent(sectionIndex);
      } else if (this.isMobile()) {
        this.sections.splice(sectionIndex, 1, {
          ...this.sections[sectionIndex],
          displayed: false,
        });
      }
    },

    loadSectionContent(sectionIndex) {
      if (!this.sections[sectionIndex].content) {
        fetch(`${window.location.origin}/on/demandware.store/Sites-Belk-Site/default/Product-GetProductAttributes?pid=${this.productId}&tabtype=${this.sections[sectionIndex].id}`)
          .then((response) => response.text())
          .then((html) => this.handleSectionContent(html, sectionIndex));
      }
    },

    handleSectionContent(html, sectionIndex) {
      this.sections.splice(sectionIndex, 1, {
        ...this.sections[sectionIndex],
        content: html,
      });
      this.$forceUpdate();
    },

    getSectionsData() {
      fetch(`${window.location.origin}/on/demandware.store/Sites-Belk-Site/default/Product-GetProductAttributes?pid=${this.productId}`)
        .then((response) => response.json())
        .then(this.handleSectionsData);
    },

    handleSectionsData({ sections }) {
      this.sections = sections.map((section) => ({
        ...section,
        content: '',
        displayed: false,
      }));

      if (!this.isMobile()) {
        this.toggleSection(0);
      }
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
