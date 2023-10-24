<template>
  <view class="container">
    <view class="iamge"></view>
    <view class="example" style="margin-top: 20rpx; padding: 20rpx">
      <uni-forms
        ref="baseForm"
        label-position="top"
        label-width="120px"
        :modelValue="baseFormData"
      >
        <uni-forms-item label="用户账号:" name="username" required>
          <uni-easyinput
            v-model="baseFormData.username"
            placeholder="请输入用户账号"
            prefixIcon="person"
          />
        </uni-forms-item>
        <uni-forms-item label="登录密码:" name="password" required>
          <uni-easyinput
            v-model="baseFormData.password"
            type="password"
            placeholder="请输入登录密码"
            prefixIcon="locked"
          />
        </uni-forms-item>
        <uni-data-checkbox
          selectedColor="#fff"
          v-model="radio"
          :localdata="rememberPwd"
          multiple
        ></uni-data-checkbox>
      </uni-forms>
      <button @click="submit" type="primary" size="mini" class="submit">
        登录
      </button>
    </view>
    <view class="versions">版本所有：佛山市创意新材料科技有限公司</view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { loginAPI } from "@/api/login";
import md5_16 from "@/utils/md5_16";

const baseForm: any = ref(null);
const baseFormData = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输入用户账号",
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入登录密码",
      },
    ],
  },
});
const radio = ref([]);
const rememberPwd = ref([
  {
    text: "记住密码",
    value: 0,
  },
]);
onMounted(() => {
  baseForm.value.setRules(rules);
  const username = uni.getStorageSync("app-username");
  const password = uni.getStorageSync("app-password");
  if (username && password) {
    baseFormData.username = username;
    baseFormData.password = password;
    radio.value = [0];
  }
});
const submit = async () => {
  try {
    await baseForm.value.validate();
    const res: any = await loginAPI({
      username: baseFormData.username,
      password: md5_16(baseFormData.password),
      pcApp: "app",
    });

    uni.setStorageSync("app-username", baseFormData.username);
    uni.setStorageSync("app-password", baseFormData.password);
    uni.setStorageSync("app-token", res.data.token);

    await uni.redirectTo({
      url: "/pages/index/index",
    });
  } catch (err) {
    console.log("表单错误信息：", err);
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40 rpx 30 rpx;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background-image: url("@/static/login/backg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.example {
  width: 80%;
  box-sizing: border-box;
  padding: 20 rpx;
  position: absolute;
  top: 40%;
}

.submit {
  width: 100%;
  height: 40px;
  line-height: 40px !important;
  background-color: #0bd38b !important;
  border-radius: 6 rpx;
}

.uni-text {
  font-size: 13px !important;
  color: aliceblue !important;
}

.uni-easyinput {
  background-color: #044291 !important;
  color: aliceblue !important;
  font-size: 13px !important;
}

.uni-input-input {
  background-color: #09376b !important;
  color: aliceblue !important;
}

.uni-easyinput__content-input {
  background-color: #09376b !important;
  font-size: 13px !important;
  color: #fff !important;
  padding-left: 10px !important;
}

.is-input-border {
  border: 1px solid #999 !important;
  border-radius: 4px;
  background-color: #044291 !important;
}

.uni-forms-item__content {
  /* border: 1px solid #999999 !important; */
}

.uni-forms-item__label {
  color: #fff !important;
  font-size: 13px !important;
}

.uni-checkbox-icon {
  background: transparent !important;
  border: 1px solid #999 !important;
}

.uni-data-checklist .checklist-group .checklist-box .checkbox__inner {
  background: transparent !important;
  border: 1px solid #999 !important;
}

.uni-data-checklist
  .checklist-group
  .checklist-box
  .checklist-content
  .checklist-text {
  font-size: 12px !important;
  font-weight: 500;
}

.uni-data-checklist .checklist-group {
  justify-content: flex-end !important;
}

.uni-data-checklist {
  margin-bottom: 10px;
}

.uni-data-checklist .checklist-group .checklist-box {
  margin-right: 0px !important;
}

.iamge {
  width: 50%;
  height: 100 rpx;
  position: absolute;
  top: 8%;
  background-image: url("@/static/login/logo.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.versions {
  position: absolute;
  bottom: 2%;
  color: #fff;
  font-size: 9px;
  font-weight: 100;
}
</style>
