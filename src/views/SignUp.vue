<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="NAME">NAME</label>
        <input
          v-model="name"
          id="name"
          name="name"
          type="name"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="useremail"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="passwordcheck">Password Check</label>
        <input
          v-model="passwordcheck"
          id="passwordcheck"
          name="ppasswordcheck"
          type="password"
          class="form-control"
          placeholder="passwordcheck"
          autocomplete="current-passwordcheck"
          required
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin"> Sign In </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password || !this.name || !this.passwordcheck) {
          Toast.fire({
            icon: "warning",
            title: "請確認已填寫所有欄位",
          });
          return;
        }
        if (this.password !== this.passwordcheck) {
          Toast.fire({
            icon: "warning",
            title: "兩次密碼不一致",
          });
          this.password = '',
          this.passwordcheck = "";
          return;
        }

        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordcheck,
        });

        console.log("data", data);

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: 'success',
          title: data.message
        })
        // 成功登入後轉址到登入頁
        this.$router.push('/signin')

      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法註冊，請稍後再試",
        });
      }
    },
  },
};
</script>