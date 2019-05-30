var list = new Vue({
    el: '#contents',
    data: {
          events: []
    },
    mounted() {
      axios
         .get('https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json')
         .then (responce => {this.events = responce.data})
    },
   
});