<template>
  <div class="toast">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Toast'
  }
</script>

<style scoped lang="less">
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: fit-content;
  height: 44px;
  background-color: rgba(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
  border-radius: 5px;
  h1{
		font-size: 40px;
	}
}

</style>
