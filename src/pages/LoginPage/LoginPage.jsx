import { lazy } from "react";

const LoginForm = lazy(() => import("../../components/LoginForm/LoginForm"));

export default function LoginPage() {
  return (
    <section>
      <LoginForm />
    </section>
  );
}
