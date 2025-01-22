import { useState, useEffect } from "react";

const Pagination = ({
  page,
  limit,
  totalItems,
  onPageChange,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(totalItems / limit);
  const [inputPage, setInputPage] = useState(page);

  useEffect(() => {
    // Keep inputPage in sync with the page prop
    setInputPage(page);
  }, [page]);

  const handlePageInputChange = (e) => {
    const newPage = e.target.value;
    // Allow the user to type freely while validating input
    if (newPage === "" || (Number(newPage) >= 1 && Number(newPage) <= totalPages)) {
      setInputPage(newPage);

      // Trigger page change if input is valid
      const validPage = parseInt(newPage, 10);
      if (validPage >= 1 && validPage <= totalPages) {
        onPageChange(validPage);
      }
    }
  };
  return (
    <div className="flex items-center justify-between mt-4">
      {/* Items per page */}
      <div className="items-center hidden gap-2 sm:flex">
        <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
          Items per page:
        </label>
        <input
          id="itemsPerPage"
          type="number"
          value={limit}
          onChange={(e) => onLimitChange(parseInt(e.target.value) || 10)}
          className="p-2 text-sm text-gray-600 border rounded-lg w-14 h-7"
        />
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2 ml-10 sm:ml-0">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`p-1 sm:px-2 sm:py-2 text-sm rounded-lg text-white cursor-pointer ${
            page === 1 ? "bg-ternary" : "bg-secondary"
          }`}
        >
          Prev
        </button>
        <span className="flex items-center gap-1 text-sm text-gray-600">
          Page
          <input
            type="number"
            value={inputPage} // Use inputPage state
            onChange={handlePageInputChange}
            className="w-10 p-1 text-center text-gray-600 border rounded-lg h-7"
            min="1"
            max={totalPages}
          />
          of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={`p-1 sm:px-2 sm:py-2 text-sm text-white rounded-lg cursor-pointer ${
            page >= totalPages ? "bg-ternary" : "bg-secondary"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
