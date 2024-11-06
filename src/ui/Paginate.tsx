/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppDispatch } from "../redux/hooks";
import { setPage } from "../redux/features/paginate/paginateSlice";
import { useLocation } from "react-router-dom";
import { setItem } from "../redux/features/paginate/totalItamslice";

type ProductPaginateProps = {
  totalItems: number;
  limit: number;
  options: any;
};

const Paginate = ({ totalItems, limit, options }: ProductPaginateProps) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem("servicePage")) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    Number(localStorage.getItem("servicePerPage")) || limit
  );
  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    localStorage.setItem("servicePage", currentPage.toString());
    dispatch(setPage(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    localStorage.setItem("servicePerPage", itemsPerPage.toString());
    dispatch(setItem(itemsPerPage));
  }, [itemsPerPage, dispatch]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-black text-white"
              : "bg-white text-black border"
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-3">
          {page}
        </span>
      )
    );
  };

  const handleGoToPage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetPage = Number(
      (event.currentTarget.elements.namedItem("goToPage") as HTMLInputElement)
        .value
    );
    if (targetPage) handlePageChange(targetPage);
  };

  const itemsStart = (currentPage - 1) * itemsPerPage + 1;
  const itemsEnd = Math.min(currentPage * itemsPerPage, totalItems);
  useEffect(() => {
    if (location.pathname !== "/servise") {
      localStorage.removeItem("servicePage");
      localStorage.removeItem("servicePerPage");
      setCurrentPage(1);
      setItemsPerPage(limit);
    }
    if (location.pathname !== "/review") {
      localStorage.removeItem("servicePage");
      localStorage.removeItem("servicePerPage");
      setCurrentPage(1);
      setItemsPerPage(limit);
    }
  }, [location, limit]);
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-6 md:space-x-2 text-xs md:text-sm">
      <div className="flex gap-4 items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-white text-black disabled:text-gray-400 disabled:border-gray-300"
        >
          <FaChevronLeft className="inline" /> Back
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-white text-black disabled:text-gray-400 disabled:border-gray-300"
        >
          Next <FaChevronRight className="inline" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="flex items-center">
          <p>Select Item : </p>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="outline-none border rounded px-2 py-1"
          >
            {options?.map((i: any, index: any) => (
              <option key={index} value={i?.name}>
                {i.value}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleGoToPage} className="flex items-center ml-4">
          <span>Page</span>
          <input
            type="number"
            name="goToPage"
            className="ml-2 px-2 py-1 border rounded w-16 text-center"
            defaultValue={currentPage}
            min="1"
            max={totalPages}
          />
          <button
            type="submit"
            className="ml-2 px-3 py-1 border rounded bg-white text-black"
          >
            Go
          </button>
          <div className="ml-4">
            <p className="text-xs">
              ({itemsStart}-{itemsEnd} of {totalItems})
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Paginate;
