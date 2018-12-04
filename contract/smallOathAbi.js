let ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "content",
				"type": "string"
			}
		],
		"name": "OnWriteArticle",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "content",
				"type": "string"
			}
		],
		"name": "writeArticleIntoChain",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "articles",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "content",
				"type": "string"
			},
			{
				"name": "author",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "page",
				"type": "uint256"
			}
		],
		"name": "showSomeArticles",
		"outputs": [
			{
				"name": "a1",
				"type": "address"
			},
			{
				"name": "c1",
				"type": "string"
			},
			{
				"name": "a2",
				"type": "address"
			},
			{
				"name": "c2",
				"type": "string"
			},
			{
				"name": "a3",
				"type": "address"
			},
			{
				"name": "c3",
				"type": "string"
			},
			{
				"name": "a4",
				"type": "address"
			},
			{
				"name": "c4",
				"type": "string"
			},
			{
				"name": "a5",
				"type": "address"
			},
			{
				"name": "c5",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]