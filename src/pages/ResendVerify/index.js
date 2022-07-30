import React, { useState } from "react";
import { Grid, Paper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import './index.scss';
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from '../../assets/image/Logo.png';
import { LoadingModal } from "../../component/common/LoadingModal/LoadingModal";
import { EmailApi } from "../../service/api/emailApi";
import Swal from "sweetalert2";

const ResendVerify = () => {

    const { state } = useLocation();

    //=======================STATES===========================
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate()
    //=======================STYLES===========================
    const paperStyle = {
        padding: 20,
        width: 400,
        display: 'block'
    }

    const errorStyle = {
        color: 'red',
        fontSize: '13px',
        marginBottom: '1rem',
        marginTop: '.5rem'
    };

    //=======================FUNCTION=========================

    const handleResendEmail = () => {
        setIsLoading(true);
        EmailApi.resendVerifyEmail(state.email)
            .then((res) => {
                if (res.statusCode === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Verify email has been sent. Please check your inbox.',
                        showConfirmButton: true,
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.message,
                    })
                    setError("* " + res.message)
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setError("* " + err)
                setIsLoading(false)
            })
    }

    return (
        <div className="bgImg">
            <div className="page-content">
                <Grid >
                    <Paper elevation={10} style={paperStyle}>
                        <Stack direction="row" spacing={2}>
                            <img
                                src={logo}
                                style={{ height: 'auto', width: '100%', cursor: 'pointer' }}
                                onClick={() => navigate('/')}
                            />
                        </Stack>
                        <Grid>
                            <div
                                style={{
                                    fontSize: 18,
                                    marginBottom: 10
                                }}
                                className="text-normal-1"
                            >
                                Your email <b>{state.email}</b> has not been verified yet. Please check your inbox.
                            </div>
                        </Grid>
                        <div
                            style={{
                                fontSize: 18,
                                marginBottom: 15
                            }}
                            className="text-normal-1"
                        >
                            If you have not recieve our mail yet, click the below button to resend verify email
                        </div>
                        {/* <Typography style={{ marginTop: '1rem' }}>Email</Typography>
                        <TextField
                            className="reset-password__textfield"
                            value={state.email}
                            onChange={() => {}}
                            variant="outlined"
                            disabled={true}
                            label={null}
                            fullWidth
                        /> */}

                        <button className="btnRegister"
                            type='button'
                            onClick={handleResendEmail}
                            variant='contained'>
                            Resend verify email
                        </button>

                        <Typography style={{marginTop: '.5rem', textAlign: 'center'}}>
                            Back to 
                            <Link style={{ fontWeight: 'bold', textDecoration: 'unset' }} to={'/login'}> sign in</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </div>
            <LoadingModal show={isLoading} />
        </div>
    );
}

export default ResendVerify;