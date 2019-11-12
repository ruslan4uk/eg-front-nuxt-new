<template>
  <div class="review">
    <div class="h5 mb-3">Отзывы</div>

    <b-row v-for="(review, index) in responses.data" :key="index" class="mb-4">
      <b-col cols="3" md="2">
        <el-avatar class="review__author-avatar" shape="square"  fit="fill" :src="review.comment_author.avatar"></el-avatar>
        <div class="review__author-name">{{ review.comment_author.name }}</div>
      </b-col>
      <b-col cols="9" md="10" class="pl-0 pl-md-3">
        <div class="review__text">{{ review.text }}</div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
    props: ['user'],

    asyncData({ store, route, error }) {
        return store.$axios.get(`/front/user/${route.params.id}/responses`).then(({ data }) => {
            return { responses: data.data }
        }).catch((e) => {
            return error({ statusCode: 404, message: 'Page not found' })
        })
    },
}
</script>
