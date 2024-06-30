import express = require('express');
import {loadData} from "./service/LoadDataService";
import {ErrorRequestHandler} from "express-serve-static-core";
import {AppError} from "./AppError";
import {parseParametersForSearch} from "./service/RequestParser";
import {searchByParams} from "./service/SearchService";
import {FoodTruck} from "./model/FoodTruck";
import path from "node:path";

const app = express();
const port = process.env.PORT || 5000;
const foodTruckDataFile = `./src/data/Mobile_Food_Facility_Permit.csv`;
let parsedData: FoodTruck[] = [];
loadData(foodTruckDataFile)
    .then(value => parsedData = value)
    .catch(reason => console.log(`Failed to load data: ${reason}`));

const buildFrontendPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(buildFrontendPath));

app.get('/api/foodtrucks', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(parsedData));
});
app.get('/api/foodtrucks/foodItems', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([...new Set(parsedData.flatMap(value => value.foodItems ? value.foodItems : []))].sort()));
});


app.get('/api/foodtrucks/search', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(searchByParams(parsedData, parseParametersForSearch(req))));
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(buildFrontendPath);
});


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode);
        res.send(err.message);
        return;
    }
    next(err);
};

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.use(errorHandler)
