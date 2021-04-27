import Web3 from "web3";
// コントラクトのコンパイル後の設定ファイルの読み込み
import artifacts from "~~/build/contracts/SingleNumRegister.json";

export default async function(context, inject) {
  // 直接プライベートチェーンにつなぐ
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PRIVATE));
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
