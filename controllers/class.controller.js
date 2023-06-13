// get all classes
const getAllClasses = (classCollection) => {
    return async (req, res) => {
        const allClasses = await classCollection.find().toArray();
        // console.log(allClasses);

        allClasses.length > 0
            ? res.status(200).json(allClasses)
            : res.status(404).json({ error: "data not found" });
    };
};

// update class's seat
const updateSelectedClass = (users, classes) => {
    return async (req, res) => {
        // Generate a new ObjectId
        const { email, id } = req.query;
        // update the user
        const updatedUser = await users.updateOne(
            { email: email },
            { $push: { selectedClasses: id } }
        );

        // update class
        const objectId = new ObjectId(id);
        const updatedClass = await classes.updateOne(
            { _id: objectId },
            { $inc: { seats: -1 } }
        );

        updatedUser.acknowledged && updatedClass.acknowledged
            ? res.status(200).json({ message: "successfully updated" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

// // find product by email
// const findProductByEmail = (products) => {
//     return async (req, res) => {
//         const userProducts = await products
//             .find({ email: req.params.email })
//             .toArray();
//         // console.log(userProducts);

//         userProducts.length > 0
//             ? res.status(200).json(userProducts)
//             : res.status(404).json({ error: "data not found" });
//     };
// };

// // find product by category
// const findProductByCategory = (products) => {
//     return async (req, res) => {
//         const sports_cars = await products
//             .find({ category: "sports car" })
//             .toArray();
//         // console.log(sports_cars);

//         const trucks = await products.find({ category: "truck" }).toArray();
//         // console.log(trucks);

//         const police_cars = await products
//             .find({ category: "police car" })
//             .toArray();
//         // console.log(police_cars);

//         sports_cars.length > 0 || trucks.length > 0 || police_cars.length > 0
//             ? res.status(200).json({ sports_cars, trucks, police_cars })
//             : res.status(500).json({ error: "data not found" });
//     };
// };

module.exports = {
    getAllClasses,
    updateSelectedClass,
};
