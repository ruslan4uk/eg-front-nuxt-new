import Echo from 'laravel-echo'

export default function({ app, store, $auth }) {
  if(window.Echo || !$auth.loggedIn) return;

  window.io = require('socket.io-client');

  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'ws.' + window.location.hostname,
    auth: {headers: {Authorization: localStorage.getItem('auth._token.local')}}
  });
  window.Echo.private(`messenger.${$auth.user.id}`)
    .listen('Messenger.DialogsEvent', ({message}) => {
      store.commit('messenger/SET_DIALOG_UNREAD', message.dialog_uid);
    })
}
