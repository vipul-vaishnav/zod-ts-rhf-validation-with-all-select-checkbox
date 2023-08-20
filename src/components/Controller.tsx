import React, { useState } from 'react'
import { Stack, Box, IconButton, FormControlLabel, Checkbox, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { DEPT_DATA } from './../utils/data'

import { IData } from '../types/IData'

type Props = IData & {
  isCollapsed: boolean
  setState: React.Dispatch<
    React.SetStateAction<
      {
        sub_departments: {
          key: string
          isChecked: boolean
        }[]
        department: string
        isCollapsed: boolean
      }[]
    >
  >
  subDeptState: {
    key: string
    isChecked: boolean
  }[]
}

const Collapsible: React.FC<Props> = (props) => {
  const { department, sub_departments, isCollapsed, setState, subDeptState } = props

  const genLabel = (arg: string) => {
    return arg
      .split('_')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ')
  }

  const handleCollapse = (dept: string) => {
    return setState((prev) => {
      return prev.map((x) => (x.department === dept ? { ...x, isCollapsed: !x.isCollapsed } : x))
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target

    return setState((prev) => {
      const dept = prev.findIndex((el) => el.department === name)

      if (dept > -1) {
        return prev.map((dept) =>
          dept.department === name
            ? {
                ...dept,
                sub_departments: dept.sub_departments.map((sub_dept) => ({
                  ...sub_dept,
                  isChecked: checked
                }))
              }
            : dept
        )
      } else {
        return prev.map((dept) =>
          dept.sub_departments.find((item) => item.key === name)
            ? {
                ...dept,
                sub_departments: dept.sub_departments.map((x) =>
                  x.key === name ? { ...x, isChecked: checked } : x
                )
              }
            : dept
        )
      }
    })
  }

  return (
    <Box>
      <Box>
        <IconButton onClick={() => handleCollapse(department)}>
          {isCollapsed ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!(subDeptState.filter((x) => !x.isChecked).length === 0)}
              name={department}
              onChange={handleChange}
            />
          }
          label={genLabel(department)}
        />
        <Typography variant="caption" color="#9e9e9e">
          ({sub_departments.length})
        </Typography>
      </Box>
      {!isCollapsed && (
        <Box sx={{ marginLeft: 8 }}>
          {sub_departments.map((item, idx) => {
            return (
              <Box key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={subDeptState.find((x) => x.key === item)?.isChecked ?? false}
                      name={item}
                      onChange={handleChange}
                    />
                  }
                  label={genLabel(item)}
                />
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

const Controller: React.FC = (): React.ReactElement => {
  const [state, setState] = useState(
    DEPT_DATA.map((item) => {
      return {
        isCollapsed: false,
        ...item,
        sub_departments: item.sub_departments.map((dept) => ({ key: dept, isChecked: false }))
      }
    })
  )

  return (
    <React.Fragment>
      <Stack spacing={2}>
        {DEPT_DATA.map((item, idx) => (
          <Collapsible
            key={idx}
            isCollapsed={state[idx].isCollapsed}
            setState={setState}
            subDeptState={state[idx].sub_departments}
            {...item}
          />
        ))}
      </Stack>
    </React.Fragment>
  )
}

export default Controller
