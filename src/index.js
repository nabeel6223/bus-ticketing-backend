import express from 'express';
import cors from "cors";

import route from './route.js'
const app = express();
const port = 9090; // Or any desired port

app.use(express.json());
// app.use(cors())
app.use(cors({
    origin: "https://your-netlify-site.netlify.app"
}));
app.use(`/api/`, route);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});