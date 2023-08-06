import clsx from "clsx";

const Input = ({
  register,
  type,
  id,
  multiple,
  disabled,
  errorMessage,
  error,
  label,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col p-5 lg:flex-grow h-full flex-grow w-full lg:w-auto">
      <label className="w-full mb-3" htmlFor={id}>
        {label}
      </label>
      {!multiple ? (
        <input
          type={type}
          {...register(id, { required: errorMessage, value: defaultValue })}
          className={clsx(
            "p-2 w-full  outline-none border-2  rounded-md focus:ring-2 focus:ring-green-500 ",
            {
              "ring-2 ring-gray-300": disabled,
              "ring-2 ring-red-600": error?.ref.value === "",
            }
          )}
        />
      ) : (
        <textarea
          type={type}
          {...register(id, { required: errorMessage, value: defaultValue })}
          className={clsx(
            "p-2 w-full resize-none outline-none border-2 h-full rounded-md focus:ring-2 focus:ring-green-500 ",
            {
              "ring-2 ring-gray-300": disabled,
              "ring-2 ring-red-600": error?.ref.value === "",
            }
          )}
        />
      )}
      {error && <p className="py-3 text-red-600">{error?.message}</p>}
    </div>
  );
};

export default Input;
