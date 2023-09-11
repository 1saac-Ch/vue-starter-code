import { z } from 'zod'

const regEx = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*d).{8,16}$')

export const registerSchema = z
  .object({
    phone: z.string().min(3, 'Phone must be atleast 3 characters'),
    name: z.string().min(3, 'Name must be atleast 3 characters'),
    password: z
      .string()
      .regex(
        regEx,
        'Password must be at least 8 chars and contain letter, digits and special chars.'
      ),
    confirmPassword: z.string(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: 'Confirm password must match password',
    path: ['confirmPassword'],
  })

export type RegisterSchema = z.infer<typeof registerSchema>
