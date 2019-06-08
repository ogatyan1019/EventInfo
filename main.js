var select_length = new Vue({
  el: '#change_Length',
  data:{
    length: 10,
  }
})

var display = new Vue({
  el: "#app",
  data : {
    
      keyword:'',
      currentPage: 0,  
      size: 10,        
      pageRange: 4,   
      items: [] ,   
  },

  mounted () {
    axios
       .get('https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json')
       .then (function(res){display.items = res.data;
    });
  },

  computed: {
    pages () {
      return Math.ceil(this.items.length / this.size);
    },
    
    displayPageRange () {
      const half = Math.ceil(this.pageRange / 2);
      let start, end;

      if (this.pages < this.pageRange) {
        start = 1;
        end = this.pages;
      
      } else if (this.currentPage < half) {
        start = 1;
        end = start + this.pageRange - 1;

      } else if (this.pages - half < this.currentPage) {
        end = this.pages;
        start = end - this.pageRange + 1;

      } else {
        start = this.currentPage - half + 1;
        end = this.currentPage + half;
      }
    
      let indexes = [];
      for (let i = start; i <= end; i++) {
        indexes.push(i);
      }
      return indexes;
    },
    displayItems () {
      const head = this.currentPage * this.size;
      return this.items.slice(head, head + this.size);
    },
    isSelected (page) {
      return page - 1 === this.currentPage;
    },

  },

  methods: {
    filter_event:function(){
     
      return this.items.filter(
        item =>(
         item.eveny_name.indexOf(this.keyword) !== -1 ||
         item.start_date.indexOf(this.keyword) !== -1 ||
         item.descriptionindexOf(this.keyword) !== -1 ||
         item.event_place.indexOf(this.keyword) !== -1 ||
         item.event_place_url.indexOf(this.keyword) !== -1 ||
         item.transportation.indexOf(this.keyword) !== -1 ||
         item.contact.indexOf(this.keyword) !== -1 ||
         item.contact_phone_number.indexOf(this.keyword) !== -1 ||
         item.mail_address.indexOf(this.keyword) !== -1 ||
         item.remarks.indexOf(this.keyword) !== -1 ||
         item.category.indexOf(this.keyword) !== -1 
        )&&this.state(items) != 'end'
      ) 
       
     },

    first () {
      this.currentPage = 0;
    },
    last () {
      this.currentPage = this.pages - 1;
    },
    prev () {
      if (0 < this.currentPage) {
        this.currentPage--;
      }
    },
    next () {
      if (this.currentPage < this.pages - 1) {
        this.currentPage++;
      }
    },
    
    state:function(items){
      var nowdate = [new Date().getFullYear,new Date().getMonth+1,new Date().getDate]
      var endDate = items.end_date.split('/')

      if(endDate< nowdate)
      return 'end';
    }
  },
});

