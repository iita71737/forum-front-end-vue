<template>
        <div class="card mb-3">
      <div  class="row no-gutters">
        <div  class="col-md-4">
          <img
            :src="userProfile.profile.image | emptyImage"
            class="img-fluid rounded-start"
            width="300px"
            height="300px"
          />
        </div>
        <div  class="col-md-8">
          <div  class="card-body">
            <h1  class="card-title h5">{{userProfile.profile.name}}11</h1>
            <p  class="card-text">{{userProfile.profile.email}}</p>
            <ul  class="list-unstyled list-inline">
              <li >
                <strong >{{userProfile.profile.Comments.length}}</strong> 已評論餐廳
              </li>
              <li >
                <strong >{{userProfile.profile.FavoritedRestaurants.length}}</strong> 收藏的餐廳
              </li>
              <li >
                <strong >{{userProfile.profile.Followings.length}}</strong> followings (追蹤者)
              </li>
              <li >
                <strong >{{userProfile.profile.Followers.length}}</strong> followers (追隨者)
              </li>
            </ul>
            <template v-if="isAuthenticated">
                <button
                  type="submit"
                  class="btn btn-primary"
                >
                  edit
                </button>
            </template>
          <template v-else>
              <button
                v-if="isFollowed"
                type="button" 
                class="btn btn-sm btn-outline-success my-2 my-sm-0"
                @click.stop.prevent="deleteFollowing(userProfile.profile.id)"
                >
                取消追蹤
              </button>
              <button
                v-else
                type="button" 
                class="btn btn-sm btn-outline-success my-2 my-sm-0"
                @click.stop.prevent="addFollowing(userProfile.profile.id)"
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
const dummyUser = {
  currentUser: {
    id: 1,
    name: 'root',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  props : {
    userProfile : {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentUser: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: false
      },
      isAuthenticated: false,
      isFollowed: this.userProfile.isFollowed
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser
      }
      this.isAuthenticated = dummyUser.isAuthenticated
    },
    addFollowing () {
      this.isFollowed = true
    },
    deleteFollowing () {
      this.isFollowed = false
    }
  }
}
</script>