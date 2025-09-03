import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../redux/addRecipe/operations";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useField, useFormikContext } from "formik";

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

const customStyles = {
  container: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
    padding: "4px 8px",
    minHeight: "33px", // замість height краще minHeight для адаптивності
    backgroundColor: "#fff",
    boxShadow: state.isFocused ? "0 0 0 1px #d9d9d9" : "none", // тінь при фокусі
    "&:hover": {
      borderColor: "#bdbdbd", // колір рамки при hover
    },
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "#d3d3d3"
      : state.isFocused
      ? "#d3d3d3"
      : "#fff",
    color: "#333",
    outline: "none",
    boxShadow: "none",
    userSelect: "none", // прибирає виділення тексту при натисканні
    WebkitTapHighlightColor: "transparent", // прибирає синій фон на мобільних
    ":active": {
      backgroundColor: state.isSelected ? "#d3d3d3" : "#d3d3d3",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

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
                      ...customStyles,
                      control: (provided, state) => ({
                        ...customStyles.control(provided, state),
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
                    <input
                      type="text"
                      className={`${styles.inputTitle} ${
                        errors.ingredients && touched.ingredients
                          ? styles.invalid
                          : ""
                      }`}
                      placeholder="Ingredient"
                      value={ingredientName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setIngredientName(value);

                        if (value.trim().length > 0) {
                          const results = ingredients
                            .filter((ing) =>
                              ing.name
                                .toLowerCase()
                                .includes(value.toLowerCase())
                            )
                            .sort((a, b) => a.name.localeCompare(b.name));
                          setFiltered(results);
                          setShowList(true);
                        } else {
                          const allSorted = [...ingredients].sort((a, b) =>
                            a.name.localeCompare(b.name)
                          );
                          setFiltered(allSorted);
                          setShowList(false);
                        }
                      }}
                      onFocus={() => {
                        if (ingredientName.trim().length > 0) setShowList(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowList(false), 250);
                      }}
                    />

                    <svg
                      className={styles.icon}
                      onClick={() => {
                        if (!showList) {
                          const allSorted = [...ingredients].sort((a, b) =>
                            a.name.localeCompare(b.name)
                          );
                          setFiltered(allSorted);
                          setShowList(true);
                        } else {
                          setShowList(false);
                        }
                      }}
                    >
                      <use href="/icons.svg#icon-arrow-down"></use>
                    </svg>

                    {showList && filtered.length > 0 && (
                      <ul className={styles.dropdown}>
                        <li
                          className={`${styles.dropdownItem} ${styles.disabled}`}
                          aria-disabled="true"
                        >
                          Select ingredient
                        </li>
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
                                values.ingredients.filter((_, idx) => idx !== i)
                              )
                            }
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
