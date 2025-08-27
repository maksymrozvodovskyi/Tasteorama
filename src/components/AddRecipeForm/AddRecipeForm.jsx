import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../redux/addRecipe/operations";

// Схема валідації
const AddRecipeSchema = Yup.object().shape({
  title: Yup.string().min(3).max(30).required("Recipe Title"),
  description: Yup.string().min(10).max(250).required("Add description"),
  time: Yup.number().required("Enter the cooking time"),
  calories: Yup.string().required("Enter callories"),
  category: Yup.string().required("Select a category"),
  instructions: Yup.string().required("Enter the instruction"),
  ingredients: Yup.array().min(1, "Add at least one ingredient"),
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

        dispatch(addRecipe(formData)); // відправляємо в Redux
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          {/* Upload Photo */}
          <h3 className={styles.titleSection}>Upload photo</h3>
          <div className={styles.upload}>
            <label htmlFor="photo" className={styles.uploadLabel}>
              <img
                src="/src/assets/icons/photo.svg"
                alt="Upload"
                className={styles.uploadImage}
              />
            </label>
            <input
              className={styles.inputPhoto}
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setFieldValue("photo", e.currentTarget.files[0])}
            />
          </div>

          {/* General Information */}
          <h3 className={styles.titleSection}>General Information</h3>
          <h4 className={styles.titlePart}>Recipe Title</h4>
          <Field
            name="title"
            type="input"
            placeholder="Enter the name of your recipe"
            className={styles.inputTitle}
          />
          <ErrorMessage name="title" component="div" className={styles.error} />
          <h4 className={styles.titlePart}>Recipe Description</h4>
          <Field
            as="textarea"
            name="description"
            placeholder="Enter a brief description of your recipe"
            className={styles.textarea}
          />
          <ErrorMessage
            name="description"
            component="div"
            className={styles.error}
          />

          <h4 className={styles.titlePart}>Cooking time in minutes</h4>
          <Field
            name="time"
            type="number"
            placeholder="Cooking time in minutes"
            className={styles.inputTitle}
          />
          <ErrorMessage name="time" component="div" className={styles.error} />

          <div className={styles.fieldGroup}>
            <div className={styles.fieldItem}>
              <h4 className={styles.titlePart}>Calories</h4>
              <div className={styles.inputWrapper}>
                <Field
                  name="calories"
                  type="number"
                  placeholder="150 cals"
                  className={styles.input}
                />
              </div>
              <ErrorMessage
                name="calories"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.fieldItem}>
              <h4 className={styles.titlePart}>Category</h4>
              <Field as="select" name="category" className={styles.input}>
                <option value="option1">Option1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
                <option value="option5">Option 5</option>
                <option value="option6">Option 6</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className={styles.error}
              />
            </div>
          </div>

          {/* Ingredients */}
          <h3 className={styles.titleSection}>Ingredients</h3>
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
          <h3 className={styles.titleSection}>Instructions</h3>
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
