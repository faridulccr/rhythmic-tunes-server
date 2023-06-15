// create an express server
const express = require("express");
// const bodyParser = require('body-parser')
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateSelectedClass,
    updateUnselectedClass,
    updateUserRole,
} = require("./controllers/user.controller");

const {
    getAllClasses,
    createClass,
    updateStatus,
    sendFeedback,
    updateEnrolledClass
} = require("./controllers/class.controller");

// create express server
const app = express();
app.use(cors());
app.use(express.json());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
// app.use(bodyParser.json());
app.use(express.static("views"));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        client.connect();

        // create a collection for user
        const userCollection = client.db("SummerSchoolDB").collection("users");

        // create a collection for classes
        const classCollection = client
            .db("SummerSchoolDB")
            .collection("classes");

        // welcome message
        app.get("/", (req, res) => {
            res.status(200).json({ message: "welcome to server" });
        });

        // get all users
        app.get("/api/users", getAllUsers(userCollection));

        // get single user
        app.get("/api/single-user", getSingleUser(userCollection));

        // create an user
        app.post("/api/create-user", createUser(userCollection));

        // update for selected class by a user
        app.put(
            "/api/user/selected-class",
            updateSelectedClass(userCollection)
        );

        // update after enroll for a selected class by a user
        app.put(
            "/api/user/enrolled-class",
            updateEnrolledClass(userCollection, classCollection)
        );

        // update for unselected class by a user
        app.put(
            "/api/user/unselected-class",
            updateUnselectedClass(userCollection)
        );

        // update user role
        app.put("/api/update-role", updateUserRole(userCollection));

        // update class status
        app.put("/api/update-status", updateStatus(classCollection));

        // send class approved/denied feedback
        app.put("/api/send-feedback", sendFeedback(classCollection));

        // get all classes
        app.get("/api/classes", getAllClasses(classCollection));

        // get all selected classes
        // app.get(
        //     "/api/selected-class",
        //     getSelectedClass(classCollection)
        // );

        // add a class
        app.post("/api/add-class", createClass(classCollection));

        // update class status
        app.put("/api/update-status", updateStatus(classCollection));

        // // delete product
        // app.delete(
        //     "/api/delete-product/:id",
        //     deleteProduct(productsCollection)
        // );

        // not found error handling
        app.use((req, res, next) => {
            res.status(404).json({
                message: "Not Found",
            });
        });

        // server error handling
        app.use((err, req, res, next) => {
            console.log(err.stack);
            res.status(500).send("something broke");
        });
        // console.log("connected");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

module.exports = app;
