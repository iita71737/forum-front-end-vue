import { apiHelper } from "./../utils/helpers";


export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId });
    return apiHelper.get(`/restaurants?${searchParams.toString()}`);
  },
  getFeeds() {
    return apiHelper.get(`/restaurants/feeds`);
  },
  getTop() {
    return apiHelper.get(`/restaurants/top`);
  },
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`);
  },
  addComment({ restaurantId, text }) {
    return apiHelper.post(`/comments/`, { restaurantId, text });
  },
  removeComment({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`);
  },
};
