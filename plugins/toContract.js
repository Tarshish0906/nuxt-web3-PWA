import Common from "ethereumjs-common";

export default async function(app, address, pk, functionAbi) {
  const EthereumTx = require("ethereumjs-tx").Transaction;
  const netid = await app.$web3.eth.net.getId();
  // 書き込み時のパラメータ
  var details = await {
    // 仮置きの値
    nonce: 0,
    // ガス代は0
    gasPrice: 0,
    // 最大値に設定
    gasLimit: 8000000,
    // 署名する人
    from: address,
    // 書き込み先のコントラクトのアドレス
    to: app.$contract.options.address,
    // コントラクトの詳細データ
    data: functionAbi
  };
  // 接続するチェーンの情報
  const customCommon = Common.forCustomChain(
    "mainnet",
    {
      name: "privatechain",
      networkId: netid,
      chainId: netid
    },
    "petersburg"
  );

  await app.$web3.eth.getTransactionCount(address, async function(err, nonce) {
    // チェーンから最新の書き込みを取得する
    // ビットコインのナンスとは違い、1ユーザーが同一コントラクトへ書き込みした回数が nonce として取り扱われる
    details.nonce = nonce;
    const transaction = await new EthereumTx(details, { common: customCommon });
    console.log(transaction);
    // 秘密鍵の頭2文字を取り除いて16進数として扱って署名する
    transaction.sign(Buffer.from(pk.slice(2), "hex"));
    // 署名済みのデータをチェーンに書き込む
    var rawdata = (await "0x") + transaction.serialize().toString("hex");
    await app.$web3.eth
      .sendSignedTransaction(rawdata)
      .on("transactionHash", function(hash) {
        console.log(["transferToStanging Trx Hash:" + hash]);
      })
      .on("receipt", async function(receipt) {
        console.log(["transferToStanging Receipt:" + receipt]);
      })
      .on("error", function(error) {
        console.log(error);
      });
  });
}
