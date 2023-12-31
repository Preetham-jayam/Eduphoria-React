import React, { useState } from "react";
import Card from "../../shared/components/FrontendTools/Card";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addCourse } from "../../Actions/CourseActions";

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const instructorName = user.fullName;
  const imagePath = "/Course4.jpg";
  let chapters = [];
  let enrolledStudents = [];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
    setTitleError("");
  };

  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
    setPriceError("");
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const submiHandler = async (e) => {
    e.preventDefault();
    setTitleError("");
    setDescriptionError("");
    setPriceError("");

    let isValid = true;

    if (!title) {
      setTitleError("Title is required");
      isValid = false;
    }
    if (!description) {
      setDescriptionError("Description is required");
      isValid = false;
    }
    if (!price) {
      setPriceError("Price is required");
      isValid = false;
    } else if (!/^\d+$/.test(price)) {
      setPriceError("Price must be in digits");
      isValid = false;
    } else if (price > 10000) {
      setPriceError("Price is Too Large.Decrease the value");
      isValid = false;
    }

    let courseObj = {
      title,
      description,
      price,
      instructorName,
      image: imagePath,
      chapters,
      enrolledStudents,
    };

    if (isValid) {
      dispatch(addCourse(user.id, courseObj))
        .then(() => {
          toast.success("Course Added Successfully");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Failed to update course: " + error.message);
        });
    }
  };

  return (
    <div className="signup-container">
      <Card>
        <h1>Add New Course</h1>
        <form onSubmit={submiHandler}>
          <div className="form-group">
            <div className="form-input">
              <label htmlFor="title">Title of Course:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={titleChangeHandler}
              />
              <div className="error-message">{titleError}</div>
            </div>
            <div className="form-input">
              <label htmlFor="description">Description of Course:</label>
              <textarea
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={descriptionChangeHandler}
              />
              <div className="error-message">{descriptionError}</div>
            </div>
            <div className="form-input">
              <label htmlFor="price">Price of Course:</label>
              <input
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={priceChangeHandler}
              />
              <div className="error-message">{priceError}</div>
            </div>
          </div>

          <div className="submitButtton">
            <button type="submit">Add Course</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddCourse;
