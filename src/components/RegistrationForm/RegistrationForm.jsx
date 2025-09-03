import css from "./RegistrationForm.module.css";
import { initialValues, registerSchema } from "../../formSchema";
import { registerUserThunk, loginUserThunk } from "../../redux/auth/operations";

import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import eyeOpenSvg from "../../assets/Icons/eye.svg";
import eyeClosedSvg from "../../assets/Icons/eye-crossed.svg";

const PasswordField = ({ field, form }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [, meta] = useField(field.name);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.passwordWrapper}>
      <input
        {...field}
        type={showPassword ? "text" : "password"}
        placeholder={"*********"}
        className={`${css.input} ${
          meta.touched && meta.error ? css.inputError : ""
        }`}
        value={field.value}
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        autoComplete="off"
      />
      <span
        className={css.toggleIcon}
        onClick={togglePasswordVisibility}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && togglePasswordVisibility()}
      >
        <img
          src={showPassword ? eyeOpenSvg : eyeClosedSvg}
          alt={showPassword ? "Hide password" : "Show password"}
          loading="lazy"
          width="24"
          height="24"
        />
      </span>
    </div>
  );
};

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        registerUserThunk({
          name: values.name.trim(),
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      toast.success("Registration successful!");

      await dispatch(
        loginUserThunk({ email: values.email, password: values.password })
      ).unwrap();
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.data.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Register</h2>
      <p className={css.subtitle}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={css.form}>
            {isSubmitting && <div className={css.loader}>Loading...</div>}
            <div className={css.fieldGroup}>
              <label htmlFor="name" className={css.label}>
                Enter your name
              </label>
              <Field name="name">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="name"
                    placeholder="Max"
                    className={`${css.input} ${
                      meta.touched && meta.error ? css.inputError : ""
                    }`}
                    autoComplete="off"
                  />
                )}
              </Field>
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
            <div className={css.fieldGroup}>
              <label htmlFor="email" className={css.label}>
                Enter your email address
              </label>
              <Field name="email">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="email@gmail.com"
                    className={`${css.input} ${
                      meta.touched && meta.error ? css.inputError : ""
                    }`}
                    autoComplete="off"
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup}>
              <label htmlFor="password" className={css.label}>
                Create a strong password
              </label>
              <Field name="password" component={PasswordField} />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.fieldGroup}>
              <label htmlFor="confirmPassword" className={css.label}>
                Repeat your password
              </label>
              <Field name="confirmPassword" component={PasswordField} />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={css.button}
            >
              Create account
            </button>
          </Form>
        )}
      </Formik>
      <div className={css.registerwrapp}>
        <p className={css.registerwrapp_text}>Already have an account?</p>
        <Link to="/login" className={css.registerwrapp_link}>
          Log in
        </Link>
      </div>
    </div>
  );
};
