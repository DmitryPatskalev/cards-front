import React from 'react'

import style from '../common-style/common-container.module.scss'
import s from '../login/Login.module.scss'
import { SignForm } from '../login/LoginForm'
import { InputField } from '../utils/form/FormFields'
import iconVisibilityOn from '../utils/img/icon_visibility.svg'

export const Register = () => {
  return (
    <div className={`${style.commonContainer} ${s.loginContainer}`}>
      <div className={s.formContainer}>
        <SignForm
          titleForm="Sing Up"
          titleButton="Sing Up"
          titleQuestion="Already have an account?"
          titleLink="Sing In"
        >
          <InputField label="Confirm Password" name="password" type="password">
            <img className={s.icon} src={iconVisibilityOn} alt="icon-visibility" />
          </InputField>
        </SignForm>
      </div>
    </div>
  )
}
