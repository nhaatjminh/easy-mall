import React from "react";
import './index.scss';
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../../component/common/CustomButton/CustomButton";
import { CustomCard } from "../../component/common/CustomCard/CustomCard";

const content = {
    'verify': {
        title: "Account Confimation",
        content: "An email with your account confirmation link has been sent to your email: ",
        remind: "Check your email and come back to proceed!"
    },
    'reset-password': {
        title: "Password Reset",
        content: "An email with a password reset link has been sent to your email: ",
        remind: "Check your email and click on the link to proceed!"
    },
    'password-reseted': {
        title: "Password Reset",
        content: "Your password has been reseted successfully.",
        remind: "You may now login!"
    }
}

const Notify = () => {

    let navigate = useNavigate();
    const { type, email } = useParams();

    return (

        <div className="bgImg">
            <div className="page-content">
                <CustomCard className="email-sent">
                    <div className="email-sent__title">{content[type].title}</div>
                    <div className="email-sent__content text-normal">{content[type].content}<b>{email}</b></div>
                    <div className="email-sent__remind text-normal">{content[type].remind}</div>
                    {type === "reset-password" ? 
                        <CustomButton
                            className='email-sent__proceed'
                            content='Back to login'
                            onClick={() => navigate(`/login`)}
                        /> :
                     type === "password-reseted" ?
                        <CustomButton
                            className='email-sent__proceed'
                            content='Login'
                            onClick={() => navigate(`/login`)}
                        /> :
                        <CustomButton
                            className='email-sent__proceed'
                            content='Proceed'
                            onClick={() => navigate(`/login?email=${email}`)}
                        />
                    }
                </CustomCard>
            </div>
        </div>
    );
}

export default Notify;