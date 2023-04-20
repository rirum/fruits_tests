import app from "./index.js";
import "dotenv/config.js";



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
