import feedbackStore from "../store/feedback";
import prompt from "../ai/prompt";

/**
 * Creates a feedback entry and runs analysis on it.
 * @param text The feedback to create
 */
const createFeedback = async (text: string) => {
  const feedback = await feedbackStore.createFeedback(text);
  // TODO[bonus]: add "status" to the feedback table to indicate the highlights generated status - Pristine, Pending, Rejected, Completed;
  // don't need to await GPT returned data; 
  const analysisResult = await prompt.runFeedbackAnalysis(feedback.text);

  const highlightsInsertionResult = await Promise.allSettled(analysisResult?.highlights?.map(result => 
    feedbackStore.createHighlight({
      feedbackId: feedback.id,
      highlightSummary: result.summary,
      highlightQuote: result.quote,
    })
  ));

  highlightsInsertionResult.forEach(value => {
    if (value.status === 'rejected') {
      console.log(value.reason);
    }
  });

  return feedback;
}

/**
 * Gets a page of feedback entries
 * @param page The page number
 * @param perPage The number of entries per page
 */
const getFeedbackPage = async (page: number, perPage: number) => {
  const values = await feedbackStore.getFeedbackPage(page, perPage);
  const count = values.length;
  return {values, count};
}

export default {
  createFeedback,
  getFeedbackPage,
}