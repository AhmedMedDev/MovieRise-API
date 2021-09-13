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
    optionalVideo (dataFiles, dataFilesName)
    {
        return (dataFiles) 
        ? (dataFilesName && 
            (dataFilesName.mimetype == "video/mp4" || 
             dataFilesName.mimetype == "video/Wmv"  )) 
        : true
    },
    video (dataFiles, dataFilesName)
    {
        return (dataFiles) 
        ? (dataFilesName && 
            (dataFilesName.mimetype == "video/mp4" || 
             dataFilesName.mimetype == "video/Wmv"  )) 
        : false
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