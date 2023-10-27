<template>
  <view class="container">
    <view class="avarat">
      <image
        :src="userInfo.avatar || '/src/static/Me/defaultAvatar.png'"
        mode="widthFix"
        class="avaratImage"
      ></image>
    </view>
    <view class="nickName">
      {{ userInfo.username }}
    </view>
    <uni-list class="uni-list">
      <uni-list-item>
        <template v-slot:header>
          <view class="slot-box">
            <image
              class="slot-image"
              src="@/static/Me/name.svg"
              mode="widthFix"
            ></image>
          </view>
        </template>
        <template v-slot:body>
          <text class="slot-box slot-text">名称</text>
        </template>
        <template v-slot:footer>
          <text class="slot-box slot-text slot-box1">{{
            userInfo.nickname
          }}</text>
        </template>
      </uni-list-item>
      <uni-list-item>
        <template v-slot:header>
          <view class="slot-box">
            <image
              class="slot-image"
              src="@/static/Me/corporation.svg"
              mode="widthFix"
            ></image>
          </view>
        </template>
        <template v-slot:body>
          <text class="slot-box slot-text">公司</text>
        </template>
        <template v-slot:footer>
          <text class="slot-box slot-text slot-box1">{{
            userInfo.firmName
          }}</text>
        </template>
      </uni-list-item>
      <uni-list-item>
        <template v-slot:header>
          <view class="slot-box">
            <image
              class="slot-image"
              src="@/static/Me/section.svg"
              mode="widthFix"
            ></image>
          </view>
        </template>
        <template v-slot:body>
          <text class="slot-box slot-text">部门</text>
        </template>
        <template v-slot:footer>
          <text class="slot-box slot-text slot-box1">{{
            userInfo.groupName
          }}</text>
        </template>
      </uni-list-item>
      <uni-list-item>
        <template v-slot:header>
          <view class="slot-box">
            <image
              class="slot-image"
              src="@/static/Me/code.svg"
              mode="widthFix"
            ></image>
          </view>
        </template>
        <template v-slot:body>
          <text class="slot-box slot-text">员工编号</text>
        </template>
        <template v-slot:footer>
          <text class="slot-box slot-text slot-box1">{{ userInfo.code }}</text>
        </template>
      </uni-list-item>
    </uni-list>
    <button @click="logout" class="error-message">退出登录</button>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getStorageSync, removeStorageSync, useRouter } from "@/utils/utils";
import { getUserInfoAPI } from "@/api/Me";

const userInfo = ref({
  nickname: "",
  username: "",
  code: "",
  firmName: "",
  groupName: "",
  avatar: "",
});
const rememberPwd = ref();
const logout = () => {
  //在退出的时候 先判断登陆的时候是否记住了密码 如果记住密码 则不需要清除token
  //方便退出到登陆页面 账号密码自动出现在输入框中
  if (!rememberPwd.value) {
    removeStorageSync("app-token");
    removeStorageSync("app-username");
    removeStorageSync("app-password");
  }
  useRouter("/pages/Login/index", "reLaunch");
};
onMounted(async () => {
  //进页面 获取是否记住密码 这个变量存在app中
  const app = getApp();
  rememberPwd.value = app["_"]["appContext"]["config"]["rememberPwd"];
  const username: any = getStorageSync("app-username");
  const res = await getUserInfoAPI({ username });
  userInfo.value.username = res.data.username;
  userInfo.value.nickname = res.data.name;
  userInfo.value.firmName = res.data.firmName;
  userInfo.value.groupName = res.data.groupName;
  userInfo.value.code = res.data.id;
  userInfo.value.avatar = res.data.photo;
});
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #0a328d 20%, #fff 80%);
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  overflow-y: hidden;
}

.error-message {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #0a328d;
  color: #fff;
}

.avarat {
  width: 30vw;
  height: 30vw;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 50px;
}

.nickName {
  margin-top: 20px;
  margin-bottom: 25%;
  font-size: 14px;
  font-weight: 600;
}

.uni-list {
  width: 100%;
}

.slot-box {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}

.slot-image {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.slot-text {
  flex: 1;
  font-size: 13px;
  margin-right: 10px;
  font-weight: 500;
}

.slot-box1 {
  justify-content: flex-end;
}

.avaratImage {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
