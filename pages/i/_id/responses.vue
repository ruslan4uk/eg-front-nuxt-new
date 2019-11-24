<template>
  <div class="review">
    <div class="h5 mb-3">Отзывы</div>

    <el-alert
      v-if="responses.data && (responses.data.length === 0)"
      :closable="false"
      show-icon
      title="У гида пока нет отзывов. Напишите первыми!"
      type="info"
      class="mb-4">
    </el-alert>

    <b-row v-for="(review, index) in responses.data" :key="index" class="mb-3">
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

    <div class="h6 pt-4 mb-3">Добавить свой отзыв о гиде</div>
    <b-row>
      <b-col cols="12">
        <el-form :model="form" :rules="rules" ref="reviewForm">
          <el-form-item prop="review">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="Напишите ваш отзыв"
              v-model="form.review">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" native-type="submit" @click.prevent="saveReview('reviewForm')">Отправить</el-button>
          </el-form-item>
        </el-form>
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

    data() {
        return {
            form: {
                review: '',
            },
            rules: {
                review: [
                    { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur'] },
                    { min: 50, max: 2000, message: 'Минимум 50 букв и максимум 2000', trigger: ['blur'] }
                ],
            }
        }
    },

    methods: {
        saveReview(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post(`/front/user/${this.$route.params.id}/responses`, this.form).then( ({ data }) => {
                        this.$notify({ title: 'Отлично!', message: 'Отзыв успешно сохранен!', type: 'success', duration: 5000 });
                        this.responses.data.push(data.data);
                        this.form.review = '';
                    });
                } else {
                    this.$notify({ title: 'Ошибка!', message: 'Не правильно заполнены поля!', type: 'error', duration: 5000 });
                    return false;
                }
            });
        }
    }
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
      font-size: 0.675rem
      line-height: 1.2
      color: #999999
</style>
