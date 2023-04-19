const { PRODUCTS } = require('../models');

// POST - /create
// public route
module.exports.createProduct = async (req, res) => {
    try{
        // get fields from req.body
        const { name, quantity } = req.body.product;
        
        //get last inserted record to create an id
        let lastInsertedRecord = await PRODUCTS.find({}).select('id')
                                                        .sort({createdAt: -1})
                                                        .limit(1);
        // setting id
        let id= lastInsertedRecord[0]?.id || 0;
    
        //create product
        const product = await PRODUCTS.create({
            id: ++id,
            name,
            quantity
        })

        //set status and send response
        return res.status(201).json({
            data: {
                product : {
                    name: product.name,
                    quantity: product.quantity
                },
                message: "created sucessfully"
            }
        })

    } catch(err) {
        return res.status(500).json({
            data: {
                product: [],
                message: "internal server error"
            }
        })
    }
}

// GET - /
// public route
module.exports.getProducts = async (req, res) => {
    try {
        // fetch all products
        const products  = await PRODUCTS.find({});
        
        //set status and send response
        return res.status(200).json({
            data: {
                products
                ,message: "data fetched successfully"
            }
        })

    } catch (err) {
        return res.status(500).json({
            data: {
                products: [],
                message: "internal server error"
            }
        })
    }
}

// DELETE - /:id
// public route
module.exports.deleteProductById = async (req, res) => {
    try {
        // get id from params
        const id = req.params.id;
        //validate fields
        if(!id.trim() || !/^[0-9]*$/.test(id)) {
            return res.status(400).json({
                data: {
                    message: "invalid productId"
                }
            })
        }
        
        //delete product
        const deletedProduct = await PRODUCTS.findOneAndDelete({id: id})

        if(!deletedProduct) {
            return res.status(400).json({
                data: {
                    message: "invalid productId"
                }
            })
        }

        //set status and send response
        return res.status(201).json({
            data: {
                message: "product deleted"
            }
        })
        
    }catch(err) {
        return res.status(500).json({
            data: {
                products: [],
                message: "internal server error"
            }
        })
    }
}

// PUT - /:id/update_product/?number=1
// public route
module.exports.updateProduct = async (req, res) => {
    try {
        
        // get fields from url 
        const id = req.params.id;
        const quantity = req.query.number;
        const onlyNumberRegex = /^[0-9]*$/;
        //validate fields
        if(!id.trim() || !quantity.trim()) {
            return res.status(400).json({
                data: {
                    message: "invalid productId/quantity"
                }
            })
        }

         //validate fields
         if(!onlyNumberRegex.test(id) || !onlyNumberRegex.test(quantity)) {
            return res.status(400).json({
                data: {
                    message: "invalid productId/quantity"
                }
            })
        }
        
        //update product and selecting only required fields
        const product = await PRODUCTS.findOneAndUpdate({id: id}, {
            quantity: quantity
        }).select('id name quantity -_id')
       
        if(!product) {
            return res.status(400).json({
                data: {
                    message: "invalid productId"
                }
            })
        }
        
        //set status and send response
        return res.status(200).json({
            data: {
                product,
                message: "updated successfully"
            }
        })

    }catch(err) {
        return res.status(500).json({
            data: {
                product: [],
                message: "internal server error"
            }
        })
    }
}
