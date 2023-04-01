import React from 'react'

import { Box, Slider, SliderProps } from '@mui/material'

import s from './Range.module.scss'

export const SuperRange: React.FC<SliderProps> = props => {
  return (
    <Box className={s.rangeBlock}>
      <Slider {...props} max={110} />
    </Box>

    // отдаём слайдеру пропсы если они есть (value например там внутри)
  )
}
