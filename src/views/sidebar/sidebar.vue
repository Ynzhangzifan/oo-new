<template>
  <div class="user">
    <sidelist></sidelist>
    <indexs></indexs>
  </div>
</template>

<script>

export default {
  components: {
    sidelist: () => import('../../components/side/sidelist'),
    indexs: () => import('../indexs.vue'),
  },
};
</script>
<style scoped lang="less">
  .user {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
  }
</style>