export default function({ store, redirect, query, router }) {
  if(store.$auth.user) return redirect('/');

  if(query.mail && query.hash) return true;

  if(query.type) return true;

  return redirect('/');

}
