const{
    Connection,PublicKey,clusterApiUrl,KeyPair,LAMPORTS_PER_SOL,Transaction,Account
} = require('@solana/web3.js');

//get public key
const pubKey= new PublicKey('81BUDjRHtJC26Luj8iHf5iuJ9Zc9qN8ov526Xbznayz7')

const getWalletBalance=async()=>{
    try{
        const connection=  new Connection(clusterApiUrl('mainnet-beta'),'confirmed');
        const walletBalance=await connection.getBalance(pubKey);
        console.log('Wallet address is ' + pubKey)
        console.log(walletBalance)
    }
    catch(error){
        console.log(error)
    }
}

getWalletBalance()
