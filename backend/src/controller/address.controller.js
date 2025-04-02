import { User } from "../model/user.model.js";
import { Address } from "../model/address.model.js";

const addAddress = async(req,res)=>{
   try {
    const userId = req.user
    const {addressLine,city,state,pincode,country,mobile} = req.body

    const createAddress = new Address({
        addressLine,
        city,
        state,
        pincode,
        country,
        mobile,
        userId:userId
    })
    const saveAddress = await createAddress.save()
    const addUserAddress = await User.findByIdAndUpdate(userId,{
        $push:{
            addressDetail:saveAddress._id
        }
    })
    return res.status(200).json({
        message: "Address created successfully",
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
}

const getAddress = async(req,res)=>{
    try {
        const userId = req.user
        const data = await Address.find({userId:userId}).sort({ createdAt: -1 });
        if(!data){
            return res.status(400).json({
                message:"you should add the address",
                error: true,
                success: false,
            }); 
        }
        return res.status(200).json({
            data:data,
            message:"list of address",
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
}
const updateAddress = async(req,res)=>{
    try {
        const userId = req.user
        const { _id,addressLine,city,state,pincode,country,mobile} = req.body
        const updateAddress = await Address.updateOne({_id:_id},{
            addressLine,
            city,
            state,
            pincode,
            country,
            mobile
        })        
        return res.status(200).json({
            message: "address update successfully",
            error: false,
            success: true,
            data:updateAddress
        }); 
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        }); 
    }
}
const deleteAddress = async(req,res)=>{
    try {
        const userId = req.user
        const {_id} = req.body
        const disableAddress = await Address.updateOne({_id:_id,userId},{
            status:false
        })
        return res.status(200).json({
            message: "address remove",
            error: false,
            success: true,
            data:disableAddress
        }); 
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        }); 
    }
}

export {addAddress,getAddress,updateAddress,deleteAddress}