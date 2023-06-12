
// get all review
const getAllReview = (reviewCollection) => {
    return async (req, res) => {
        const allReview = await reviewCollection.find().toArray();
        // console.log(allReview);

        allReview.length > 0
            ? res.status(200).json(allReview)
            : res.status(404).json({ error: "data not found" });
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