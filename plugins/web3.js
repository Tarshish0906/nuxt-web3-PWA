import Web3 from "web3";

export default async function(context, inject) {
  // ここを変えればいろんなチェーンに繋げられる
  // httpEndpoint で接続するブロックチェーンの情報を設定する
  const httpEndpoint = "http://127.0.0.1:7545";
  const web3 = new Web3(new Web3.providers.HttpProvider(httpEndpoint));

  inject("web3", web3);
}
