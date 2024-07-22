import mongoose from "mongoose";

//create a function to connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://omomarian:Pb2JdFPFz8VOLfyS@cluster0.mimytlk.mongodb.net/mongoose-checkpoint?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB Connected Successfully`);
    console.log("creating user document");
    queryChain();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// create a person prototype

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favouriteFoods: [String],
});

//task 2: create a person model
const Person = mongoose.model("Person", personSchema);

//task 2b: create a person document
async function createPerson() {
  try {
    const person = new Person({
      name: "John",
      age: 37,
      favouriteFoods: ["Pizza", "Hamburger"],
    });
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
}
//task 3: create many peole with  `Model.create()`
const createManyPeople = async () => {
  let arrayOfPeople = [
    { name: "Yusuf", age: 187, favouriteFoods: ["Noodles", "Rice", "Eba"] },
    {
      name: "Aisha",
      age: 27,
      favouriteFoods: ["Pepper Soup", "Meat", "Pasta"],
    },
    { name: "Fatima", age: 17, favouriteFoods: ["Pizza", "Hamburger", "Eba"] },
  ];

  try {
    const result = await Person.create(arrayOfPeople);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

//task 4: use `Model.find()` to search your database
const findPeopleByName = async () => {
  try {
    const person = await Person.find({ name: "Yusuf" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};
//task 5: use `Model.findOne() to return matching document from your database
const findOnePerson = async () => {
  try {
    const person = await Person.findOne({ favouriteFoods: "Eba" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//task 6: use `Model.findById()` to search your database by `_id~ and return a single document
const findPersonById = async () => {
  try {
    const person = await Person.findById("6691538fa6522ba61caeaf7c");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};
//task 7: perform classic updates by running find, edit, then save
const findEditThenSave = async () => {
  try {
    const person = await Person.findById("6691538fa6522ba61caeaf7d");
    person.favouriteFoods.push("Beans");
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//task 8: performclassic update on a document using `model.findOneAndUpdate()`
const findAndUpdate = async () => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: "Yusuf" },
      { age: 1000 },
      { new: true }
    );
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//task 9: delete obe document using `model.findByIdAndDelete`
const deletePersonById = async () => {
  try {
    const person = await Person.findByIdAndDelete("6691538fa6522ba61caeaf7b");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//task 10: mongoDB and Mongoose - delete many documents with `model.remove()`
const removeManyPeople = async () => {
  try {
    const person = await Person.deleteMany({ name: "John" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

//task 11: chain search query helpers to narrow search results
const queryChain = async () => {
  try {
    const person = await Person.find({ favouriteFoods: "Eba" })
      .sort({ name: "asc" })
      .limit(2)
      .select("-age")
      .exec();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};
connectDB();
