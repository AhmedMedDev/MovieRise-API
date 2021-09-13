module.exports = {

    optionalImage (data)
    {
        return (data.files) 
        ? (data.files.img && 
            (data.files.img.mimetype == "image/jpeg" || 
             data.files.img.mimetype == "image/png"  || 
             data.files.img.mimetype == "image/gif"  )) 
        : true
    },
    optionalvideo (dataFiles, dataFilesName)
    {
        return (dataFiles) 
        ? (dataFilesName && 
            (dataFilesName.mimetype == "video/mp4" || 
             dataFilesName.mimetype == "video/Wmv"  )) 
        : true
    },
    image (dataFiles, dataFilesName)
    {
        return (dataFiles) 
        ? (dataFilesName && 
            (dataFilesName.mimetype == "image/jpeg" || 
             dataFilesName.mimetype == "image/png"  || 
             dataFilesName.mimetype == "image/gif"  )) 
        : false
    }
}