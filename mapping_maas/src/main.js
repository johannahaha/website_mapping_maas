import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBicycle } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faBicycle)

createApp(App)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
