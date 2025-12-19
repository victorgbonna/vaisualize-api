require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const consolelog = require("./utils/consolelog");
const routes = require("./routes/api");
const path = require("path");
const cron = require('node-cron');
const Request = require("./model/Request");

const app = express();


app.use(cors());
app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use(express.json({ limit: "1000000mb", extended: true }));

const db = require("./configs/constants").mongoURI;

// Run every 12 hours → "0 */12 * * *"
cron.schedule("0 */12 * * *", async () => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await Request.findOneAndUpdate({
      status: "break",
      createdAt: { $lt: twoDaysAgo },
      
    }, {status: "break"});

    console.log(
      `${new Date().toISOString()}: Deleted expired entries with status 'break'`
    );
  } catch (error) {
    console.error("Error running cleanup cron:", error);
  }
});

//     const docs = await Request.find({});  // get all documents

//     for (const doc of docs) {
//       // read sibling fields

//       let oldValue = doc.chatGPT_response[0].visuals_obj;
// // console.log({oldValue});
//       if(!oldValue) {
//         oldValue = doc.chatGPT_response[0]
//       };
//       // compute new values
//       doc.visuals_obj = oldValue;

//       // save changes
//       await doc.save();
//     }
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async() => {
    console.log("MongoDB Connected")
    
  })
  .catch((err) => console.log(err));

global.appRoot = path.resolve(__dirname);

const PORT = process.env.PORT || 5001;
app.listen(PORT, (err) => {
  console.log("Server now running on port " + PORT);
});

routes(app);
