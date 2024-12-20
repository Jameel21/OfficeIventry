const Pagination = ({
  page,
  limit,
  totalItems,
  onPageChange,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(totalItems / limit);
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
          className={`p-1 sm:px-2 sm:py-2 text-sm rounded-lg text-white ${
            page === 1 ? "bg-ternary" : "bg-secondary"
          }`}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">Page {page}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={`p-1 sm:px-2 sm:py-2 text-sm text-white rounded-lg ${
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
