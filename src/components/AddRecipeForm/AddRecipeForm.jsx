import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../redux/addRecipe/operations";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const AddRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(3)
    .max(64)
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]+$/, "Use only letters")
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

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    padding: "12px",
    border: state.isFocused ? "1.5px solid #9b6c43" : "1px solid #d9d9d9",
    borderRadius: "8px",
    fontWeight: 400,
    boxSizing: "border-box",
    cursor: "pointer",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "16px",
    lineHeight: 1.55,
    color: "#000",
    background: "#fff",
    outline: "none !important",
    boxShadow: state.isFocused ? "0 0 0 4px rgba(78, 70, 180, 0.2)" : "none",

    "&:hover": {
      borderColor: state.isFocused ? "#9b6c43" : "#999",
    },
    minHeight: "unset",
    height: "auto",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "auto",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    padding: "8px",
    boxShadow:
      "0 0 1px 0 rgba(0, 0, 0, 0.4), 0 8px 24px -6px rgba(0, 0, 0, 0.16)",
    background: "#fff",
    marginTop: "4px",
  }),
  option: (provided, state) => ({
    ...provided,
    padding: "10px 12px",
    borderRadius: "4px",
    backgroundColor: state.isFocused ? "#f5f5f5" : "#fff",
    color: "#000",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#e6e6e6",
    },
  }),
};

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [preview, setPreview] = useState(null);
  const [ingredientId] = useState("");

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
        selectedIngredient: "",
        ingredients: [],
        thumb: null,
      }}
      validationSchema={AddRecipeSchema}
      onSubmit={async (values, { resetForm }) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key === "ingredients") {
            formData.append(key, JSON.stringify(values[key]));
          } else if (key === "photo") {
            if (values.photo) {
              formData.append("thumb", values.photo);
            }
          } else {
            formData.append(key, values[key]);
          }
        });

        try {
          const result = await dispatch(addRecipe(formData)).unwrap();
          const recipeId = result._id;
          navigate(`/recipes/${recipeId}`);
          resetForm();
        } catch (error) {
          console.error("Помилка створення рецепта:", error);
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
                className={styles.inputPhoto}
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

            {/* Recipe Title */}
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

            {/* Recipe Description */}
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

            {/* Cooking Time */}
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
              {/* Calories */}
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

              {/* Category */}
              <div className={styles.fieldItem}>
                <h4 className={styles.titlePart}>Category</h4>
                <div className={styles.selectWrapper}>
                  <Select
                    name="category"
                    components={animatedComponents}
                    options={categories
                      .slice()
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((cat) => ({
                        value: cat.name,
                        label: cat.name,
                      }))}
                    value={
                      categories
                        .map((cat) => ({ value: cat.name, label: cat.name }))
                        .find((option) => option.value === values.category) ||
                      null
                    }
                    onChange={(option) =>
                      setFieldValue("category", option ? option.value : "")
                    }
                    placeholder="Category"
                    isClearable
                    styles={{
                      ...customSelectStyles,
                      control: (provided, state) => ({
                        ...customSelectStyles.control(provided, state),
                        borderColor:
                          errors.category && touched.category
                            ? "red"
                            : provided.borderColor,
                        boxShadow:
                          errors.category && touched.category
                            ? "0 0 0 1px red"
                            : provided.boxShadow,
                        "&:hover": {
                          borderColor:
                            errors.category && touched.category
                              ? "red"
                              : provided.borderColor,
                        },
                      }),
                    }}
                  />
                </div>
                {errors.category && touched.category && (
                  <div className={styles.error}>{errors.category}</div>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <h3 className={styles.titleSection}>Ingredients</h3>
            <div className={styles.ingredients}>
              <div className={styles.inputsRow}>
                {/* Ingredient Name */}
                <div className={styles.fieldItem}>
                  <h4 className={styles.titlePart}>Name</h4>
                  <div className={styles.selectWrapper}>
                    <Select
                      name="selectedIngredient"
                      components={animatedComponents}
                      options={ingredients
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((ing) => ({
                          value: ing._id,
                          label: ing.name,
                        }))}
                      value={
                        ingredients
                          .map((ing) => ({ value: ing._id, label: ing.name }))
                          .find(
                            (option) =>
                              option.value === values.selectedIngredient
                          ) || null
                      }
                      onChange={(option) => {
                        setFieldValue(
                          "selectedIngredient",
                          option ? option.value : ""
                        );
                        console.log(option);
                      }}
                      placeholder="Select ingredient"
                      isClearable
                      isSearchable
                      styles={customSelectStyles}
                    />
                  </div>
                  {errors.ingredients && touched.ingredients && (
                    <div className={styles.error}>{errors.ingredients}</div>
                  )}
                </div>

                {/* Ingredient Amount */}
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
                  if (values.selectedIngredient && ingredientAmount.trim()) {
                    const selectedObj = ingredients.find(
                      (ing) => ing._id === values.selectedIngredient
                    );

                    setFieldValue("ingredients", [
                      ...values.ingredients,
                      {
                        id: values.selectedIngredient,
                        name: selectedObj ? selectedObj.name : "",
                        amount: ingredientAmount.trim(),
                      },
                    ]);

                    setFieldValue("selectedIngredient", ""); // очистили селект
                    setIngredientAmount(""); // очистили кількість
                  }
                }}
              >
                Add new Ingredient
              </button>
              <div>
                {values.ingredients.length > 0 && (
                  <p className={styles.ingredientsHeader}>
                    <span>Name:</span>
                    <span>Amount:</span>
                    <span></span>
                  </p>
                )}
                <table className={styles.ingredientsTable}>
                  <thead>
                    <tr>
                      <th>Name:</th>
                      <th>Amount:</th>
                      <th></th>
                    </tr>
                  </thead>
                  {values.ingredients.length > 0 && (
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
                                  values.ingredients.filter(
                                    (_, idx) => idx !== i
                                  )
                                )
                              }
                              className={styles.delBtn}
                            >
                              <svg
                                className={styles.deleteImage}
                                aria-hidden="true"
                              >
                                <use href="/icons.svg#icon-delete" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
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
