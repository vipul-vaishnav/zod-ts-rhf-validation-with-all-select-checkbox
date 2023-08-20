import { Box, IconButton, FormControlLabel, Checkbox, Typography } from '@mui/material'
import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const ControllerLite: React.FC = () => {
  const data = {
    department: 'business_services',
    sub_departments: [
      'accounting_&_accounting_services',
      'auctions',
      'career_planning',
      'career',
      'commercial_printing',
      'debt_collection'
    ]
  }

  const [collapsed, setCollapsed] = React.useState(false)
  const [state, setState] = React.useState(
    data.sub_departments.map((item) => ({ key: item, isChecked: false }))
  )

  const genLabel = (arg: string) => {
    return arg
      .split('_')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    setState((prev) => {
      if (name === data.department) {
        return prev.map((item) => ({ ...item, isChecked: checked }))
      } else {
        return prev.map((item) => (item.key === name ? { ...item, isChecked: checked } : item))
      }
    })
  }

  return (
    <Box>
      <Box>
        <IconButton onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!(state.filter((item) => !item.isChecked).length === 0)}
              name={data.department}
              onChange={handleChange}
            />
          }
          label={genLabel(data.department)}
        />
        <Typography variant="caption" color="#9f9f9f">
          ({data.sub_departments.length})
        </Typography>
      </Box>
      {!collapsed && (
        <Box sx={{ marginLeft: 8 }}>
          {data.sub_departments.map((item, idx) => {
            return (
              <Box key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.find((x) => x.key === item)?.isChecked ?? false}
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
export default ControllerLite
