import Api from '@/services/Api'

export default {
  fetchTickets() {
    return Api().get('tickets')
  },

  addTicket(params) {
    return Api().post('tickets', params)
  },

  updateTicket(params) {
    return Api().put('tickets/' + params.id, params)
  },

  getTicket(params) {
    return Api().get('tickets/' + params.id)
  },

  deleteTicket(id) {
    return Api().delete('tickets/' + id)
  }
}
