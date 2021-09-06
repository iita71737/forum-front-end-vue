<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />

    <template v-else>
      <div>
        <h1>{{ restaurant.name }}</h1>
        <p>[{{ restaurant.categoryName }}]</p>
      </div>
    </template>
    <hr />
    <ul>
      <li>評論數： {{ restaurant.Comments.length }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  name: "RestaurantDashboard",
  components: { Spinner },

  data() {
    return {
      restaurant: [],
      isLoading: true,
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId });
        this.restaurant = data.restaurant;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        // STEP 6: 透過 restaurantsAPI 取得餐廳資訊
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
  },
};
</script>
