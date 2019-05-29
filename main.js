var list = new Vue({
    el: '#main',
    data () {
      return {
        events: []
      }
    },
    mounted () {
      axios
         .get('https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json')
        .then(response => (this.events= response.data.events))
    }
  })