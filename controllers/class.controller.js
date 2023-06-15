const { ObjectId } = require("mongodb");

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

// create a class
const createClass = (classCollection) => {
    return async (req, res) => {
        const { name, email } = req.body;
        console.log(req.body);
        // find existing user
        const existingClass = await classCollection.findOne({ name, email });

        if (existingClass) {
            return res.json({ error: "Class already exist" });
        }

        const newClass = await classCollection.insertOne({
            ...req.body,
            status: "pending",
            enrolledStudents: 0,
        });

        // console.log(newUser);
        newClass.acknowledged
            ? res.status(200).json({ message: "Class successfully added" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

// update class status
const updateStatus = (classCollection) => {
    return async (req, res) => {
        const { id, status } = req.query;
        // Generate a new ObjectId
        const objectId = new ObjectId(id);
        const updatedClass = await classCollection.updateOne(
            { _id: objectId },
            { $set: { status } }
        );
        // console.log(updatedClass);

        updatedClass.acknowledged
            ? res.status(200).json({ message: "Status successfully updated" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

// send class approved/denied feedback
const sendFeedback = (classCollection) => {
    return async (req, res) => {
        const { id } = req.query;
        // Generate a new ObjectId
        const objectId = new ObjectId(id);
        const updatedClass = await classCollection.updateOne(
            { _id: objectId },
            { $set: { feedback: req.body.message } },
            { upsert: true }
        );
        // console.log(updatedClass);

        updatedClass.acknowledged
            ? res.status(200).json({ message: "Feedback successfully sent" })
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
    createClass,
    updateStatus,
    sendFeedback,
};
