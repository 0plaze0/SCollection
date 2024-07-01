interface Props {
  title: string;
  name: string;
  id: string;
  value: string;
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({
  title,
  type = "text",
  name,
  id,
  value,
  handleChange,
}: Props) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
        />
      </div>
    </div>
  );
};

export default Input;
