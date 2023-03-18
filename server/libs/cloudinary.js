import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: "dwslevugn",
    api_key: "356363883153611",
    api_secret: "D7hZIJu80Cmu_QkrbG3Xy-OLciM"
})

export const uploadImage = async filePath => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: 'imagesBackMovieApp'
    })
}
