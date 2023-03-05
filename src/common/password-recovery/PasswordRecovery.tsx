import React from 'react'

import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import commonStyle from '../common-style/common-container.module.scss'
import style from '../login/Login.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import { InputField } from '../utils/form/FormFields'

import s from './PasswordRecovery.module.scss'

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
  const dispatch = useAppDispatch()

  const { isDisabled } = useAppSelector(state => state.auth)

  const navigate = useNavigate()

  const onClickNavigate = (route: string) => navigate(route)

  return (
    <div className={`${commonStyle.commonContainer} ${style.loginContainer}`}>
      <div className={style.formContainer}>
        <Formik
          initialValues={{
            email: '',
          }}
          validate={validate}
          onSubmit={values => {
            alert(JSON.stringify(values, null, 2))
            //dispatch(registerTC(values))
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
