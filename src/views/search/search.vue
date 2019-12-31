<template>
  <div class="search">
    <el-input :placeholder="$t('login.搜索')"
              prefix-icon="el-icon-search"
              v-model="search"
              @keyup.native="change">
    </el-input>

    <span class="add"
          @click="addFriend"></span>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState([
      'active',
      'activeGroup',
      'activeMessage'
    ]),
  },
  data () {
    return {
      search: '',

    }
  },
  methods: {
    change () {

      this.$store.dispatch('search', this.search)
    },
    addFriend () {
      this.$store.state.active = 0
      this.$store.state.activeGroup = 0
      this.$store.state.activeMessage = 0
    },

  },
};
</script>
<style>
/* .search .el-select {
  width: 196px;
} */
/* .search .el-input__inner {
  height: 36px;
  line-height: 36px;
  border-radius: 100px;
  font-size: 15px;
  color: #fff;
  background-color: #293037;
} */
/* .search .el-input__prefix {
  top: -2px !important;
  left: 12px;
} */
/* .search .el-input--prefix .el-input__inner {
  padding-left: 40px;
} */
/* .search .el-input {
  border-bottom: 0;
  width: 60% !important;
} */
</style>
<style scoped lang="less">
.search {
  width: 100%;
  height: 86px;
  box-shadow: 0 3px 3px 0px #080a0833;
  // text-align: center;
  padding: 25px 20px;
  box-sizing: border-box;

  .add {
    display: inline-block;
    width: 36px;
    height: 36px;
    vertical-align: middle;
    background: url("../../assets/img/add.png") center no-repeat;
    background-size: 48px 46px;
    margin: 2px 0 0 5px;
    cursor: pointer;
  }
}
</style>