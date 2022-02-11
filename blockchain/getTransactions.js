import { AccountHttp, NetworkType, PlainMessage, PublicAccount, UInt64 } from "tsjs-xpx-chain-sdk";

const accountHttp = new AccountHttp('http://bctestnet3.brimstone.xpxsirius.io:3000');

const publicKey = '76F4540F5CC7D8B6E7B7A680A2D51AA2306A0112CB14B7BFCA25FB3EA2F0F8B3';
const publicAccount =  PublicAccount.createFromPublicKey(publicKey, NetworkType.TEST_NET);

accountHttp.transactions(publicAccount).subscribe(tx => {
    let transactionList = []
    tx.forEach(t => {
        const transactionInfo = {
            signature: t.signature,
            signer: {
                publicKey: t.signer.publicKey,
                address: t.signer.address
            },
            blockInfo: {
                height: t.transactionInfo.height.compact(),
                id: t.transactionInfo.id,
                hash: t.transactionInfo.hash,
                merkleComponentHash: t.transactionInfo.merkleComponentHash
            },
            recepient: {
                address: t.recipient.address
            },
            amount: t.mosaics[0].amount.compact(),
            message: t.message.payload
        }
        transactionList.push({ transferTransaction: transactionInfo })
    })
    console.log(transactionList);
    // console.log(tx[1].transactionInfo.height.compact());
    // console.log(tx[3].mosaics[0].amount.compact());
    // console.log(tx[3].message.payload);
}, error => {
    console.error(error);
}, () => {
    console.log('done.');
});