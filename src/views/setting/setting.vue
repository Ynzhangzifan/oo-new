<template>
  <div class="message clearfix">
    <!-- <div class="search-list fl"> -->
      <!-- <search @cShow="getShow"></search> -->
      <!-- <setlist @active="getActive"></setlist> -->
    <!-- </div> -->
    <div>
      <addfriend></addfriend>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      active: '1',
    }
  },
  components: {
    setlist: () => import('../../components/setlist/setlist'),
    selfset: () => import('../../components/setcontent/selfset'),
    safeset: () => import('../../components/setcontent/safeset'),
    soundset: () => import('../../components/setcontent/soundset'),
    privacyset: () => import('../../components/setcontent/privacyset'),
    addfriend: () => import('../addfriend/addfriend'),

  },
  methods: {
    getActive (active) {
      this.active = active
    },
    // getShow (show) {
    //   console.log(show)
    //   this.active = show
    // }
  }
};
</script>
<style>
</style>
<style scoped lang="less">
.message {
  width: 100%;
  height: 100%;
  .search-list {
    width: 24.5%;
    height: 100%;
    // background-color: #363e47;
  }
  .set-content {
    height: 100%;
    border-radius: 0px 10px 10px 0;
    background-color: #fff;
  }
  .addfriend {
    width: calc(100% - 24.5);
    height: 100%;
    background-color: #fff;
  }
}
</style>