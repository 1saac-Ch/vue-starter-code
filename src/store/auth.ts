import { computed, ref } from 'vue'

const token = ref('')

export default function useAuth() {
  function setToken(newToken: string) {
    token.value = newToken
  }

  async function refreshToken() {
    try {
      const response = await fetch('/refresh', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      const data = await response.json()
      token.value = data.accessToken
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const isLoggedIn = computed(() => !!token.value)

  return {
    token,
    setToken,
    refreshToken,
    isLoggedIn,
  }
}
