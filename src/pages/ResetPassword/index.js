import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Avatar, Button, Grid, Paper, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './index.scss';
import { Link, useNavigate, useParams } from "react-router-dom";
import validator from 'validator';
import logo from '../../assets/image/Logo.png';
import { AuthApi } from "../../service/api/authApi";
import { LoadingModal } from "../../component/common/LoadingModal/LoadingModal";

const ResetPassword = () => {

    const { userId, resetString } = useParams();

    //=======================STATES===========================
    const [newPw, setNewPw] = useState('');
    const [confirmNewPw, setConfirmNewPw] = useState('');
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

    const handleResetPassword = () => {
        if (newPw.length < 8) {
            setError('* Password must contain at least 8 characters.')
            return
        }
        if (newPw !== confirmNewPw) {
            setError('* Password confirmation does not match.')
            return
        }
        setIsLoading(true);
        AuthApi.resetPassword({ user_id: userId, reset_string: resetString, new_password: newPw })
            .then((res) => {
                if (res.statusCode === 200) {
                    navigate(`/notify/password-reseted`)
                }
                else {
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
                            <Typography component={'span'}><h3>Password Reset</h3></Typography>
                        </Grid>
                        <Typography style={{ marginTop: '1rem' }}>New Password</Typography>
                        <TextField
                            className="reset-password__textfield"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            variant="outlined"
                            type='password'
                            label={null}
                            fullWidth
                        />
                        <Typography style={{ marginTop: '1rem' }}>Confirm New Password</Typography>
                        <TextField
                            className="reset-password__textfield"
                            value={confirmNewPw}
                            onChange={(e) => setConfirmNewPw(e.target.value)}
                            variant="outlined"
                            type='password'
                            label={null}
                            fullWidth
                        />

                        <Typography style={errorStyle}>{error}</Typography>

                        <button className="btnRegister"
                            type='button'
                            onClick={handleResetPassword}
                            variant='contained'>
                            Submit
                        </button>
                    </Paper>
                </Grid>
            </div>
            <LoadingModal show={isLoading} />
        </div>
    );
}

export default ResetPassword;