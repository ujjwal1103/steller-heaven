import Select from "react-select";
import useFetchCategory from "../hooks/useFetchCategory";
import { useController } from "react-hook-form";

const InputSelect = ({
  id,
  label,
  value,
  control,
  isDisabled,
  placeholder,
  categoryId,
}) => {
  const options = useFetchCategory(id, categoryId);
  const { field, fieldState } = useController({
    name: id,
    control,
    rules: { required: "Category is required" },
  });
  console.log(fieldState);
  const handleChange = (option) => {
    field.onChange(option?.value);
  };

  return (
    <div className=" flex flex-col p-5 flex-1 ">
      <label className="w-full mb-3" htmlFor={id}>
        {label}
      </label>

      <Select
        options={options}
        id={id}
        onChange={handleChange}
        closeMenuOnScroll={true}
        defaultInputValue={value}
        value={options?.find((value) => value === field.value)}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable
        readOnly={true}
      />
    </div>
  );
};

export default InputSelect;
