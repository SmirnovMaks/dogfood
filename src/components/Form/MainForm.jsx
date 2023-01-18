import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { ResetPasswordForm } from './ResetPasswordForm';

export const MainForm = ({ handleRequestLogin, handleRequestSignup }) => {
    const [formType, setFormType] = useState('login');

    if (formType === 'registration') {
        return <RegistrationForm onChangeType={setFormType} handleRequestSignup={handleRequestSignup}></RegistrationForm>;
    }

    if (formType === 'login') {
        return <LoginForm onChangeType={setFormType} handleRequestLogin={handleRequestLogin}></LoginForm>;
    }

    if (formType === 'reset') {
        return <ResetPasswordForm onChangeType={setFormType} ></ResetPasswordForm>;
    }
};

