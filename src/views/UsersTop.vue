<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />

    <h1 class="mt-5">美食達人</h1>
    <hr />
    <users-top-card
      :users-top="users"
      @after-delete-following="deleteFollowing"
      @after-add-following="addFollowing"
    />
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import UsersTopCard from "./../components/UsersTopCard.vue";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  name: "UsersTop",
  components: {
    NavTabs,
    UsersTopCard,
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUsers();

        this.users = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed,
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得美食達人，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true,
            };
          }
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試123",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false,
            };
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試456",
        });
      }
    },
  },
  created() {
    this.fetchTopUsers();
  },
};
</script>
