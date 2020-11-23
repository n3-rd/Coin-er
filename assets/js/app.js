
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
    generateChangeColorAndGraph: function(ch, history, coinColor){
      this.changeV =  ch
      Chartist.precision = 8;

      setTimeout(function(){
        var chart = new Chartist.Line('.historyChart', {
          
          series: [
            history
          ]
        }, {
          showArea: true,
          showPoint: false,
          fullWidth: true
        });
        chart.on('draw', function(data) {
          if(data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 2000 * data.index,
                dur: 2000,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          }
      setTimeout(function(){
        document.querySelector('.ct-series-a .ct-line').style.stroke = coinColor
        document.querySelector('.ct-series-a .ct-area, .ct-series-a .ct-slice-donut-solid, .ct-series-a .ct-slice-pie').style.fill = coinColor

      }, 200)

        });
      }, 900)

     
      
    },
    setDarkMode: function(){
      
    }
  },
  created() {
    this.getCoinsData();
    window.fitText( document.querySelectorAll('.coin-website'), 10 );
  }
});

