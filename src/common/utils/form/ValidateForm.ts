export type ValidateType = {
  email: string
  password: string
  rememberMe: boolean
  confirmPassword: string
}

export const validate = (values: Partial<ValidateType>) => {
  const errors: Partial<ValidateType> = {}

  if (!values.email) {
    errors.email = 'The field is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'The field is required'
  } else if (values.password.length < 7) {
    errors.password = 'Must be 7 characters or more'
  } else if (values.password.length > 25) {
    errors.password = 'Must be 25 characters or less'
  }

  if (values.rememberMe) {
    return values.rememberMe
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'The field is required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match'
  }

  return errors
}
