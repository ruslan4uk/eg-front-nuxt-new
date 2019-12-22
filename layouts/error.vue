<template>
  <div>
    <navbar />

    <div class="navigation-fix"></div>

    <div class="footer-fix text-center py-5">
      <h1 class="h1">404</h1>
      <h2 class="h2" v-if="error.statusCode === 404">Упс =) Такой страницы у нас нет!</h2>
      <nuxt-link to="/"><strong>На главную</strong></nuxt-link>
    </div>

    <Footer />
  </div>
</template>

<script>
  import Navbar from '@/layouts/partials/Navbar'
  import Footer from '@/layouts/partials/Footer'
  export default {
    props: ['error'],
    components: {
      Navbar,
      Footer,
    }
  }
</script>
