<template>
  <div class="footer-fix">
    <section class="faq">
      <b-container>
        <b-row>
          <b-col>
            <div class="faq__title text-center">Часто задаваемые вопросы</div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="faq-content">
      <b-container>
        <b-row>
          <b-col>
            <div class="shadow-md-25 pt-5 p-md-5">
              <div class="h5">Как активировать аккаунт, если ссылка не активна?</div>
              <p>
                Если вы зашли на почту и перешли по ссылке активации, но все равно не можете зайти в личный кабинет,
                то просто перезагрузите страницу :)
              </p>
              <el-divider></el-divider>

              <div class="h5">Как сменить пароль?</div>
              <p>
                Для того, чтобы сменить пароль, зайдите в личный кабинет и в верхнем левом углу выберите “Сменить пароль”.
                Введите старый и придумайте новый пароль, нажмите “Сохранить изменения”.
              </p>
              <el-divider></el-divider>

              <div class="h5">Как добавить новую экскурсию/тур?</div>
              <p>
                Зайдите в личный кабинет и в верхнем левом углу нажмите “Новый тур”. На открывшейся странице заполните
                ВСЕ разделы, загрузите фотографии и нажмите “Сохранить”. После этого ваша экскурсия отправляется на
                модерацию. Если вы до конца заполнили профиль и ваша экскурсия отвечает всем требованиям - поздравляем,
                вы опубликованы!
              </p>
              <el-divider></el-divider>

              <div class="h5">Сколько экскурсий я могу добавить?</div>
              <p>
                Вы можете добавить столько экскурсий, сколько требует ваша душа! Все созданные вами продукты отображаются
                в разделе “Список туров” в левом верхнем углу личного кабинета.
              </p>
              <el-divider></el-divider>

              <div class="h5">Как сделать так, чтобы мои экскурсии отображались?</div>
              <p>
                Экскурсии отображаются лишь у тех пользователей, кто заполнил профиль на 100%. Для этого в левом верхнем
                углу нажмите на Настройки профиля и заполните все имеющиеся графы.
              </p>
              <el-divider></el-divider>

              <div class="h5">Что я могу написать в поле “О себе”?</div>
              <p>
                Раздел “О себе” создан для того, чтобы вы смогли похвастаться своим опытом путешествий и знаниями,
                которыми хотите делиться. Заполненный раздел вызывает доверие у туристов и увеличивает ваши
                шансы на продажу экскурсии.
              </p>
              <el-divider></el-divider>

              <div class="h5">Как я узнаю, что на мою экскурсию кто-то хочет прийти?</div>
              <p>
                Регулярно проверяйте мессенджер - туристы часто задают вопросы о деталях экскурсии. Мессенджер
                находится в личном кабинете в левом верхнем углу.
              </p>
              <el-divider></el-divider>

              <div class="h5">Куда я могу обратиться, если у меня много вопросов и я не могу найти на них ответ?</div>
              <p>
                Вы всегда можете написать нам в службу поддержки на <a href="mailto:info@excursguide.ru">info@excursguide.ru</a>.
                Мы с радостью ответим на ваши вопросы и поможем разобраться с использованием сайта ;)
              </p>
              <el-divider></el-divider>

              <div class="h5">
                Заполнение профиля - очень важный этап, так как экскурсии будут отображаться лишь у тех пользователей,
                кто заполнил профиль на 100%.
              </div>
              <ol>
                <li>Пройди по ссылке из письма в личный кабинет. Если ссылка неактивна, перезагрузите сайт</li>
                <li>Введи заново логин и пароль</li>
                <li>В верхнем правом углу кликни на свое имя</li>
                <li>Из выпадающего меню выбери настройки профиля</li>
                <li>
                  Заполни все колонки:  имя, знание языка, город, где ты осуществляешь деятельность, виды деятельности,
                  номер телефона и мессенджеры. Не забудь рассказать о себе и добавить фото (jpeg) - это вызывает доверие
                  путешественников и увеличивает шансы на продажу ;)
                </li>
                <li>
                  Поздравляем - твой профиль на модерации! Скоро придет уведомление об успешной проверке и одобрении
                  профиля, после чего тебя смогут увидеть туристы в выбранном регионе.
                  А пока, чтобы не терять время, добавь свои экскурсии.
                </li>
              </ol>


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
