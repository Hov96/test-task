<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :name="id"
      :id="id"
      :value="value"
      @change="($event) => $emit('change', { id, checked: $event.target.checked })"
    />
    <label :for="id">{{ label }}</label>
  </div>
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
  },
};
</script>

<style scoped lang="scss">
.checkbox {
  display: block;
  margin-bottom: 15px;
  user-select: none;
  input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
    &:checked + label:after {
      content: "";
      display: block;
      position: absolute;
      top: 2px;
      left: 9px;
      width: 6px;
      height: 14px;
      border: solid #0079bf;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
  label {
    position: relative;
    cursor: pointer;
    &::before {
      content: "";
      -webkit-appearance: none;
      background-color: transparent;
      border: 2px solid #0079bf;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
      padding: 10px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
      margin-right: 5px;
    }
  }
}
</style>
