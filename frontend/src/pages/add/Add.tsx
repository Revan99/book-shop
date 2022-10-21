import { bookType, formValues } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form";
import { addBook } from "../../apis/booksApis";
import { NavLink, useNavigate } from "react-router-dom";

function Add() {
  const { register, handleSubmit } = useForm<formValues>();
  const navigate = useNavigate();

  const onSubmits: SubmitHandler<formValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", JSON.stringify(data.price));
      formData.append("desc", data.desc);
      formData.append("cover", data.cover[0]);
      await addBook(formData);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Book-store</h1>
        <ul className="navigation">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add</NavLink>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmits)} className="form">
        <input {...register("title")} type="text" name="title" />
        <input {...register("desc")} type="text" name="desc" />
        <input {...register("price")} type="number" step="any" name="price" />
        <input {...register("cover")} type="file" name="cover" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Add;
