<template>
  <div v-if="$auth.user" :class="$auth.user.favorite_tour.find(x => x === id) ? 'favorite-heart active' : 'favorite-heart'" @click="handleFavorite">
    <i class="far fa-heart"></i>
  </div>
</template>

<script>
  export default {
    props: ['id', 'type'],

    methods: {
      handleFavorite() {
        if(this.$auth.user.favorite_tour.find(x => x === this.id)) {
          this.$axios.post('/front/favorite/delete', {id: this.id}).then( ({ data }) => {
            this.$auth.fetchUser();
            this.$notify.info({
              title: 'Внимание',
              message: 'Экскурсия удалена из избранного',
            });
            this.$emit('delete', this.id);
          })
        } else {
          this.$axios.post('/front/favorite/add', {id: this.id}).then( ({ data }) => {
            this.$auth.fetchUser();
            this.$notify({
              title: 'Внимание',
              message: 'Экскурсия добавлена в избранное',
              type: 'success'
            });
          })
        }
      }
    }
  }
</script>

<style lang="sass">
  .favorite-heart
    position: absolute
    top: 1rem
    right: 1rem
    display: inline
    width: auto !important
    z-index: 2
    cursor: pointer
    & i
      font-size: 1.25rem
      font-weight: 400
      color: #405089
      transition: all ease 0.25s
    &:hover i
      transform: scale(1.15)
    &.active i
      &:before
        font-weight: 900
</style>
