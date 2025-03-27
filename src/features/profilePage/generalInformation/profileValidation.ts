export const profileValidationRules = {
  aboutMe: {
    maxLength: { message: 'Maximum 200 characters', value: 200 },
    pattern: {
      message: 'Invalid characters',
      value: /^[a-zA-Zа-яА-Я0-9\s.,!?;:'"-]+$/,
    },
  },
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
  name: {
    maxLength: { message: 'Maximum 50 characters', value: 50 },
    minLength: { message: 'Minimum 1 character', value: 1 },
    pattern: {
      message: 'Only letters (Latin or Cyrillic)',
      value: /^[a-zA-Zа-яА-Я]+$/,
    },
    required: 'This field is required',
  },
  userName: {
    maxLength: { message: 'Maximum 30 characters', value: 30 },
    minLength: { message: 'Minimum 6 characters', value: 6 },
    pattern: {
      message: 'Only letters, numbers, _ and -',
      value: /^[a-zA-Z0-9_-]+$/,
    },
    required: 'Username is required',
  },
} as const
