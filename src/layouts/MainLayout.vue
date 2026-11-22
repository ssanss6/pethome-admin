<template>
  <el-container class="layout">
    <el-aside width="200px" class="sidebar">
      <div class="logo"><span class="mark">🐾</span>毛孩子管理后台</div>
      <el-menu
        :default-active="activeMenu"
        router
        background-color="#221F1C"
        text-color="rgba(255,255,255,.6)"
        active-text-color="#FF9B6E"
      >
        <el-menu-item-group title="经营">
          <el-menu-item index="/dashboard">笼位预约看板</el-menu-item>
          <el-menu-item index="/orders" disabled>寄养订单</el-menu-item>
          <el-menu-item index="/grooming-orders" disabled>洗护订单</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="资源">
          <el-menu-item index="/resources">房型与笼位</el-menu-item>
          <el-menu-item index="/schedule" disabled>美容师排班</el-menu-item>
          <el-menu-item index="/pricing" disabled>服务与定价</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="财务">
          <el-menu-item index="/settlement" disabled>离店结算</el-menu-item>
          <el-menu-item index="/reports" disabled>经营报表</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="title">{{ pageTitle }}</div>
        <div class="user">
          店长 · {{ user?.nickname || '管理员' }}
          <el-button link type="primary" @click="onLogout">退出</el-button>
        </div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const store = useUserStore()
const user = computed(() => store.user)
const activeMenu = computed(() => route.path)
const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/dashboard': '笼位预约看板',
    '/resources': '房型与笼位'
  }
  return titles[route.path] || '毛孩子管理后台'
})

function onLogout() {
  store.logout()
  router.push('/login')
}
</script>

<style scoped>
.layout {
  height: 100vh;
}
.sidebar {
  background: #221f1c;
}
.logo {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  color: #fff;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.mark {
  font-size: 16px;
}
.header {
  background: #fff;
  border-bottom: 1px solid #eae5df;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header .title {
  font-size: 15px;
  font-weight: 600;
}
.header .user {
  font-size: 12px;
  color: #8c8680;
  display: flex;
  align-items: center;
}
.main {
  background: #f7f5f2;
}
</style>
