<template>
  <div class="messenger-message">

    <div class="messenger-message__header">
      <nuxt-link :to="{ name: 'profile-index-messenger' }">
        <i class="fas fa-arrow-left"></i> Назад
      </nuxt-link>
      <span class="ml-2 messenger-message__header-username">{{ dialogsName }}</span>
    </div>

    <div class="messenger-message__list" id="js--messenger-list">

      <client-only>
        <infinite-loading direction="top" @infinite="infiniteHandler" spinner="spiral" ref="infiniteLoading">
          <div slot="no-more"><p class="messenger-message__p">Начало диалога</p></div>
          <div slot="no-results"><p class="messenger-message__p">Нет сообщений</p></div>
        </infinite-loading>
      </client-only>

      <div class="messenger-message__item d-flex" v-for="(message,index) in messages" :key="index">
        <div class="messenger-message__avatar">
          <el-avatar :size="42" :src="message.user_message_from.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </div>
        <div class="messenger-message__right">

          <div class="messenger-message__username">
            {{ message.user_message_from.name }}
            <span>{{ message.created_at }}</span>&nbsp;
          </div>

          <div class="messenger-message__text">{{ message.message }}</div>

          <!-- Attach -->
          <div class="messenger-messages__attach d-flex flex-wrap" v-if="message.attach">
            <div class="messenger-messages__attach-item " v-for="(attach, index) in message.attach" :key="index" v-if="attach.type === 'image'">
              <div class="messenger-messages__attach-image mt-1 pr-1 pb-1" >
                <div @click="sendToModalUrl(attach.path.path_full)"> <!-- v-b-modal.modal-md -->
                  <img :src="attach.path.path_crop" v-if="attach.path.path_crop" alt="">
                </div>
              </div>
            </div>
          </div>

          <div class="messenger-messages__attach" v-if="message.attach">
            <div class="messenger-messages__attach-item " v-for="(attach, index) in message.attach" v-if="attach.type === 'file'">
              <div class="messenger-messages__attach-file mt-1 pr-1 pb-1" >
                <i class="fas fa-paperclip"></i><a :href="attach.path" class="ml-2">{{ attach.name }}</a>
              </div>
            </div>
          </div>
          <!-- End attach -->

        </div>
      </div>

      <div class="messenger-message__typing" v-if="typing">
        {{ dialogs.find(x => x.uid === this.$route.params.id).user_dialog_from.name }} набирает текст
      </div>

    </div>

    <div class="messenger-sender">
      <div class="position-relative">
        <el-input placeholder="Please input" v-model="message.text" @keyup.enter.native="sendMessage" class="messenger-sender__input"></el-input>
        <div class="messenger-sender__btn" @click="sendMessage">
          <i class="fas fa-paper-plane"></i>
        </div>

        <Uploader :uid="$route.params.id" @attach="newAttach"></Uploader>

        <div class="messenger-attach" v-if="message.attach">
          <b-row class="m-0 mt-3">
            <b-col cols="6" md="4" lg="3" class="p-1 mb-1" v-for="(item, index) in message.attach" :key="index" v-if="item.type === 'image'">
              <div class="messenger-attach__image position-relative">
                <img :src="item.path.path_crop" alt="">
                <div class="messenger-attach__delete" @click="deleteAttach(index)">
                  <i class="fas fa-times"></i>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>

        <div class="messenger-attach" v-if="message.attach">
          <div class="messenger-attach__item" v-for="(item, index) in message.attach" :key="index">
            <div v-if="item.type === 'file'" class="position-relative pt-2">
              <i class="fas fa-paperclip"></i> {{ item.name }}
              <div class="messenger-attach__delete" @click="deleteAttach(index)">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <b-modal id="modal-md" size="lg" dialog-class="justify-content-center" body-class="p-0" content-class="d-flex w-auto" centered hide-footer hide-header>
      <img :src="modalImageUrl" class="modal-image" alt="" />
    </b-modal>

  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import Uploader from '@/components/Messenger/Uploader'

