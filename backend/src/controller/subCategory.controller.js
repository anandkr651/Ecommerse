import { SubCategory } from "../model/subCategory.model.js";

const addSubCategory = async (req, res) => {
    try {
        const { name, image, category } = req.body;
        if (!name || !image || !category) {
            return res.status(401).json({
                message: "provide name, image and category",
                error: true,
                success: false,
            });
        }
        const createSubCategory = new SubCategory({
            name,
            image,
            category,
        });
        const save = await createSubCategory.save();

        return res.status(200).json({
            message: "sub category created successfully",
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
const getSubCategory = async (req, res) => {
    try {
        const data = await SubCategory.find()
            // .sort({ createdAt: -1 })
            .populate("category");

        return res.status(200).json({
            data: data,
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const { _id, name, image, category } = req.body;
        const checkSub = await SubCategory.findById(_id);
        if (!checkSub) {
            return res.status(401).json({
                message: "category is not available",
                success: false,
                error: true,
            });
        }
        const update = await SubCategory.findByIdAndUpdate(_id, {
            name,
            image,
            category,
        });

        return res.status(200).json({
            message: "data update successfully",
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

const deleteSubCategory = async (req, res) => {
    try {
        const { _id } = req.body;
        const deleteSub = await SubCategory.findByIdAndDelete(_id);
        
        return res.status(200).json({
            message: "Delete successfully",
            error: false,
            success: true,
            data: deleteSub,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
export { addSubCategory, getSubCategory, updateSubCategory, deleteSubCategory };
