var page_display = new Vue({
  el: "#app",
  data () {
    return {
      currentPage: 0,  
      size: 10,        
      pageRange: 5,   
      items: []         
    }
  },
  mounted () {
    axios
       .get('https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json')
       .then (function(res){page_display.items = res.data;
    });
  },

  methods:{
    size:function(){
      return this.selectLength = this.size;
    }
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
    }
  },
  methods: {
    first () {
      this.currentPage = 0;
      this.selectHandler();
    },
    last () {
      this.currentPage = this.pages - 1;
      this.selectHandler();
    },
    prev () {
      if (0 < this.currentPage) {
        this.currentPage--;
        this.selectHandler();
      }
    },
    next () {
      if (this.currentPage < this.pages - 1) {
        this.currentPage++;
        this.selectHandler();
      }
    },

    pageSelect (index) {
      this.currentPage = index - 1;
      this.selectHandler();
    },

    selectHandler () {
    }
  }
});
//件数変更
var Length_change = new Vue({
  el: '#change_Length',
  data:{
    selectLength:10,
  },
  methods:{
    LengthChange:function(){
      this.selectLength = this.selectLength;
    }
  }
})

