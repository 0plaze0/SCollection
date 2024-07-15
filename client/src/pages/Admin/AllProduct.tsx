import { Product } from "../../types/product";
import { ProductCardEdit } from "./../../components";
import { useEffect, useState } from "react";

const productsList: Product[] = [
  {
    _id: "1",
    name: "Earthen Bottle",
    price: "$48",
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    quantity: "2",
    category: "gents",
    image: {
      id: "1",
      url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    },
    shipping: "yes",
  },
  {
    _id: "2",
    name: "Earthen Bottle",
    price: "$48",
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    quantity: "2",
    category: "gents",
    image: {
      id: "1",
      url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    },
    shipping: "yes",
  },
];

const AllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProduct = async () => {
    try {
      //fetch from backend here
      await setProducts(productsList);
    } catch (error) {
      console.log(error);
    }
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
              <ProductCardEdit key={product.name} {...product} />
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
