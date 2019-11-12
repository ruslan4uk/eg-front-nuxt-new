<template>
  <el-form>
    <div class="shadow-md-25 rounded25 p-md-4 mb-4">
      <div class="card-title mb-4">Сменить пароль</div>

      <b-row>
        <b-col cols="12" md="6">
          <div class="card-subtitle mb-1">Старый пароль</div>
          <el-form-item :error="errors.current_password ? errors.current_password[0] : ''">
            <el-input v-model="form.current_password" placeholder="Старый пароль" show-password></el-input>
          </el-form-item>
        </b-col>

        <b-col cols="12" md="6">
          <div class="card-subtitle mb-1">Новый пароль</div>
          <el-form-item :error="errors.new_password ? errors.new_password[0] : ''">
            <el-input v-model="form.new_password" placeholder="Новый пароль" show-password></el-input>
          </el-form-item>
        </b-col>
      </b-row>
    </div>

    <el-form-item class="text-center">
      <el-button type="primary" icon="el-icon-check" native-type="submit" @click.prevent="save('changeForm')">Сохранить изменения</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
    middleware: ['auth'],

    data() {
        return {
            form: {
                current_password: '',
                new_password: '',
            }
        }
    },

    methods: {
        save() {
            this.$axios.post('/auth/change-password', this.form).then( ({ data }) => {
                this.$notify({ title: 'Отлично!', message: 'Пароль успешно изменен!', type: 'success', duration: 5000 });
            }).catch( () => {
                this.$notify({ title: 'Ошибка!', message: 'Что то пошло не так!', type: 'error', duration: 5000 });
                return false;
            })
        }
    }
}
</script>

<style scoped lang="sass">

</style>
