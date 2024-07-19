import express from 'express'
import cors from 'cors'

const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(5000, () => {
    console.log("Server is listening on port 5000!");
});
