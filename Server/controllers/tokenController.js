exports.erc20Get = async(req, res) => {
  try {
        res.status(200).send("ERC20 토큰 조회")
      } catch (e) {
        throw Error(e)
      }
};

exports.erc20Post = async(req, res) => {
  try {
        res.status(200).send("ERC20 토큰 전송")
      } catch (e) {
        throw Error(e)
      }
};