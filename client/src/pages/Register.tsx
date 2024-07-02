import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { User } from "../types/user";
import { Input } from "../components";
import { api } from "../api/api";
import { toast } from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState<User>({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/v1/auth/register", formData);
      if (data.success) {
        navigate("/login");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <Input
              title="Name"
              name="name"
              id="name"
              handleChange={handleChange}
              value={formData.name}
            />
            <Input
              title="Address"
              name="address"
              id="address"
              handleChange={handleChange}
              value={formData.address}
            />

            {/* Phone */}
            <Input
              title="Phone"
              name="phone"
              id="phone"
              handleChange={handleChange}
              value={formData.phone}
            />
            {/* Email */}
            <Input
              title="Email"
              name="email"
              id="email"
              handleChange={handleChange}
              value={formData.email}
              type="email"
            />
            {/* Password */}
            <Input
              title="Password"
              name="password"
              id="passoword"
              handleChange={handleChange}
              value={formData.password}
              type="password"
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have a Account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Go to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
