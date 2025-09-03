import { useSelector } from "react-redux";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";
import { selectAuthIsLoading } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";

export default function RegisterPage() {
  const isLoading = useSelector(selectAuthIsLoading);

  return <section>{isLoading ? <Loader /> : <RegistrationForm />}</section>;
}
