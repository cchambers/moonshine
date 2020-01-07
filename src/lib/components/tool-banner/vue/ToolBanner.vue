<template>
  <div class="tool-banner active" :layout="layout" :code-focus="codeFocus">
    <div class="detail">
      <div class="bar">
        <component v-bind:is="dropnav" id="toolbar-orient" event-only>
          <ul>
            <li>
              <a href="#" data-value="t">Top</a>
            </li>
            <li>
              <a href="#" data-value="r">Right</a>
            </li>
            <li>
              <a href="#" data-value="b">Bottom</a>
            </li>
            <li>
              <a href="#" data-value="l">Left</a>
            </li>
          </ul>
        </component>
        <div class="sep"></div>
        <sh-button
          toggle
          group="breakpoint"
          click-event="code-focus"
          default-value="code-all"
          active
        >FULL</sh-button>
        <sh-button toggle group="breakpoint"
        click-event="code-focus" default-value="code-lg">LG</sh-button>
        <sh-button toggle group="breakpoint"
        click-event="code-focus" default-value="code-md">MD</sh-button>
        <sh-button toggle group="breakpoint"
        click-event="code-focus" default-value="code-sm">SM</sh-button>
        <sh-button toggle group="breakpoint"
        click-event="code-focus" default-value="code-xs">XS</sh-button>
        <div class="sep"></div>
        <sh-button :disabled="!changedNotRendered" @click="renderEditorCode">RENDER</sh-button>
        <!-- <sh-button @click="loadFromLocal">LOAD LS</sh-button> -->
      </div>
    </div>
    <div class="tool">
      <div ref="component" class="component">
        <div class="panel" hidden>
          <h2>Selection</h2>
          <ul>
            <li ref="colors">
              <div class="swatches">
                <div
                  class="swatch foreground"
                  :class="'back-'+selection.foreground"
                ></div>
                <div
                  class="swatch background"
                  :class="selection.background"
                ></div>
              </div>
              <div v-for="(category, val) in colors" v-bind:key="val.id" class="cat">
                  <div class="name">{{ val }}</div>
                  <div v-for="color in category"
                  v-bind:key="color" :class="'ex back-'+color"></div>
                </div>
            </li>
            <li ref="typography">
              Typograhy
              <div class="options">
                <div class="cat">Name: {{ selection.fontname }}</div>
                <div class="cat">Size: {{ selection.fontsize }}</div>
                <div class="cat">Line-Height: {{ selection.lineheight }}</div>
                <div class="cat">Weight: {{ selection.fontweight }}</div>
                <div class="cat">
                  Style: <div class="options">
                    <sh-button toggle group="style" variant="primary">
                      [none]
                    </sh-button>
                    <sh-button toggle group="style" variant="primary">
                      <em>italic</em>
                    </sh-button>
                  </div>
                </div>
                <div class="cat">Deco: {{ selection.decoration }}</div>
                <div class="cat">Casing: {{ selection.casing }}</div>
              </div>
            </li>
            <li>
              <a href="#">Box Model</a>
              <div class="options">
                <div class="cat">Padding: {{ selection.padding }}</div>
                <div class="cat">Margin: {{ selection.margin }}</div>
                <div class="cat">Border: {{ selection.border }}</div>
              </div>
            </li>
            <li>
              <a href="#">Position</a>
              <div class="options">
                <div class="cat">Static</div>
                <div class="cat">Relative</div>
                <div class="cat">Absolute</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="constrain" v-html="html"></div>
      </div>
      <div class="editors">
        <div class="editor" ref="editor"></div>
      </div>
    </div>
  </div>
</template>

<script src="../script/ToolBanner.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss">
.ace_text-input {
  position: absolute !important;
}
</style>
