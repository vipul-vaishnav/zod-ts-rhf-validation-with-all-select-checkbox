import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Divider, Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

import { getPosts } from '../utils/api'

import { IPost } from '../types/IPost'

import Controller from '../components/Controller'
import ControllerLite from '../components/ControllerLite'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const Dashboard: React.FC = (): React.ReactElement => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts<IPost[]>(POSTS_URL)
  })

  const rows: GridRowsProp = data || []

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'S.no.', width: 180 },
    { field: 'userId', headerName: 'User Id', headerAlign: 'left', width: 180 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 600 }
  ]

  if (isError) {
    return <>Something went wrong...</>
  }

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6" margin={4}>
          Component 1
        </Typography>

        <Box sx={{ margin: 4 }}>
          <Box sx={{ maxWidth: 1200, height: 630, mx: 'auto' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={isLoading}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" margin={4}>
          Component 2 (left one is built using single item and right one is built using array of
          items)
        </Typography>
        <Box sx={{ margin: 4 }}>
          <Box
            sx={{
              maxWidth: 1200,
              height: 630,
              mx: 'auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr'
            }}
          >
            <ControllerLite />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Divider orientation="vertical" />
            </Box>
            <Controller />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
export default Dashboard
