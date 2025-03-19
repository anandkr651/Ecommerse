import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";

const uploadImageController = async (req, res) => {
    try {
        const file = req.file?.path;
        const uploadImage = await uploadOnCloudinary(file);

        return res.json({
            message: "Category Image Upload Successfully",
            data: uploadImage.url,
            success: true,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

export { uploadImageController };
