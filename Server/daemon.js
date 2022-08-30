const cron = require("node-cron");
const models = require("./models");
// const contracts = require("./contracts")

// Ganache 블록체인 접근
const Web3 = require("web3");
const web3 = new Web3('HTTP://127.0.0.1:7545');

// 노드의 최신블록넘버 조회
const getLatestBlock = async () => {
	return await web3.eth.getBlockNumber();
}

// 블록정보
const blockInfo = async (num) => await web3.eth.getBlock(num);
// 트랜잭션정보
const txInfo = async (tx) => await web3.eth.getTransaction(tx);

// 블록이나 트랜잭션으로부터 필요한 정보를 DB에 저장합니다.

// 매 초마다 실행 (실행주기를 설정할 수 있습니다.)
const task = cron.schedule(
	"* * * * *'",
	async () => {
		// 주기적으로 실행하고자 하는 함수
		getLatestBlock()
    blockInfo()
    txInfo()
	},
	{
		scheduled: false,
	}
);

task.start();