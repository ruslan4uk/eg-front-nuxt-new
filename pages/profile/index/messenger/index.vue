<template>
  <div class="shadow-md-25 rounded25 p-md-4 mb-4">
    <div class="card-title mb-4">Сообщения</div>

    <div class="messenger d-flex position-relative">
      <div class="messenger__dialogs messenger-dialogs">
        <div class="messenger-dialogs__list">
          <nuxt-link exact :to="{ name: 'profile-index-messenger-index-id', params: { id: dialog.uid }}" class="messenger-dialogs__item position-relative" v-for="(dialog,index) in dialogs" :key="index">
            <el-avatar :size="42" :src="dialog.user_dialog_from.avatar" class="messenger-dialogs__avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            <div class="messenger-dialogs__username">{{ dialog.user_dialog_from.name }}</div>

            <div class="messenger-dialogs__unread-count" v-if="dialog.unread">{{ dialog.unread }}</div>
          </nuxt-link>
        </div>
      </div>
      <div class="messenger__messages" v-if="$route.params.id">
        <NuxtChild :dialogs="dialogs" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    middleware: ['auth'],

    computed: {
      ...mapGetters({
        unread: 'messenger/unread',
        dialogs: 'messenger/dialogs'
      })
    },

    mounted() {
      this.$store.dispatch('messenger/getDialogs');

      window.Echo.private(`messenger.${this.$auth.user.id}`)
        // .listen('Messenger.DialogsEvent', ({message}) => {
          // this.updateUnreadCount( message.dialog_uid, false, message.created_at );
          // this.$store.commit('messenger/SET_DIALOG_UNREAD', message.dialog_uid)
        // })
        .listen('Messenger.NewDialogEvent', ({ dialog }) => {
          this.$store.commit('messenger/SET_NEW_DIALOGS', dialog)
        })
    }

  }
</script>

<style scoped lang="sass">
.messenger
  height: 70vh
  &__dialogs
    height: 100%
    width: 100%
    @media screen and (min-width: 768px)
      width: 28%
      margin-left: -1.5rem
      border-right: 1px solid #EEEEEE
    & a
      color: #405089
      font-weight: 500
      text-decoration: none
  &__messages
    height: 100%
    position: absolute
    background-color: #ffffff
    width: 100%
    @media screen and (min-width: 768px)
      width: calc(100% - 28% + 3rem)
      margin-right: -1.5rem
      position: relative

.messenger-dialogs
  &__item
    display: flex
    align-items: center
    padding: 0.5rem 1.5rem
    &:hover, &.active
      background-color: #EEEEEE
  &__avatar
    flex: 0 0 auto
  &__username
    margin-left: 0.5rem
  &__unread-count
    background-color: #405089
    position: absolute
    font-size: 0.675rem
    font-weight: 300
    right: 1rem
    color: #ffffff
    border-radius: 50%
    width: 1.125rem
    height: 1.125rem
    display: flex
    align-items: center
    justify-content: center
    line-height: 1
</style>
