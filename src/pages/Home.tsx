import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import styles from './styles.module.css'

import CustomInput from '../components/shared/CustomInput'

import { TSchema, schema } from '../lib/schema'

type T = {
  setUserData: React.Dispatch<React.SetStateAction<TSchema | null>>
}

const Home: React.FC<T> = (props): React.ReactElement => {
  const { setUserData } = props
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<TSchema>({
    defaultValues: {
      dob: '',
      email: '',
      firstname: '',
      lastname: '',
      phone: ''
    },
    resolver: zodResolver(schema)
  })

  const navigate = useNavigate()

  const onSubmit = async (data: TSchema) => {
    try {
      const res = await new Promise<TSchema>((res) => {
        setTimeout(() => {
          res(data)
          toast.success('Form submitted successfully')
          localStorage.setItem('groww_user', JSON.stringify(data))
        }, 3000)
      })
      setUserData(res)
      navigate('/dashboard')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      reset()
    }
  }

  return (
    <React.Fragment>
      <Box className={styles.container}>
        <Typography variant="h4" component={'h1'} sx={{ fontWeight: 700 }}>
          Form.
        </Typography>
        <Typography
          variant="subtitle1"
          component={'h2'}
          sx={{ fontWeight: 500, marginBlock: 1, color: '#868e96' }}
        >
          Enter your details to access the dashboard
        </Typography>
        <Box sx={{ marginBlock: 4 }} component="form" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            placeholder="John"
            labelText="First Name"
            id="firstname"
            type="text"
            fullWidth
            {...register('firstname')}
            errorText={errors.firstname?.message}
          />
          <CustomInput
            placeholder="Doe"
            labelText="Last Name"
            id="lastname"
            type="text"
            fullWidth
            {...register('lastname')}
            errorText={errors.lastname?.message}
          />
          <CustomInput
            placeholder="johndoe@example.com"
            labelText="Email"
            id="email"
            type="email"
            fullWidth
            {...register('email')}
            errorText={errors.email?.message}
          />
          <CustomInput
            placeholder="222-222-2222"
            labelText="Phone"
            id="phone"
            type="tel"
            fullWidth
            {...register('phone')}
            errorText={errors.phone?.message}
          />
          <CustomInput
            placeholder="23-04-2003"
            labelText="Date of birth"
            id="dob"
            type="date"
            fullWidth
            {...register('dob')}
            errorText={errors.dob?.message}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            sx={{ padding: '10px 24px' }}
            fullWidth
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}
export default Home
