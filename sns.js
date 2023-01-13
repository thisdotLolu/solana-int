// const {
//     getHashedName,
//     getNameAccountKey,
//     NameRegistryState,
// } = require("@solana/spl-name-service");
// const {
//     Connection,
//     PublicKey,
//     clusterApiUrl,
// } = require("@solana/web3.js");
// // Address of the SOL TLD
// const SOL_TLD_AUTHORITY = new PublicKey(
//     "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
// );

// const domain = "nomey.sol"

// const getInputKey = async (input) => {
//     let hashed_input_name = await getHashedName(input);
//     let inputDomainKey = await getNameAccountKey(
//         hashed_input_name,
//         undefined,
//         SOL_TLD_AUTHORITY
//     );
//     return { inputDomainKey: inputDomainKey, hashedInputName: hashed_input_name };
// };


// const main = async () => {
//     const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
//     const { inputDomainKey } = await getInputKey(domain.replace(".sol", ""));
//     const registry = await NameRegistryState.retrieve(
//         connection,
//         inputDomainKey
//     );
//     console.log(registry.owner.toBase58())
// }

// main()
const{
    getHashedName,
    getNameAccountKey,
    NameRegistryState
}= require("@solana/spl-name-service")

const{
    Connection,
    PublicKey,
    clusterApiUrl
}= require("@solana/web3.js")


const accountName= 'knoxtrades.sol'

const SOL_TLD_AUTHORITY= new PublicKey(
    "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
    //  58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx
)

const getDomainKey=async(domain)=>{
    let hashedDomain = await getHashedName(domain)
    let inputDomainKey= await getNameAccountKey(
        hashedDomain,
        undefined,
        SOL_TLD_AUTHORITY
    )
    return {inputDomainKey, hashedDomain}
}

const main=async()=>{
    const connection = new Connection(clusterApiUrl('mainnet-beta'),'confirmed')
    const{inputDomainKey} = await getDomainKey(accountName.replace('.sol',''))
    const registry = await NameRegistryState.retrieve(connection, inputDomainKey)
    console.log(registry.owner.toBase58())
}

main();



