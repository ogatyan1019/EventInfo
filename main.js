var serch = new Vue({
    el: '#seachform',
    data:{
       before_key_words:'',
       key_words:'',
    },
    methods:{
      reset:function(){
        list.currentPage = 0;
        this.before_key_words = this.key_words;
      },
    }
})
//ページボタン関連
new Vue({
  el: '#pagenation',
  data:{
    page :0,
    dispItemSize : 10,
    AlleventNo: []
  },

  methods:{
    selected_Length: function(){
      return this.dispItemSize = selectLength;
    },
    inEventNo:function(){
        return this.AlleventNo = events;
    } ,
    showFirst: function() {
      this.page = 0;
    },
    showPrev: function() {
      if (this.isStartPage) return;
      this.page--;
    },
    showNext: function() {
      if (this.isEndPage) return;
      this.page++;
    },
    showLast: function() {
      this.page = Math.floor((this.AlleventNo.length - 1) / this.dispItemSize);
    },
     showPage: function(index) {
      this.page = index;
  }
  },
  
  computed:{
    dipsItems: function() {
        var startPage = this.page * this.dispItemSize;
        return this.data.slice(startPage, startPage + this.dispItemSize);
      },
    isStartPage: function(){
        return (this.page == 0);
      },
    isEndPage: function(){
        return ((this.page + 1) * this.dispItemSize >= this.data.length);
      },
    pageCount: function() {
        return Math.ceil(this.data.length / this.dispItemSize);
      }
}

})
//件数変更
var Length_change = new Vue({
  el: '#change_Length',
  data:{
    selectLength:10,
  },
  methods:{
    LengthChange:function(){
      this.selectLength = selectLength;
    }
  }
})

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

  methods:{
    state: function(event){
      var nowDate = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];
      var eventStartDate = event.start_date;
      var eventEndDate = event.end_date;

      if(eventStartDate < nowDate)
          return '開催予定';
      if(nowDate < eventEndDate)
          return '終了';
      return '開催中';
    },
    Length_change: function(){
      return Length_change.selectLength
    }
   }   
 
});