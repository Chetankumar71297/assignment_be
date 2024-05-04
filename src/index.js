import mongoose from "mongoose";
import app from "./app.js";

//env variables
const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

//mongodb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongodb");
    app.listen(PORT, () => {
      console.log(`server is listening at port ${PORT}`);
    });
  });

//exit on mongodb error
mongoose.connection.on("error", (err) => {
  console.log(`Mongodb connection error: ${err}`);
});

/*let server;
server = app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});*/
