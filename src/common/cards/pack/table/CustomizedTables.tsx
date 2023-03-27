import React from 'react'

import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { useAppSelector } from '../../../../app/store'
import learn from '../../../utils/img/learn.svg'
import pencil from '../../../utils/img/pencil-line-light.svg'
import remove from '../../../utils/img/remove.svg'
import { SubTitle } from '../../../utils/SubTitle/SubTitle'

import s from './Table.module.scss'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const CustomizedTables = () => {
  const { packs } = useAppSelector(state => state.packs)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">
              <SubTitle title="Name" />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SubTitle title="Cards" />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SubTitle title="Last Updated" />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SubTitle title="Created by" />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SubTitle title="Actions" />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.map(p => (
            <StyledTableRow key={p._id}>
              <StyledTableCell align="right">{p.name.slice(0, 20)}</StyledTableCell>
              <StyledTableCell align="right">{p.cardsCount}</StyledTableCell>
              <StyledTableCell align="right">{p.updated.slice(0, 10)}</StyledTableCell>
              <StyledTableCell align="right">{p.user_name}</StyledTableCell>
              <StyledTableCell className={s.actionsBlock}>
                <img src={learn} alt="learn" />
                <img src={pencil} alt="pencil" />
                <img src={remove} alt="remove" />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
