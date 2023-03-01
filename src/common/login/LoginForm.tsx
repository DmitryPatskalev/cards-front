import React, { useState } from 'react'

import { Form, Formik } from 'formik'
import { NavLink } from 'react-router-dom'

import { loginTC } from '../../app/app-reducer'
import { useAppDispatch } from '../../app/store'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import { CheckBoxFieldForm, InputFieldForm } from '../utils/form/FormFields'
import iconVisibilityOn from '../utils/img/icon_visibility.svg'
import iconVisibilityOff from '../utils/img/icon_visibility_off.svg'

import s from './Login.module.scss'

type ValidateType = {
  email: string
  password: string
}

const validate = (values: ValidateType) => {
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

  return errors
}

type SignInForm = {
  title: string
  children?: React.ReactNode
}

export const SignForm: React.FC<SignInForm> = ({ title, children }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const passwordVisibilityHandler = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      validate={validate}
      onSubmit={values => {
        dispatch(loginTC(values))
      }}
    >
      <Form className={s.form}>
        <h1 className={s.titleForm}>{title}</h1>
        <InputFieldForm label={'Email'} name={'email'} type={'text'} />

        <InputFieldForm
          label={'Password'}
          name={'password'}
          type={showPassword ? 'text' : 'password'}
        >
          <img
            onClick={passwordVisibilityHandler}
            className={s.icon}
            src={showPassword ? iconVisibilityOn : iconVisibilityOff}
            alt="icon-visibility"
          />
        </InputFieldForm>

        <CheckBoxFieldForm name={'rememberMe'}>
          <span className={s.checkBoxText}>Remember Me</span>
        </CheckBoxFieldForm>

        <div className={s.forgotPasswordBlock}>
          <NavLink to={'password-recovery'}>Forgot password?</NavLink>
        </div>

        <SuperButton type="submit" xType={'default'}>
          Sign In
        </SuperButton>

        <div className={s.question}>Have not you an account yet?</div>

        <NavLink className={s.linkSingUp} to={'register'}>
          Sign Up
        </NavLink>
      </Form>
    </Formik>
  )
}
