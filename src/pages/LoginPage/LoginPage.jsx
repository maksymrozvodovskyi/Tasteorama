import { LoginForm } from "../../components/LoginForm/LoginForm";
import { selectAuthIsLoading } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const isLoading = useSelector(selectAuthIsLoading);
  return <section>{isLoading ? <Loader /> : <LoginForm />}</section>;
}
