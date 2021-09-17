<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userFollowers.length }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link
      v-for="follower in userFollowers" :key="follower.id" 
      :to="{ name: 'users', params: { id: follower.id}}"
        ><img :src="follower.image" width="60" height="60" class="mr-1"
      />
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

export default {
  name:'userfollowerscard',
  mixins: [emptyImageFilter],
  props: {
    userFollowers: {
      type: Array,
      required: true,
    },
  },
};
</script>
