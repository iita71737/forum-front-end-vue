<template>
  <div class="row text-center">
    <div class="col-3" v-for="user in usersTop" :key="user.id">
      <a href="#">
        <img :src="user.image" width="140px" height="140px" />
      </a>
      <h2>{{ user.name }}</h2>
      <span class="badge badge-secondary"
        >追蹤人數：{{ user.followerCount }}</span
      >
      <p class="mt-3">
        <button
          v-if="user.isFollowed"
          type="button"
          class="btn btn-danger"
          @click.stop.prevent="deleteFollowing(user.id)"
        >
          取消追蹤
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary"
          @click.stop.prevent="addFollowing(user.id)"
        >
          追蹤
        </button>
      </p>
    </div>
  </div>
</template>

<script>


export default {
  name: "UsersTopCard",
  props: {
    usersTop: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addFollowing(userId){
      this.$emit('after-add-following', userId)
    },
    deleteFollowing(userId){
      this.$emit('after-delete-following', userId)
    }
  },
};
</script>