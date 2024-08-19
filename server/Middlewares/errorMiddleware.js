const errorMiddleware = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Something Went Wrong'
     
    res.status(err.statusCode).json({
        success: false,
        message: `Error Are Happen There , ${err.message}`,
        stack: err.stack
    })
}

export default errorMiddleware;