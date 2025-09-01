import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../redux/addRecipe/operations";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(3)
    .max(64)
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]+$/, "Use only letters ")
    .required("Recipe Title"),
  description: Yup.string()
    .max(200)
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s.,!?()-]+$/, "Only text")
    .required("Add description"),
  time: Yup.number()
    .max(360)
    .typeError("Enter only number")
    .positive("Time must be greater than 0")
    .integer("Only whole numbers")
    .required("Enter the cooking time"),
  calories: Yup.number()
    .min(1)
    .max(10000)
    .typeError("Enter only number")
    .positive("Calories must be greater than 0")
    .integer("Only whole numbers")
    .required("Enter calories"),
  category: Yup.string().required("Select a category"),
  instructions: Yup.string()
    .max(1200)
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s.,!?()-]+$/, "Only text")
    .required("Enter the instruction"),
  ingredients: Yup.array().min(2, "Add at least two ingredient"),
});

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showList, setShowList] = useState(false);
  const [preview, setPreview] = useState(null);
  const [ingredientId, setIngredientId] = useState("");
  const debounceTimeout = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, ingRes] = await Promise.all([
          fetch("https://tasteoramaapi.onrender.com/api/categories"),
          fetch("https://tasteoramaapi.onrender.com/api/ingredients"),
        ]);

        const catData = await catRes.json();
        const ingData = await ingRes.json();

        setCategories(catData.data || []);
        setIngredients(ingData.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  const handleIngredientInput = (value) => {
    clearTimeout(debounceTimeout.current);
    setIngredientName(value);

    if (!value.trim()) {
      setFiltered([]);
      setShowList(false);
      return;
    }

    debounceTimeout.current = setTimeout(() => {
      const results = ingredients.filter((ing) =>
        ing.name.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
      setShowList(true);
    }, 250);
  };

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
      onSubmit={async (values, { resetForm }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "ingredients") {
            formData.append(key, JSON.stringify(values[key]));
          } else if (key === "photo" && values.photo) {
            formData.append("thumb", values.photo);
          } else {
            formData.append(key, values[key]);
          }
        });

        try {
          const result = await dispatch(addRecipe(formData)).unwrap();
          navigate(`/recipes/${result._id}`);
          resetForm();
          setPreview(null);
        } catch (err) {
          console.error("Error creating recipe:", err);
        }
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className={styles.form}>
          {/* Upload Photo */}
          <div className={styles.fieldPhoto}>
            <h3 className={styles.titleSection}>Upload photo</h3>
            <div className={styles.upload}>
              <label htmlFor="photo" className={styles.uploadLabel}>
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    loading="lazy"
                    className={styles.previewImage}
                  />
                ) : (
                  <svg className={styles.uploadImage} aria-hidden="true">
                    <use href="/icons.svg#icon-photo" />
                  </svg>
                )}
              </label>

              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  if (file) {
                    setFieldValue("photo", file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* General Information */}
          <div className={styles.fieldForm}>
            <h3 className={styles.titleSection}>General Information</h3>

            <h4 className={styles.titlePart}>Recipe Title</h4>
            <Field
              name="title"
              type="text"
              placeholder="Enter the name of your recipe"
              className={`${styles.inputTitle} ${
                errors.title && touched.title ? styles.invalid : ""
              }`}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />

            <h4 className={styles.titlePart}>Recipe Description</h4>
            <Field
              as="textarea"
              name="description"
              placeholder="Enter a brief description of your recipe"
              className={`${styles.textarea} ${
                errors.description && touched.description ? styles.invalid : ""
              }`}
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
              className={`${styles.inputTitle} ${
                errors.time && touched.time ? styles.invalid : ""
              }`}
            />
            <ErrorMessage
              name="time"
              component="div"
              className={styles.error}
            />

            <div className={styles.fieldGroup}>
              <div className={styles.fieldItem}>
                <h4 className={styles.titlePart}>Calories</h4>
                <div className={styles.inputWrapper}>
                  <Field
                    name="calories"
                    type="number"
                    placeholder="150"
                    className={`${styles.input} ${
                      errors.calories && touched.calories ? styles.invalid : ""
                    }`}
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
                  <Field
                    as="select"
                    name="category"
                    className={`${styles.input} ${
                      errors.category && touched.category ? styles.invalid : ""
                    }`}
                  >
                    <option value="">Select category</option>
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
                <div className={styles.fieldItem}>
                  <h4 className={styles.titlePart}>Name</h4>
                  <div className={styles.selectWrapper}>
                    <input
                      type="text"
                      className={`${styles.inputTitle} ${
                        errors.ingredients && touched.ingredients
                          ? styles.invalid
                          : ""
                      }`}
                      placeholder="Search ingredient..."
                      value={ingredientName}
                      onChange={(e) => handleIngredientInput(e.target.value)}
                      onFocus={() => ingredientName && setShowList(true)}
                      onBlur={() => setTimeout(() => setShowList(false), 150)}
                    />

                    {showList && filtered.length > 0 && (
                      <ul className={styles.dropdown}>
                        {filtered.map((ing) => (
                          <li
                            key={ing._id}
                            className={styles.dropdownItem}
                            onClick={() => {
                              setIngredientName(ing.name);
                              setIngredientId(ing._id);
                              setShowList(false);
                            }}
                          >
                            {ing.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className={styles.fieldItem}>
                  <h4 className={styles.titlePart}>Amount</h4>
                  <input
                    className={styles.inputTitle}
                    type="text"
                    placeholder="100g"
                    value={ingredientAmount}
                    onChange={(e) => setIngredientAmount(e.target.value)}
                  />
                </div>
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
                        id: ingredientId,
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
              className={`${styles.textarea} ${
                errors.instructions && touched.instructions
                  ? styles.invalid
                  : ""
              }`}
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
