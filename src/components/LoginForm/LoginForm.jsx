import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";
import { useState } from "react";
import eyeOpenSvg from "../../assets/Icons/eye.svg";
import eyeClosedSvg from "../../assets/Icons/eye-crossed.svg";
import { loginUserThunk, fetchCurrentUser } from "../../redux/auth/operations";
import { loginSchema } from "../../formSchema";

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
        placeholder="*********"
        className={`${css.input} ${
          meta.touched && meta.error ? css.inputError : ""
        }`}
        value={field.value}
        onChange={(evt) => form.setFieldValue(field.name, evt.target.value)}
        autoComplete="off"
      />
      <span
        className={css.toggleIcon}
        onClick={togglePasswordVisibility}
        role="button"
        tabIndex={0}
        onKeyDown={(evt) => evt.key === "Enter" && togglePasswordVisibility()}
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

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      await dispatch(loginUserThunk({ email, password })).unwrap();
      toast.success("Login successful!");

      await dispatch(fetchCurrentUser()).unwrap();

      navigate("/");
    } catch {
      toast.error("Incorrect email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={css.form}>
            {isSubmitting && <div className={css.loader}></div>}

            <div className={`${css.fieldGroup} ${css.mb}`}>
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
                Enter your password
              </label>
              <Field name="password" component={PasswordField} />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              className={css.button}
              disabled={isSubmitting || !isValid}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>

      <div className={css.registerwrapp}>
        <p className={css.registerwrapp_text}>Don't have an account?</p>
        <Link to="/register" className={css.registerwrapp_link}>
          Register
        </Link>
      </div>
    </div>
  );
};
