<template>
  <div class="login-wrap">
    <div class="login-card">
      <div class="logo">🐾</div>
      <h2>毛孩子管理后台</h2>
      <p class="sub">门店管理 · 请使用管理员账号登录</p>

      <el-form @submit.prevent>
        <el-form-item>
          <el-input v-model="username" placeholder="账号" size="large" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="密码"
            size="large"
            show-password
            @keyup.enter="onLogin"
          />
        </el-form-item>
        <el-button type="primary" size="large" class="btn" :loading="loading" @click="onLogin">
          登 录
        </el-button>
      </el-form>

      <p class="tip">默认账号 admin / admin123</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const store = useUserStore()
const username = ref('')
const password = ref('')
const loading = ref(false)

async function onLogin() {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入账号和密码')
    return
  }
  loading.value = true
  try {
    await store.login(username.value, password.value)
    ElMessage.success('登录成功')
    router.push('/dashboard')
  } catch {
    // 错误提示已在拦截器处理
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffb088, #ff7a45);
}
.login-card {
  width: 380px;
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}
.logo {
  font-size: 48px;
}
h2 {
  margin: 12px 0 4px;
  font-size: 22px;
}
.sub {
  color: #8c8680;
  font-size: 13px;
  margin-bottom: 28px;
}
.btn {
  width: 100%;
}
.tip {
  margin-top: 20px;
  color: #bbb;
  font-size: 12px;
}
</style>
