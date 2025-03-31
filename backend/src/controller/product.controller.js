import { Product } from "../model/product.model.js";
const createProduct = async (req, res) => {
    try {
        const {name, image, category, subCategory, unit, stock, price, discount, description, moreDetail} = req.body;
        if (!name || !image || !category || !subCategory || !unit || !stock || !price || !discount || !description) 
            {
                return res.status(400).json({
                message: "Provide all the details",
                error: true,
                success: false,
            });
        }
        const product = new Product({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            moreDetail,
        });
        const saveProduct = await product.save();

        return res.status(200).json({
            message: "product created successfully",
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

const getProduct = async (req, res) => {
    try {
        let { page, limit, search } = req.body;

        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 12;
        }
        const query = search ? { $text: { $search: search } } : {};
        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            Product.find(query)
                // .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("category subCategory"),
            Product.countDocuments(query),
        ]);
        // console.log(data);
        return res.status(200).json({
            message: "product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "provide category id",
                error: true,
                success: false,
            });
        }
        const product = await Product.find({
            category: { $in: id },
        }).limit(20);
        return res.status(200).json({
            message: "category Product list",
            data: product,
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

const getProductByCategoryAndSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId, page, limit } = req.body;
        if (!categoryId || !subCategoryId) {
            return res.status(400).json({
                message: "Provide categoryId and subCategoryId",
                error: true,
                success: false,
            });
        }
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId },
        };
        const skip = (page - 1) * limit;
        const [data, dataCount] = await Promise.all([
            Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Product.countDocuments(query),
        ]);

        return res.status(200).json({
            message: "product list",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
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
const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findOne({ _id: productId });
        return res.status(200).json({
            message: "product Details",
            data: product,
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
const updateProduct = async (req, res) => {
    try {
        const {
            _id,
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            moreDetail,
        } = req.body;
        const update = await Product.updateOne(
            { _id: _id },
            {
                name,
                image,
                category,
                subCategory,
                unit,
                stock,
                price,
                discount,
                description,
                moreDetail,
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

const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(500).json({
                message: "Provide _id",
                error: true,
                success: false,
            });
        }
        const deletePro = await Product.deleteOne({ _id: _id });

        return res.status(200).json({
            message: "Data Delete successfully",
            error: false,
            success: true,
            data: deletePro,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
const searchProduct = async (req, res) => {
    try {
        let { search, page, limit } = req.body;
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        const query = search? {$text: {$search: search,},}: {};
        const skip = (page - 1) * limit;
        const [data, dataCount] = await Promise.all([
            Product.find(query)
                // .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .populate('category subCategory'),
            Product.countDocuments(query),
        ]);
        return res.status(200).json({
            message: "search product list",
            data: data,
            totalCount: dataCount,
            totalPage: Math.ceil(dataCount / limit),
            page: page,
            limit: limit,
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
export {
    createProduct,
    getProduct,
    getProductByCategory,
    getProductByCategoryAndSubCategory,
    getProductDetails,
    updateProduct,
    deleteProduct,
    searchProduct,
};
