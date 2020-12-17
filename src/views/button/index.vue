<template>
  <div>
    <button style="color: blue;font-size: 28px;">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Mybutton',
  props: {
    desc: {
      type: String,
      default: 'hello ts button'
    }
  },
}
</script>

<style scoped lang="less">
// button{
//   width: 100px;
//   height: 40px;
// }
</style>



