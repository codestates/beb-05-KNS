exports.postGet = async(req, res) => {
  try {
        res.status(200).send("전체 게시글 가져오기")
      } catch (e) {
        throw Error(e)
      }
};

exports.postWrite = async(req, res) => {
  try {
        res.status(200).send("게시글 작성")
      } catch (e) {
        throw Error(e)
      }
};

exports.userPostInfo = async(req, res) => {
  try {
        res.status(200).send(":userID 유저의 게시글 정보")
      } catch (e) {
        throw Error(e)
      }
};

exports.postInfoGet = async(req, res) => {
  try {
        res.status(200).send("ID 게시글 정보(해당 게시글의 댓글 정보도) (hit업데이트)")
      } catch (e) {
        throw Error(e)
      }
};

exports.postRetouch = async(req, res) => {
  try {
        res.status(200).send("ID 게시글 수정")
      } catch (e) {
        throw Error(e)
      }
};

exports.postDelete = async(req, res) => {
  try {
        res.status(200).send("ID 게시글 삭제")
      } catch (e) {
        throw Error(e)
      }
};

exports.postLike = async(req, res) => {
  try {
        res.status(200).send("ID 좋아요 추천")
      } catch (e) {
        throw Error(e)
      }
};

exports.commentGet = async(req, res) => {
  try {
        res.status(200).send("해당 게시글의 댓글 가져오기")
      } catch (e) {
        throw Error(e)
      }
};

exports.commentPost = async(req, res) => {
  try {
        res.status(200).send("해당 게시글의 댓글 작성")
      } catch (e) {
        throw Error(e)
      }
};

exports.commentRetouch = async(req, res) => {
  try {
        res.status(200).send("해당 게시글의 댓글 수정")
      } catch (e) {
        throw Error(e)
      }
};

exports.commentDelet = async(req, res) => {
  try {
        res.status(200).send("해당 게시글의 댓글 삭제")
      } catch (e) {
        throw Error(e)
      }
};
