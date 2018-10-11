<template>
  <div>
    <header>
      <!-- <a href="https://github.com/suweiteng/vue2-management-platform"></a> -->
      <!-- <img src="./logo.svg" alt="logo" class="header-logo"> -->
      <span class="header-logo">进销存管理系统</span>
      <ul class="header-operations">
        <li>
          <span class="header-lang is-active">lijian</span>
          <span class="header-opacity">({{user.area}}/{{user.identity}})</span>
        </li>
        <li></li>
      </ul>
    </header>
  </div>
</template>
<script>
export default {
  props: {
    user: {}
  },
  data() {
    return {};
  }
};
</script>
<style>
header {
  background-color: black;
  height: 50px;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0 15px;
  z-index: 999;
  box-sizing: border-box;
  position: fixed;
}
.header-logo {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
}
.header-operations {
  display: inline-block;
  float: right;
  padding-right: 30px;
  height: 100%;
}
.header-operations li {
  color: #fff;
  display: inline-block;
  vertical-align: middle;
  padding: 0 10px;
  margin: 0 10px;
  line-height: 50px;
  cursor: pointer;
}
.header-operations li:first-child {
  cursor: default;
}
.header-opacity {
  opacity: 0.7;
}
.header-operations:after,
header:after {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
}
</style>
