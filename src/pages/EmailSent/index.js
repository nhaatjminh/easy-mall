import React from "react";
import './index.scss';
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../../component/common/CustomButton/CustomButton";
import { CustomCard } from "../../component/common/CustomCard/CustomCard";

const EmailSent = () => {

    let navigate = useNavigate();
    const { email } = useParams();

    return (

        <div className="bgImg">
            <div className="page-content">
                <CustomCard className="email-sent">
                    <div className="email-sent__title">Account Confimation</div>
                    <div className="email-sent__content text-normal">An email with your account confirmation link has been sent to your email: <b>{email}</b></div>
                    <div className="email-sent__remind text-normal">Check your email and come back to proceed!</div>
                    <CustomButton 
                        className='email-sent__proceed'
                        content='Proceed'
                        onClick={() => navigate(`/login?email=${email}`)}
                    />
                </CustomCard>
            </div>
        </div>
    );
}

export default EmailSent;