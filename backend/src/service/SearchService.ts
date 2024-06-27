import {FoodTruck} from "../model/FoodTruck";

const earthRadiusKm = 6371.0;

export function searchByParams(parsedData: FoodTruck[], searchParams: {
    applicant?: string;
    foodItems?: string[];
    latitude?: number;
    longitude?: number;
    radiusKm: number
}) {
    return parsedData
        .filter(foodTruck => searchByApplicant(searchParams.applicant, foodTruck))
        .filter(foodTruck => searchByFoodItems(searchParams.foodItems, foodTruck))
        .filter(foodTruck => searchNearest(searchParams.latitude, searchParams.longitude, searchParams.radiusKm, foodTruck));
}

function searchByApplicant(applicant: string | undefined, foodTruck: FoodTruck) {
    if (!applicant) {
        return true;
    }
    return foodTruck.applicant
        && foodTruck.applicant.toLowerCase().includes(applicant.toLowerCase());
}

function searchByFoodItems(foodItems: undefined | string[], foodTruck: FoodTruck) {
    if (!foodItems) {
        return true;
    }
    return foodTruck.foodItems && foodItems.every(item => foodTruck.foodItems?.has(item));
}

function searchNearest(latitude: undefined | number,
                       longitude: undefined | number,
                       radiusKm: number,
                       foodTruck: FoodTruck) {
    if (!latitude || !longitude) {
        return true;
    }
    return foodTruck.latitude
        && foodTruck.longitude
        && calculateDistance(foodTruck.latitude, foodTruck.longitude, latitude, longitude)
        <= radiusKm;
}

/**
 * Calculate the Distance Using the Haversine Formula
 */
function calculateDistance(startLat: number, startLong: number, endLat: number, endLong: number): number {
    const dLat = toRadians(endLat - startLat);
    const dLong = toRadians(endLong - startLong);

    startLat = toRadians(startLat);
    endLat = toRadians(endLat);

    const a = haversine(dLat) + Math.cos(startLat) * Math.cos(endLat) * haversine(dLong);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
}

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

function haversine(val: number): number {
    return Math.pow(Math.sin(val / 2), 2);
}
