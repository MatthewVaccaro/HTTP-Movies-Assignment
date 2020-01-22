import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  //Holds state for the input fields
  const [formValue, setFormValue] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setFormValue(res.data);
      })
      .catch(err => {
        console.log("err", err);
      });
  }, [props.match.params.id]);

  //watches input fields for changes
  const changeHandler = event => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  //Request to update with info set in state
  const submitHandler = event => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/movies/${props.match.params.id}`,
        formValue
      )
      .then(res => {
        props.history.push(`/movies/${props.match.params.id}`);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  console.log(props.match.params.id);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          name="title"
          value={formValue.title}
          type="text"
          placeholder="Update title"
          onChange={changeHandler}
        />
        <input
          name="director"
          value={formValue.director}
          type="text"
          placeholder="Update Director"
          onChange={changeHandler}
        />
        <input
          name="metascore"
          value={formValue.metascore}
          type="text"
          placeholder="Update Metascore"
          onChange={changeHandler}
        />
        <input
          name="stars"
          value={formValue.stars}
          type="text"
          placeholder="Update Stars"
          onChange={changeHandler}
        />
        <button type="submit">Submit Edit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
