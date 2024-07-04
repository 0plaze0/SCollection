import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../components";
import { api } from "../api/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [formData, setFormData] = useState<{
    email: string;
    answer: string;
    newPassword: string;
  }>({
    email: "",
    answer: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/v1/auth/reset-password", formData);
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              {/* Email */}
              <Input
                title="Email"
                name="email"
                id="email"
                handleChange={handleChange}
                value={formData.email}
                type="email"
              />
              {/* Email */}
              <Input
                title="Secruity Answer. What your favorite Color?"
                name="answer"
                id="answer"
                handleChange={handleChange}
                value={formData.answer}
                type="text"
              />
              {/* Password */}
              <Input
                title="New Password"
                name="newPassword"
                id="newPassword"
                handleChange={handleChange}
                value={formData.newPassword}
                type="password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
