<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="name"
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="image"
          :src="image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        />
        <input
          @change="handleFileChange"
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
        />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isProcessing">
        {{ isProcessing ? "資料更新中..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserEdit",
  data() {
    return {
      id: 0,
      email: "",
      image: "",
      name: "",
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    currentUser(user) {
      if (user.id === -1) return;
      const { id } = this.$route.params;
      this.fetchUser(id);
    },
  },
  created() {
    if (this.currentUser.id === -1) return;
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    fetchUser(userId) {
      const { name, email, id, image } = this.currentUser;
      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: "not-found" });
        return;
      }
      (this.id = id),
        (this.name = name),
        (this.email = email),
        (this.image = image);
    },
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.image = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.image = imageURL;
      }
    },
    async handleSubmit(e) {
      try {
        if (!this.name) {
          Toast.fire({
            icon: "warning",
            title: "您尚未填寫姓名",
          });
          return;
        }

        const form = e.target; // <form></form>
        const formData = new FormData(form);
        //test formData
        for (let [key, value] of formData.entries()) {
          console.log(key + ", " + value);
        }
        this.isProcessing = true;
        const { data } = await usersAPI.updateUser({
          userId: this.id,
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.$router.push({ name: "users", params: { id: this.id } });
      } catch (error) {
        this.isProcessing = false;
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法update，請稍後再試",
        });
      }
    },
  },
};
</script>
