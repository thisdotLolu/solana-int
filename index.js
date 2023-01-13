const{
    Connection,
    PublicKey,
    Account,
    connectionApiUrl,
    Transaction,
    Keypair,
    LAMPORTS_DAO_SOL,
    clusterApiUrl
} = require('@solana/web3.js');

const devKeys = new Keypair();
const pubKey= new PublicKey(devKeys._keypair.publicKey).toString();
const privKey= devKeys._keypair.secretKey;
console.log(pubKey);
console.log(privKey);

const getWalletBalance=async ()=>{
    try {
    const connection = new Connection(clusterApiUrl('devnet'),'confirmed'); 
    const myWallet= await Keypair.fromSecretKey(privKey)
    const walletBalance= await connection.getBalance(new PublicKey(myWallet.publicKey));
    console.log('Wallet address is'+ myWallet.publicKey.toString() + 'and balance is' + walletBalance);    
    } catch (error) {
        console.log(error)
    }
    
}

const requestAirdrop = async()=>{
    try{
    const connection = new Connection(clusterApiUrl('devnet'),'confirmed'); 
    const myWallet=await Keypair.fromSecretKey(privKey)
    const airdropSignatureResult= await connection.requestAirdrop(new PublicKey(myWallet.publicKey),2*LAMPORTS_DAO_SOL);//returns a txn id
    const latestBlockHash = await connection.getLatestBlockhash();
    
    await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignatureResult,
});    
    }catch(err){
        console.log(err)
    }
}



main =async()=>{
    await getWalletBalance();
    await requestAirdrop()
    await getWalletBalance()
}

main();

