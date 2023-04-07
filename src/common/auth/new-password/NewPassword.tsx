import React, { useState } from 'react'

import { Form, Formik } from 'formik'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { setNewPasswordTC } from 'common/auth/login/login-reducer'
import style from 'common/auth/login/Login.module.scss'
import s from 'common/auth/password-recovery/PasswordRecovery.module.scss'
import commonStyle from 'common/common-css-style/common-container.module.scss'
import { InputField } from 'common/utils/form/FormFields'
import { IconVisibility } from 'common/utils/form/IconVisibility'
import { SuperButton } from 'components/super-components/button/SuperButton'

export type ValidateType = {
  password: string
}
const validate = (values: ValidateType) => {
  const errors: Partial<ValidateType> = {}

  if (!values.password) {
    errors.password = 'The field is required'
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more'
  } else if (values.password.length > 25) {
    errors.password = 'Must be 25 characters or less'
  }

  return errors
}

export const NewPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { isDisabled, isSuccess } = useAppSelector(state => state.auth)

  if (isSuccess) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={`${commonStyle.commonContainer} ${style.loginContainer}`}>
      <div className={style.formContainer}>
        <Formik
          initialValues={{
            password: '',
          }}
          validate={validate}
          onSubmit={values => {
            const index = location.pathname.lastIndexOf('/') + 1
            const token = location.pathname.slice(index)

            dispatch(setNewPasswordTC(values.password, token))
            //await authApi.newPassword(values.password, token)
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
            <SuperButton
              disabled={isDisabled}
              type="submit"
              xType={isDisabled ? 'disabled' : 'default'}
            >
              Create new password
            </SuperButton>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
