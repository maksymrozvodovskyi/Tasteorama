import { useDispatch, useSelector } from "react-redux";
import { selectTitle } from "../../redux/filters/selectors";

const Filters = () => {
  const title = useSelector(selectTitle);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Title: {title}</p>
    </div>
  );
};

export default Filters;
