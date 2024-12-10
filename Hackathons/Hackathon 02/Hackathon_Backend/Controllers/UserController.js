const UserModel = require("../Models/UserModel")
const bcrypt = require("bcryptjs")

const UserController = {
    Get: async (req, res) => {
        const results = await UserModel.find()
        res.status(200).send({
            isSuccessful: true,
            data: results
        })
    },

    SpecificGet: async (req, res) => {
        try {
            const userId = req.params.id
            const user = await UserModel.findById(userId);

            if (user) {
                res.status(200).send({
                    isSuccessful: true,
                    data: user
                })
            } else {
                res.status(404).send({
                    isSuccessful: false,
                    data: null,
                    message: "User not found"
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

    Post: async (req, res) => {
        const body = req.body
        const obj = {
            fullName: body.fullName,
            email: body.email,
            password: body.password
        }

        let existingUser = await UserModel.findOne({ email: body.email })

        // ~  RETURNING IF USER ALREADY EXISTS  ~ \\
        if (existingUser) {
            return res.status(409).send({
                isSuccessful: false,
                data: null,
                message: "Email already exists."
            });
        }

        // ~  HASHING PASSWORD  ~ \\
        obj.password = await bcrypt.hash(body.password, 10)

        const UserObj = new UserModel(obj)
        UserObj.save()
            .then((result) => {
                res.status(201).send({
                    isSuccessful: true,
                    data: result
                })
            }).catch((err) => {
                res.status(401).send({
                    isSuccessful: false,
                    data: null,
                    message: `An error occurred: ${err}`
                })
            })
    },

    Put: async (req, res) => {
        const userId = req.params.id;
        const { fullName, email, password } = req.body

        try {
            const updatedObj = {
                fullName,
                email,
                password,
                updated_at: new Date()
            }

            if (password) {
                updatedObj.password = await bcrypt.hash(password, 10)
            }

            const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedObj, { new: true })

            if (updatedUser) {
                res.status(201).send({
                    isSuccessful: true,
                    data: updatedUser
                })
            } else {
                res.status(404).send({
                    isSuccessful: false,
                    message: "User not found."
                })
            }
        } catch (error) {
            res.status(404).send({
                isSuccessful: false,
                message: `An error occurred: ${error}`
            })
        }
    },

    Delete: async (req, res) => {
        const userId = req.params.id;

        try {
            const deletedUser = await UserModel.findByIdAndDelete(userId);

            if (deletedUser) {
                res.status(200).send({
                    isSuccessful: true,
                    data: deletedUser,
                    message: 'User deleted successfully'
                })
            } else {
                res.status(404).send({
                    isSuccessful: false,
                    data: null,
                    message: 'User not found'
                });
            }
        } catch (err) {
            res.status(500).send({
                isSuccessful: false,
                data: null,
                message: `An error occured: ${err}`
            })
        }
    }
}

module.exports = UserController