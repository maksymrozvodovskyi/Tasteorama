import css from "./LoadMoreBtn.module.css";
import { useDispatch} from "react-redux";

export default function LoadMoreBtn({ currentPage, nextPage, fetchAction }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(nextPage());
        dispatch(fetchAction(currentPage + 1));
    };
    return (
        <div className={css.container}>
            <button type="button" onClick={handleClick} className={css.btn}>Load More</button>
        </div>
    )
}