
# TrustPoll

**TrustPoll** is a decentralized polling platform built on the Ethereum blockchain, designed to enable secure, transparent, and tamper-proof voting. This platform allows users to create, vote on, and explore various polls, ensuring each vote is auditable and recorded on the blockchain.



## Features

- **Decentralized Polling**: All votes are securely stored on the Ethereum blockchain, ensuring tamper-proof results.
- **Custom Polls**: Users can create their own polls with custom options, allowing for flexibility in voting topics.
- **Real-Time Voting Results**: Poll results are updated in real-time and can be viewed by anyone.
- **Ethereum Wallet Integration**: Users can connect their Ethereum wallets (e.g., MetaMask) to participate in or create polls.
- **Responsive UI**: Intuitive and easy-to-use interface developed with Next.js, offering a smooth user experience across devices.

## Tech Stack

- **Smart Contracts**: Solidity
- **Front-End**: Next.js
- **Blockchain Interaction**: Ethers.js
- **Wallet Integration**: MetaMask


## Prerequisites

- Node.js (v14+)
- MetaMask (or any Ethereum-compatible wallet)
## Installation

Install my-project with npm

```bash
    git clone https://github.com/{YOUR-USERNAME}/TrustPoll.git
    cd TrustPoll
```

Install dependencies

```bash
    npm install
```

Add enviornment variables


- Set the **NEXT_PUBLIC_CONTRACT_ADDRESS** to the deployed contract address on the desired Ethereum network.  

- Include any additional configuration in **.env.local**.


Run the development server

```bash
    npm run dev
```

Open http://localhost:3000 to view the project in the browser.
## Deploying Smart Contract

- Compile and deploy the smart contract **(Voting.sol)** on your desired Ethereum test network (e.g., Sepolia).

- Note the contract address and replace the **NEXT_PUBLIC_CONTRACT_ADDRESS** in the **.env.local** file.


## Usage

- Connect Wallet: Use the "Connect Wallet" button to link your Ethereum wallet.
- Create a Poll: Enter your question and options, then submit to create a new poll.
- Vote: Browse available polls and cast your vote. Your vote will be securely recorded on the blockchain.
- View Results: Poll results are displayed in real-time, showing the number of votes per option.

**Note-** The I'd thatll be given after adding the question will be used to acess the poll
**Don't lose it**
## License

Refer to **LICENSE.md**


## Authors

- [@Yashdeep-singh2006](https://github.com/Yashdeep-singh2006)


## Acknowledgements

 Special thanks to the open-source community and Ethereum developers for providing resources and inspiration.


## Contributing

Feel free to contribute to TrustPoll and help enhance secure voting in the Web3 ecosystem!




## Bugs

for reporting any kind of bug please contact yashdeepsingh110200@gmail.com.