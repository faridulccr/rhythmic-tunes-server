// const { ObjectId } = require("mongodb");

// get all users
const getAllUsers = (userCollection) => {
    return async (req, res) => {
        const allUsers = await userCollection.find().toArray();
        // console.log(allUsers);

        allUsers.length > 0
            ? res.status(200).json(allUsers)
            : res.status(404).json({ error: "data not found" });
    };
};

// get single user by email
const getSingleUser = (userCollection) => {
    return async (req, res) => {
        const email = req.query;
        const user = await userCollection.findOne({ email });
        // console.log(user);

        user
            ? res.status(200).json(user)
            : res.status(404).json({ error: "data not found" });
    };
};

// create user
const createUser = (userCollection) => {
    return async (req, res) => {
        const { username, email, role } = req.body;
        // find existing user
        const existingUser = await userCollection.findOne({ email });

        if (existingUser) {
            return res.json({ message: "User already exist" });
        } else {
            const newUser = await userCollection.insertOne({
                username,
                email,
                role,
                selectedClasses: [],
            });
            // console.log(newUser);
            newUser.acknowledged
                ? res.status(200).json({ message: "User successfully created" })
                : res.status(400).json({ error: "Bad Request" });
        }
    };
};


// // update product
// const updateProduct = (products) => {
//     return async (req, res) => {
//         // Generate a new ObjectId
//         const objectId = new ObjectId(req.params.id);
//         const updatedProduct = await products.updateOne(
//             { _id: objectId },
//             { $set: { ...req.body } }
//         );
//         // console.log(updatedProduct);

//         updatedProduct.acknowledged
//             ? res.status(200).json({ message: "successfully updated" })
//             : res.status(400).json({ error: "Bad Request" });
//     };
// };

// // delete product
// const deleteProduct = (products) => {
//     return async (req, res) => {
//         // Generate a new ObjectId
//         const objectId = new ObjectId(req.params.id);
//         const deletedProduct = await products.deleteOne({ _id: objectId });
//         // console.log(deletedProduct);

//         deletedProduct.acknowledged
//             ? res.status(200).json({ message: "successfully deleted" })
//             : res.status(400).json({ error: "Bad Request" });
//     };
// };

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser
};
