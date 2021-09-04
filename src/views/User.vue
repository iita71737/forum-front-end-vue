<template>
  <div class="container mb-5" v-if="!isLoading">
    <UserProfileCard
      :user-profile="userprofile"
      :is-currentuser="currentUser.id === userprofile.id"
      :initial-isfollowed="isFollowed"
    />
    <div class="row">
      <div class="col-md-4">
        <UserFollowingsCard :user-followings="userprofile.Followings" />
        <user-followers-card :user-followers="userprofile.Followers" />
      </div>
      <div class="col-md-8">
        <user-comments-card :user-comments="userprofile.Comments" />
        <user-favorited-restaurants-card
          :favorited-restaurants="userprofile.FavoritedRestaurants"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserProfileCard from "./../components/UserProfileCard.vue";
import UserFollowingsCard from "./../components/UserFollowingsCard.vue";
import UserFollowersCard from "./../components/UserFollowersCard.vue";
import UserFavoritedRestaurantsCard from "./../components/UserFavoritedRestaurantsCard.vue";
import UserCommentsCard from "./../components/UserCommentsCard.vue";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";


export default {
  name: "User",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserFavoritedRestaurantsCard,
    UserCommentsCard,
  },
  data() {
    return {
      userprofile: "",
      isFollowed: false,
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    async fetchUser(userId) {
      try {
        this.isLoading = true;
        const { data } = await usersAPI.getUser({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        
        this.userprofile = data.profile;
        this.isFollowed = data.isFollowed;
        this.isLoading = false;
      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法get，請稍後再試",
        });
      }
    },
  },
};
</script>