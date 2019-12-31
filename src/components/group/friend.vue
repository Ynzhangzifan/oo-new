<!-- 添加群组搜索框 -->
<template>
<div class="wrapper">
	<div class="search-wrapper">
		<input type="text" class="searchInput" style="height:36px;width:100%" v-model="search" @keyup="change" :placeholder="$t('login.搜索')">
		<div class="searchInput-delete" v-show="haveText" @click="del"></div>
	</div>
</div>
</template>

<script>
export default {
	 methods: {
        change () {
        	this.$store.dispatch('search2', this.search)
        },
        del () {
            this.search= ''
            this.change()
        }
     },
     data () {
     	return {
     		search: '',
     		active: false
     	}
     },
     computed: {
        noText () {
   	      if(this.search  === '') return true
   	      return false
        },
        haveText () {
   	      if(this.search  === '') return false
   	      return true
        }
     }
}
</script>

<style lang="stylus" scoped>
.wrapper
    width: 100%
    padding: 22px 12px 12px 12px
	box-sizing border-box
	.search-wrapper
	  position: relative
	  display: flex
	  box-sizing: border-box
	  height: 34px
	  border-radius: 15px
	  .searchInput
	    outline: none
	    &:focus
	    	background-color: #f2f7f7
	  .icon-search
	    display: inline-block
	    width: 24px
	    height: 24px
	    font-size: 14px
	    line-height: 24px
	    text-align: center
	  .searchInput-delete
	    display: block
	    position: absolute
	    outline: none
	    top: 0;
	    right: 0;
	    width: 24px
	    height: 100%
	    background-size: 26px
	    background-position:center
	    background-repeat: no-repeat
	    cursor: pointer
</style>
<style>
    .search-wrapper .searchInput{
        background-color: #f2f7f7;
        border: 1px solid #818181;
        border-radius: 20px;
        padding-left: 20px;
		font-size: 16px;
    }
</style>