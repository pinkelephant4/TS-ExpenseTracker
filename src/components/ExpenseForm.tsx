// import { FormEvent } from "react";
import categories from "../categories";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z.string().min(1, { message: "Description is required." }),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.01, { message: "Amount should be atleast 0.01." }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
  date: z.coerce.date(),
});

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  //   const expense = {
  //     description: "",
  //     amount: 0,
  //     category: "",
  //   };
  return (
    <form
      onSubmit={handleSubmit((data: ExpenseFormData) => {
        // console.log(data);

        onSubmit(data);
        reset();
      })}
    >
      <div style={{ width: "50%" }}>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            {...register("description")}
            className="form-control"
            type="text"
            id="description"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="amt">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            className="form-control"
            type="number"
            id="amt"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            {...register("date")}
            className="form-control"
            type="date"
            id="date"
          ></input>
        </div>
        <div
        // style={{ display: "flex", justifyContent: "center" }}
        >
          <button className="btn btn-primary mt-4">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
