import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import * as yup from "yup";
import "./Form2.css"

interface IFormInputs {
  fullName: string;
  age: number;
  title: string;
  email: string;
  sex: string;
  time: string;
}

const SignupSchema = yup
  .object({
    fullName: yup.string().required().defined(),
    age: yup.number().required().positive().integer().min(18),
    email: yup.string().required().email(),
    sex: yup.string().required(),
    title: yup.string().required(),
    time: yup.date().required(),
  })
  .required();

const Form2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignupSchema)
  });

  const onSubmit = (data: IFormInputs) => {

    console.log(data);
  };

  return (
    <div style={{ background: "#c0c0c0" }}>
      <form className="form2" style={{ padding: "10px 0" }} onSubmit={handleSubmit(onSubmit)}>
        <div className="form2-item">
          <label className="form2-label">Full Name :</label>
          <input className="form2-input" {...register("fullName")} />
        </div>
        {errors.fullName && <p className="text">{errors.fullName.message}</p>}
        <div className="form2-item">
          <label className="form2-label">Age :</label>
          <input className="form2-input" type="number" {...register("age", { valueAsNumber: true })} />
        </div>
        {errors.age && <p className="text">{errors.age.message}</p>}
        <div className="form2-item">
          <label className="form2-label">Email :</label>
          <input className="form2-input" type="email" {...register("email")} />
        </div>
        {errors.email && <p className="text">{errors.email.message}</p>}
        <div className="form2-item">
          <label className="form2-label">Sex :</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <label className="form-item-option" style={{ margin: "0 10px" }}>Male</label>
              <input {...register("sex", { required: true })} type="radio" value="Male" />
            </div>
            <div>
              <label className="form-item-option" style={{ margin: "0 10px" }}>Female</label>
              <input {...register("sex", { required: true })} type="radio" value="Female" />
            </div>
          </div>
        </div>
        {errors.sex && <p className="text">{errors.sex.message}</p>}
        <div className="form2-item">
          <label className="form2-label">Sex :</label>
          <select className="form2-select" {...register("title")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.title && <p className="text">{errors.title.message}</p>}
        </div>
        <div className="form2-item">
          <label className="form2-label">Time :</label>
          <InputMask className="form2-input" mask="99-99-9999" {...register("time")} />
        </div>
        {errors.time && <p className="text">{errors.time.message}</p>}
        <input className="form2-input" type="submit" />
      </form>
    </div>
  );
};

export default Form2;