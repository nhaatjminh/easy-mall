import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Avatar, Button, Grid, Paper, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './index.scss';
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';
import logo from '../../assets/image/Logo.png';
import { AuthApi } from "../../service/api/authApi";
import { LoadingModal } from "../../component/common/LoadingModal/LoadingModal";

const ForgottenPassword = () => {

    //=======================STATES===========================
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [checked, setChecked] = useState(false);
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
        marginBottom: '1rem'
    };

    //=======================FUNCTION=========================
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const sendRequest = () => {
        if (!validator.isEmail(email)) {
            setError("*Invalid email!");
            return;
        }

        setIsLoading(true)
        AuthApi.requestPasswordReset(email)
        .then((res) => {
            if (res.statusCode === 200) {
                navigate(`/notify/reset-password/${email}`)
            }
            else {
                setError(res.message)
            }
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setError(err)
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
                            <Typography component={'span'}><h3>Password Reset</h3></Typography>
                        </Grid>
                        <Typography style={{ marginTop: '1rem' }}>Enter your email address</Typography>
                        <TextField
                            style={{ marginTop: '.25rem' }}
                            name='email'
                            label='Email'
                            variant="outlined"
                            placeholder='Enter email'
                            fullWidth
                            value={email}
                            onChange={handleOnchangeEmail}
                        />

                        <Typography style={errorStyle}>{error}</Typography>

                        <button className="btnRegister"
                            type='button'
                            onClick={sendRequest}
                            variant='contained'>
                            Submit
                        </button>
                        <Typography style={{marginTop: '.5rem', textAlign: 'center'}}>
                            Back to 
                            <Link style={{ fontWeight: 'bold', textDecoration: 'unset' }} to={'/login'}> sign in</Link>
                        </Typography>

                        <Grid container justifyContent="flex-end">
                            <Stack direction="row" spacing={2} mt={5}>
                                <Typography> <Link to={'#'} className="link-footer">Help</Link></Typography>
                                <div className="line"></div>
                                <Typography><Link to={'#'} className="link-footer">Terms</Link></Typography>
                            </Stack>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
            <LoadingModal show={isLoading} />
        </div>
    );
}

export default ForgottenPassword;