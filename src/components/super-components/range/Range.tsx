import React from 'react'

import { Box, Slider, SliderProps } from '@mui/material'

import s from 'components/super-components/range/Range.module.scss'

export const Range: React.FC<SliderProps> = props => {
  return (
    <Box className={s.rangeBlock}>
      <Slider {...props} max={110} />
    </Box>

    // отдаём слайдеру пропсы если они есть (value например там внутри)
  )
}
