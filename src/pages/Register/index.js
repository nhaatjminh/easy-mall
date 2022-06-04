import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Avatar, Button, Grid, Paper, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './index.css';
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';
import logo from '../../assets/image/Logo.png';
import { AuthApi } from "../../service/api/authApi";
import { LoadingModal } from "../../component/common/LoadingModal/LoadingModal";

const Register = () => {

    //=======================STATES===========================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState({});
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
        fontSize: '13px'
    };

    //=======================FUNCTION=========================
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleOnchangeConfirm = (e) => {
        setConfirm(e.target.value);
    }
    const handleOnchangeFirstname = (e) => {
        setFirstname(e.target.value);
    }
    const handleOnchangeLastname = (e) => {
        setLastname(e.target.value);
    }
    const handleOnchangeChecked = (e) => {
        setChecked(e.target.checked);
    };

    const validate = () => {
        var err = {};
        if (password !== confirm) {
            err.confirm = "*Password does not match!"
        }
        if (password.length < 8) {
            err.password = "*Password must contain at least 8 characters!"
        }
        if (!validator.isEmail(email)) {
            err.email = "*Invalid email!"
        }
        if (firstname.length === 0 || lastname.length === 0) {
            err.name = "*You must fill in first name and last name!"
        }

        setError(err);

        return (Object.keys(err).length);
    }

    const register = () => {
        var checkValid = validate();
        if (checkValid === 0) {
            const userObj = {
                "email": email,
                "password": password,
                "fullname": firstname.trim() + ' ' + lastname.trim(),
            }

            setIsLoading(true)
            AuthApi.register(userObj)
            .then((result) => {
                if (result.statusCode === 201) {
                    navigate(`/notify/verify/${email}`)
                }
                else {
                    setError({
                        email: '* ' + result.message 
                    })
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
        }
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
                            <Typography component={'span'}><h3>Sign up</h3></Typography>
                        </Grid>
                        <TextField 
                            className="register__text-field"
                            name='email'
                            label='Email'
                            variant="outlined"
                            placeholder='Enter email'
                            fullWidth
                            value={email}
                            onChange={handleOnchangeEmail} 
                            />

                        <Typography style={errorStyle}>{error.email}</Typography>

                        <Stack className="register__text-field" direction="row" spacing={2}>
                            <TextField name='firstname' label='First Name' variant="outlined" placeholder='Enter First Name' value={firstname} fullWidth onChange={handleOnchangeFirstname} />
                            <TextField name='lastname' label='Last Name' variant="outlined" placeholder='Enter Last Name' value={lastname} fullWidth onChange={handleOnchangeLastname} />
                        </Stack>
                        <Typography style={errorStyle}>{error.name}</Typography>

                        <TextField className="register__text-field" name='password' label='Password' variant="outlined" placeholder='Enter password' type='password' value={password} fullWidth onChange={handleOnchangePassword} />
                        <Typography style={errorStyle}>{error.password}</Typography>

                        <TextField className="register__text-field" label='Confirm Password' variant="outlined" placeholder='Enter password again' type='password' value={confirm} fullWidth onChange={handleOnchangeConfirm} />
                        <Typography style={errorStyle}>{error.confirm}</Typography>

                        <FormControlLabel className='label-check-terms'
                            control={<Checkbox checked={checked} onChange={handleOnchangeChecked} style={{ color: 'black' }} />}
                            label={
                                <div>
                                    <span>I accept the </span>
                                    <Link to={'#'}>Terms of Use</Link>
                                </div>
                            }
                        />
                        <button className="btnRegister"
                            type='button'
                            onClick={register}
                            variant='contained'
                            disabled={!checked}>
                            Sign Up
                        </button>
                        <Typography style={{marginTop: '.5rem', textAlign: 'center'}}>
                            Already have an account? 
                            <Link style={{ fontWeight: 'bold', textDecoration: 'unset' }} to={'/login'}> Sign in</Link>
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

export default Register;