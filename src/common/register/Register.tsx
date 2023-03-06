import React, { useState } from 'react'

import { Form, Formik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import style from '../common-style/common-container.module.scss'
import { registerTC } from '../login/auth-reducer'
import s from '../login/Login.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import { InputField } from '../utils/form/FormFields'
import { IconVisibility } from '../utils/form/IconVisibility'

export type ValidateType = {
  email: string
  password: string
  confirmPassword: string
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
  } else if (values.password.length < 7) {
    errors.password = 'Must be 7 characters or more'
  } else if (values.password.length > 25) {
    errors.password = 'Must be 25 characters or less'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'The field is required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match'
  }

  return errors
}

export const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { isDisabled, isRegistered } = useAppSelector(state => state.auth)

  const navigate = useNavigate()

  const onClickNavigate = (route: string) => navigate(route)

  if (isRegistered) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={`${style.commonContainer} ${s.loginContainer}`}>
      <div className={s.formContainer}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validate={validate}
          onSubmit={values => {
            dispatch(registerTC(values))
          }}
        >
          <Form className={s.form}>
            <h1 className={s.titleForm}>Sing Up</h1>

            <InputField label={'Email'} name={'email'} type={'text'} />

            <InputField
              label={'Password'}
              name={'password'}
              type={showPassword ? 'text' : 'password'}
            >
              <IconVisibility showPassword={showPassword} setShowPassword={setShowPassword} />
            </InputField>

            <InputField
              label={'Confirm password'}
              name={'confirmPassword'}
              type={showPassword ? 'text' : 'password'}
            >
              <IconVisibility showPassword={showPassword} setShowPassword={setShowPassword} />
            </InputField>

            <SuperButton
              disabled={isDisabled}
              type="submit"
              xType={isDisabled ? 'disabled' : 'default'}
            >
              Sign Up
            </SuperButton>

            <div className={s.question}>Have not you an account yet?</div>

            <div onClick={() => onClickNavigate('/login')} className={s.linkSing}>
              Sign In
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
