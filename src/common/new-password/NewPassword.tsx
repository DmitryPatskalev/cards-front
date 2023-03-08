import React, { useEffect, useState } from 'react'

import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import commonStyle from '../common-style/common-container.module.scss'
import { setNewPasswordTC } from '../login/auth-reducer'
import style from '../login/Login.module.scss'
import s from '../password-recovery/PasswordRecovery.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import { InputField } from '../utils/form/FormFields'
import { IconVisibility } from '../utils/form/IconVisibility'

export type ValidateType = {
  password: string
  resetPasswordToken: string
}
const validate = (values: ValidateType) => {
  const errors: Partial<ValidateType> = {}

  if (!values.password) {
    errors.password = 'The field is required'
  } else if (values.password.length < 7) {
    errors.password = 'Must be 7 characters or more'
  } else if (values.password.length > 25) {
    errors.password = 'Must be 25 characters or less'
  }

  return errors
}

export const NewPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { token } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { resetPasswordToken, password } = useAppSelector(state => state.auth)

  return (
    <div className={`${commonStyle.commonContainer} ${style.loginContainer}`}>
      <div className={style.formContainer}>
        <Formik
          initialValues={{
            password: '',
            resetPasswordToken: '',
          }}
          validate={validate}
          onSubmit={values => {
            alert(JSON.stringify(values, null, 2))

            dispatch(setNewPasswordTC(password, resetPasswordToken))
          }}
        >
          <Form className={style.form}>
            <h2 className={style.titleForm}>Create New Password</h2>
            <InputField
              placeholder="new password"
              name="password"
              type={showPassword ? 'text' : 'password'}
            >
              <IconVisibility showPassword={showPassword} setShowPassword={setShowPassword} />
            </InputField>
            <div className={s.emailInstruction}>
              Create new password and we will send you further instructions to email
            </div>
            <SuperButton type="submit" xType={'default'}>
              Create new password
            </SuperButton>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
