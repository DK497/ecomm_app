const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})

router.post(`/`,async (req,res)=>{ 
const orderItemIds=req.body.orderItems.map(async i=>{
    let newOrderItem=new OrderItem({
        quantity:i.quantity,
        product:i.product
    })
    newOrderItem= await newOrderItem.save()
    //  returns item which was saved
   if(!newOrderItem){
       res.status(400).send("Error in creating id")
   }
    return newOrderItem._id;
})


    const newO=new Order({
        orderItems: orderItemIds,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
    })
    // saving the info in db save() returns a promise
    // newO=await newO.save();
    if(!newO){  
        return res.status(404).send('Order cannot be created');
    }
     
    res.status(200).send(newO);
     })

module.exports =router;