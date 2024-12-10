const FoodModel = require("../Models/FoodModel");

const FoodController = {
    Get: async (req, res) => {
        const result = await FoodModel.find()
        res.status(200).send({
            isSuccessful: true,
            data: result
        })
    },

    SpecificGet: async (req, res) => {
        try {
            let productId = req.params.id
            let product = await FoodModel.findById(productId)
            if (product) {
                res.status(206).send({
                    isSuccessful: true,
                    data: product
                })
            } else {
                res.status(404).send({
                    isSuccessful: false,
                    data: null,
                    message: "Food not found"
                });
            }
        } catch (err) {
            res.status(500).send({
                isSuccessful: false,
                data: null,
                message: `Internal server error: ${err}`
            });
        }
    },

    Post: (req, res) => {
        const body = req.body;

        const obj = {
            title: body.title,
            price: body.price,
            description: body.description,
            category: body.category,
            image: body.image,
        };

        const productObj = new FoodModel(obj)

        productObj.save()
            .then((result) => {
                res.status(201).send({
                    isSuccessful: true,
                    data: result
                })
            })
            .catch((err) => {
                res.status(401).send({
                    isSuccessful: false,
                    data: null,
                    message: err
                })
            })
    },

    Put: async (req, res) => {
        const productId = req.params.id;
        const { title, price, description, category, image } = req.body;

        try {
            const isProduct = await FoodModel.findById(productId);

            if (!isProduct) {
                return res.status(404).send({
                    isSuccessful: false,
                    message: "Product not found."
                });
            }

            const updatedObj = { title, price, description, category, image, updated_at: new Date() }
            const updatedProduct = await FoodModel.findByIdAndUpdate(productId, updatedObj, { new: true })
            if (updatedProduct) {
                res.status(200).send({
                    isSuccessful: true,
                    data: updatedProduct
                })
            } else {
                res.status(404).send({
                    isSuccessful: false,
                    data: null,
                    message: "Food not found."
                })
            }
        } catch (err) {
            res.status(500).send({
                isSuccessful: false,
                data: null,
                message: `An error occurred: ${err}`
            })
        }
    },

    Delete: async (req, res) => {
        const productId = req.params.id;
        try {
            const isProduct = await FoodModel.findById(productId);

            if (!isProduct) {
                return res.status(404).send({
                    isSuccessful: false,
                    message: 'Product not found.'
                });
            }

            const deletedProduct = await FoodModel.findByIdAndDelete(productId);
            res.status(200).send({
                isSuccessful: true,
                message: 'Food deleted successfully',
                data: deletedProduct
            });

        } catch (err) {
            res.status(500).send({
                isSuccessful: false,
                message: `An error occurred: ${err}`
            })
        }
    }
}

module.exports = FoodController