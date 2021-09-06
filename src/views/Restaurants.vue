<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />

    <template v-else>
      <NavTabs />
      <!-- 餐廳類別標籤 RestaurantsNavPills -->
      <restaurant-nav-pills :categories="categories" />
      <Spinner v-if="isLoading" />

      <div class="row">
        <!-- 餐廳卡片 RestaurantCard-->
        <restaurant-card
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :initial-restaurant="restaurant"
        />
      </div>

      <!-- 分頁標籤 RestaurantPagination -->
      <restaurant-pagination
        v-if="totalPage.length > 1"
        :current-page="currentPage"
        :total-page="totalPage"
        :category-id="categoryId"
        :previous-page="previousPage"
        :next-page="nextPage"
      />
      <div v-if="restaurants.length < 1">此類別目前無餐廳資料</div>
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import RestaurantCard from "./../components/RestaurantCard.vue";
import RestaurantNavPills from "./../components/RestaurantsNavPills.vue";
import RestaurantPagination from "./../components/RestaurantsPagination.vue";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner.vue";

export default {
  name: "restaurants",
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantNavPills,
    RestaurantPagination,
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
      isLoading: true,
    };
  },
  created() {
    // STEP 3：在 created 的時候呼叫 fetchRestaurants 方法
    // 這裡會向伺服器請求第一頁且不分餐廳類別的資料
    const { page = "", categoryId = "" } = this.$route.query;
    this.fetchRestaurants({
      queryPage: page,
      queryCategoryId: categoryId,
    });
  },
  beforeRouteUpdate(to, from, next) {
    const { page = "", categoryId = "" } = to.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
    console.log("to", to);
    console.log("from", from);
    next();
  },
  methods: {
    // STEP 2：將 fetchRestaurants 改成 async...await 的語法
    // 並且可以帶入參數 page 與 categoryId
    // 呼叫 API 後取得 response
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        this.isLoading = true;

        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId,
        });
        //console.log('response', response)
        // STEP 2：透過解構賦值，將所需要的資料從 response.data 取出
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = response.data;

        // STEP 3：將從伺服器取得的 data 帶入 Vue 內
        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style>
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  color: rgb(255, 255, 255);
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: rgb(1, 77, 58);
  border-radius: 10px;
}
</style>
