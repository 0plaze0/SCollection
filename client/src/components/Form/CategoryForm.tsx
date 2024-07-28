import { useState } from "react";
import Input from "./Input";
import { api } from "../../api/api";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  const handleSubmit = async () => {
    try {
      const { data } = await api.post("/api/v1/category/create-category", {
        name,
      });
      if (data.success) toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Input
        name="name"
        title="Create Category"
        handleChange={handleChange}
        id="category"
        value={name}
      />
      <br />
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleSubmit}
      >
        Create Category
      </button>
    </>
  );
};

export default CategoryForm;
