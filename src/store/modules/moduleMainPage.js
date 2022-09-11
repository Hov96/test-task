import axios from "axios";

// State
const state = () => ({
    pageData: {
        data: [],
        loading: false,
        error: false,
    },
    categories: {},
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
        state.pageData.data.forEach(category => {
            state.categories[category.id] = []
            category.checked = false
            category.halfChecked = false
            category.show = false;
            category.children.forEach(child => {
                child.checked = false
            })
        });
    },
    setPageLoading(state, value) {
        state.pageData.loading = value;
    },
    setPageError(state, value) {
        state.pageData.error = value;
    },

    setHeading(state, data) {
        state.pageData.data.forEach(category => {
            if (category.id === data.id) {
                    category.checked = data.checked
                    category.children.forEach(child => {
                        child.checked = data.checked
                        if (data.checked) {
                            if (!state.categories[data.category].includes(child.id)) {
                                state.categories[data.category].push(child.id)
                            }
                        } else {
                            state.categories[data.category] = []
                        }
                    })
                }

            if (category.checked) {
                category.halfChecked = false
            }
        })

        state.checkedItems = setFinalDataToShow(state.pageData.data, state.categories)
    },

    setCheckedItems(state, data) {
        if (data.checked) {
            if (!state.categories[data.category].includes(data.id)) {
                state.categories[data.category].push(data.id)
            }
        } else {
            const index = state.categories[data.category].findIndex(c => c === data.id)
            state.categories[data.category].splice(index, 1)
        }

        setElementCheckedState(state.pageData.data, data)
        setHeadingCheckedState(state.pageData.data, state.categories, data)

        state.checkedItems = setFinalDataToShow(state.pageData.data, state.categories)
    },
};
const setFinalDataToShow = (pageData, categories) => {
    let arr = []
    for (let key in categories) {
        if (!pageData.find(el => el.id === key)?.children.map(el => el.id)?.every(itm => categories[key].includes(itm))) { // O(4)
            arr.push(...categories[key])
        } else {
            arr = arr.filter(el => !categories[key].includes(el))
            arr.push(key)
        }
    }

    return arr
}

const setElementCheckedState = (pageData, itemInfo) => {
    pageData.forEach(category => {
        if (itemInfo.isHeading && category.id === itemInfo.id) {
            category.checked = itemInfo.checked
        } else {
            category.children.forEach(child => {
                if (child.id === itemInfo.id) {
                    child.checked = itemInfo.checked
                }
            })
        }
    })
}

const setHeadingCheckedState = (pageData, categories, itemInfo) => {
    pageData.forEach(category => {
        if (itemInfo.category === category.id) {
            if (category.children.length === categories[itemInfo.category].length) {
                category.checked = true
                category.halfChecked = false
            } else if (categories[itemInfo.category].length !== 0 && category.children.length > categories[itemInfo.category].length) {
                category.halfChecked = true
                category.checked = false
            } else if (categories[itemInfo.category].length === 0) {
                category.halfChecked = false
                category.checked = false
            }
        }
    })
}

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