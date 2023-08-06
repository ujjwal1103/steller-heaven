import { useLocation } from "react-router-dom";
import { Product } from "../components/Product";
import useFetchData from "../hooks/useFetchData";

import { useSelector } from "react-redux";
import Error from "../components/Error";
import Skeleton from "../shared/button/Skelaton";

const Products = () => {
  console.count();
  const { state, search } = useLocation();

  const selectedSort = useSelector((state) => state.filter.filter.sort);

  const { error, loading, products } = useFetchData(
    state,
    selectedSort,
    search
  );

  console.info(error);
  return (
    <div className="flex-1 h-full ">
      <div className="w-full h-full grid lg:grid-cols-4 md:grid-cols-2 gap-7 p-7  m-auto scroll-m-3 overflow-y-scroll scroll-smooth pb-40 scrollbar-thin">
        {error ? (
          <Error error={error} />
        ) : loading ? (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
              <Skeleton key={item} width={"auto"} height={"auto"} />
            ))}
          </>
        ) : products.length === 0 ? (
          <p className="grid place-content-center p-10 font-bold col-span-full w-full bg-gray-200 shadow-md rounded-lg">
            No Products Available
          </p>
        ) : (
          products.map((product) => (
            <Product product={product} key={product._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
