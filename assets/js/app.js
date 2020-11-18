var app = new Vue({
  el: "#app",
  data: {
    coinsData: [],
    dialog: false,
  },
  methods: {
    getCoinsData() {
      fetch("https://api.coinranking.com/v1/public/coins")
        .then((response) => response.json())
        .then((json) => (this.coinsData = json.data.coins));
    },
    refresh(done) {
      setTimeout(() => {
        this.getCoinsData();
        done();
      }, 1000);
    },
  },
  created() {
    this.getCoinsData();
  },
});
