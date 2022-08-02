import React, { useEffect, useState } from "react";
import { HeaderAccount } from "../../component/HeaderAccount/HeaderAccount";
import './index.scss'
import { BlankCard } from './../../component/common/BlankCard/BlankCard';
import { Button, Modal } from "react-bootstrap";
import { CustomInput } from './../../component/common/CustomInput/CustomInput';
import TextField from '@mui/material/TextField';
import { CustomButton } from './../../component/common/CustomButton/CustomButton';
import { useDispatch, useSelector } from "react-redux";
import { doGetUserInfo, doUpdateUserInfo } from './../../redux/slice/userSlice';
import Swal from "sweetalert2";
import { LoadingModal } from './../../component/common/LoadingModal/LoadingModal';
import { removeSpace } from "../../helpers/common";
import { CustomCard } from './../../component/common/CustomCard/CustomCard';
import { DangerIcon } from "../../assets/icon/svg/DangerIcon";
import { UserApi } from "../../service/api/userApi";
import { BackIcon } from "../../assets/icon/svg/BackIcon";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/image/user.png"
import { TextError } from './../../component/common/TextError/TextError';

export const Profile = () => {
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmNewPw, setConfirmNewPw] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const { fullname } = useSelector((state) => state.user.info);

    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        dispatch(doGetUserInfo())
            .then((res) => {
                const info = res.payload
                const name = info.fullname;
                setFirstname(name.substring(0, name.indexOf(' ')))
                setLastname(name.substring(name.indexOf(' ') + 1))
                setEmail(info.email)
                setPhone(info.phone)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])

    const handleCloseModal = () => {
        setCurrentPw('')
        setNewPw('')
        setConfirmNewPw('')
        setError('')
        setShowModal(false)
    }

    const handleUpdateInfo = () => {
        if (!firstname || !lastname) {
            setNameError('Name is required')
            return
        }
        setNameError('')
        setIsLoading(true)
        dispatch(doUpdateUserInfo({
            fullname: removeSpace(firstname) + ' ' + removeSpace(lastname),
            phone: phone ? removeSpace(phone) : ''
        }))
            .then(() => {
                setIsLoading(false);
                setFirstname((firstname) => removeSpace(firstname))
                setLastname((lastname) => removeSpace(lastname))
                setPhone((phone) => removeSpace(phone))
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Profile updated!',
                })
            })
    }

    const handleChangePassword = () => {
        if (newPw.length < 8) {
            setError('Password must contain at least 8 characters.')
            return
        }
        if (newPw !== confirmNewPw) {
            setError('Password confirmation does not match.')
            return
        }
        UserApi.changePassword({ currentPassword: currentPw, newPassword: newPw })
            .then((res) => {
                if (res.statusCode === 200) {
                    handleCloseModal()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Change password successfully!',
                    })
                }
                else {
                    setError(res.message)
                }
            })
    }

    return (
        <div className="blank-layout">
            <HeaderAccount name={fullname} />

            <div className="profile">
                <div className="profile__title text-title-1">
                    <span className="profile__title__back-btn" onClick={() => navigate(-1)}>
                        <BackIcon />
                    </span>
                    Profile
                </div>
                <div className="profile__detail">
                    <div className="text-title-2">Details</div>

                    <BlankCard className='profile__detail__card'>
                        <div className="profile__detail__card--avatar">
                            <img className="profile__detail__card--avatar__img" src={userIcon} />
                            {/* <Button className="btn-success">+</Button>
                            <Button className="btn-danger">-</Button> */}
                            <Button
                                className="profile__detail__card--avatar__save btn-success"
                                onClick={handleUpdateInfo}
                            >
                                Save
                            </Button>
                        </div>
                        <div className="profile__detail__card--info">
                            <div className="profile__detail__card--info__item">
                                <div className="text-normal-1">First name</div>
                                <CustomInput
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div className="profile__detail__card--info__item">
                                <div className="text-normal-1">Last name</div>
                                <CustomInput
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>
                        {nameError &&
                            <TextError>{nameError}</TextError>}
                        <div className="profile__detail__card--info">
                            <div className="profile__detail__card--info__item">
                                <div className="text-normal-1">Email</div>
                                <div className="text-normal-2">{email}</div>
                            </div>
                            <div className="profile__detail__card--info__item">
                                <div className="text-normal-1">{`Phone (optional)`}</div>
                                <CustomInput
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                        </div>
                    </BlankCard>
                </div>

                <div className="profile__password">
                    <div className="text-title-2">Password</div>
                    <BlankCard className="profile__password--card">
                        <div className="text-normal-1">You should use a strong password that you don't use anywhere else</div>
                        <Button
                            className="btn btn-secondary"
                            onClick={() => setShowModal(true)}
                        >
                            Change your password
                        </Button>
                    </BlankCard>
                </div>

                <Modal className="profile__change-pw-modal" centered show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <div className="text-title-1">Change your password</div>
                    </Modal.Header>
                    <Modal.Body>
                        {error === '' ? null :
                            <CustomCard className="profile__change-pw-modal--error">
                                <DangerIcon />
                                <span className="text-normal-1">{error}</span>
                            </CustomCard>
                        }
                        <div className="profile__change-pw-modal__text-field">
                            <div className="text-normal-1">Current password</div>
                            <TextField
                                value={currentPw}
                                onChange={(e) => setCurrentPw(e.target.value)}
                                variant="outlined"
                                type='password'
                                label={null}
                                fullWidth
                            />
                            <div className="text-link">Forgot password?</div>
                        </div>
                        <div className="profile__change-pw-modal__text-field">
                            <div className="text-normal-1">New password</div>
                            <TextField
                                value={newPw}
                                onChange={(e) => setNewPw(e.target.value)}
                                variant="outlined"
                                type='password'
                                label={null}
                                fullWidth
                            />
                        </div>
                        <div className="text-normal-2">Your password must be at least 8 characters.</div>
                        <div className="profile__change-pw-modal__text-field">
                            <div className="text-normal-1">Confirm new password</div>
                            <TextField
                                value={confirmNewPw}
                                onChange={(e) => setConfirmNewPw(e.target.value)}
                                variant="outlined"
                                type='password'
                                label={null}
                                fullWidth
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton
                            content='Change password'
                            onClick={handleChangePassword}
                        />
                    </Modal.Footer>
                </Modal>
            </div>

            <LoadingModal show={isLoading} />
        </div>
    )
}