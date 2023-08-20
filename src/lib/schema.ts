import { z } from 'zod'

export const schema = z.object({
  firstname: z
    .string()
    .min(1, { message: 'A first name with minimum 1 character is required' })
    .max(100, {
      message: 'Max length is 100 characters'
    }),
  lastname: z
    .string()
    .max(100, { message: 'Max length is 100' })
    .transform((data) => {
      if (data === '') return null
      else return data
    }),
  email: z.string().email({
    message: 'A valid email is required'
  }),
  phone: z.coerce.string().refine((data) => /^[0]?[789]\d{9}$/.test(data), {
    message: 'A valid phone number is required'
  }),
  dob: z.coerce
    .string()
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'A valid date of birth is required'
    })
    .refine((date) => new Date(date).getTime() <= new Date().getTime(), {
      message: 'Date must be in the past'
    })
    .refine((date) => new Date(date).getTime() >= new Date(1920, 0, 1).getTime(), {
      message: 'Date cannot go past January 1 1920'
    })
})

export type TSchema = z.infer<typeof schema>
