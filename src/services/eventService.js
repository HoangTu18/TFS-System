import { BaseService } from "./BaseService";

class EventService extends BaseService {
  getEvent = () => {
    return this.get(`events`);
  };
  insertEvent = (model) => {
    return this.post(`events`, model);
  };
  updateEvent = (model) => {
    return this.put(`events`, model);
  };
  deleteEvent = (id) => {
    return this.delete(`events/${id}`);
  };
}
export const eventService = new EventService();

