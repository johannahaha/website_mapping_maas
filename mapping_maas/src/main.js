import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBicycle } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faBicycle)

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
