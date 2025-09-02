import { lazy } from "react";

const RegistrationForm = lazy(() =>
  import("../../components/RegistrationForm/RegistrationForm")
);

export default function RegisterPage() {
  return (
    <>
      <section>
        <RegistrationForm />
      </section>
    </>
  );
}
