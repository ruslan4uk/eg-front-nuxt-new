<template>
  <div class="footer-fix">
    <section class="faq">
      <b-container>
        <b-row>
          <b-col>
            <div class="faq__title text-center">Информация</div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="faq-navigation">
      <b-container>
        <b-row>
          <b-col>
            <div class="shadow-md-25">
              <br/><br/>
              <div class="faq-navigation__title">Часто задаваемые вопросы</div>
              <div class="faq-navigation__row">
                <nuxt-link :to="{name: 'faq-tourist'}" class="faq-navigation__item">
                  <div class="h5">Для туриста</div>
                  <p class="p-0 m-0">В данном разделе находятся часто задаваемые вопросы по использованию сервиса если вы турист</p>
                </nuxt-link>

                <nuxt-link :to="{name: 'faq-guide'}" class="faq-navigation__item">
                  <div class="h5">Для гида</div>
                  <p class="p-0 m-0">В данном разделе находятся часто задаваемые вопросы по использованию сервиса если вы гид</p>
                </nuxt-link>
              </div>

              <div class="faq-navigation__title">Инструкции по пользованию сайтом</div>
              <div class="faq-navigation__row">
                <nuxt-link :to="{name: 'faq-tourist-manual'}" class="faq-navigation__item">
                  <div class="h5">Инструкция по пользованию сайтом для туриста</div>
                  <p class="p-0 m-0">Инструкция по пользованию сайтом для туриста со скринами: куда что вводить, чтобы найти нужную экскурсию, как пользоваться мессенджером</p>
                </nuxt-link>

                <nuxt-link :to="{name: 'faq-guide-manual'}" class="faq-navigation__item">
                  <div class="h5">Инструкция по заполнению профиля для гида</div>
                  <p class="p-0 m-0">Инструкция по заполнению профиля для гида со скринами: какие поля необходимо заполнить, выбирать качественные фотографии, проверить все данные</p>
                </nuxt-link>
              </div>

              <div class="faq-navigation__title">Инструкции по Мобильным приложениям (в разработке)</div>
              <div class="faq-navigation__row">
                <nuxt-link :to="{name: 'index'}" class="faq-navigation__item">
                  <div class="h5">Приложение Android</div>
                  <p class="p-0 m-0">В данном разделе находятся часто задаваемые вопросы по использованию сервиса если вы гид</p>
                </nuxt-link>

                <nuxt-link :to="{name: 'index'}" class="faq-navigation__item">
                  <div class="h5">Приложение IPhone</div>
                  <p class="p-0 m-0">В данном разделе находятся часто задаваемые вопросы по использованию сервиса если вы гид</p>
                </nuxt-link>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  export default {
    layout: 'main',

    head() {
      return {
        title: 'Excursguide - Часто задаваемые вопросы',
        meta: [{
          name: 'description',
          content: 'Собрались отправиться в отпуск? Хочется приключений? Начните свое путешествие прямо сейчас. Просто выберете интересующий вас город в поиске и отправляйтесь в тур по гидам, найдя самую интересную экскурсию'
        }, {
          name: 'keywords',
          content: 'Гиды, туры, excursguide, excursguide.ru, отправится в путешествие'
        }],
      }
    },
  }
</script>

<style lang="sass">

</style>
