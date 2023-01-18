const {
Connection,
Keypair,
PublicKey,
clusterApiUrl,
Transaction,
sendAndConfirmTransaction,
SystemProgram,
LAMPORTS_PER_SOL
}=require('@solana/web3.js');



const fromWallet=new Keypair();
const toWallet=new Keypair();


//collect airdrop
const requestDevAirdrop= async (fromWalletParam)=>{
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
    const fromPubKey= new PublicKey(fromWalletParam._keypair.publicKey);
    const requestSignature = await connection.requestAirdrop(fromPubKey, 1 * LAMPORTS_PER_SOL)
    const confirmSignature = await connection.confirmTransaction(requestSignature);

    }
    catch(err){
        console.log(err);
    }
}

//code snippet copied



//transfer SOLANA
const transferSOL = async(fromWalletParam,toWalletParam,amount)=>{
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed');
        const fromPubKey= new PublicKey(fromWalletParam._keypair.publicKey);
        const toPubKey= new PublicKey(toWalletParam._keypair.publicKey)    

        const txn = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: fromPubKey,
                toPubkey: toPubKey,
                lamports: amount * LAMPORTS_PER_SOL
            })
        )
        const sig= await sendAndConfirmTransaction(
            connection,
            txn,
            [fromWalletParam]
        )  
       
        console.log(sig)
        return sig
    }catch(err){
        console.log(err)
    }
}


const getWalletBalance= async(fromWalletParam)=>{
    const connection = new Connection(clusterApiUrl('devnet'),'confirmed');
    const fromPubKey = new PublicKey(fromWalletParam._keypair.publicKey)
    const balance =await connection.getBalance(fromPubKey);
    console.log(balance)
    console.log(balance/LAMPORTS_PER_SOL)
    return balance / LAMPORTS_PER_SOL
}


const main=async(fromWalletParam, toWalletParam,amount)=>{
    await getWalletBalance(fromWalletParam);
    await requestDevAirdrop(fromWalletParam);
    await getWalletBalance(fromWalletParam);
    await transferSOL(fromWalletParam, toWalletParam, amount)
    await getWalletBalance(fromWalletParam);
}

main(fromWallet,toWallet,0.5);









