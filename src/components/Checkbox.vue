<template>
  <label class="container"
    >{{ label }}
    <input
      type="checkbox"
      :id="id"
      :value="value"
      :checked="checked"
      @change="($event) => $emit('change', { id, checked: $event.target.checked })"
    />
    <span class="checkmark" :class="halfChecked ? 'checkmark-half' : ''"></span>
  </label>
</template>

<script>
export default {
  name: "CheckboxComponent",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: "Custom label",
    },
    value: {
      type: String,
      default: "value",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    halfChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    & ~ .checkmark-half {
      &:after {
        display: block;
        left: 8px;
        top: 8px;
        width: 10px;
        height: 4px;
        border: solid #2196f3;
        border-width: 3px;
        -webkit-transform: rotate(0);
        -ms-transform: rotate(0);
        transform: rotate(0);
      }
    }
    &:checked {
      & ~ .checkmark {
        background-color: #2196f3;
        &:after {
          display: block;
        }
      }
      &:hover {
        & ~ .checkmark {
          background-color: #2196f3;
        }
      }
    }
  }
  &:hover {
    input {
      & ~ .checkmark {
        background-color: #ccc;
      }
    }
  }
  .checkmark {
    &:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
}
</style>
