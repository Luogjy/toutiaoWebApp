<template>
  <section class="bar-wrapper">
    <!--左边-->
    <div @click="backBtn" class="back-wrapper">
      <img v-if="back" class="back" src="../img/back.png">
    </div>
    <span class="title">{{title}}</span>
    <!--右边-->
    <div @click="searchBtn" class="search-wrapper">
      <img v-if="search" class="search" src="../img/search.png">
    </div>
    <div @click="userBtn" class="user-wrapper">
      <img v-if="user" class="user" src="../img/user.png">
    </div>
    <div @click="wordBtn" class="word-wrapper">
      <img v-if="word" class="word" src="../img/word.png">
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        imgUrl: './img/return.png'
      };
    },
    props: {
      search: {
        type: Boolean,
        default: true
      },
      user: {
        type: Boolean,
        default: true
      },
      word: {
        type: Boolean,
        default: true
      },
      back: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '啊哈哈aaab'
      }
    },
    methods: {
      backBtn() {
        this.$emit('clickBack');
      },
      searchBtn() {
        this.$emit('clickSearch');
      },
      userBtn() {
        this.$emit('clickUser');
      },
      wordBtn() {
        this.$emit('clickWord');
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/color";
  @import "../css/size";

  $img_width: 20px;
  @mixin wrapper {
    display: inline-block;
    height: $action_bar_height;
  }

  @mixin img {
    width: $img_width;
    margin-top: ($action_bar_height - $img_width)/2;
  }

  .bar-wrapper {
    box-sizing: border-box;
    background: $main_color;
    height: $action_bar_height;
    position: relative;

    .back-wrapper {
      @include wrapper;
      float: left;
      .back {
        @include img;
        margin-left: 12px;
      }
    }

    .title {
      line-height: $action_bar_height;
      margin-left: 10px;
      float: left;
      color: $textColor_white;
      font-size: 16px;
    }

    .search-wrapper {
      @include wrapper;
      float: right;
      .search {
        @include img;
        margin-right: 12px;
      }
    }

    .user-wrapper {
      @include wrapper;
      float: right;
      .user {
        @include img;
        margin-right: 12px;
      }
    }

    .word-wrapper {
      @include wrapper;
      float: right;
      .word {
        @include img;
        margin-right: 12px;
      }
    }

  }

</style>
