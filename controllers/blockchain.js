import { Account, AccountHttp, Address, NetworkType, PublicAccount } from "tsjs-xpx-chain-sdk";

export const generateKeys = (req, res) => {
    const account = Account.generateNewAccount(NetworkType.TEST_NET);
    res.json({
        privateKey: account.privateKey,
        publicKey: account.publicKey,
        address: account.address.pretty(),
    });
};

// VAX5ZG-2HTXXO-OOIHY7-2BARK5-L66XF4-6BOQWE-NU5Q
export const getAccountInfo = (req, res) => {
    const addressString = req.body.address
    const API_URL = "https://bctestnet3.brimstone.xpxsirius.io/";
    const accountHttp = new AccountHttp(API_URL);
    const address = Address.createFromRawAddress(addressString);

    accountHttp.getAccountInfo(address).subscribe(
        (accountInfo) => {
            const address = accountInfo.address.pretty()
            const addressHeight = accountInfo.addressHeight.compact()
            // const xpxMosaicId = accountInfo.mosaics[0].id.id.compact()
            const xpxAmount = accountInfo.mosaics[0].amount.compact()

            res.json({
                address: address,
                addressHeight: addressHeight,
                // xpxMosaicId: xpxMosaicId,
                xpxAmount: xpxAmount
            });
        },
        (error) => {
            res.json(error);
        }
    );
};

export const getAllTransactions = (req, res) => {
    // TODO change this to public key
    // const publicKey = req.body.publicKey;
    const accountHttp = new AccountHttp('http://bctestnet3.brimstone.xpxsirius.io:3000');
    const publicKey = 'EF395EF11C15AED81E06D07CF673F6098947895386879EEA59DD64F6755EF43B';
    const publicAccount =  PublicAccount.createFromPublicKey(publicKey, NetworkType.TEST_NET);
    //TODO if recipient address is the same, +coins, if not minus (frontend work)

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
                    address: t.recipient
                },
                amount: t.mosaics[0].amount.compact(),
                message: t.message.payload,
                direction: publicAccount.address.plain() === t.recipient.address ? "IN" : "OUT"
            }
            transactionList.push({ transferTransaction: transactionInfo })
        })
        res.json({transactions: transactionList});
    }, error => {
        res.json({error: error});
    });
}

// TODO: transfer transaction


// TODO: get block transaction info