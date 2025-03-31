import { RegisterOptions } from 'react-hook-form'

export const getValidationRules = (options: {
  maxLength?: { message: string; value: number }
  minLength?: { message: string; value: number }
  pattern?: { message: string; value: RegExp }
  required?: string
}): RegisterOptions => {
  return {
    ...(options.maxLength && {
      maxLength: {
        message: options.maxLength.message,
        value: options.maxLength.value,
      },
    }),
    ...(options.minLength && {
      minLength: {
        message: options.minLength.message,
        value: options.minLength.value,
      },
    }),
    ...(options.pattern && {
      pattern: {
        message: options.pattern.message,
        value: options.pattern.value,
      },
    }),
    ...(options.required && { required: options.required }),
  }
}
export const profileValidationRules = {
  dateOfBirth: {
    required: 'Date of birth is required',
    validate: (value?: string) => {
      if (!value) {
        return 'Date of birth is required'
      }
      const birthDate = new Date(value)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return age >= 13 || 'You must be at least 13 years old'
    },
  },
}
