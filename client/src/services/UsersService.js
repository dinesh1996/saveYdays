import Api from '@/services/Api'

export default {
  getCurrent(params) {
    console.log('params', params);
    return Api().get('users/current', {
      headers: {
        Authorization: `Bearer ${params}`
      }

    })
  },

  register(params) {
    return Api().post('users/register', params)
  },

  login(params) {

    return Api().post('users/login', params)
  },
  activeUser(params) {

    return Api().post('users/active/' + params)
  }

}
