// async/await 구문에서 에러 핸들링을 위해 필수적으로 사용해야하는 try/catch 문 문법을
// 감싸는 함수 형태로 구현하여 무분별한 try/catch 문의 사용을 줄여 코드를 깔끔하게 만들고,
// 에러 핸들링을 한 곳에서 처리 가능하게 만듬
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { asyncWrapper }