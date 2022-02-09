import { Account, AccountHttp, Address, NetworkType } from "tsjs-xpx-chain-sdk";

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
            const xpxMosaicId = accountInfo.mosaics[0].id.id.compact()
            const xpxAmount = accountInfo.mosaics[0].amount.compact()

            res.json({
                address: address,
                addressHeight: addressHeight,
                xpxMosaicId: xpxMosaicId,
                xpxAmount: xpxAmount
            });
        },
        (error) => {
            res.json(error);
        }
    );
};
