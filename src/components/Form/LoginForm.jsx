import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './style.module.scss';
import cn from 'classnames';
import { EMAIL_REGEXP, PHRASES } from '../../utils/constants';
import { CustomButton } from '../Button/CustomButton';


export const LoginForm = ({ handleRequestLogin, onChangeType }) => (
    <div className={cn(s.center)}>
        <h1>Вход</h1>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = PHRASES.required
                } else if (
                    !EMAIL_REGEXP.test(values.email)
                ) {
                    errors.email = PHRASES.incorrectEmail
                }

                if (!values.password) {
                    errors.password = PHRASES.required
                }
                return errors;
            }}
            onSubmit={(values) => {
                handleRequestLogin(values)

            }}
        >
            {() => (
                <Form className={s.form}>
                    <Field type="email" placeholder='Email' name="email" className={s.input} ></Field>
                    <ErrorMessage name="email" component="div" className={s.error} />
                    <Field type="password" placeholder='Password' name="password" className={s.input} />
                    <ErrorMessage name="password" component="div" className={s.error} />
                    <CustomButton variant="contained" type="submit" color='primary' >
                        Войти
                    </CustomButton>
                </Form>
            )}
        </Formik>
        <CustomButton variant="outlined" color='secondary' onClick={() => onChangeType('registration')}>Регистрация</CustomButton>
    </div>
);
