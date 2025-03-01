import { useEffect, useState } from "react";
import { createFeedbackQuery, Feedback, feedbacksQuery } from "./api.ts";
import FeedbackCard from "./feedback-card.tsx";


export default function FeedbackList() {
  const [page, setPage] = useState(1);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    feedbacksQuery(page, 10).then((result) => setFeedbacks(result.feedbacks.values));
  }, [page]);

  const submitFeedback = async() => {
    try {
      await createFeedbackQuery(feedbackText);
      setFeedbackText('');
    } catch(e) {
      console.error('insertion error: ', e);
    }

    const feedbacksDocument = await feedbacksQuery(1, 100);
    console.log('feedbacksDocument', feedbacksDocument);
    
    setFeedbacks(feedbacksDocument.feedbacks.values);
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
    </div>
  );
}