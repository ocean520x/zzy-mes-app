<template>
  <view class="container">
    <swiper :autoplay="true" :interval="3000" :loop="true">
      <swiper-item>
        <image
          src="@/static/login/backg.png"
          class="image"
          mode="widthFix"
        ></image>
      </swiper-item>
      <swiper-item>
        <image
          src="@/static/login/backg.png"
          class="image"
          mode="widthFix"
        ></image>
      </swiper-item>
      <swiper-item>
        <image
          src="@/static/login/backg.png"
          class="image"
          mode="widthFix"
        ></image>
      </swiper-item>
    </swiper>
    <view class="box" v-for="item in moduleMenuData" :key="item.moduleName">
      <view>{{ item.moduleName }}</view>
      <view class="menuBox">
        <template v-for="menu in item.menuList" :key="item.url">
          <view class="imageBox" @click="useRouter(menu.url, 'navigateTo')">
            <image :src="getImagePath(menu.img)" mode=""></image>
            <view>{{ menu.name }}</view>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "@/utils/utils";

const moduleMenuData = ref([
  {
    moduleName: "生产派工管理",
    fileName: "dispatchManagement",
    menuList: [
      {
        name: "生产派工",
        fileName: "productionDispatch",
        url: "/pages/dispatchManagement/productionDispatch/productionDispatch",
        img: "productionDispatch.svg",
      },
      {
        name: "派工报产",
        fileName: "declareProperty",
        url: "/pages/dispatchManagement/declareProperty/declareProperty",
        img: "declareProperty.svg",
      },
      {
        name: "派工回收",
        fileName: "dispatchForRecovery",
        url: "/pages/dispatchManagement/dispatchForRecovery/dispatchForRecovery",
        img: "dispatchForRecovery.svg",
      },
      {
        name: "模具派工",
        fileName: "dieDispatcher",
        url: "/pages/dispatchManagement/dieDispatcher/dieDispatcher",
        img: "dieDispatcher.svg",
      },
      {
        name: "模具报产",
        fileName: "mouldProductionReporting",
        url: "/pages/dispatchManagement/mouldProductionReporting/mouldProductionReporting",
        img: "mouldProductionReporting.svg",
      },
    ],
  },
]);
const getImagePath = (url: string) => {
  return `../../static/menuImg/${url}`;
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
}

.image {
  width: 100%;
  height: 100%;
  border-radius: 15px !important;
  box-sizing: border-box;
}

.box {
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  margin-top: 20px;
}

.menuBox {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 15px !important;
  display: flex;
  flex-flow: row wrap;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 5px;
}

.imageBox {
  width: 25%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.imageBox image {
  width: 100%;
  height: 50px;
  margin-top: 10px;
}

.imageBox view {
  font-size: 13px;
  margin-top: 3px;
}
</style>
