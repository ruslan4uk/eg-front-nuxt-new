<template>
  <section class="auth">
    <b-container>
      <b-row class="footer-fix align-items-center justify-content-center">
        <b-col cols="7" md="8" lg="4" class="my-4">
          <img src="~assets/images/callback.png" alt="">
        </b-col>

        <b-col cols="12" md="4" lg="5" class="ml-lg-auto my-4">
          <div class="auth__title">Обратная связь</div>
          <div class="auth__subtitle mb-3">Пишите отзывы и предложения, мы обязательно прислушаемся!</div>

          <el-form :model="form" :rules="rules" ref="callbackForm" label-width="0" class="demo-ruleForm">

            <el-form-item prop="name">
              <el-input placeholder="Ваше имя" v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item prop="email">
              <el-input placeholder="Ваш Email" v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item prop="comment" class="pb-2">
              <el-input type="textarea" rows="6" placeholder="Сообщение" v-model="form.comment"></el-input>
            </el-form-item>

            <el-button type="primary" round class="w-100 py-3" native-type="submit" @click.prevent="callback('callbackForm')">Отправить</el-button>
          </el-form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        rules: {
          name: [
            { required: true, message: 'Поле Имя обязательно для заполнения' }
          ],
          email: [
            { required: true, message: 'Поле Email обязательно для заполнения' },
            { type: 'email', message: 'Вы ввели не корректный Email адрес' }
          ],
          comment: [
            { required: true, message: 'Поле Комментарий обязательно для заполнения' },
          ]
        },
        form: {
          name: '',
          email: '',
          comment: '',
        }
      }
    },

    methods: {
      callback(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/front/callback', this.form).then(({ data }) => {
              this.$notify({ title: 'Отлично!', message: 'Сообщение успешно отправлено!', type: 'success', duration: 5000 });
              this.$refs[formName].resetFields();
            }).catch(e => {
              this.$notify({ title: 'Ошибка!', message: ':(', type: 'error', duration: 5000 });
            })
          } else {
            return false;
          }
        });
      },
    },

    created() {
      let user = {};
      if (this.$auth.user) {
        user = Object.assign(this.$auth.user);
        this.form = {
          name: user.name,
          email: user.email,
        }
      }
    }

  }
</script>

<style scoped lang="sass">

</style>
