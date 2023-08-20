import React from 'react'
import { Box, Typography, Button } from '@mui/material'

import styles from './styles.module.css'

import { TSchema } from '../lib/schema'

type HeaderProps = {
  user: TSchema | null
  handleLogout: () => void
}

const Header: React.FC<HeaderProps> = (props): React.ReactElement => {
  const { user, handleLogout } = props

  return (
    <Box className={styles.headerContainer}>
      <Typography className={styles.logo}>Groww.</Typography>
      {user && (
        <Box display={'flex'} alignItems={'center'} sx={{ gap: 4 }}>
          <Typography>{user.firstname + ' ' + user.lastname}</Typography>
          <Button
            onClick={handleLogout}
            variant="outlined"
            sx={{ color: '#fff', borderColor: '#fff' }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  )
}
export default Header
