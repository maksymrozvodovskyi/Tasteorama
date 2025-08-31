import css from "./Loader.module.css";
import { HashLoader } from "react-spinners";

export default function Loader({ size = "default" }) {
  return (
    <div className={`${css.loader} ${css[size]}`}>
      <HashLoader color="#9b6c43" size={size === "small" ? 20 : 120} />
    </div>
  );
}
