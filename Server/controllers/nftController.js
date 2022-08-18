exports.userNftGet = async(req, res) => {
  try {
        res.status(200).send("유저의 NFT 정보")
      } catch (e) {
        throw Error(e)
      }
};

exports.ethFaucetPost = async(req, res) => {
  try {
        res.status(200).send("https://faucet.egorfine.com")
      } catch (e) {
        throw Error(e)
      }
};

exports.ethPost = async(req, res) => {
  try {
        res.status(200).send("이더전송")
      } catch (e) {
        throw Error(e)
      }
};

exports.nftCreat = async(req, res) => {
  try {
        res.status(200).send("NFT 생성")
      } catch (e) {
        throw Error(e)
      }
};

exports.nftReferGet = async(req, res) => {
  try {
        res.status(200).send("NFT 정보 조회")
      } catch (e) {
        throw Error(e)
      }
};

exports.nftSendPost = async(req, res) => {
  try {
        res.status(200).send("NFT 전송")
      } catch (e) {
        throw Error(e)
      }
};

exports.nftBuyPost = async(req, res) => {
  try {
        res.status(200).send("NFT 구매")
      } catch (e) {
        throw Error(e)
      }
};