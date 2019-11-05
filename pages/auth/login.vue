<template>
  <section class="auth">
    <b-container>
      <b-row class="footer-fix align-items-center">
        <b-col cols="12" md="8" lg="6" class="my-4">
          <img src="~assets/images/login.png" alt="">
        </b-col>

        <b-col cols="12" md="4" lg="5" class="ml-lg-auto my-4">
          <div class="auth__title">Поехали!</div>
          <div class="auth__subtitle mb-3">Мы рады Вашему возвращению</div>

          <el-form :model="form" :rules="rules" ref="loginForm" label-width="0" class="demo-ruleForm">

            <el-form-item prop="email" :error="errors.email">
              <el-input placeholder="Введите ваш Email" v-model="form.email" id="email" name="email"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input placeholder="Пароль" v-model="form.password" show-password></el-input>
            </el-form-item>

            <el-form-item class="mb-1">
              <el-checkbox v-model="form.remember_me">Запомнить меня</el-checkbox>
            </el-form-item>

            <el-button type="primary" round class="w-100 py-3" @click="login('loginForm')">От винта!</el-button>
          </el-form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
    middleware: ['auth'],

    data() {
        return {
            rules: {
                email: [
                    { required: true, message: 'Поле Email обязательно для заполнения', trigger: ['blur', 'change'] },
                    { type: 'email', message: 'Вы ввели не корректный Email адрес', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: 'Поле Пароль обязательно для заполнения', trigger: ['blur', 'change'] }
                ],
            },
            form: {
                email: '',
                password: '',
                remember_me: true
            }
        }
    },

    methods: {
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$auth.loginWith('local', { data: this.form })//.then(() => {
                    //this.$router.push( { path: '/dashboard' } )
                    //})
                } else {
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped lang="sass">

</style>
