export default function({ $axios, store, app, redirect, error }) {

  $axios.interceptors.response.use(response => {

    return response;

  }, responseError => {
    switch (responseError.response.status) {
      case 401:
        store.$auth.reset();
        store.$auth.logout();
        break;
      case 422:
        store.dispatch('validation/setErrors', responseError.response.data.errors);
        break;
      // case 404:
      //   error({ statusCode: 404, message: 'Post not found from interceptor' });
      //   break;
      default:
        break;
    }
    return Promise.reject(responseError)
  });

  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors');
  });
}
