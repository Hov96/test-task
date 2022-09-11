<template>
  <div v-if="pageLoading">
    <span class="spinner"></span>
  </div>
  <div class="error" v-else-if="pageError">
    Something went wrong. Please make sure you are running a fake API to get data (README.md)
  </div>
  <div class="main" v-else>
    <div class="main-flex" :key="count">
      <div v-for="item in data" :key="item.id">
        <div class="main-flex__heading">
          <Checkbox
            :id="item.id"
            :label="item.label"
            :value="item.id"
            :checked="item.checked"
            :halfChecked="item.halfChecked || false"
            @change="(data) => handleChangeInput(data, item.id, true)"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Arrow-down.svg"
            alt="Arrow down"
            width="30"
            height="24"
            :class="{rotated: item.show}"
            @click="item.show = !item.show; count++"
          />
        </div>
        <div class="main-childs" v-show="item.show">
          <Checkbox
            v-for="el in item.children"
            :key="el.id"
            :id="el.id"
            :label="el.label"
            :value="el.id"
            :checked="el.checked"
            @change="(data) => handleChangeInput(data, item.id, false)"
          />
        </div>
      </div>
    </div>
    <div class="main-show">
      <pre>{{ checkedItems }}</pre>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

// Components
import Checkbox from "../../components/Checkbox";

export default {
  name: "MainPage",
  components: { Checkbox },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    ...mapActions("moduleMainPage", ["fetchData"]),
    ...mapMutations("moduleMainPage", ["setCheckedItems", "setHeading"]),
    handleChangeInput(data, category, isHeading) {
      if (isHeading) {
        this.setHeading({ ...data, category });
      } else {
        this.setCheckedItems({ ...data, category });
      }
      this.count++;
    },
  },
  computed: {
    ...mapGetters("moduleMainPage", ["data", "pageLoading", "pageError", "checkedItems"]),
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped lang="scss">
.main {
  margin: 100px 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0 150px;
  &-flex {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    &__heading {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 200px;
      img {
        cursor: pointer;
        &.rotated {
          transform: rotate(180deg);
        }
      }
    }
  }
  &-childs {
    margin-left: 32px;
  }
  &-show {
    background-color: rgb(223, 223, 223);
    padding: 8px 16px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
  }
}

.error {
  color: rgb(194, 23, 23);
  font-size: 24px;
  margin: 100px auto 0;
  max-width: 500px;
  text-align: center;
}

.spinner {
  animation: spin 1s infinite ease-in-out;
  border-radius: 50%;
  border-top: 2px solid rgb(12, 201, 53);
  display: inline-block;
  height: 64px;
  width: 64px;
  margin: calc(50vh - 16px) calc(50vw - 16px);
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
