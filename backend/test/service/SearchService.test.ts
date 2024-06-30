import {searchByParams} from "../../src/service/SearchService";


test('should search by applicant', async () => {
    let actual = searchByParams([{applicant: 'a'},
        {applicant: 'applicantAAA'},
        {applicant: 'applicantAAB'},
        {applicant: 'applicantACC'},
        {applicant: ' '},
        {applicant: undefined},
    ], {
        applicant: 'aa', radiusKm: 1
    });

    expect(actual).toContainEqual({applicant: 'applicantAAA'});
    expect(actual).toContainEqual({applicant: 'applicantAAB'});
})

test('should search by food items', async () => {
    let actual = searchByParams([
        {foodItems: ['itemA', 'itemB']},
        {foodItems: ['itemA', 'itemC', ' ']},
        {foodItems: ['itemC', 'itemD', ' ']},
        {foodItems: undefined},
        {foodItems: []},
    ], {
        foodItems: ['itemC'], radiusKm: 1
    });

    expect(actual).toContainEqual({foodItems: ['itemA', 'itemC', ' ']});
    expect(actual).toContainEqual({foodItems: ['itemA', 'itemC', ' ']});
})


test('should search by coordinates', async () => {
    let actual = searchByParams([
        {latitude: 38.8976, longitude: -77.0366},
        {latitude: 20.9496, longitude: -77.0366},
    ], {
        latitude: 39.9496, longitude: -75.1503, radiusKm: 250
    });

    expect(actual).toContainEqual({latitude: 38.8976, longitude: -77.0366});
    expect(actual.length).toEqual(1);
})