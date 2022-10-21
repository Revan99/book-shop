import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { updateBook } from "../../apis/booksApis";

import { formValues } from "../../types";

function Update() {
  const { bookId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm<formValues>({
    defaultValues: {
      title: location.state.title,
      price: location.state.price,
      desc: location.state.desc,
    },
  });

  const onSubmits: SubmitHandler<formValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", JSON.stringify(data.price));
      formData.append("desc", data.desc);
      formData.append("cover", data.cover[0]);
      await updateBook(bookId, formData);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="page-container">
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

export default Update;
