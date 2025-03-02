export default function Pagination(props: PaginationProps) {
  const { page, totalPages, onPrevious, onNext } = props;

  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex flex-row justify-end gap-4">
        <button 
          onClick={onPrevious}
          disabled={page === 1}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium 
                  text-gray-500 bg-white border border-gray-300 rounded-lg 
                  hover:bg-gray-100 hover:text-gray-700 cursor-pointer
                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                  dark:hover:bg-gray-700 dark:hover:text-white 
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium 
                  text-gray-500 bg-white border border-gray-300 rounded-lg 
                  hover:bg-gray-100 hover:text-gray-700 cursor-pointer
                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                  dark:hover:bg-gray-700 dark:hover:text-white 
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
      <div className="text-white flex items-center justify-end text-gray-500">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}