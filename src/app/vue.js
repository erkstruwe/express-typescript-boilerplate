import Vue from "vue"
import VueDemo from "./vue-demo"

const vueDemo = new Vue({
    el: 'vue-demo',
    render (h) {
        return h('vue-demo')
    },
    components: {VueDemo}
})
