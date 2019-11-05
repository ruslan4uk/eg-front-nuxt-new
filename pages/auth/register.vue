<template>
  <section class="auth">
    <b-container>
      <b-row class="footer-fix align-items-center">
        <b-col cols="12" md="8" lg="6" class="my-4">
          <img src="~/assets/images/register.png" alt="">
        </b-col>

        <b-col cols="12" md="8" lg="5" class="ml-lg-auto my-4">
          <div class="auth__title">Сделайте первый шаг!</div>
          <div class="auth__subtitle mb-3">И откройте много нового с сервисом</div>

          <el-form :model="form" :rules="rules" ref="registerForm" label-width="0">
            <el-form-item prop="name">
              <el-input placeholder="Введите ваше имя" v-model="form.name" id="name" name="name"></el-input>
            </el-form-item>

            <el-form-item prop="email" :error="errors.email ? errors.email[0] : ''">
              <el-input placeholder="Введите ваш Email" v-model="form.email" id="email" name="email"></el-input>
            </el-form-item>

            <el-form-item prop="password" :error="errors.password ? errors.password[0] : ''">
              <el-input placeholder="Пароль" v-model="form.password" show-password></el-input>
            </el-form-item>

            <el-form-item prop="password_confirmation" :error="errors.password ? errors.password[0] : ''">
              <el-input placeholder="Подтверждение пароля" v-model="form.password_confirmation" show-password></el-input>
            </el-form-item>

            <el-form-item prop="role" class="mb-2">
              <el-radio-group v-model="form.role" size="medium" class="auth__radio">
                <el-radio-button label="guide">Я гид</el-radio-button>
                <el-radio-button label="tourist">Я турист</el-radio-button>
              </el-radio-group>

            </el-form-item>

            <el-form-item prop="check_data" class="mb-5">
              <el-checkbox v-model="form.check_data" class="mb-0" label="">Согласие на обработку персональных данных</el-checkbox>
            </el-form-item>

            <el-button type="primary" round class="w-100 py-3" @click="register('registerForm')">От винта!</el-button>

          </el-form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
    data() {
        let validateBool = (rule, value, callback) => {
            if (value === false) {
                callback(new Error('Необходимо согласие на обработку данных'));
            } else {
                callback();
            }
        };
        let validateLength = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('Минимальная длина 6 символов'))
            } else {
                callback();
            }
        };
        let validateConfirmation = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('Минимальная длина 6 символов'))
            } else if (this.form.password !== this.form.password_confirmation) {
                callback(new Error('Пароли не совпадают'));
            } else {
                callback();
            }
        };
        return {
            rules: {
                name: [
                    { required: true, message: 'Поле Имя обязательно для заполнения', trigger: ['blur', 'change'] },
                ],
                email: [
                    { required: true, message: 'Поле Email обязательно для заполнения', trigger: ['blur', 'change'] },
                    { type: 'email', message: 'Вы ввели не корректный Email адрес', trigger: ['blur', 'change'] }
                ],
                password: [
                    { validator: validateLength, trigger: ['blur', 'change'] }
                ],
                password_confirmation: [
                    { validator: validateConfirmation, trigger: ['blur', 'change'] }
                ],
                check_data: [
                    { validator: validateBool, message: 'Необходимо согласие на обработку данных', trigger: ['blur', 'change'] }
                ],

            },
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: 'guide',
                check_data: false
            }
        }
    },

    methods: {
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/auth/register', this.form).then( ({ data }) => {
                        this.$router.push({ name: 'auth-confirm' })
                    });

                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped lang="sass">

</style>
