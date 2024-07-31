import { toast } from "react-toastify";
import { api } from "../../api/api";
import { Product } from "../../types/product";
import { ProductCardEdit } from "./../../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const getAllProduct = async () => {
    try {
      const { data } = await api.get("/api/v1/product/get-all-product");
      if (data.success) {
        await setProducts(data.products as Product[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      const { data } = await api.delete(
        `/api/v1/product/delete-product/${_id}`
      );
      if (data.succes) {
        toast.success(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (_id: string) => {
    navigate("/admin/create-product", {
      state: _id,
    });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.length > 0 ? (
            products?.map((product) => (
              <ProductCardEdit
                key={product._id}
                {...product}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          ) : (
            <h1>No Product to available</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
