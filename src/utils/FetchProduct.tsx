/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
// import { useProductsQuery } from "../redux/features/products/productsApi";

import { useProductsQuery } from "../redux/features/products/productsApi";

// export const FetchProduct = (category: any, searchTerm: any) => {
//   const {
//     data,
//     isLoading,
//     refetch: fetchProduct,
//   } = useProductsQuery({ category, searchTerm });
//   useEffect(() => {
//     if (category) {
//       fetchProduct();
//     }
//   }, [category, searchTerm, fetchProduct]);
//   return {
//     data,
//     isLoading,
//   };
// };


export const FetchProduct = (category : any, searchTerm : any) => {
  const { data, error, isLoading } = useProductsQuery({
    category,
    searchTerm,
  });

  return {
    data,
    error,
    isLoading,
  };
};
// const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
// const { refetch: fetchProduct } = useProductsQuery(selectedCategory);

// const categoryItem = (category: string) => {
//   setSelectedCategory(category);
// };
// useEffect(() => {
//   if (selectedCategory) {
//     fetchProduct();
//     setSelectedCategory(selectedCategory);
//   }
// }, [selectedCategory, fetchProduct]);
