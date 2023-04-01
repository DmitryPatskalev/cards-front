import React from 'react'

import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

import commonStyle from '../common-style/common-container.module.scss'
import { recoveryPasswordTC } from '../login/login-reducer'
import style from '../login/Login.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import { InputField } from '../utils/form/FormFields'

import s from './PasswordRecovery.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'

export type ValidateType = {
  email: string
}
const validate = (values: ValidateType) => {
  const errors: Partial<ValidateType> = {}

  if (!values.email) {
    errors.email = 'The field is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

export const PasswordRecovery = () => {
  const styleRecovery = `<h3 
	style="background-color: lightblue; font-family: Monserrat, 'sans-serif'; padding: 30px">
	password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>Recovery Password</a>
</h3>`

  const dispatch = useAppDispatch()

  const { isDisabled, isSuccess } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  const onClickNavigate = (route: string) => navigate(route)

  if (isSuccess) navigate('/check-email')

  return (
    <div className={`${commonStyle.commonContainer} ${style.loginContainer}`}>
      <div className={style.formContainer}>
        <Formik
          initialValues={{
            email: '',
            message: styleRecovery,
          }}
          validate={validate}
          onSubmit={values => {
            dispatch(recoveryPasswordTC(values))
          }}
        >
          <Form className={style.form}>
            <h2 className={style.titleForm}>Forgot your password?</h2>

            <InputField placeholder={'Email'} name={'email'} type={'text'} />

            <div className={s.instructions}>
              Enter your email address and we will send you further instructions
            </div>

            <SuperButton
              disabled={isDisabled}
              type="submit"
              xType={isDisabled ? 'disabled' : 'default'}
            >
              Send Instructions
            </SuperButton>

            <div className={style.question}>Did you remember your password?</div>

            <div onClick={() => onClickNavigate('/login')} className={style.linkSing}>
              Try logging in
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
