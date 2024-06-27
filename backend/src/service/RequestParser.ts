import {Request} from "express";
import {AppError} from "../AppError";
import {ParsedQs} from "qs";

const defaultRadiusKm = 2;

export function parseParametersForSearch(req: Request) {
    const applicant = <string | undefined>req.query.applicant
    let radiusKm = parseNumber(req.query.radiusKm);
    if (radiusKm === undefined) {
        radiusKm = defaultRadiusKm;
    }
    let latitude = parseNumber(req.query.latitude);
    let longitude = parseNumber(req.query.longitude);
    if (latitude !== undefined && longitude === undefined) {
        throw new AppError(`longitude should not be undefined`);
    }
    if (longitude !== undefined && latitude === undefined) {
        throw new AppError(`latitude should not be undefined`);
    }
    let foodItems = parseArray(req.query.foodItems);
    return {applicant, radiusKm, latitude, longitude, foodItems};
}

function parseArray(param: undefined | string | string[] | ParsedQs | ParsedQs[]) {
    if (typeof param === "string") {
        return [param];
    }
    if (Array.isArray(param)) {
        return <string[]>param;
    }
    return undefined;
}

function parseNumber(param: undefined | string | string[] | ParsedQs | ParsedQs[]) {
    if (param !== undefined && typeof param === "string") {
        let parsed = parseFloat(param);
        if (isNaN(parsed)) {
            throw new AppError(`Invalid param: ${param}`, 400);
        }
        return parsed;
    }
    return undefined;
}

