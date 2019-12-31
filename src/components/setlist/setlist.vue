<template>
  <div class="set-list">
    <!-- <div class="self">
      <p>
        {{$t('maininfo.设置')}}
      </p>
    </div> -->
    <div class="self-set"
         :class="{active: activeName==1}">
      <p @click="selfSet">
        {{$t('maininfo.个人设置')}}
      </p>
    </div>
    <div class="security-set"
         :class="{active: activeName==2}">
      <p @click="safeSet">
        {{$t('maininfo.安全设置')}}
      </p>
    </div>
    <div class="sound-set"
         :class="{active: activeName==3}">
      <p @click="soundSet">
        {{$t('maininfo.声音设置')}}
      </p>
    </div>
    <div class="privacy-set"
         :class="{active: activeName==4}">
      <p @click="privacySet">
        {{$t('maininfo.隐私设置')}}
      </p>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      activeName: 1
    }
  },
  methods: {
    selfSet () {
      this.activeName = 1
      this.$emit('active', this.activeName)
    },
    safeSet () {
      this.activeName = 2
      this.$emit('active', this.activeName)
    },
    soundSet () {
      this.activeName = 3
      this.$emit('active', this.activeName)
    },
    privacySet () {
      this.activeName = 4
      this.$emit('active', this.activeName)
    },
  },
};
</script>
<style>
  .el-dialog__header{
    background: #f0f4f8;
  }
</style>
<style scoped lang="less">
.set-list {
  width: 100%;
  height: 100%;
  .active {
    // box-shadow: 0 3px 3px 0px #080a0833;
    background-color: #fff;
  }
  .self {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #000;
    text-align: center;
    background-color: #f0f4f8;
    // border-left: 1px solid #0c0b0b24;
    p {
      height: 50px;
      line-height: 50px;
      // background: url("../../assets/img/set.png") center no-repeat;
      background-position: 14%;
      background-size: 24px 24px;
      text-align: left;
      padding-left: 20px
    }
  }
  .self-set {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #333;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #d5d9de;
    p {
      height: 50px;
      line-height: 50px;
      background: url("../../assets/img/selfset.png") center no-repeat;
      background-position: 14%;
      background-size: 16px;
    }
  }
  .self-set:hover {
    // box-shadow: 0 3px 3px 0px #080a0833;
    background-color: #fff;
  }
  .security-set {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #333;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #d5d9de;
    p {
      height: 50px;
      line-height: 50px;
      background: url("../../assets/img/security.png") center no-repeat;
      background-position: 14%;
      background-size: 16px;
    }
  }
  .security-set:hover {
    // box-shadow: 0 3px 3px 0px #080a0833;
    background-color: #fff;
  }
  .sound-set {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #333;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #d5d9de;
    p {
      height: 50px;
      line-height: 50px;
      background: url("../../assets/img/sound.png") center no-repeat;
      background-position: 14%;
      background-size: 16px;
    }
  }
  .sound-set:hover {
    // box-shadow: 0 3px 3px 0px #080a0833;
    background-color: #fff;
  }
  .privacy-set {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #333;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #d5d9de;
    p {
      height: 50px;
      line-height: 50px;
      background: url("../../assets/img/sound.png") center no-repeat;
      background-position: 14%;
      background-size: 16px;
    }
  }
  .privacy-set:hover {
    background-color: #fff;
  }
}
</style>