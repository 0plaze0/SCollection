import { Product } from "../../types/product";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

interface Props extends Product {
  handleDelete: (_id: string) => void;
  handleEdit: (_id: string) => void;
}

const ProductCardEdit = ({
  _id,
  name,
  price,

  image,
  handleDelete,
  handleEdit,
}: Props) => {
  return (
    <>
      <div className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={image?.url}
            alt={image?.id}
            className="h-full w-full object-cover object-center hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>

        <div className="flex justify-end items-center">
          <TrashIcon
            aria-hidden="true"
            className=" h-6 w-6 text-red-800 hover:text-red-600 cursor-pointer"
            onClick={() => handleDelete(_id as string)}
          />

          <PencilSquareIcon
            aria-hidden="true"
            className=" h-6 w-6 text-blue-300 hover:text-blue-700 cursor-pointer"
            onClick={() => handleEdit(_id as string)}
          />
        </div>
      </div>
    </>
  );
};

export default ProductCardEdit;
