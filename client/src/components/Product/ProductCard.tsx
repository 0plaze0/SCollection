import { Link } from "react-router-dom";
import { Product } from "../../types/product";

const ProductCard = ({ id, name, price, imageSrc, imageAlt }: Product) => {
  return (
    <>
      <Link to={`/product-details/${id}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
      </Link>
    </>
  );
};

export default ProductCard;
