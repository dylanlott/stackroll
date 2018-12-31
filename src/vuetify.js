import Vue from 'vue'
import 'vuetify/src/stylus/app.styl'
// import manifestJSON from '../public/manifest.json'

import {
  Vuetify,
  VApp,
  VBtn,
  VBtnToggle,
  VCard,
  VCheckbox,
  VDivider,
  VGrid,
  VIcon,
  VList,
  VProgressLinear,
  VTextField
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VBtnToggle,
    VCard,
    VCheckbox,
    VDivider,
    VGrid,
    VIcon,
    VList,
    VProgressLinear,
    VTextField
  },
  theme: {
    // primary: manifestJSON.theme_color,
    primary: '#AB47BC',
    secondary: '#BA68C8',
    accent: '#66BB6A',
    error: '#FF5252',
    warning: '#ffeb3b',
    info: '#304FFE',
    success: '#4caf50'
  }
})
