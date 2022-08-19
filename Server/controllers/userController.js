exports.userinfoGet = async(req, res) => {
  try {
        res.status(200).send("마이페이지 및 유저의 상세정보")
      } catch (e) {
        throw Error(e)
      }
};