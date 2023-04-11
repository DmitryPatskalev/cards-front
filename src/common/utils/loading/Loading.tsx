import React from 'react'

import { CircularProgress } from '@mui/material'

import s from './Loading.module.scss'

type LoadingPropsType = {
  size?: number
  className?: React.ReactNode
}
export const Loading: React.FC<LoadingPropsType> = ({ size }) => {
  return (
    <div className={s.circularProgress}>
      <CircularProgress size={size} />
    </div>
  )
}
