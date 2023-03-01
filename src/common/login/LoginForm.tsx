import React, { useState } from 'react'

import { Form, Formik } from 'formik'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import { CheckBoxField, InputField } from '../utils/form/FormFields'
import iconVisibilityOn from '../utils/img/icon_visibility.svg'
import iconVisibilityOff from '../utils/img/icon_visibility_off.svg'

import { loginTC } from './auth-reducer'
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
  titleForm: string
  titleButton: string
  titleLink?: string
  titleQuestion?: string
  children?: React.ReactNode
}

export const SignForm: React.FC<SignInForm> = ({
  titleForm,
  titleButton,
  titleLink,
  titleQuestion,
  children,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const isDisabled = useAppSelector(state => state.auth.isDisabled)

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
        <h1 className={s.titleForm}>{titleForm}</h1>
        <InputField label={'Email'} name={'email'} type={'text'} />

        <InputField label={'Password'} name={'password'} type={showPassword ? 'text' : 'password'}>
          <img
            onClick={passwordVisibilityHandler}
            className={s.icon}
            src={showPassword ? iconVisibilityOn : iconVisibilityOff}
            alt="icon-visibility"
          />
        </InputField>

        <CheckBoxField name={'rememberMe'}>
          <span className={s.checkBoxText}>Remember Me</span>
        </CheckBoxField>

        <div className={s.forgotPasswordBlock}>
          <NavLink to={'password-recovery'}>Forgot password?</NavLink>
        </div>

        <SuperButton
          disabled={isDisabled}
          type="submit"
          xType={isDisabled ? 'disabled' : 'default'}
        >
          {titleButton}
        </SuperButton>

        <div className={s.question}>{titleQuestion}</div>

        <NavLink className={s.linkSingUp} to={'register'}>
          {titleLink}
        </NavLink>

        {children}
      </Form>
    </Formik>
  )
}
