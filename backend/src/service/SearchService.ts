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

function searchByApplicant(searchApplicant: string | undefined, foodTruck: FoodTruck) {
    if (!searchApplicant) {
        return true;
    }
    return foodTruck.applicant
        && foodTruck.applicant.toLowerCase().includes(searchApplicant.toLowerCase());
}

function searchByFoodItems(searchFoodItems: undefined | string[], foodTruck: FoodTruck) {
    if (!searchFoodItems) {
        return true;
    }
    const set = new Set(foodTruck.foodItems);
    return foodTruck.foodItems && searchFoodItems.every(item => set.has(item));
}

function searchNearest(searchLatitude: undefined | number,
                       searchLongitude: undefined | number,
                       searchRadiusKm: number,
                       foodTruck: FoodTruck) {
    if (!searchLatitude || !searchLongitude) {
        return true;
    }
    return foodTruck.latitude !== undefined
        && foodTruck.longitude !== undefined
        && (calculateDistance(foodTruck.latitude, foodTruck.longitude, searchLatitude, searchLongitude)
            <= searchRadiusKm);
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
