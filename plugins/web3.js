import Web3 from "web3";

export default async function(context, inject) {
  let web3;

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch(error => {
      // アカウントの取得を拒否されたユーザー
      console.log(error);
    });
  } else if (
    typeof window !== "undefined" &&
    typeof window.web3 !== "undefined"
  ) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // httpEndpoint で接続するブロックチェーンの情報を設定する
    const httpEndpoint = "http://127.0.0.1:7545";
    web3 = new Web3(new web3.providers.HttpProvider(httpEndpoint));
  }
  inject("web3", web3);
}
