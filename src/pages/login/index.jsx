import CustomLinkComponent from '@components/CustomLinkComponent'
import DarkModeToggle from '@components/DarkModeToggle'
import Page from '@components/Page'
import useLogin from '@hooks/auth/useLogin'
import useShowFile from '@hooks/file/useShowFile'
import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { authentication } from '@recoil/Authentication'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

const LoginComponent = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useRecoilState(authentication)

    const [error, setError] = useState('')
    const { mutate: getProfilePicture } = useShowFile({
        onSuccess: (res) => {
            const reader = new FileReader();
            reader.onload = function () {
              const dataURL = reader.result;
              localStorage.setItem("profile_picture", dataURL);
              setAuth({
                  auth: true,
                  user: res.value.data.user,
                  profile_picture: dataURL
              });
              navigate("/redirect", { replace: true });
            };
            reader.readAsDataURL(res.data);
        },
    });
    const { mutate: login, isLoading } = useLogin({
        onSuccess: (res) => {
            const token = res.data.access_token
            const user = res.data.user
            setAuth({
                auth: true,
                user: user,
            })
            localStorage.setItem("token", token);
            if (!!user.photo) {
                getProfilePicture({
                    file: user.photo,
                    ...res.data,
                });
                return;
            }
            navigate("/redirect", { replace: true });

        },
        onError: (err) => {
            if(err.response.status === 422){
                setError('Password/username Salah!')
            }
            if(err.response.status === 500){
                setError('Server/Jaringan Bermasalah!')
            }
            if(err.response.status === 404){
                setError('Server tidak ditemukan!')
            }
        }
    })
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        login({ formData })
    }
    return (
        <Card sx={{ p: 3, width: '100%' }}>
            <Stack spacing={3}>
                <DarkModeToggle />
                <Typography fontWeight='bold' fontSize='1.5rem' textAlign='center'>Masuk</Typography>
                <Typography fontWeight='bold' fontSize='0.9rem' textAlign='center'>Silahkan masukan informasi anda dibawah ini!</Typography>
                {error !== '' ?
                    <Alert severity='error'>
                        <AlertTitle>Failed</AlertTitle>
                        Password / username salah!
                    </Alert>
                : null
                }
                <Stack component='form' onSubmit={onSubmit} spacing={2}>
                    <TextField 
                        fullWidth
                        label='Email'
                        name='username'
                    />
                    <TextField 
                        fullWidth
                        label='Kata Sandi'
                        name='password'
                        type='password'
                    />
                    <Stack direction='row' justifyContent='end'>
                        <CustomLinkComponent url='/forgot-password' label='Lupa password ?' style={{ color: 'blue', textDecoration: 'none', textAlign: 'right', fontWeight: 'bold', fontSize: '0.8rem' }} />
                    </Stack>
                    <LoadingButton type='submit' loading={isLoading} variant='contained'>Login</LoadingButton>
                    <Button variant='outlined' onClick={() => navigate('/registration')}>Daftar</Button>
                </Stack>
            </Stack>
        </Card>
    )
}

const index = () => {
    return (
        <Page title='Login'>
            <Container>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <LoginComponent />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default index