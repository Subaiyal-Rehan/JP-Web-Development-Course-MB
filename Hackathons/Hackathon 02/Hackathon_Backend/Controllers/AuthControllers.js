const jwt = require("jsonwebtoken")
const UserModel = require("../Models/UserModel")
const bcrypt = require("bcryptjs")

const AuthControllers = {
    Signup: async (req, res) => {
        try {
            let { fullName, email, password } = req.body
            let obj = {
                fullName,
                email,
                password
            }

            if (password.length < 6) {
                return res.status(400).send({
                    isSuccessful: false,
                    message: "Password must be at least 6 characters long."
                });
            }

            let existingUser = await UserModel.findOne({ email })

            if (existingUser) {
                return res.status(409).send({
                    isSuccessful: false,
                    data: null,
                    message: "User with this email already exists."
                })
            }

            obj.password = await bcrypt.hash(password, 10)

            let userObj = new UserModel(obj)
            let result = await userObj.save()

            // ~ Creating JWT Token ~ \\
            const tokenPayload = {
                id: result._id,
                fullName: result.fullName,
                email: result.email,
            }
            const jwtToken = await jwt.sign(tokenPayload, process.env.SECURITY_KEY)

            res.status(201).send({
                isSuccessful: true,
                data: result,
                token: jwtToken,
                message: "User created successfully"
            })
        } catch (error) {
            res.status(500).send({
                isSuccessful: false,
                data: null,
                message: `An error occurred: ${error.message}`
            })
        }
    },

    Login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const existingUser = await UserModel.findOne({ email })
            if (!existingUser) {
                return res.status(409).send({
                    isSuccessful: false,
                    data: null,
                    message: "Invalid Credentials."
                })
            }

            let isCorrectPassword = await bcrypt.compare(password, existingUser.password)
            if (isCorrectPassword) {
                res.status(200).send({
                    isSuccessful: true,
                    data: existingUser,
                    token: await jwt.sign({ ...existingUser }, process.env.SECURITY_KEY),
                    message: "User successfully logged in."
                })
            } else {
                res.status(401).send({
                    isSuccessful: false,
                    data: null,
                    message: "Invalid credentials"
                });
            }
        } catch (error) {
            res.status(500).send({
                isSuccessful: false,
                data: null,
                mesasge: `An error occurred: ${error}`
            })
        }
    },

}

module.exports = AuthControllers