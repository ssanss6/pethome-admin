import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi } from '../api/auth'

const TOKEN_KEY = 'pethome_admin_token'
const USER_KEY = 'pethome_admin_user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')
  const user = ref<any>(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))

  async function login(username: string, password: string) {
    const data: any = await loginApi(username, password)
    token.value = data.token
    user.value = data
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data))
    return data
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { token, user, login, logout }
})
