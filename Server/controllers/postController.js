const {post, user, comment} = require('../models');
const {isAuthorized} = require('./webToken');
const {asyncWrapper} = require("../errors/async");
const CustomError = require("../errors/custom-error");
const StatusCodes = require("http-status-codes");
const {serveToken} = require('../contracts/erc20');

module.exports = {
    //게시글 작성
    writePost: asyncWrapper(async (req, res) => {
        
        if (req.body.title === undefined || req.body.content === undefined) {
            throw new CustomError("제목 또는 내용을 입력해주세요.",StatusCodes.BAD_REQUEST);
        }
      
        const decoded = await isAuthorized(req); //로그인했는지 권한 체크    
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }
        //console.log(decoded.id);
        
        const userInfo = await user.findOne({
            where: {id: decoded.id},
        });
        const userId = userInfo.id;
        
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }

        const {title, content, img} = req.body;
        // req.body에 필요한 값들이 없으면 Bad Request 에러 응답
        if (!title || !content) {
            throw new CustomError("제목 또는 내용을 입력해주세요.", StatusCodes.BAD_REQUEST);
        }
        const newPost = new post({
            userId,
            title,
            content,
            img
        });
        try {
            // db에 저장
            const createdPost = await newPost.save();
            // 등록 시 토큰 보상 지급 함수 호출
            await serveToken(userId, 5);
            res.status(StatusCodes.CREATED).json({status: "successful created", data: {postId: createdPost.id}});
        } catch (err) {
            throw new Error(err);
        }
    }),

    //게시글 수정
    updatePost : asyncWrapper(async (req, res) => {      
    
        const { postId } = req.params;

        if (req.body.title === undefined || req.body.content === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }

        const decoded = await isAuthorized(req); //로그인했는지 권한 체크    
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }

        const userInfo = await user.findOne({
            where: {id: decoded.id},
        });
        const userId = userInfo.id

        const postData = await post.findOne({
            where: {id: postId},
        });

        if (!postData) {
            //404 not found
            throw new CustomError(`글번호 ${postId} 번이 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
        }
        //console.log(userId);
        //console.log(postData.userId);

        const {title, content, img } = req.body;

        if(postData.userId !== userId){
            //403 사용자가 일치하지 않을 때
            throw new CustomError(`올바른 사용자가 아닙니다.`,StatusCodes.FORBIDDEN);
        }
        
        await postData.update({
            title: title,
            content: content,
            img : img
        });
        res.status(StatusCodes.OK).json({status: "successful operation", data: {postId: postData.id}});
    }),

    //게시글 삭제
    deletePost : asyncWrapper(async (req, res) => {       
      const { postId } = req.params;

      if (postId === undefined) {
        throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
      }

      const decoded = await isAuthorized(req); //로그인했는지 권한 체크    
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }

      const userInfo = await user.findOne({
          where: {id: decoded.id},
      });
      const userId = userInfo.id

      const postData = await post.findOne({
          where: {id: postId},
      });
      if (!postData) {
          //404 not found
          throw new CustomError(`글번호 ${postId} 번이 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
      }

      //console.log(userId);
      if(postData.userId !== userId){
          //403 사용자가 일치하지 않을 때
          throw new CustomError(`올바른 사용자가 아닙니다.`,StatusCodes.FORBIDDEN);
      }

      await postData.destroy({
          where: { id: postId },
      });

      res.sendStatus(StatusCodes.NO_CONTENT); //204 
    }),

    //게시글 좋아요 업데이트
    likePost : asyncWrapper(async (req, res) => {
        const { postId } = req.params;

        if (postId === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        
        const postData = await post.findOne({
            where: {id: postId},
        });
        if (!postData) {
            //404 not found
            throw new CustomError(`글번호 ${postId} 번이 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
        }

        await post.increment({like: 1}, {where: {id: postId}}) // 게시글 좋아요 증가

        const postResult = await post.findOne({
            where: {id: postId},
        });
        
        //추천수가 10번씩 달성하는 경우 토큰 10개 지급
        if(postResult.like % 10 === 0) {
            await serveToken(postResult.userId, 10);
        }

        res.status(StatusCodes.OK).json({status: "successful operation", data: {postId: postData.id}});
    }),

    // Post ID를 받아서 해당 게시글 상세 정보 응답
    getPostById: asyncWrapper(async (req, res) => {
        const { postId } = req.params;
    
        if (postId === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }

        const decoded = await isAuthorized(req); //로그인했는지 권한 체크  
        const userInfo = await user.findOne({
            where: {id: decoded.id},
        });
        const reqUserName = userInfo.userName;

        await post.increment({hit: 1}, {where: {id: postId}}) // 게시글 상세 조회하면 조회수 증가

        //전달받은 id를 가진 post를 찾아옴
        const postData = await post.findOne({
            where: {id: postId},
        });       
        //해당 id를 가진 post 없으면 에러 응답
        if (!postData) {
            //404 not found
            throw new CustomError(`글번호 ${postId} 번이 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
        }
        const {id, title, content, img, hit, like, createdAt, userId} = postData;
        const {userName} = await user.findOne({
            where: {id: postData.userId},
        });
        // db에 comments가 유저의 object id로 저장이 되어있기 때문에
        // 응답으로 보내줄 때는 유저의 id와 닉네임을 추가해서 보내준다.
        const postComments = await comment.findAll({
            include: [
                {
                    model: user,
                    attributes: ['userName']
                }
            ],
            where: {postId: postData.id},
            });

        res.status(200).json({
            status: "successful operation",
            data: {
                id,
                userId,
                userName,
                title,
                content,
                img,
                hit,
                like,
                createdAt,
                reqUserName,
                postComments
            },
        });
    }),
    
    //전체 게시글 가져오기
    getAllPosts: asyncWrapper(async (req, res) => {     
        /* const decoded = await isAuthorized(req); //로그인했는지 권한 체크 
        //console.log(decoded);   
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        } */
   
        const writings = await post.findAll({
            order: [
                ["id", "DESC"],
              ],
        });
        // Array에 map을 돌 때 콜백함수가 비동기면 일반적인 방법으로는 구현이 안됨
        // 그래서 Promise.all을 사용함
        const data = await Promise.all(
            writings.map(
                async ({id, userId, title, img, hit, like, createdAt}) => {
                    const {userName} = await user.findOne({
                        where: {id: userId},
                    });
                    // 댓글 수 가져옴
                    const comments = await comment.findAndCountAll({
                        where: {postId: id},
                    });
                    const commentsCount = comments.count
                    return {
                        id,
                        userId,
                        userName,
                        title,
                        img,
                        hit,
                        like,
                        createdAt,
                        commentsCount
                    };
                }
            )
        );
        res.status(200).json({
            status: "successful operation",
            data,
        });
    }),

    // 댓글 작성
    writeComment : asyncWrapper(async (req, res) => {
        const { postId } = req.params;
        const { content } = req.body;
        
        if (postId === undefined || content === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
      
        const postData = await post.findOne({
            where: {id: postId},
        });
     
        const decoded = await isAuthorized(req); //로그인했는지 권한 체크    
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }
        
        const userInfo = await user.findOne({
            where: {id: decoded.id},
        }); 

        if (!postData) {
            //404 not found
            throw new CustomError(`글번호 ${postId} 번이 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
        }
        const newComment = new comment({
            postId,
            userId : userInfo.id,
            userName : userInfo.userName,
            content
        });
        try {
            // db에 저장
            const createdComment = await newComment.save();
            //await mintToken(userInfo.address, 1); // 댓글 작성하면 토큰 지급
            res.status(StatusCodes.CREATED).json({status: "successful created", data: {commentId: createdComment.id}});
        } catch (err) {
            throw new Error(err);
        }
    }),

    // 댓글 수정
    updateComment : asyncWrapper(async (req, res) => {
        const { commentId } = req.params;

        if (commentId === undefined || req.body.content === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        const decoded = await isAuthorized(req); //로그인했는지 권한 체크    
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }

        const userInfo = await user.findOne({
            where: {id: decoded.id},
        });
        const userId = userInfo.id
        const commentData = await comment.findOne({
            where: {id: commentId},
        });
        
        if(commentData.userId !== userId){
            //403 사용자가 일치하지 않을 때
            throw new CustomError(`올바른 사용자가 아닙니다.`,StatusCodes.FORBIDDEN);
        }
        const {content} = req.body;
        await commentData.update({
            content: content
        });
        res.status(StatusCodes.OK).json({status: "successful operation", data: {commentId: commentData.id}});
    }),

    //게시글 삭제
    deleteComment : asyncWrapper(async (req, res) => {
      const { commentId } = req.params;

      if (commentId === undefined) {
        throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
      }
      const decoded = await isAuthorized(req); //로그인했는지 권한 체크    
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }

      const userInfo = await user.findOne({
          where: {id: decoded.id},
      });
      const userId = userInfo.id
      const commentData = await comment.findOne({
          where: { id: commentId }
      });
    
      if(commentData.userId !== userId){
          //403 사용자가 일치하지 않을 때
          throw new CustomError(`올바른 사용자가 아닙니다.`,StatusCodes.FORBIDDEN);
      }

      await commentData.destroy({
          where: { id: commentId },
      });
     
      res.sendStatus(StatusCodes.NO_CONTENT); //204 
    }),

    // Comment ID를 받아서 댓글 정보 응답
    getCommentByPostId: asyncWrapper(async (req, res) => {
        const { postId } = req.params;
        
        //console.log(postId);
        if (postId === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        //전달받은 id를 가진 comment를 찾아옴
        const commentData = await comment.findAll({
            where: {postId: postId},         

        });

        //해당 id를 가진 comment 없으면 
        if (!commentData) {
            //404 not found
            throw new CustomError(`댓글이 없습니다.`, StatusCodes.NOT_FOUND);
        }
       
        
        res.status(200).json({
            status: "successful operation",
            commentData
        });
    }),

    // 헤더에 담긴 User ID를 리턴
    getUserId: asyncWrapper(async (req, res) => {
        
        const decoded = await isAuthorized(req); 
        //const userId = String(decoded.id);
        
        // 전달받은 id를 가진 user를 찾아옴
        const userInfo = await user.findOne({
            where: {id: decoded.id},
        });
    
        const {id, userName, createdAt, address, tokenAmount, ethAmount, 
               mnemonicWord, privateKey} = userInfo;
        
        res.status(200).json({
            status: "successful operation",
            data: {
                userInfo
            },
        });
    }),

}