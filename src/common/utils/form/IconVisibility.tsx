import React, { useState } from 'react'

import s from '../../login/Login.module.scss'
import iconVisibilityOn from '../img/icon_visibility.svg'
import iconVisibilityOff from '../img/icon_visibility_off.svg'

type IconVisibilityType = {
  showPassword: boolean
  setShowPassword: (showPassword: boolean) => void
}

export const IconVisibility: React.FC<IconVisibilityType> = ({ showPassword, setShowPassword }) => {
  const passwordVisibilityHandler = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <img
        onClick={passwordVisibilityHandler}
        className={s.icon}
        src={showPassword ? iconVisibilityOn : iconVisibilityOff}
        alt="icon-visibility"
      />
    </div>
  )
}
