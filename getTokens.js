
const{
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL
}=require('@solana/web3.js')
const request = require('request')

const tokenProgram='TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';


const getTokens=async()=>{
try{
    const connection = new Connection(clusterApiUrl('mainnet-beta'),'confirmed')
    const tokenAccounts= await connection.getParsedTokenAccountsByOwner(new PublicKey('DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo'),{
        programId: new PublicKey(tokenProgram)   
    }
  )
  console.log(tokenAccounts)

  let nonZeroAccounts = tokenAccounts?.value?.filter(
    (obj)=>obj.account.data.parsed.info.tokenAmount.uiAmount > 0
  );
  
  console.log(nonZeroAccounts)

  let mapAccountData = nonZeroAccounts.map(obj=>obj.account.data.parsed.info)
  
  console.log(mapAccountData);
  
  const url='https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json';

  request.get({
    url:url,
    json:true,
  },(err,res,data)=>{
    if(err){
        console.log('Error:',err)
    }else if(res.statusCode !== 200){
        console.log('Status:', res.statusCode);
    }else{
        for(address of data.tokens){
           for(acct of nonZeroAccounts){
            if(address.address === acct.account.data.parsed.info.mint){
                console.log(`the token ${address.symbol} exists and has a balance of ${acct.account.data.name}`)
            }
           } 
        }
    }
  }
  )
//   for(let acct of nonZeroAccounts){
//     if(acct.account.data.parsed.info.mint==='8o66EVAf4u2Hr21m2tuRrPtEXFPLr8G8aL1ETStP8fDu'){
//         console.log(`VIBE token balance is ${acct.account.data.parsed.info.tokenAmount.amount / LAMPORTS_PER_SOL}`)
//     }
//   }
}
catch(error){
    console.log(error)
  }
}


getTokens()