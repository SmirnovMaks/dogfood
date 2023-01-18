import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './style.module.scss';
import cn from 'classnames';
import Button from '../Button/Button';
import { EMAIL_REGEXP, PASSWORD_REGEXP, PHRASES } from '../../utils/constants';


export const LoginForm = ({ handleRequestLogin, onChangeType }) => (
    <div className={cn(s.center)}>
        <h1>Вход</h1>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Обязательное поле'
                } else if (
                    !EMAIL_REGEXP.test(values.email)
                ) {
                    errors.email = PHRASES.incorrectEmail
                }

                if (!values.password) {
                    errors.password = 'Обязательное поле'
                } else if (
                    !PASSWORD_REGEXP.test(values.password)
                ) {
                    errors.password = PHRASES.incorrectPassword
                }

                return errors;
            }}
            onSubmit={(values) => {
                handleRequestLogin(values)

            }}
        >
            {({ isSubmitting }) => (
                <Form className={s.form}>
                    <Field type="email" placeholder='Email' name="email" className={s.input} />
                    <ErrorMessage name="email" component="div" className={s.error} />
                    <Field type="password" placeholder='Password' name="password" className={s.input} />
                    <ErrorMessage name="password" component="div" className={s.error} />
                    <Button type="submit" color='primary' >
                        Войти
                    </Button>
                </Form>
            )}
        </Formik>
        <Button color='secondary' onClick={() => onChangeType('registration')}>Регистрация</Button>
    </div>
);
