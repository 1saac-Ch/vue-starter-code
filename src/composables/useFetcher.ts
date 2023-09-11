import { UseFetchOptions, useFetch } from '@vueuse/core'
import useAuth from '../store/auth'
import { toRef } from 'vue'

const baseURL = import.meta.env.VITE_API_BASE_URL

export default function useFetcher<T>({
  url,
  withCredential = false,
  options = {},
  immediate = true,
}: {
  url: string
  withCredential?: boolean
  immediate?: boolean
  withRefresh?: boolean
  options?: RequestInit
}) {
  const { token } = useAuth()
  const fetchOptions: UseFetchOptions = {
    immediate,
  }

  if (withCredential) {
    fetchOptions.beforeFetch = async ({ cancel, options }) => {
      if (!token.value) {
        console.log('No token')
        cancel()
      }

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }

      return {
        options,
      }
    }
  }

  const { isFetching, error, json } = useFetch(`${url}`, options, fetchOptions)

  const data = json<T>().data

  return {
    isFetching,
    error,
    data,
  }
}
