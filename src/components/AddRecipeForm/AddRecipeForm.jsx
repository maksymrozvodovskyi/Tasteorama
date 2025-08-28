import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../redux/addRecipe/operations";
import { useState, useEffect } from "react";

// Схема валідації
const AddRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]+$/, "Use only letters ")
    .required("Recipe Title"),
  description: Yup.string()
    .min(10)
    .max(250)
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s.,!?()-]+$/, "Only text")
    .required("Add description"),
  time: Yup.number()
    .typeError("Enter only number")
    .positive("Time must be greater than 0")
    .integer("Only whole numbers")
    .required("Enter the cooking time"),
  calories: Yup.number()
    .typeError("Enter only number")
    .positive("Time must be greater than 0")
    .integer("Only whole numbers")
    .required("Enter calories"),
  category: Yup.string().required("Select a category"),
  instructions: Yup.string()
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s.,!?()-]+$/, "Only text")
    .required("Enter the instruction"),
  ingredients: Yup.array().min(1, "Add at least one ingredient"),
});

const AddRecipeForm = () => {
  const dispatch = useDispatch();

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showList, setShowList] = useState(false);
  const [preview, setPreview] = useState(null);

  // Підтягування категорій
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://tasteoramaapi.onrender.com/api/categories"
        );
        const result = await res.json();
        setCategories(result.data || []);
      } catch (err) {
        console.error("Помилка завантаження категорій:", err);
      }
    }
    fetchCategories();
  }, []);

  // Підтягування інгредієнтів
  useEffect(() => {
    async function fetchIngredients() {
      try {
        const res = await fetch(
          "https://tasteoramaapi.onrender.com/api/ingredients"
        );
        const result = await res.json();
        setIngredients(result.data || []);
      } catch (err) {
        console.error("Error loading ingredients:", err);
      }
    }
    fetchIngredients();
  }, []);

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
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "ingredients") {
            formData.append(key, JSON.stringify(values[key]));
          } else if (key === "photo") {
            if (values.photo) {
              formData.append("photo", values.photo);
            }
          } else {
            formData.append(key, values[key]);
          }
        });

        dispatch(addRecipe(formData));
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          {/* Upload Photo */}
          <h3 className={styles.titleSection}>Upload photo</h3>
          <div className={styles.upload}>
            <label htmlFor="photo" className={styles.uploadLabel}>
              <svg
                width="52"
                height="52"
                className={styles.uploadImage}
                aria-hidden="true"
              >
                <use href="/icons.svg#icon-photo" />
              </svg>
            </label>
            <input
              className={styles.inputPhoto}
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                if (file) {
                  setFieldValue("photo", file); // додаємо у Formik
                  setPreview(URL.createObjectURL(file)); // робимо превʼю
                }
              }}
            />
            {preview && (
              <div className={styles.previewWrapper}>
                <img
                  src={preview}
                  alt="Preview"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>

          {/* General Information */}
          <h3 className={styles.titleSection}>General Information</h3>
          <h4 className={styles.titlePart}>Recipe Title</h4>
          <Field
            name="title"
            type="text"
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
            placeholder="10"
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
                  placeholder="150"
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
              <div className={styles.selectWrapper}>
                <Field as="select" name="category" className={styles.input}>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
              </div>

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
            <div className={styles.inputsRow}>
              <h4 className={styles.titlePart}>Name</h4>
              <div className={styles.selectWrapper}>
                <input
                  type="text"
                  className={styles.inputTitle}
                  placeholder="Search ingredient..."
                  value={ingredientName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setIngredientName(value);

                    // показати фільтрований список
                    if (value.trim().length > 0) {
                      const results = ingredients.filter((ing) =>
                        ing.name.toLowerCase().includes(value.toLowerCase())
                      );
                      setFiltered(results);
                      setShowList(true);
                    } else {
                      setFiltered([]);
                      setShowList(false);
                    }
                  }}
                  onFocus={() => {
                    if (ingredientName.trim().length > 0) setShowList(true);
                  }}
                  onBlur={() => {
                    // невелика затримка щоб встигти клікнути по елементу
                    setTimeout(() => setShowList(false), 250);
                  }}
                />

                {showList && filtered.length > 0 && (
                  <ul className={styles.dropdown}>
                    {filtered.map((ing) => (
                      <li
                        key={ing._id}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setIngredientName(ing.name);
                          setShowList(false);
                        }}
                      >
                        {ing.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <h4 className={styles.titlePart}>Amount</h4>
              <input
                className={styles.inputTitle}
                type="text"
                placeholder="100g"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(e.target.value)}
              />
            </div>

            <button
              type="button"
              className={styles.addBtn}
              onClick={() => {
                if (ingredientName.trim() && ingredientAmount.trim()) {
                  setFieldValue("ingredients", [
                    ...values.ingredients,
                    {
                      name: ingredientName.trim(),
                      amount: ingredientAmount.trim(),
                    },
                  ]);
                  setIngredientName("");
                  setIngredientAmount("");
                }
              }}
            >
              Add new Ingredient
            </button>

            {values.ingredients.length > 0 && (
              <table className={styles.ingredientsTable}>
                <thead>
                  <tr>
                    <th>Name:</th>
                    <th>Amount:</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {values.ingredients.map((ing, i) => (
                    <tr key={i}>
                      <td>{ing.name}</td>
                      <td>{ing.amount}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              "ingredients",
                              values.ingredients.filter((_, idx) => idx !== i)
                            )
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            className={styles.uploadImage}
                            aria-hidden="true"
                          >
                            <use href="/icons.svg#icon-delete" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

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
