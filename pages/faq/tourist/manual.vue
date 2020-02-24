<template>
  <div class="footer-fix">
    <section class="faq">
      <b-container>
        <b-row>
          <b-col>
            <div class="faq__title text-center">Инструкция по пользованию сайтом для туриста</div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="faq-content">
      <b-container>
        <b-row>
          <b-col>
            <div class="shadow-md-25 pt-5 p-md-5">
              <div class="h5 mb-4">
                Инструкция по заполнению профиля для туриста со скринами
              </div>
              <ol>
                <li>
                  На главной странице в поисковой строке введите город, который планируете посетить
                </li>
                <li>
                  Перед вами откроется страница со всеми экскурсиями в этом городе, а также две вкладки - “Экскурсии” и “Гиды”.
                  Во вкладке “Экскурсии” вы можете:<br/>
                  - открыть каждую экскурсию и изучить маршрут, посмотреть фотографии, познакомиться с гидом<br/>
                  - понравившиеся экскурсии вы можете добавить в избранное, нажав на маленькое сердечко в правом верхнем углу<br/>
                  - написать сообщение гиду и узнать все подробности  - в левом верхнем углу “написать сообщение”
                </li>
                <li>Во вкладке “Гиды” вы можете выбрать понравившегося гида и ознакомиться со всеми его экскурсиями, перейдя на его страницу</li>
                <li>Не стесняйтесь пользоваться мессенджером, гиды с радостью ответят на все ваши вопросы и подробнее расскажут о тонкостях экскурсии!</li>
              </ol>
              <div class="h6 mb-5 mt-5">Скриншоты:</div>
              <div class="text-center">
                <img src="~assets/images/faq/tourist/t1.png" alt="" class="mb-4">
                <img src="~assets/images/faq/tourist/t2.png" alt="" class="mb-4">
                <img src="~assets/images/faq/tourist/t3.png" alt="" class="mb-4">
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
        title: 'Excursguide - Инструкция по заполнению профиля для туриста со скринами',
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
