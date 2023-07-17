exports.notFound = (req,res,next)=>{
    const error = new Error(`Not found - ${res.originalUrl}`)
    res.status(404)
    next(error)
}

exports.errorHandler = (err, req, res, next)=>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    if (err.name === 'castError' && err.kind === "ObjectId") {
        statusCode = 404
        message = 'Resource npt found'
    }

    res.status(statusCode).json({
        message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}