const errorMiddleware = (err,req,res,next) => {

    err.statusCode = err.statusCode || 5000;
    err.message = err.message || 'Something Went Wrong'
     
    res.status(err.statusCode).json({
        sucess: false,
        message: err.message,
        // stack: err.stack
    })
}

export default errorMiddleware;