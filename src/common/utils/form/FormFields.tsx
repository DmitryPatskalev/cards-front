import React from 'react'

import { useField } from 'formik'

import { SuperCheckBox } from '../../superComponents/superCheckBox/SuperCheckBox'
import { SuperInput } from '../../superComponents/superInput/SuperInput'

import s from './FormFields.module.scss'

type InputFieldFormType = {
  children?: React.ReactNode
  label: string
  name: string
  type: string
  placeholder?: string
}

export const InputFieldForm: React.FC<InputFieldFormType> = ({ label, children, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.name} className={s.titleFieldForm}>
        {label}
      </label>
      <div className={s.inputFieldContainer}>
        <div className={s.inputFieldBlock}>
          <SuperInput className={s.inputForm} {...field} {...props} />
          {children}
        </div>
        {meta.touched && meta.error ? <div className={s.errorField}>{meta.error}</div> : null}
      </div>
    </>
  )
}

type CheckBoxFieldForm = {
  children: React.ReactNode
  type?: string
  name: string
}

// eslint-disable-next-line no-redeclare
export const CheckBoxFieldForm: React.FC<CheckBoxFieldForm> = ({ children, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label className={s.checkBoxFieldContainer}>
        <SuperCheckBox {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  )
}
type SelectFieldType = {
  children: React.ReactNode
  id?: string
  label: string
  placeholder?: string
  name: string
  type: string
}
export const SelectField: React.FC<SelectFieldType> = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  )
}
