
var app = new Vue({
  el: "#app",
  data: {
    coinsData: [],
    dialog: false,
    loaded: false,
    changeV: '',
    // darkMode: localStorage.getItem('darkModeStatus'),
    history: [
  
    ]
  },
  methods: {
    getCoinsData() {
      fetch("https://api.coinranking.com/v1/public/coins")
        .then((response) => response.json())
        .then((json) => (this.coinsData = json.data.coins));
        this.loaded = true;
    },
    refresh(done) {
      setTimeout(() => {
        this.getCoinsData();
        done();
      }, 1000);
    },
    generateChangeColorAndGraph: function(ch, history){
      this.changeV =  ch
      Chartist.precision = 8;

      setTimeout(function(){
        new Chartist.Line('.historyChart', {
          
          series: [
            history
          ]
        }, {
          showArea: true,
          showPoint: false,
          fullWidth: true
        });
      }, 1000)
     
      
    },
    setDarkMode: function(){
      
    }
  },
  created() {
    this.getCoinsData();
    window.fitText( document.querySelectorAll('.coin-website'), 10 );
  }
});

