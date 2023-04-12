import React, { FC, ReactNode } from 'react'

import { SuperModal } from 'components/super-components/modal/SuperModal'

type ModalWindowPropsType = {
  open: boolean
  setOpen: (open: boolean) => void
  width: number
  height: number
  children?: ReactNode
}

export const ModalWindow: FC<ModalWindowPropsType> = ({
  open,
  setOpen,
  children,
  width,
  height,
}) => {
  return (
    <div>
      <SuperModal
        width={width}
        height={300}
        show={open}
        enableBackground={true}
        backgroundOnClick={() => setOpen(false)}
      >
        {children}
      </SuperModal>
    </div>
  )
}
