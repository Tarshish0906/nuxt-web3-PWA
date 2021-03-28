import Web3 from "web3";
// コントラクトのコンパイル後の設定ファイルの読み込み
import artifacts from "~~/build/contracts/SingleNumRegister.json";

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
    web3 = new Web3(new Web3.providers.HttpProvider(httpEndpoint));
  }
  // チェーンのネットワークIDを取得
  let networkId = await web3.eth.net.getId();
  // コントラクトのインスタンスの初期化
  // 設定ファイルとアドレスが必要
  let contract = new web3.eth.Contract(
    // コントラクトのインスタンス後の設定ファイル
    artifacts.abi,
    // ネットワークID毎に保存されているコントラクトのアドレスを読みこむ
    artifacts.networks[networkId].address
  );
  inject("web3", web3);
  // インスタンスを生やす
  inject("contract", contract);
}
