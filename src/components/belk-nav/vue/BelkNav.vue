<template>
  <div class="belk-nav" :class="{ active: active }" @click="checkClose">
    <div class="contain">
      <div class="nav-categories">
        <ul>
          <li main="cat1" @mouseover="activate('cat1')">Cat 1</li>
          <li main="cat2" @mouseover="activate('cat2')">Cat 2</li>
          <li main="cat3" @mouseover="activate('cat3')">Cat 3</li>
        </ul>
      </div>
      <div class="nav-actual">
        <div category="cat1">
          <sh-masonry>
            <div class="grid-item view-all">
              <a href="https://development-web-belk.demandware.net/s/Belk/women/">Shop All Women</a>
            </div>
            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="categoryproducthits"
                    data-cgid="women-new-arrivals"
                    href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/"
                    tabindex="50"
                  >New Arrivals</a>
                  <ul>
                    <li class="view-all">
                      <a
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/"
                      >Shop All New Arrivals</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-activewear"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/activewear/"
                        tabindex="50"
                      >Activewear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-bras-panties-lingerie"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/bras-panties-lingerie/"
                        tabindex="50"
                      >Bras, Panties &amp; Lingerie</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-capris"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/capris/"
                        tabindex="50"
                      >Capris</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-coats-outerwear"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/coats-outerwear/"
                        tabindex="50"
                      >Coats &amp; Outerwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-dresses"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/dresses/"
                        tabindex="50"
                      >Dresses</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-jackets-blazers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/jackets-blazers/"
                        tabindex="50"
                      >Jackets &amp; Blazers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-jeans"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/jeans/"
                        tabindex="50"
                      >Jeans</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-pajamas-lounge"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/pajamas-robes/"
                        tabindex="50"
                      >Pajamas &amp; Robes</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-pants"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/pants/"
                        tabindex="50"
                      >Pants</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-shorts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/shorts/"
                        tabindex="50"
                      >Shorts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-skirts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/skirts/"
                        tabindex="50"
                      >Skirts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-suits-suit-separates"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/suits-suit-separates/"
                        tabindex="50"
                      >Suits &amp; Suit Separates</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-sweaters"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/sweaters/"
                        tabindex="50"
                      >Sweaters</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-new-arrivals-tops"
                        href="https://development-web-belk.demandware.net/s/Belk/women/new-arrivals/tops/"
                        tabindex="50"
                      >Tops</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="categoryproducthits"
                    data-cgid="women-womens-accessories"
                    href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/"
                    tabindex="50"
                  >Women's Accessories</a>
                  <ul>
                    <li class="view-all">
                      <a
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/"
                      >Shop All Women's Accessories</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-belts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/belts/"
                        tabindex="50"
                      >Belts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-ear-warmers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/ear-warmers/"
                        tabindex="50"
                      >Ear Warmers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-gloves"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/gloves/"
                        tabindex="50"
                      >Gloves</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-hair-accessories"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/hair-accessories/"
                        tabindex="50"
                      >Hair Accessories</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-hats"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/hats/"
                        tabindex="50"
                      >Hats</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-hosiery-tights"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/hosiery-tights/"
                        tabindex="50"
                      >Hosiery &amp; Tights</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-phone-cases"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/phone-cases/"
                        tabindex="50"
                      >Phone Cases</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-reading-glasses"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/reading-glasses/"
                        tabindex="50"
                      >Reading Glasses</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-scarves-wraps"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/scarves-wraps/"
                        tabindex="50"
                      >Scarves &amp; Wraps</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-socks"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/socks/"
                        tabindex="50"
                      >Socks</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-sunglasses"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/sunglasses/"
                        tabindex="50"
                      >Sunglasses</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-umbrellas"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/umbrellas/"
                        tabindex="50"
                      >Umbrellas</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-accessories-slippers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-accessories/slippers/"
                        tabindex="50"
                      >Slippers</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="categoryproducthits"
                    data-cgid="womens-trends"
                    href="/trendedit/"
                    tabindex="50"
                  >Trends</a>
                </li>
              </ul>
            </div>

            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="categoryproducthits"
                    data-cgid="women-womens-clothing"
                    href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/"
                    tabindex="50"
                  >Women's Clothing</a>
                  <ul>
                    <li class="view-all">
                      <a
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/"
                      >Shop All Women's Clothing</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-activewear"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/activewear/"
                        tabindex="50"
                      >Activewear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-bras-panties-lingerie"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/bras-panties-lingerie/"
                        tabindex="50"
                      >Bras, Panties &amp; Lingerie</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-capris"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/capris/"
                        tabindex="50"
                      >Capris</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-coats-jackets"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/coats-outerwear/"
                        tabindex="50"
                      >Coats &amp; Outerwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-contemporary"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/contemporary/"
                        tabindex="50"
                      >Contemporary</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-designer"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/designer/"
                        tabindex="50"
                      >Designer</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-dresses"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/dresses/"
                        tabindex="50"
                      >Dresses</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-blazers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/jackets-blazers/"
                        tabindex="50"
                      >Jackets &amp; Blazers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-jeans"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/jeans/"
                        tabindex="50"
                      >Jeans</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-jumpsuits-rompers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/jumpsuits-rompers/"
                        tabindex="50"
                      >Jumpsuits &amp; Rompers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-leggings"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/leggings/"
                        tabindex="50"
                      >Leggings</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-pajamas-lounge"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/pajamas-robes/"
                        tabindex="50"
                      >Pajamas &amp; Robes</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-pants"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/pants/"
                        tabindex="50"
                      >Pants</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-shorts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/shorts/"
                        tabindex="50"
                      >Shorts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-skirts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/skirts/"
                        tabindex="50"
                      >Skirts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-suits-suit-separates"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/suits-suit-separates/"
                        tabindex="50"
                      >Suits &amp; Suit Separates</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-sweaters"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/sweaters/"
                        tabindex="50"
                      >Sweaters</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-swim"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/swimwear/"
                        tabindex="50"
                      >Swimwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-tops"
                        href="https://development-web-belk.demandware.net/s/Belk/women/womens-clothing/tops/"
                        tabindex="50"
                      >Tops</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="categoryproducthits"
                    data-cgid="women-maternity-clothing"
                    href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/"
                    tabindex="50"
                  >Maternity Clothing</a>
                  <ul>
                    <li class="view-all">
                      <a
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/"
                      >Shop All Maternity Clothing</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-bras-panties-lingerie"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/bras-panties-lingerie/"
                        tabindex="50"
                      >Bras, Panties &amp; Lingerie</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-coats-outerwear"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/coats-outerwear/"
                        tabindex="50"
                      >Coats &amp; Outerwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-dresses"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/dresses/"
                        tabindex="50"
                      >Dresses</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-jeans"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/jeans/"
                        tabindex="50"
                      >Jeans</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-pajamas"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/pajamas/"
                        tabindex="50"
                      >Pajamas</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-pants-leggings"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/pants-leggings/"
                        tabindex="50"
                      >Pants &amp; Leggings</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-shorts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/shorts/"
                        tabindex="50"
                      >Shorts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-skirts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/skirts/"
                        tabindex="50"
                      >Skirts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-sweaters-hoodies"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/sweaters-hoodies/"
                        tabindex="50"
                      >Sweaters &amp; Hoodies</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-swimwear"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/swimwear/"
                        tabindex="50"
                      >Swimwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-maternity-clothing-tops"
                        href="https://development-web-belk.demandware.net/s/Belk/women/maternity-clothing/tops/"
                        tabindex="50"
                      >Tops</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="categoryproducthits"
                    data-cgid="women-featured-shops"
                    href="https://development-web-belk.demandware.net/s/Belk/women/featured-shops/"
                    tabindex="50"
                  >Featured Shops</a>
                  <ul>
                    <li class="view-all">
                      <a
                        href="https://development-web-belk.demandware.net/s/Belk/women/featured-shops/"
                      >Shop All Featured Shops</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-contemporary"
                        href="/women/womens-clothing/contemporary/"
                        tabindex="50"
                      >Contemporary</a>
                    </li>
                    <li>
                      <a
                        data-cgid="ALT-women-featured-shops-costumes"
                        href="/costumes-cosplay/womens-costumes/"
                        tabindex="50"
                      >Costumes</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-designer"
                        href="/women/womens-clothing/designer/"
                        tabindex="50"
                      >Designer</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-fan-gear"
                        href="/fan-gear/team-apparel/womens-clothing/"
                        tabindex="50"
                      >Fan Gear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-womens-clothing-featured-shops-swim-shop"
                        href="/swim-shop/"
                        tabindex="50"
                      >Swim Shop</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-trends"
                        href="/trendedit/"
                        tabindex="50"
                      >Trends</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-face-masks"
                        href="https://development-web-belk.demandware.net/s/Belk/women/featured-shops/face-masks/"
                        tabindex="50"
                      >Face Masks</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-family-of-sleep"
                        href="https://development-web-belk.demandware.net/s/Belk/women/featured-shops/family-pajamas/"
                        tabindex="50"
                      >Family Pajamas</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-mommy-me-sleepwear"
                        href="https://development-web-belk.demandware.net/s/Belk/women/featured-shops/mommy-me-sleepwear/"
                        tabindex="50"
                      >Mommy &amp; Me Sleepwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-statements"
                        href="https://development-web-belk.demandware.net/s/Belk/women/featured-shops/statements/"
                        tabindex="50"
                      >Statements</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-the-active-shop"
                        href="/active/"
                        tabindex="50"
                      >The Active Shop</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-the-culture-shop"
                        href="/the-culture-shop/"
                        tabindex="50"
                      >The Culture Shop</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-featured-shops-womens-cozy-shop"
                        href="https://development-web-belk.demandware.net/s/Belk/women/featured-shops/womens-cozy-shop/"
                        tabindex="50"
                      >Women's Cozy Shop</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="catlandinggrid"
                    data-cgid="women-plus-clothing"
                    href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/"
                    tabindex="50"
                  >Plus Size Clothing</a>
                  <ul>
                    <li class="view-all">
                      <a
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/"
                      >Shop All Plus Size Clothing</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-new-arrivals"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/new-arrivals/"
                        tabindex="50"
                      >Plus New Arrivals</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-activewear"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/activewear/"
                        tabindex="50"
                      >Plus Activewear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-bras-panties-lingerie"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/bras-panties-lingerie/"
                        tabindex="50"
                      >Plus Bras, Panties &amp; Lingerie</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-capris"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/capris/"
                        tabindex="50"
                      >Plus Capris</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-coats-jackets"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/coats-outerwear/"
                        tabindex="50"
                      >Plus Coats &amp; Outerwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-contemporary"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/contemporary/"
                        tabindex="50"
                      >Plus Contemporary</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-designer"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/designer/"
                        tabindex="50"
                      >Plus Designer</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-dresses"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/dresses/"
                        tabindex="50"
                      >Plus Dresses</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-blazers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/jackets-blazers/"
                        tabindex="50"
                      >Plus Jackets &amp; Blazers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-jeans"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/jeans/"
                        tabindex="50"
                      >Plus Jeans</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-jumpsuits-rompers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/jumpsuits-rompers/"
                        tabindex="50"
                      >Plus Jumpsuits &amp; Rompers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-leggings"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/leggings/"
                        tabindex="50"
                      >Plus Leggings</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-pajamas-lounge"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/pajamas-robes/"
                        tabindex="50"
                      >Plus Pajamas &amp; Lounge</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-pants"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/pants/"
                        tabindex="50"
                      >Plus Pants</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-shorts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/shorts/"
                        tabindex="50"
                      >Plus Shorts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-skirts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/skirts/"
                        tabindex="50"
                      >Plus Skirts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-suits-suit-separates"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/suits-suit-separates/"
                        tabindex="50"
                      >Plus Suits &amp; Suit Separates</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-sweaters"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/sweaters/"
                        tabindex="50"
                      >Plus Sweaters</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-swim"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/swimwear/"
                        tabindex="50"
                      >Plus Swimwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-plus-clothing-tops"
                        href="https://development-web-belk.demandware.net/s/Belk/women/plus-size-clothing/tops/"
                        tabindex="50"
                      >Plus Tops</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="categoryproducthits"
                    data-cgid="women-shoes"
                    href="/shoes/womens-shoes/"
                    tabindex="50"
                  >Shoes</a>
                  <ul>
                    <li class="view-all">
                      <a href="/shoes/womens-shoes/">Shop All Shoes</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-boots"
                        href="/shoes/womens-shoes/boots/"
                        tabindex="50"
                      >Boots</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-clogs-mules"
                        href="/shoes/womens-shoes/clogs-mules/"
                        tabindex="50"
                      >Clogs &amp; Mules</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-comfort"
                        href="/shoes/womens-shoes/comfort/"
                        tabindex="50"
                      >Comfort</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-designer"
                        href="/shoes/womens-shoes/designer/"
                        tabindex="50"
                      >Designer</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-flats"
                        href="/shoes/womens-shoes/flats/"
                        tabindex="50"
                      >Flats</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-heels-pumps"
                        href="/shoes/womens-shoes/heels-pumps/"
                        tabindex="50"
                      >Heels &amp; Pumps</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-sandals"
                        href="/shoes/womens-shoes/sandals/"
                        tabindex="50"
                      >Sandals</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-sneakers"
                        href="/shoes/womens-shoes/sneakers/"
                        tabindex="50"
                      >Sneakers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-slippers"
                        href="/shoes/womens-shoes/slippers/"
                        tabindex="50"
                      >Slippers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-special-occasion"
                        href="https://development-web-belk.demandware.net/s/Belk/women/shoes/special-occasion/"
                        tabindex="50"
                      >Special Occasion</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-water-shoes"
                        href="/shoes/womens-shoes/water-shoes/"
                        tabindex="50"
                      >Water Shoes</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-shoes-wedges"
                        href="/shoes/womens-shoes/wedges/"
                        tabindex="50"
                      >Wedges</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="categoryproducthits"
                    data-cgid="shop-all-women"
                    href="/women/"
                    tabindex="50"
                  >Shop All</a>
                </li>
              </ul>
            </div>
            <div class="grid-item">
              <ul class="topcat">
                <li>
                  <a
                    data-layout="catlandinggrid"
                    data-cgid="women-petite-clothing"
                    href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/"
                    tabindex="50"
                  >Petite Clothing</a>
                  <ul>
                    <li class="view-all">
                      <a
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/"
                      >Shop All Petite Clothing</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-new-arrivals"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/new-arrivals/"
                        tabindex="50"
                      >Petite New Arrivals</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-activewear"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/activewear/"
                        tabindex="50"
                      >Petite Activewear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-bras-panties-lingerie"
                        href="/women/womens-clothing/bras-panties-lingerie/"
                        tabindex="50"
                      >Petite Bras, Panties &amp; Lingerie</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-capris"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/capris/"
                        tabindex="50"
                      >Petite Capris</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-coats-jackets"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/coats-outerwear/"
                        tabindex="50"
                      >Petite Coats &amp; Outerwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-dresses"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/dresses/"
                        tabindex="50"
                      >Petite Dresses</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-blazers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/jackets-blazers/"
                        tabindex="50"
                      >Petite Jackets &amp; Blazers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-jeans"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/jeans/"
                        tabindex="50"
                      >Petite Jeans</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-jumpsuits-rompers"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/jumpsuits-rompers/"
                        tabindex="50"
                      >Petite Jumpsuits &amp; Rompers</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-leggings"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/leggings/"
                        tabindex="50"
                      >Petite Leggings</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-pants"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/pants/"
                        tabindex="50"
                      >Petite Pants</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-shorts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/shorts/"
                        tabindex="50"
                      >Petite Shorts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-skirts"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/skirts/"
                        tabindex="50"
                      >Petite Skirts</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-suits-suit-separates"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/suits-suit-separates/"
                        tabindex="50"
                      >Petite Suits &amp; Suit Separates</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-sweaters"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/sweaters/"
                        tabindex="50"
                      >Petite Sweaters</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-swim"
                        href="/women/womens-clothing/swimwear/"
                        tabindex="50"
                      >Petite Swimwear</a>
                    </li>
                    <li>
                      <a
                        data-cgid="women-petite-clothing-tops"
                        href="https://development-web-belk.demandware.net/s/Belk/women/petite-clothing/tops/"
                        tabindex="50"
                      >Petite Tops</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </sh-masonry>
        </div>
        <div category="cat2">
          <sh-masonry>
            <div class="grid-item">rest</div>
            <div class="grid-item">rest</div>
            <div class="grid-item">rest</div>
            <div class="grid-item">rest</div>
          </sh-masonry>
        </div>
        <div category="cat3">
          <sh-masonry>
            <div class="grid-item">best</div>
            <div class="grid-item">best</div>
            <div class="grid-item">best</div>
            <div class="grid-item">best</div>
          </sh-masonry>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkNav',

  mounted() {
    this.headerEl = document.querySelector('belk-header');
  },

  data() {
    return {
      active: false,
      headerEl: false,
    };
  },

  watch: {
    active(val) {
      if (val) {
        this.headerEl.classList.add('nav-active');
        document.documentElement.classList.add('nav-open');
      } else {
        this.headerEl.classList.remove('nav-active');
        document.documentElement.classList.remove('nav-open');
      }
    },
  },

  methods: {
    events() {
      this.$bus.$on('show-nav', this.toggle);
      this.$bus.$on('popper-opening', this.hide);
      this.$bus.$on('search-opening', this.hide);
    },

    toggle() {
      // this.$bus.$emit('show-curtain');
      this.active = !this.active;
    },

    hide() {
      if (this.active) this.active = false;
    },

    activate(which) {
      this.catsOff();
      const el = this.$el.querySelector(`[category="${which}"]`);
      if (el) {
        el.classList.add('active');
        el.scrollTop = 0;
      }
      const main = this.$el.querySelector(`[main="${which}"]`);
      if (main) main.classList.add('active');
    },

    catsOff() {
      const el = this.$el.querySelector('[category].active');
      if (el) el.classList.remove('active');
      const main = this.$el.querySelector('[main].active');
      if (main) main.classList.remove('active');
    },

    checkClose(e) {
      if (e.target === this.$el) this.hide();
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
