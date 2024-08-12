function isValidEmail(string){
    return string.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
}

export {
    isValidEmail
}