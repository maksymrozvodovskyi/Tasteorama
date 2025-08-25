import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../redux/addRecipe/operations";

// Схема валідації
const AddRecipeSchema = Yup.object().shape({
  title: Yup.string().required("Введите название рецепта"),
  description: Yup.string().required("Введите описание"),
  time: Yup.number().required("Введите время приготовления"),
  calories: Yup.string().required("Введите калории"),
  category: Yup.string().required("Выберите категорию"),
  instructions: Yup.string().required("Введите инструкцию"),
  ingredients: Yup.array().min(1, "Добавьте хотя бы один ингредиент"),
});

const AddRecipeForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        time: "",
        calories: "",
        category: "",
        instructions: "",
        ingredients: [],
        photo: null,
      }}
      validationSchema={AddRecipeSchema}
      onSubmit={(values, { resetForm }) => {
        // Створюємо FormData (якщо треба фото)
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "ingredients") {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        });

        dispatch(addRecipe(formData)); // 👈 відправляємо в Redux
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          {/* Upload Photo */}
          <div className={styles.upload}>
            <label htmlFor="photo">Upload Photo</label>
            <input
              id="photo"
              name="photo"
              type="file"
              onChange={(e) => setFieldValue("photo", e.currentTarget.files[0])}
            />
          </div>

          {/* General Information */}
          <h3>General Information</h3>
          <Field
            name="title"
            placeholder="Enter the name of your recipe"
            className={styles.input}
          />
          <ErrorMessage name="title" component="div" className={styles.error} />

          <Field
            as="textarea"
            name="description"
            placeholder="Enter a brief description"
            className={styles.textarea}
          />
          <ErrorMessage
            name="description"
            component="div"
            className={styles.error}
          />

          <Field
            name="time"
            type="number"
            placeholder="Cooking time in minutes"
            className={styles.input}
          />
          <ErrorMessage name="time" component="div" className={styles.error} />

          <Field
            name="calories"
            placeholder="Calories"
            className={styles.input}
          />
          <ErrorMessage
            name="calories"
            component="div"
            className={styles.error}
          />

          <Field as="select" name="category" className={styles.select}>
            <option value="">Select category</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            className={styles.error}
          />

          {/* Ingredients */}
          <h3>Ingredients</h3>
          <div className={styles.ingredients}>
            <input
              type="text"
              placeholder="Ingredient name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (e.target.value.trim()) {
                    setFieldValue("ingredients", [
                      ...values.ingredients,
                      e.target.value.trim(),
                    ]);
                    e.target.value = "";
                  }
                }
              }}
            />
            <ul className={styles.ingredientsList}>
              {values.ingredients.map((ing, i) => (
                <li key={i} className={styles.ingredientItem}>
                  {ing}
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "ingredients",
                        values.ingredients.filter((_, idx) => idx !== i)
                      )
                    }
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <ErrorMessage
              name="ingredients"
              component="div"
              className={styles.error}
            />
          </div>

          {/* Instructions */}
          <h3>Instructions</h3>
          <Field
            as="textarea"
            name="instructions"
            placeholder="Enter a text"
            className={styles.textarea}
          />
          <ErrorMessage
            name="instructions"
            component="div"
            className={styles.error}
          />

          {/* Submit */}
          <button type="submit" className={styles.submitBtn}>
            Publish Recipe
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
