const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const app = express();

app.use(express.json());                                                                    
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/farmer", require('./routes/farmer'));
app.use("/api/warehouseStaff", require('./routes/warehouseStaff'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

