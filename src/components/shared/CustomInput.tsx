import React from 'react'
import { TextFieldProps, TextField, Box, FormLabel, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import clsx from 'clsx'

import styles from './styles.module.css'

type CustomInputProps = Omit<TextFieldProps, 'size'> & {
  labelText?: 'string' | React.ReactNode
  inputType?: 'text' | 'textarea'
  errorText?: 'string' | React.ReactNode
  id: string
}

const CustomInput: React.FC<CustomInputProps> = React.forwardRef(
  (props, ref): React.ReactElement => {
    const { inputType = 'text', id, labelText, errorText, ...restProps } = props

    return (
      <Box marginY={2.5}>
        {labelText && (
          <FormLabel className={clsx(styles.label)} htmlFor={id}>
            {labelText}
          </FormLabel>
        )}
        <TextField
          ref={ref}
          multiline={inputType === 'textarea'}
          id={id}
          size="small"
          {...restProps}
        />
        {errorText && (
          <Box className={styles.errorContainer}>
            <ErrorOutlineIcon fontSize={'small'} />
            <Typography className={styles.error}>{errorText}</Typography>
          </Box>
        )}
      </Box>
    )
  }
)
export default CustomInput
