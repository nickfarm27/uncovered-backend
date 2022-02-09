import { generateNewAccount } from "../blockchain/newAccount.js";

export const createPrivateKey = (req, res) => {   
    res.json({ privateKey: generateNewAccount() })
};