import { ref, UnwrapRef } from 'vue'
import { z } from 'zod'

export default function useZod<T extends object>(schema: z.Schema<T>, data: T) {
  const errors = ref<Partial<T>>({})

  function parse() {
    const parsed = schema.safeParse(data)
    errors.value = {} as UnwrapRef<Partial<T>>

    if (!parsed.success) {
      const zodErrors = parsed.error.errors

      zodErrors.forEach((err) => {
        const key = err.path[0]
        ;(errors.value as any)[key] = err.message
      })

      return false
    }

    return true
  }

  return {
    errors,
    parse,
  }
}
