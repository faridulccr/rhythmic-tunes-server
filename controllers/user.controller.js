const { ObjectId } = require("mongodb");

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
        const user = await userCollection.findOne({ email: req.query?.email });
        // console.log(user);

        user
            ? res.status(200).json(user)
            : res.status(404).json({ error: "data not found" });
    };
};

// create user
const createUser = (userCollection) => {
    return async (req, res) => {
        const { name, image, email, role } = req.body;
        // find existing user
        const existingUser = await userCollection.findOne({ email });

        if (existingUser) {
            return res.json({ message: "User already exist" });
        }

        const newUser = await userCollection.insertOne({
            name,
            image,
            email,
            role,
            selectedClasses: [],
            enrolledClasses: [],
        });
        // console.log(newUser);
        newUser.acknowledged
            ? res.status(200).json({ message: "User successfully created" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

// update selected class
const updateSelectedClass = (userCollection) => {
    return async (req, res) => {
        const { email, id } = req.query;

        // update the user
        const updatedUser = await userCollection.updateOne(
            { email: email },
            { $push: { selectedClasses: id } }
        );

        updatedUser.acknowledged
            ? res.status(200).json({ message: "successfully updated" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

// update unselected class
const updateUnselectedClass = (userCollection) => {
    return async (req, res) => {
        const { id, email } = req.query;

        // update the user
        const updatedUser = await userCollection.updateOne(
            { email: email },
            { $pull: { selectedClasses: id } }
        );

        updatedUser.acknowledged
            ? res.status(200).json({ message: "successfully updated" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

// update user role
const updateUserRole = (userCollection) => {
    return async (req, res) => {
        const { role, email } = req.query;

        // update the user
        const updatedUser = await userCollection.updateOne(
            { email: email },
            { $set: { role, classesTaken: 0, classes: [], students: 0 } }
        );

        updatedUser.acknowledged
            ? res.status(200).json({ message: `Added as ${role}` })
            : res.status(400).json({ error: "Bad Request" });
    };
};

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
    createUser,
    updateSelectedClass,
    updateUnselectedClass,
    updateUserRole,
};
