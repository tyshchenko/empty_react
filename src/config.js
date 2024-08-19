const env = process.env.REACT_APP_ENV;

const prodConfig = {
  version: 'v1.0.0',
  name: 'Mainnet',
  chainid: '0x2b6653dc',
  testnet: false,
  relayer: 'TLwpQv9N6uXZQeE4jUudLPjcRffbXXAuru',
  chain: {
    privateKey: '01',
    fullHost: 'https://cors-anywhere.herokuapp.com/api.trongrid.io'
  },
  trongrid: {
    host: 'https://api.trongrid.io',
    hostname: 'api.trongrid.io',
    key: 'eb311b22-c773-4953-a2e0-b255be7568cc'
  },
  service: {},
  contract: {
    tronenergize: 'TP5e45bVKt9So6Z8ac3HLBSZgqRm2pg6en',
    usdt: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
  },
  defaultDecimal: 6,
  tronLinkTime: 8,
  justSwap: 'https://justswap.org/',
  tronscanUrl: 'https://tronscan.io/#'
};


const devConfig = {
  version: 'v1.0.0',
  name: 'Nile',
  chainid: '0xcd8690dc',
  testnet: true,
  relayer: 'TLwpQv9N6uXZQeE4jUudLPjcRffbXXAuru',
  chain: {
    privateKey: '01',
    fullHost: 'https://api.shasta.trongrid.io'
  },
  trongrid: {
    host: 'https://api.shasta.trongrid.io',
    hostname: 'api.shasta.trongrid.io',
    key: 'xxxxxx'
  },
  service: {},
  contract: {
    tronenergize: 'TP5e45bVKt9So6Z8ac3HLBSZgqRm2pg6en',
    usdt: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
  },
  defaultDecimal: 6,
  tronLinkTime: 8,
  justSwap: 'https://justswap.org/',
  tronscanUrl: 'https://shasta.tronscan.io/#'
}

const devNileConfig = {
  version: 'v1.0.0',
  name: 'Nile',
  chainid: '0xcd8690dc',
  testnet: true,
  relayer: 'TLwpQv9N6uXZQeE4jUudLPjcRffbXXAuru',
  chain: {
    privateKey: '01',
    fullHost: 'https://nile.trongrid.io',
  },
  trongrid: {
    host: 'https://cors-anywhere.herokuapp.com/api.nileex.io',
    hostname: 'api.nileex.io',
    
    key: 'xxxxxx'
  },
  service: {},
  contract: {
    tronenergize: 'TP5e45bVKt9So6Z8ac3HLBSZgqRm2pg6en',
    usdt: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
  },
  defaultDecimal: 6,
  tronLinkTime: 8,
  justSwap: 'https://justswap.org/',
  tronscanUrl: 'https://nile.tronscan.io/#'
}

let Config = devNileConfig;
    Config.Abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_energyamount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"name": "buyOrder",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "orderid",
				"type": "uint256"
			}
		],
		"name": "delegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isFilled",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "energyamount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferETH",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
export default Object.assign(Config);
