<template>
    <div class="card">
          <div class="card-header">
            <strong>{{userComments.length}}</strong> 已評論餐廳
          </div>
          <div class="card-body">
            <router-link
                v-for="comment in userComments"
                :key="comment.id"
                :to="{name: 'restaurant', params: { id: comment.Restaurant.id }}"
            >
              <img
                :src="comment.Restaurant.image"
                class="mr-1 mb-1"
                width="60"
                height="60"
                />
            </router-link>
          </div>
        </div>
</template>

<script>
export default {
  props:{
    userComments:{
      type: Array,
      required: true
    }
  }
}
</script>