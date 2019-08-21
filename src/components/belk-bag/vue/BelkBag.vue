<template>
  <div class="belk-bag" :variant="variant">

    <!-- <div class="bag-total">{{ priceFormatted }}</div> -->
    <sh-nav-item delay-on-mouse-over="400" delay-on-mouse-out="400" variant="primary">
      <a slot="reference" id="giftcard-link" href="#">
        <div class="bag-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 26.47">
            <title>Asset 1_2</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path d="M21,4.88H17.5A5.42,5.42,0,0,0,14.4.67a9,9,0,0,0-6.8,0A6.37,6.37,0,0,0,4.4,4.88H1a1,1,0,0,0-1,1V25.47a.94.94,0,0,0,.3.71,1.06,1.06,0,0,0,.7.29H21a1,1,0,0,0,1-1V6A1,1,0,0,0,21,4.88ZM8.6,2.47a6.73,6.73,0,0,1,4.8,0h.1a3.49,3.49,0,0,1,1.9,2.41H6.6A3.58,3.58,0,0,1,8.6,2.47ZM20,24.58H2V7H4.1C4,8,4,9.08,4,10.28a1,1,0,0,0,1,1,1.08,1.08,0,0,0,1-1A27.87,27.87,0,0,1,6.2,7h9.6a29.21,29.21,0,0,1,.2,3.31,1,1,0,0,0,1,1,1.08,1.08,0,0,0,1-1A29.21,29.21,0,0,0,17.8,7H20Z"/>
              </g>
            </g>
          </svg>
          <span>{{ itemCount }}</span>
        </div>
        <div class="bag-text">Bag</div>
        <!-- <div class="bag-total">{{ priceFormatted }}</div> -->
      </a>

      <div id="giftcard-menu">
        <ul>
        <li><a>Send a Gift Card by Mail</a></li>
        <li><a>Send an eGift Card</a></li>
        <li><a>Check My Gift Card Balance</a></li>
        </ul>
      </div>
    </sh-nav-item>

  </div>
</template>

<script src="../script/BelkBag.js"></script>
<style lang="scss" src="../style/default.scss"></style>
