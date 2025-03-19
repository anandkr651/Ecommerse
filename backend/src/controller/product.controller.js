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
        const query = search ? {$text: { $search: search }}: {};
        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            Product.find(query)
                .sort({ createdAt: -1 })
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

export { createProduct, getProduct };
