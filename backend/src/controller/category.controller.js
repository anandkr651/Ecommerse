import { Category } from "../model/category.model.js";
import { Product } from "../model/product.model.js";
import { SubCategory } from "../model/subCategory.model.js";

const AddCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false,
            });
        }

        const addCategory = new Category({
            name,
            image,
        });
        const saveCategory = await addCategory.save();
        if (!saveCategory) {
            return res.status(500).json({
                message: "Not Created",
                error: true,
                success: false,
            });
        }

        return res.json({
            message: "Add Category",
            data: saveCategory,
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

const getCategory = async (req, res) => {
    try {
        const data = await Category.find().sort({ createdAt: -1 });
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

const updateCategory = async (req, res) => {
    try {
        const { _id, name, image } = req.body;
        const update = await Category.updateOne(
            { _id: _id },
            {
                name,
                image,
            }
        );

        return res.status(200).json({
            message: "Data update successfully",
            error: false,
            success: true,
            data: update,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { _id } = req.body;

        const checkSubCategory = await SubCategory.find({
            category: {
                $in: [_id],
            },
        }).countDocuments();

        const checkProduct = await Product.find({
            category: {
                $in: [_id],
            },
        }).countDocuments();

        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Category is already use can't delete",
                error: true,
                success: false,
            });
        }
        const deleteCat = await Category.deleteOne({ _id: _id });

        return res.status(200).json({
            message: "Data Delete successfully",
            error: false,
            success: true,
            data: deleteCat,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

export { AddCategory, getCategory, updateCategory, deleteCategory };
