import { BaseService } from "./BaseService";

class FeedbackService extends BaseService {
  getFeedback = () => {
    return this.get("feedbacks");
  };
}
export const feedbackService = new FeedbackService();
