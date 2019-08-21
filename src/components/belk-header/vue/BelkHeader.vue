<template>
  <header class="belk-header">
    <div ref="pre" class="pre">
      <slot name="pre-header"></slot>
    </div>

    <nav ref="primary" class="primary">
      <div class="contain">
        <div class="html-slot-container">FREE SHIPPING on orders over $49!</div>

        <ul class="utility-menu">
          <li class="utility-menu-item">
            <sh-nav-item delay-on-mouse-over="400" delay-on-mouse-out="400" variant="primary">
              <a slot="reference" id="bopis-link" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.3 17.44">
                  <defs />
                  <title>Asset 3_2</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        d="M5.65,0A5.65,5.65,0,0,0,0,5.65c0,1.68.91,4.12,2.7,7.24a46,46,0,0,0,2.68,4.17l.27.38.27-.38A48.67,48.67,0,0,0,8.6,12.89c1.79-3.12,2.7-5.56,2.7-7.24A5.66,5.66,0,0,0,5.65,0Z"
                      />
                      <circle class="cls-1" cx="5.65" cy="5.86" r="3.83" fill="#fff" />
                      <path
                        d="M5.65,10A4.17,4.17,0,1,1,9.82,5.86,4.17,4.17,0,0,1,5.65,10Zm0-7.66a3.5,3.5,0,1,0,3.5,3.49A3.5,3.5,0,0,0,5.65,2.37Z"
                      />
                    </g>
                  </g>
                </svg>
                My Store:
                <span>Charlotte NC - Southpark</span>
              </a>
              <div id="bopis-menu">
                <ul>
                  <li>
                    <a>Bopis Thing</a>
                  </li>
                </ul>
              </div>
            </sh-nav-item>
          </li>

          <li class="utility-menu-item">|</li>

          <li class="utility-menu-item" ref="popper">
            <sh-nav-item delay-on-mouse-over="400" delay-on-mouse-out="400" variant="primary">
              <a slot="reference" id="rewards-link" href="#">Belk Premier Rewards ⋁</a>
              <div id="rewards-menu">
                <ul>
                  <li>
                    <a>Pay My Bill</a>
                  </li>
                  <li>
                    <a>Manage My Account</a>
                  </li>
                  <li>
                    <a>Apply for a New Card</a>
                  </li>
                  <li>
                    <a>Belk Rewards Benefits</a>
                  </li>
                </ul>
              </div>
            </sh-nav-item>
          </li>

          <li class="utility-menu-item" ref="popper">
            <sh-nav-item delay-on-mouse-over="400" delay-on-mouse-out="400" variant="primary">
              <a slot="reference" id="giftcard-link" href="#">Gift Cards ⋁</a>
              <div id="giftcard-menu">
                <ul>
                  <li>
                    <a>Send a Gift Card by Mail</a>
                  </li>
                  <li>
                    <a>Send an eGift Card</a>
                  </li>
                  <li>
                    <a>Check My Gift Card Balance</a>
                  </li>
                </ul>
              </div>
            </sh-nav-item>
          </li>
        </ul>
      </div>
    </nav>

    <nav ref="secondary" class="secondary">
      <ul class="contain">
        <belk-search></belk-search>

        <sh-button class="nav-trigger" v-hammer:tap="menuHandler">
          <i class="material-icons-round">menu</i>
        </sh-button>

        <belk-logo class="logo" width="96"></belk-logo>

        <ul class="icon-bar">
          <li class="icon-bar-icon">
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172.88 243.29">
                <title>Asset 5_2</title>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <rect x="106" width="12.46" height="5.81" />
                    <path d="M135.14,195.2l-.38-5.8H121.84v5.82H134.3Q134.72,195.23,135.14,195.2Z" />
                    <rect x="85.24" width="12.46" height="5.81" />
                    <path
                      d="M137.64,6.66l2.77-5.11A12.87,12.87,0,0,0,134.3,0h-7.53V5.81h7.53A7.05,7.05,0,0,1,137.64,6.66Z"
                    />
                    <rect x="64.47" width="12.46" height="5.81" />
                    <path
                      d="M141.36,22.92h5.82V12.87a12.88,12.88,0,0,0-.38-3.09l-5.64,1.4a7.39,7.39,0,0,1,.2,1.7Z"
                    />
                    <rect x="141.36" y="155.82" width="5.81" height="12.46" />
                    <rect x="141.36" y="114.29" width="5.81" height="12.46" />
                    <rect x="141.36" y="31.22" width="5.81" height="12.46" />
                    <rect x="141.36" y="135.06" width="5.81" height="12.46" />
                    <rect x="141.36" y="51.99" width="5.81" height="12.46" />
                    <rect x="141.36" y="72.76" width="5.81" height="12.46" />
                    <rect x="141.36" y="93.52" width="5.81" height="12.46" />
                    <rect x="43.7" width="12.46" height="5.81" />
                    <rect y="140.84" width="5.81" height="12.46" />
                    <rect x="38.78" y="189.41" width="12.46" height="5.81" />
                    <path
                      d="M5.81,182.37H0a12.88,12.88,0,0,0,8.84,12.2l1.83-5.52A7.07,7.07,0,0,1,5.81,182.37Z"
                    />
                    <rect y="161.6" width="5.81" height="12.46" />
                    <rect x="18.01" y="189.41" width="12.46" height="5.81" />
                    <rect x="59.54" y="189.41" width="12.46" height="5.81" />
                    <rect x="101.08" y="189.41" width="12.46" height="5.81" />
                    <rect x="80.31" y="189.41" width="12.46" height="5.81" />
                    <path
                      d="M1.56,6.74,6.67,9.53a7.09,7.09,0,0,1,6.21-3.72h1.75V0H12.88A12.9,12.9,0,0,0,1.56,6.74Z"
                    />
                    <rect y="16.24" width="5.81" height="12.46" />
                    <rect y="57.77" width="5.81" height="12.46" />
                    <rect y="37" width="5.81" height="12.46" />
                    <rect x="22.94" width="12.46" height="5.81" />
                    <rect y="78.54" width="5.81" height="12.46" />
                    <rect y="120.07" width="5.81" height="12.46" />
                    <rect y="99.3" width="5.81" height="12.46" />
                    <path
                      d="M44.07,105.29,25.76,131.45,28,133.52C37.27,142,48.45,147,62.14,148.8v13.67H87.63V148.69c20.81-3.65,32.66-16.62,32.66-35.95,0-15.54-9-23.76-19.61-28.51L119.3,59.57l-2.62-2.13a62.76,62.76,0,0,0-29.05-13V30.07H62.14V44.3C40,48.38,30.07,64.22,30.07,78.65,30.07,92.05,36.06,100.16,44.07,105.29Zm22-54.53,3-.39V37.07H80.63V50.49l3,.41a57.63,57.63,0,0,1,25.92,9.92L98.11,76a52.28,52.28,0,0,0-27.55-8.23c-9.46,0-10.87,4.9-10.87,7.83,0,5.94,7.07,7.3,16.86,9.17,19.36,3.7,36.74,8.63,36.74,28,0,16.58-10.51,27-29.6,29.46l-3.06.39v12.88H69.14v-13l-3.18-.3c-12.39-1.16-22.53-5-30.89-11.83l11.12-15.88A48,48,0,0,0,76.62,125.2c13.17,0,14.19-6.66,14.19-8.7,0-6-7.33-7.28-16.62-8.9-15.66-2.72-37.12-6.46-37.12-28.95C37.07,67.51,44.67,53.53,66.09,50.76Zm28,31a138.72,138.72,0,0,0-16.18-3.81C74,77.17,69,76.2,67,75.23a10,10,0,0,1,3.53-.45A45.83,45.83,0,0,1,94.05,81.72ZM49.71,108.31c7.8,3.5,16.51,5,23.28,6.19,3.69.64,8.55,1.49,10.46,2.38-.81.53-3,1.32-6.83,1.32A41.11,41.11,0,0,1,49.71,108.31Z"
                    />
                    <path
                      d="M172.7,226.47c-1.16-8.25-7.7-14.17-14.58-13.2-.35,0-.7.13-1.05.21l-9.22-21,4.71-10.74c3.25-7.4,8.83-21.5,3.74-23.73l-11.79,26.86L132.71,158c-5.09,2.23.49,16.33,3.74,23.73l4.72,10.74-9.22,21c-.35-.08-.7-.16-1.06-.21a11.57,11.57,0,0,0-9.55,3.23,17.35,17.35,0,0,0-3,20.93,11.54,11.54,0,0,0,8.28,5.75,11,11,0,0,0,1.51.11,11.84,11.84,0,0,0,8-3.34,16.74,16.74,0,0,0,5-10,16,16,0,0,0-4-13.4l7.25-16.49,7.24,16.49a16,16,0,0,0-4,13.4,16.8,16.8,0,0,0,5,10,11.85,11.85,0,0,0,8.05,3.34,10.81,10.81,0,0,0,1.5-.11,11.56,11.56,0,0,0,8.29-5.75A16.68,16.68,0,0,0,172.7,226.47ZM129.94,220a5.8,5.8,0,0,1,4.14,2.93,10,10,0,0,1-1.68,11.89,5.53,5.53,0,0,1-8.92-1.26,10,10,0,0,1,1.68-11.89,6,6,0,0,1,4.07-1.72A4.17,4.17,0,0,1,129.94,220Zm33.91,1.67a10,10,0,0,1,1.68,11.89,5.8,5.8,0,0,1-4.13,2.93c-3.56.5-7-2.79-7.61-7.34s1.73-8.65,5.28-9.15a4.36,4.36,0,0,1,.72,0A6,6,0,0,1,163.85,221.65Z"
                    />
                  </g>
                </g>
              </svg>
              <div>Coupons</div>
            </a>
          </li>

          <li class="icon-bar-icon">
            <sh-nav-item delay-on-mouse-over="400" delay-on-mouse-out="400" variant="primary">
              <a slot="reference" id="bopis-link" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.02 25.7">
                  <title>Asset 1_2</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        d="M14.32,12.3a9.25,9.25,0,0,0-1-.5A6.36,6.36,0,0,0,16,6.5a6.5,6.5,0,0,0-13,0,6.62,6.62,0,0,0,2.7,5.3c-.4.2-.8.3-1.2.5C-.08,15.2-.08,16.6,0,23.2v1.5a1.08,1.08,0,0,0,1,1H18a.94.94,0,0,0,1-1V22.8C19,16.3,19,15,14.32,12.3ZM5,6.5A4.5,4.5,0,1,1,9.52,11,4.48,4.48,0,0,1,5,6.5ZM17,22.8v.9h-1.5V19a1,1,0,0,0-2,0v4.7h-8V19a.94.94,0,0,0-1-1,.94.94,0,0,0-1,1v4.7H2v-.5c-.1-6.5-.1-6.9,3.5-9.1a9,9,0,0,1,4-1.1,8.3,8.3,0,0,1,3.8,1C17,16.2,17,16.4,17,22.8Z"
                      />
                    </g>
                  </g>
                </svg>
                <div class="icon-text">
                  <sup>Sign In,</sup>
                  <span>Account ⋁</span>
                </div>
              </a>
              <div id="bopis-menu">
                <ul>
                  <li>
                    <a>Bopis Thing</a>
                  </li>
                </ul>
              </div>
            </sh-nav-item>
          </li>

          <li class="icon-bar-icon">
            <sh-nav-item>
              <div slot="referece">
                <belk-bag ref="bag" count="10" price="1234.53"></belk-bag>
              </div>
              <div>
                Flyout
              </div>
            </sh-nav-item>
          </li>
        </ul>
      </ul>
    </nav>

    <div ref="tertiary" class="tertiary">
      <div class="contain">
        <belk-mega-nav ref="meganav">
          <slot name="tertiary-nav"></slot>
        </belk-mega-nav>
      </div>
    </div>
    <div ref="post" class="post">
      <slot name="post-header"></slot>
    </div>
  </header>
</template>

<script src="../script/BelkHeader.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>

