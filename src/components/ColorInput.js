import React from "react";
import { useFieldArray } from "react-hook-form";

function ColorInput({ register, control, error, maxColors, label }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "colors",
    keyName: "id",
  });
  console.log(error);
  return (
    <div className="flex flex-col p-5 lg:flex-grow  flex-grow w-full lg:w-auto">
      <label className="w-full mb-3">{label}</label>
      <div className="flex gap-5">
        {fields.map((field, index) => (
          <label
            htmlFor={`colors.${index}.value`}
            key={field.id}
            className="m-0 p-0 h-20 w-20 relative border-none rounded-full"
          >
            <input
              accept="hex"
              className={
                " border-none outline-none h-12 w-12 rounded-full bg-transparent "
              }
              style={{ appearance: "none" }}
              type="color"
              {...register(`colors.${index}.value`, {
                required: true,
                pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
              })}
              defaultValue={field.value}
            />
            {index === 0 && fields.length < maxColors && (
              <button
                className="absolute -top-3 shadow-md -right-3 w-8 h-8 text-center bg-gray-100  text-2xl rounded-full"
                type="button"
                onClick={() => {
                  if (fields.length < maxColors && !error?.[index]?.value) {
                    append({ value: "" });
                }
                }}
              >
                +
              </button>
            )}
            {index > 0 && (
              <button
                className="absolute -top-3 shadow-md -right-3 w-8 h-8 text-center bg-gray-100  text-2xl rounded-full"
                type="button"
                onClick={() => remove(index)}
              >
                x
              </button>
            )}
          </label>
        ))}
      </div>
      {fields[0].value === "" && <p>Please select a color</p>}
    </div>
  );
}

export default ColorInput;
