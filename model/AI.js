const Order = require("../schemas/order");
const Product = require("../schemas/product");
const People = require("../schemas/user");

async function consider(type, value = null) {
    
    try {

        const dataArray = [];
        const faild = "sorry i did not found any kind of data like you'r requirement."
        let temporaryData = null;

        switch (type) {
            case "product":

                temporaryData = await Product.find({
                    $or: [
                        { name: { $regex: value, $options: "i" } },
                        { price: { $regex: Number(value), $options: "i" } },
                        { description: { $regex: value, $options: "i" } },
                        { category: { $regex: value, $options: "i" } }
                    ]
                });

                dataArray.push(temporaryData || faild);
                break;

            case "admin":
                temporaryData = await People.findOne({ isAdmin: true });
                dataArray.push(temporaryData);
                break;

            case "user":
                temporaryData = "here we have " + await People.countDocuments() + " user & them" + await People.find();
                dataArray.push(temporaryData || faild);
                break;

            case "featured":
                temporaryData = await Product.find({ isFeatured: true });
                dataArray.push(temporaryData || faild);
                break;

            case "test":
                temporaryData = "hey i am ok you can get sure congratulations.";
                dataArray.push(temporaryData);
                break;
        }

        return { data: dataArray[0], type };

    } catch (error) {
        console.log(error);
    }
}

module.exports = { consider };