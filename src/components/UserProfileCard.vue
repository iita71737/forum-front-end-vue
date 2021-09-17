<template>
        <div class="card mb-3">
      <div  class="row no-gutters">
        <div  class="col-md-4">
          <img
            :src="userProfile.image | emptyImage"
            class="img-fluid rounded-start"
            width="300px"
            height="300px"
          />
        </div>
        <div  class="col-md-8">
          <div  class="card-body">
            <h1  class="card-title h5">{{userProfile.name}}</h1>
            <p  class="card-text">{{userProfile.email}}</p>
            <ul  class="list-unstyled list-inline">
              <li >
                <strong >{{userProfile.Comments.length}}</strong> 已評論餐廳
              </li>
              <li >
                <strong >{{userProfile.FavoritedRestaurants.length}}</strong> 收藏的餐廳
              </li>
              <li >
                <strong >{{userProfile.Followings.length}}</strong> followings (追蹤者)
              </li>
              <li >
                <strong >{{userProfile.Followers.length}}</strong> followers (追隨者)
              </li>
            </ul>
            <template v-if="isCurrentuser">
                <router-link
                  :to="{ name:'user-edit', params:{ id: userProfile.id }}"
                  class="btn btn-primary"
                >
                  edit
                </router-link>
            </template>
          <template v-else>
              <button
                v-if="isFollowed"
                type="button" 
                class="btn btn-sm btn-outline-success my-2 my-sm-0"
                @click.stop.prevent="deleteFollowing(userProfile.id)"
                >
                取消追蹤
              </button>
              <button
                v-else
                type="button" 
                class="btn btn-sm btn-outline-success my-2 my-sm-0"
                @click.stop.prevent="addFollowing(userProfile.id)"
                >
                追蹤
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name:'UserProfileCard',
  mixins: [emptyImageFilter],
  props : {
    userProfile : {
      type: Object,
      required: true
    },
    isCurrentuser: {
      type: Boolean,
      required: true
    },
    initialIsfollowed: {
      type: Boolean,
      required: true
    },
  },
  data () {
    return {
      isFollowed: this.initialIsfollowed,
    }
  },
  watch: {
    initialIsfollowed (isFollowed) {
      this.isFollowed = isFollowed
    },
  },
  methods: {
    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.isFollowed = true
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

        this.isFollowed = false
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試456",
        });
      }
    },
  }
}
</script>