export default {
  props: ['dialogs'],

  watchQuery: true,

  components: {
    InfiniteLoading,
    Uploader
  },

  data() {
    return {
      page: null,
      messages: [],
      message: {
        text: '',
        attach: [],
      },

      typingTimer: false,
      typing: false,
      modalImageUrl: '',
    }
  },

  computed: {
    dialogsName() {
      let userToId = this.dialogs.find(x => x.uid === this.$route.params.id);
      return (userToId && userToId.user_dialog_from)? 'Диалог с ' + userToId.user_dialog_from.name : ''
    }
  },

  methods: {
    sendMessage() {
      if(this.message.text.length < 1 && this.message.attach.length < 1) return;

      // if(userToId.length < 1) return;

      let userToId = this.dialogs.find(x => x.uid === this.$route.params.id);
      this.$axios.post('/messenger/send', {
        message: this.message.text,
        attach: this.message.attach,
        user_to_id: userToId.user_dialog_from.id || null,
        dialog_uid: this.$route.params.id,
      }).then(({ data }) => {
        this.scrollToBottom();
        this.messages.push(data.data);
        this.message = {
          text: '',
          attach: [],
        }
      });
    },

    infiniteHandler($state) {
      setTimeout(() => {
        this.$axios.get(`/messenger/messages/${this.$route.params.id}/${this.page || ''}`).then(({ data }) => {
          if (data.data.length) {
            data.data.forEach(item => {
              this.page = item.id;
            });
            this.messages.unshift(...data.data.reverse());
            $state.loaded();
          } else {
            $state.complete();
          }
        });
      }, 500)
    },

    scrollToBottom() {
      setTimeout(() => {
        let container = document.getElementById('js--messenger-list');
        container.scrollTop = container.scrollHeight;
      }, 50);
    },

    listenEcho(dialog_uid) {
      window.Echo.private(`messenger-dialog.${dialog_uid}`)
        .listen('Messenger.MessageEvent', ({ message }) => {
          if(this.messages.find(x => x.id === message.id)) return;
          if(message.user_id === this.$auth.user.id) return;
          this.scrollToBottom();
          this.messages.push(message);

          // if(message.dialog_uid !== this.$route.params.id)
            // this.$store.commit('messenger/SET_DIALOG_UNREAD', message.dialog_uid)
        })
        .listenForWhisper('typing', (e) => {
          this.typing = true;

          if(this.typingTimer) clearTimeout(this.typingTimer);

          this.typingTimer = setTimeout(() => {
            this.typing = false;
          }, 700)
        })
    },

    newAttach(attach) {
      this.message.attach.push(attach)
    },

    deleteAttach(index) {
      this.message.attach.splice(index, 1)
    },

    sendToModalUrl(url) {
      this.modalImageUrl = url;
      this.$bvModal.show('modal-md')
    }

  },

  mounted() {
    this.listenEcho(this.$route.params.id);

    this.$store.commit('messenger/DELETE_DIALOG_UNREAD', this.$route.params.id)
  },

  watch: {
    '$route.params.id': function (newVal, oldVal) {
      if(this.$refs.infiniteLoading){
        this.$refs.infiniteLoading.stateChanger.reset();
      }

      this.listenEcho(newVal);
      window.Echo.leave(`messenger-dialog.${oldVal}`);

      this.$store.commit('messenger/DELETE_DIALOG_UNREAD', newVal)
    }
  }

}
</script>

<style scoped lang="sass">
.messenger-message
  height: 100%
  display: flex
  flex-direction: column
  &__list
    height: 100%
    overflow-y: auto
    &::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1)
      background-color: #fefefe
    &::-webkit-scrollbar
      width: 6px
      background-color: #fefefe
    &::-webkit-scrollbar-thumb
      background-color: #cccccc

  &__item
    padding: 0.5rem 1.5rem
    &:hover
      background-color: #f9f9f9
  &__right
    margin-left: 0.5rem
  &__username
    color: #405089
    font-weight: 500
    margin-top: 0.5rem
    & span
      font-size: 0.75rem
      color: #cccccc
      margin-left: 0.25rem
      font-weight: 300
  &__text
    font-weight: 300
  &__typing
    color: #cccccc
    font-weight: 300
    font-size: 0.75rem
    padding: 0 1.5rem
    height: 1.5rem
    display: flex
    align-items: center
  &__p
    font-size: 0.75rem
    color: #999999
    margin-bottom: 1rem
    margin-top: 1rem

  &__header
    display: flex
    justify-content: space-between
    padding: 0.75rem 1rem
    border-bottom: 1px solid #EEEEEE
    background-color: #fafafa
    & a
      color: #405089
      & i
        margin-right: 0.25rem
    &-username
      color: #999999

.messenger-attach
  &__item
    color: #444444
    font-size: 0.875rem
    & svg
      color: #405089
  &__delete
    position: absolute
    top: 0
    right: 1rem
    cursor: pointer
    color: #405089

</style>
