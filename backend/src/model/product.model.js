import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: Array,
            default: [],
        },
        category: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Category",
            },
        ],
        subCategory: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "SubCategory",
            },
        ],
        unit: {
            type: String,
            default: "",
        },
        stock: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: null,
        },
        description: {
            type: String,
            default: "",
        },
        moreDetail: {
            type: Object,
            default: {},
        },
        publish: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// create index
productSchema.index(
    { name: "text", description: "text" },
    { name: 10, description: 5 }
);
export const Product = mongoose.model("Product", productSchema);
