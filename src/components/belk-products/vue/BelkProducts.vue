<template>
  <div class="belk-products">
    <ul>
      <li v-for="product in products" v-bind:key="product.index">
        <a :href="product.url">
          <div class="image"><img :src="product.thumb_image" :alt="product.title"></div>
          <div class="title">{{ product.title }}</div>
          <div class="price" is='belk-price'>{{product.price}}</div>
          <div class="rating"><sh-rating :level="product.reviews"></sh-rating></div>
          <div class="quick-view">
            <sh-button v-hammer:tap="quickView">Quick View</sh-button>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script src="../script/BelkProducts.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
