<template>
  <div class="review">
    <div class="h5 mb-3">Отзывы</div>

    <b-row v-for="(review, index) in responses.data" :key="index" class="mb-4">
      <b-col cols="12" md="2" class="mb-3">
        <b-row>
          <b-col cols="3" md="12">
            <el-image :src="review.comment_author.avatar" class="review__author-avatar rounded25" lazy>
              <template slot="placeholder">
                <div class="d-flex justify-content-center w-100">
                  <i class="el-icon-loading"></i>
                </div>
              </template>
            </el-image>
          </b-col>
          <b-col cols="9" md="12" class="pl-0 pl-md-3">
            <div class="review__author-name text-md-center">{{ review.comment_author.name }}</div>
            <div class="review__created text-md-center">{{ review.created_at }}</div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" md="10">
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

<style scoped lang="sass">
  .review
    &__author-avatar, &__author-avatar img
      width: 100% !important
      height: auto !important
    &__author-name
      font-size: 0.825rem
      font-weight: 500
    &__text
      padding: 1rem 1.5rem
      background-color: #f8f8f8
      font-size: 0.875rem
    &__created
      font-size: 0.75rem
      color: #999999
</style>
