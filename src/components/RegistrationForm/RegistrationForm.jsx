import css from "./RegistrationForm.module.css";
import style from "../../styles/container.module.css";
import { initialValues, registerSchema } from "../../formSchema";
import { registerUserThunk, loginUserThunk } from "../../redux/auth/operations";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import eyeOpenSvg from "../../assets/icons/eye.svg";
import eyeClosedSvg from "../../assets/icons/eye-crossed.svg";

const PasswordField = ({ field, form }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.passwordWrapper}>
      <input
        {...field}
        type={showPassword ? "text" : "password"}
        placeholder={
          field.name === "password"
            ? "Enter your password"
            : "Confirm your password"
        }
        className={css.input}
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
      console.log("Submitting", values);
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
      // console.error("Registration error:", error.response.data.data.message);
      // if (error.status === 409) {
      //   toast.error("Already in use");
      // } else
        toast.error(error.response.data.data.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={css.formContainer}>
        <h2 className={css.title}>Register</h2>
        <p className={css.subtitle}>
          Join our community of culinary enthusiasts, save your favorite
          recipes, and share your cooking creations
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
                <Field
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className={css.input}
                  autoComplete="off"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.fieldGroup}>
                <label htmlFor="email" className={css.label}>
                  Enter your email address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={css.input}
                  autoComplete="off"
                />
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
                Register
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
    </div>
  );
};
