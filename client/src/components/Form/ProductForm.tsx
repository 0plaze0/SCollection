import { useState } from "react";
import { Input } from "./../../components";
import { PhotoIcon } from "@heroicons/react/24/solid";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
    shipping: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      console.log(file);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  return (
    <div className=" w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <Input
          title="Name"
          name="name"
          id="name"
          handleChange={handleChange}
          value={formData.name}
        />

        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-300"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFile}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>

        <Input
          title="Price"
          name="price"
          id="price"
          handleChange={handleChange}
          value={formData.price}
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="descritption"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  ["description"]: e.target.value,
                }))
              }
              autoComplete="off"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
            />
          </div>
        </div>

        <Input
          title="Quantity"
          name="quantity"
          id="quantity"
          handleChange={handleChange}
          value={formData.quantity}
        />
        <Input
          title="Category"
          name="category"
          id="category"
          handleChange={handleChange}
          value={formData.category}
        />
        <Input
          title="Shipping"
          name="shipping"
          id="shipping"
          handleChange={handleChange}
          value={formData.shipping}
        />

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
