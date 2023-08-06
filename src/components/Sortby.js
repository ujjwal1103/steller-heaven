import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

import Select from "react-select";
const Sortby = () => {
  const dispatch = useDispatch();
  const selectedSort = useSelector((state) => state.filter.filter.sort);

  const handleChange = (selected) => {
    dispatch(setSort(selected));
  };

  const options = [
    { value: "popularity", label: "Popularity" },
    { value: "newest", label: "Newest on First" },
    { value: "priceLowToHigh", label: "Price low to high" },
    { value: "priceHighToLow", label: "Price high to low" },
  ];
  return (
    <div className="w-80 h-5 flex gap-12 items-center justify-end">
      <Select
        value={selectedSort}
        onChange={handleChange}
        options={options}
        className="w-full p-2"
      />
    </div>
  );
};

export default Sortby;
