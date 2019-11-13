<template>
  <div>
    <div class="h5 mb-3">Обо мне</div>

      <p class="user-profile__about mb-4">{{ user.about }}</p>

  </div>
</template>

<script>
export default {
    props: ['user'],

    filters: {
        truncate(string, value) {
            let truncate = (string || '').substring(0, value);

            if( string && truncate ) {
                if( string.length > truncate.length ) return truncate + '…'
            }
            return truncate;
        }
    }
}
</script>

<style scoped lang="sass">

</style>
