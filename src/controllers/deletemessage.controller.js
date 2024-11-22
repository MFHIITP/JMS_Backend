import talkcollection from "../models/talkcollection.model.js"

const deletefunc = async(req, res)=>{
    console.log("Came");
    const data = await talkcollection.deleteOne({
        name: req.body.name,
        message: req.body.message,
        image: req.body.image
    })
    res.status(200).send("Deleted");
}

export {deletefunc}