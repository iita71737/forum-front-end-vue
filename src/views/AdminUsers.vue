<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <admin-nav />
    <table class="table">
      <Spinner v-if="isLoading" />

      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">
            {{ user.id }}
          </th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? "admin" : "user" }}</td>
          <td>
            <button
              v-if="currentUser.id !== user.id"
              type="button"
              class="btn btn-link"
              @click.stop.prevent="
                toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })
              "
            >
              {{ user.isAdmin ? "set as user" : "set as admin" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import Spinner from "./../components/Spinner";

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
    Spinner,
  },
  data() {
    return {
      users: [],
      profile: {
        id: 0,
        name: "",
        email: "",
        password: "",
        isAdmin: false,
        image: null,
        createdAt: "",
        updatedAt: "",
        Comments: [],
      },
      isLoading: true,
    };
  },
  computed: { ...mapState(["currentUser"]) },
  methods: {
    async fetchUser() {
      try {
        const { data } = await adminAPI.Users.get();
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.users = data.users;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        // STEP 5: 錯誤處理
        Toast.fire({
          icon: "error",
          title: "無法建立餐廳，請稍後再試",
        });
      }
    },
    async toggleUserRole({ userId, isAdmin }) {
      try {
        const { data } = await adminAPI.Users.put({
          userId,
          isAdmin: (!isAdmin).toString(),
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return { ...user, isAdmin: !user.isAdmin };
          }
          return user;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "cannot update usertoggle state",
        });
      }
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>
