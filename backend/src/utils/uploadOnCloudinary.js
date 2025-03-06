import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", //this property specifies the type of the file being uploaded.Setting it to "auto" tells Cloudinary to automatically detect the file type (image, video, raw file, etc.) and handle it accordingly.
        });
        fs.unlinkSync(localFilePath);  //unlinksync -->it can removed the locally saved temporary file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
        return null;
    }
};
export { uploadOnCloudinary };
