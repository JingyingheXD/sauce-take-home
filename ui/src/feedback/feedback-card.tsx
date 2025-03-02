import { useState } from "react";
import {Feedback, Highlight} from "./api";


export default function FeedbackCard(props: { feedback: Feedback}) {
  const { feedback } = props;
  const highlights: Highlight[] = feedback.highlights;

  const [isListOpen, setIsListOpen] = useState(false);

  const toggleList = () => {
    setIsListOpen(prevValue => !prevValue);
  };

  return (
    <div className="flex flex-col align-middle">
      <p className="text-red-300 bg-slate-700 bg-opacity-20 rounded-lg py-2 px-4 text-left">
        {feedback.text}
      </p>
      {isListOpen && (
        <div className="flex flex-col align-middle">
          {highlights?.length > 0 ? (
            highlights.map(highlight => (
              <li key={highlight.id} className="flex flex-row p-4">
                <span className="text-lg mr-2 text-red-200">•</span>
                <div>
                  <p className="font-semibold text-red-200">{highlight.summary}</p>
                  <p className="text-gray-500 italic">"{highlight.quote}"</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">This feedback has no generated highlights.</p>
          )}
        </div>
      )}
      {!isListOpen && (
        <button 
          onClick={toggleList} 
          className="bg-slate-900 hover:bg-slate-700 text-white 
                      border-2 border-solid border-white py-2 px-4 rounded mt-3 self-center"
        >
          Show highlights
        </button>  
      )}
    </div>
  );
}