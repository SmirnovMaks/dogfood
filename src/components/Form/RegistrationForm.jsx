import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './style.module.scss';
import cn from 'classnames';
import Button from '../Button/Button';
import { EMAIL_REGEXP, PASSWORD_REGEXP, PHRASES } from '../../utils/constants';

export const RegistrationForm = ({ onChangeType, handleRequestSignup }) => (
    <div className={cn(s.center)}>
        <h1>Регистрация</h1>
        <Formik
            initialValues={{ email: '', group: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Обязательное поле'
                } else if (
                    !EMAIL_REGEXP.test(values.email)
                ) {
                    errors.email = PHRASES.incorrectEmail
                }

                if (!values.group) {
                    errors.group = 'Обязательное поле'
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
                handleRequestSignup(values)
                onChangeType('login')
            }}
        >
            {({ isSubmitting }) => (
                <Form className={s.form}>
                    <Field type="email" placeholder='email' name="email" className={s.input} />
                    <ErrorMessage name="email" component="div" className={s.error} />
                    <Field type="text" placeholder='group-8' name="group" className={s.input} />
                    <ErrorMessage name="group" component="div" className={s.error} />
                    <Field type="password" placeholder='password' name="password" className={s.input} />
                    <ErrorMessage name="password" component="div" className={s.error} />
                    <Button type="submit" color='primary' >
                        Зарегистрироваться
                    </Button>
                </Form>
            )}
        </Formik>
        <Button color='secondary' onClick={() => onChangeType('login')}>Войти</Button>
    </div>
);

