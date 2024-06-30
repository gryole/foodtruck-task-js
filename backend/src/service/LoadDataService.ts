import {promises as fs} from 'fs';
import {parse} from 'csv-parse/sync';
import {FoodTruck} from "../model/FoodTruck";


const locationIdIndex = 0;
const applicantIndex = 1;
const facilityTypeIndex = 2;
const locationDescriptionIndex = 4;
const addressIndex = 5;
const statusIndex = 10;
const foodItemsIndex = 11;
const latitudeIndex = 14;
const longitudeIndex = 15;
const scheduleIndex = 16;
const daysHoursIndex = 17;

export async function loadData(filePath: string) {
    const parsedData: Array<FoodTruck> = []
    const content = await fs.readFile(filePath);
    const records = <Array<Array<string>>>parse(content, {});
    // Remove headers
    records.shift();
    parsedData.push(...records.map((value: Array<string>) => {
        return new FoodTruck(
            value[locationIdIndex],
            value[applicantIndex],
            value[facilityTypeIndex],
            value[locationDescriptionIndex],
            value[addressIndex],
            value[statusIndex],
            parseFoodItems(value[foodItemsIndex]),
            parseFloat(value[latitudeIndex]),
            parseFloat(value[longitudeIndex]),
            value[scheduleIndex],
            value[daysHoursIndex]
        );
    }));
    return parsedData;
}

function parseFoodItems(value: string) {
    if (value.trim() === "") {
        return [];
    }
    const foodItems = value.split(":");
    const set = new Set(foodItems.map(item => item.trim()).filter(item => item.length > 0));
    return Array.from(set);
}


