<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-web3</h1>
      <div class="links">
        <input type="text" v-model="inputNumber" placeholder="input number" />
        <button @click="setNumber()">
          Set Number to contract
        </button>
      </div>
      <div class="links">
        <button @click="getNumber()">
          Get Number from contract
        </button>
      </div>
      <div>Number:{{ number }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // コントラクトから取得する数値
      number: 0,
      // フォームから入力された数値
      inputNumber: 0
    };
  },
  methods: {
    getNumber: async function() {
      // コントラクトからの読み込み部分
      let ret = await this.$contract.methods.get().call();
      // フロントへ反映
      this.number = ret;
    },
    setNumber: async function() {
      // MetaMaskで使っているアカウントの取得
      let accounts = await this.$web3.eth.getAccounts();
      let account = accounts[0];
      // コントラクトへの書き込み部分
      let ret = await this.$contract.methods
        .set(this.inputNumber)
        .send({ from: account });
    }
  },
  mounted() {
    console.log("Current Block Number");
    // その時点でのBlockHeight、つまり承認済みの最新のブロックの番号を返してくれるメソッド
    this.$web3.eth.getBlockNumber().then(console.log);
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
