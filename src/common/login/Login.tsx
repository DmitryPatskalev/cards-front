import React, { useState } from 'react'

import { Form, Formik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import style from '../common-style/common-container.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import { CheckBoxField, InputField } from '../utils/form/FormFields'
import { IconVisibility } from '../utils/form/IconVisibility'

import { loginTC } from './auth-reducer'
import s from './Login.module.scss'

export type ValidateType = {
  email: string
  password: string
  rememberMe: boolean
}

const validate = (values: Partial<ValidateType>) => {
  const errors: Partial<ValidateType> = {}

  if (!values.email) {
    errors.email = 'The field is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'The field is required'
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more'
  } else if (values.password.length > 25) {
    errors.password = 'Must be 25 characters or less'
  }

  return errors
}

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isDisabled, isLoggedIn } = useAppSelector(state => state.auth)

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div className={`${style.commonContainer} ${s.loginContainer}`}>
      <div className={s.formContainer}>
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
            <h1 className={s.titleForm}>Sing In</h1>

            <InputField label={'Email'} name={'email'} type={'text'} />

            <InputField
              label={'Password'}
              name={'password'}
              type={showPassword ? 'text' : 'password'}
            >
              <IconVisibility showPassword={showPassword} setShowPassword={setShowPassword} />
            </InputField>

            <CheckBoxField name={'rememberMe'}>
              <span className={s.checkBoxText}>Remember Me</span>
            </CheckBoxField>

            <div className={s.forgotPasswordBlock}>
              <div onClick={() => navigate('/password-recovery')}>Forgot password?</div>
            </div>

            <SuperButton
              disabled={isDisabled}
              type="submit"
              xType={isDisabled ? 'disabled' : 'default'}
            >
              Sign In
            </SuperButton>

            <div className={s.question}>Have not you an account yet?</div>

            <div onClick={() => navigate('/register')} className={s.linkSing}>
              Sign Up
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

//email: "nya-admin@nya.nya"
// password: "1qazxcvBG"
