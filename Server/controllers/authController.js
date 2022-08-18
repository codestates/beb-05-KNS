exports.signupPost = async(req, res) => {
  try {
        res.status(200).send("회원가입(지갑생성)")
      } catch (e) {
        throw Error(e)
      }
}

exports.loginPost = async(req, res) => {
  try {
        res.status(200).send("로그인")
      } catch (e) {
        throw Error(e)
      }
}

exports.logoutPost = async(req, res) => {
  try {
        res.status(200).send("로그아웃")
      } catch (e) {
        throw Error(e)
      }
}