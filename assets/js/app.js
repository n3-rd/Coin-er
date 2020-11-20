var app = new Vue({
  el: "#app",
  data: {
    coinsData: [],
    dialog: false,
    loaded: false,
    changeV: '',
    history: [
  
    ]
  },
  methods: {
    getCoinsData() {
      fetch("https://api.coinranking.com/v1/public/coins")
        .then((response) => response.json())
        .then((json) => (this.coinsData = json.data.coins));
        // this.history = this.coinsData.map(i => {
        //   if(i.history) return i.history;
        //   return 0;
        // });
        this.loaded = true;
    },
    refresh(done) {
      setTimeout(() => {
        this.getCoinsData();
        done();
      }, 1000);
    },
    changeColor: function(ch){
      this.changeV =  ch
    }
  },
  created() {
    this.getCoinsData();
    window.fitText( document.querySelectorAll('.coin-website'), 10 );
  },
  computed: {
    chartSrc() {
      return `https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{data:[${this.history}]}]}}`
    }
  }
});
