import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn(/*{clickHandle}*/) {
    return (
        <div className={css.container}>
            <button type="button" /*onClick={clickHandle}*/ className={css.btn}>Load More</button>
        </div>
    )
}