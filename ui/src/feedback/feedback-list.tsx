import { useEffect, useState } from "react";
import { createFeedbackQuery, Feedback, feedbacksQuery } from "./api.ts";
import FeedbackCard from "./feedback-card.tsx";


export default function FeedbackList() {
  const PER_PAGE = 3;

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.max(Math.ceil(totalCount/PER_PAGE), 1);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackText, setFeedbackText] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    feedbacksQuery(page, PER_PAGE).then((result) => {
      setFeedbacks(result.feedbacks.values);
      setTotalCount(result.totalCount);
    });
  }, [page]);

  const submitFeedback = async() => {
    setIsSubmitting(true);

    try {
      await createFeedbackQuery(feedbackText);
      setIsSubmitting(false);
    } catch(e) {
      console.error('insertion error: ', e);
    }

    setFeedbackText('');
    setPage(1);

    const feedbacksDocument = await feedbacksQuery(page, PER_PAGE);
    setFeedbacks(feedbacksDocument.feedbacks.values);
    setTotalCount(feedbacksDocument.totalCount);
  };

  const setPreviousPage = () => {
    setPage(prevValue => Math.max(prevValue - 1, 1))
  };
  const setNextPage = () => {    
    setPage(prevValue => Math.min(prevValue+1, totalPages))
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Feedback</h1>
      <div className="flex flex-col">
        <h2 className="text-l text-white font-semibold">Input a feedback</h2>
        <textarea 
          id="text" 
          rows={4}
          placeholder="Please input a feedback text..."
          value={feedbackText}
          onChange={e => setFeedbackText(e.target.value)}
          className="block w-full p-4 mt-3 text-gray-900 rounded-lg"
        />
        <button
          onClick={submitFeedback}
          disabled={isSubmitting}
          className="bg-purple-400 hover:bg-purple-500 disabled:bg-purple-200 text-white font-bold py-2 px-4 rounded mt-3 self-end"
        >
          {isSubmitting && (
            <span role="status" className="mr-2">
              <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </span>
          )}
          Submit
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-l text-white font-semibold">Feedback list</h2>
        {feedbacks.map((feedback) => (
          <FeedbackCard feedback={feedback} key={feedback.id}></FeedbackCard>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <div className="flex flex-row justify-end">
          <button 
            onClick={setPreviousPage}
            disabled={page === 1}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
          <button
            onClick={setNextPage}
            disabled={page >= totalPages}
            className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
        <div className="text-white flex items-center justify-end text-gray-500">
          Page {page} of {totalPages}
        </div>
      </div>

    </div>
  );
}