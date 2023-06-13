const { ObjectId, ClientSession } = require("mongodb");

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
        const { email, id } = req.query;

        // update the user
        const updatedUser = await users.updateOne(
            { email: email },
            { $push: { selectedClasses: id } }
        );

        // Generate a new ObjectId
        const objectId = new ObjectId(id);
        // update class
        const updatedClass = await classes.updateOne(
            { _id: objectId },
            { $inc: { seats: -1 } }
        );

        updatedUser.acknowledged && updatedClass.acknowledged
            ? res.status(200).json({ message: "successfully updated" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

// const getSelectedClass = (classCollection) => {
//     return async (req, res) => {
//         const classesID = req.query.classesID.split(",").map((id) => {
//             const newID = new ObjectId(id);
//             return newID;
//         });
//         console.log(classesID);

//         const selectedClasses = await classCollection
//             .find({ _id: { $all: [classesID] } })
//             .toArray();
//         // console.log(selectedClasses);

//         selectedClasses.length > 0
//             ? res.status(200).json(selectedClasses)
//             : res.status(404).json({ error: "data not found" });
//     };
// };

module.exports = {
    getAllClasses,
    updateSelectedClass,
    // getSelectedClass,
};
