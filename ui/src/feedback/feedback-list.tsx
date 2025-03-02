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

  useEffect(() => {
    feedbacksQuery(page, PER_PAGE).then((result) => {
      setFeedbacks(result.feedbacks.values);
      setTotalCount(result.totalCount);
    });
  }, [page]);

  const submitFeedback = async() => {
    try {
      await createFeedbackQuery(feedbackText);
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
          className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded mt-3 self-end"
        >
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