import Vue from "vue";
import Vuex from "vuex";

// Modules
import moduleMainPage from "./modules/moduleMainPage";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        moduleMainPage,
    },
});
