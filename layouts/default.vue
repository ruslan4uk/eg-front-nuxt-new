<template>
  <div>
    <navbar />

    <div class="navigation-fix"></div>

    <nuxt />

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/layouts/partials/Navbar'
import Footer from '@/layouts/partials/Footer'
export default {
    components: {
        Navbar,
        Footer,
    }
}
</script>

<style scoped lang="sass">
.navigation-fix
  height: 7.5rem
  display: block
</style>
