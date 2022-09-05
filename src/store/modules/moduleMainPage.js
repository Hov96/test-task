import axios from "axios";

// State
const state = () => ({
    pageData: {
        data: [],
        loading: false,
        error: false,
    },
    checkedItems: [],
});

// Getters
const getters = {
    data: (state) => state.pageData.data,
    pageLoading: (state) => state.pageData.loading,
    pageError: (state) => state.pageData.error,

    // Checked Items
    checkedItems: (state) => state.checkedItems,
};

// Mutations
const mutations = {
    setPageData(state, data) {
        state.pageData.data = data;
    },
    setPageLoading(state, value) {
        state.pageData.loading = value;
    },
    setPageError(state, value) {
        state.pageData.error = value;
    },

    setCheckcedItems(state, data) {
        console.log(data); // TODO
    },
};

// Actions
const actions = {
    fetchData({ commit }) {
        commit("setPageLoading", true);
        commit("setPageError", false);
        axios
            .get("options")
            .then((response) => {
                commit("setPageData", response.data);
            })
            .catch((err) => {
                commit("setPageError", true);
            })
            .finally(() => {
                commit("setPageLoading", false);
            });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
