import feedbackStore from "../store/feedback";
import feeedbackService from "../service/feedback";

/**
 * GraphQL Resolvers
 */
const resolvers = {
  Query: {
    feedback: (parent: unknown, args: {id: number}) => {
      return feedbackStore.getFeedback(args.id)
    },
    feedbacks: (parent: unknown, args: { page: number; per_page: number }) => {
      return feeedbackService.getFeedbackPage(args.page, args.per_page)
    },
    totalCount: (parent: unknown, args: {}) => {
      return feedbackStore.countFeedback()
    }
  },
  Mutation: {
    createFeedback: (parent: unknown, args: { text: string }) => {
      return feeedbackService.createFeedback(args.text)
    }
  },
  Feedback: {
    highlights: (parent: { id: number }) => {
      return feedbackStore.getFeedbackHighlights(parent.id);
    }
  }
};

export default resolvers;