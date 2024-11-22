const imagestore = async(req, res)=>{
    res.status(200).json({url: req.file?.path});
}
export {imagestore};