import {gql, request} from "graphql-request";

export type Feedback = {
  id: number
  text: string
}

export type Highlight = {
  id: number;
  feedbackId: number;
  summary: string;
  quote: string;
}

const createFeedback = gql`
  mutation createFeedback($text: String!) {
    createFeedback(text: $text) {
      id
      text
    }
  }
`;

const feedbacksDocument = gql`
  query feedbacks($page: Int!, $per_page: Int!) {
    feedbacks(page: $page, per_page: $per_page) {
      values {
        id
        text
      }
      count
    }
  }
`

type FeedbacksData = { feedbacks: { values: Feedback[], count: number } }
export const feedbacksQuery = (page: number, per_page: number): Promise<FeedbacksData> =>
  request('http://localhost:4000/graphql', feedbacksDocument, {
    page,
    per_page
  })

export const createFeedbackQuery = (text: string): Promise<Feedback> =>
  request('http://localhost:4000/graphql', createFeedback, { text });