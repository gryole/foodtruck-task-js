import express = require('express');
import {loadData} from "./service/LoadDataService";
import {ErrorRequestHandler} from "express-serve-static-core";
import {AppError} from "./AppError";
import {parseParametersForSearch} from "./service/RequestParser";
import {searchByParams} from "./service/SearchService";
import {FoodTruck} from "./model/FoodTruck";

const app = express();
const port = process.env.PORT || 3000;
const foodTruckDataFile = `./src/data/Mobile_Food_Facility_Permit.csv`;
let parsedData: FoodTruck[] = [];
loadData(foodTruckDataFile)
    .then(value => parsedData = value)
    .catch(reason => console.log(`Failed to load data: ${reason}`));

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.get('/foodtrucks', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(parsedData));
});
app.get('/foodtrucks/foodItems', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([...new Set(parsedData.flatMap(value => value.foodItems ? [...value.foodItems] : []))].sort()));
});


app.get('/foodtrucks/search', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(searchByParams(parsedData, parseParametersForSearch(req))));
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