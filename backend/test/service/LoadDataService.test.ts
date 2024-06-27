import {loadData} from "../../src/service/LoadDataService";
import {FoodTruck} from "../../src/model/FoodTruck";

test('loadData test', async () => {
    let foodTrucks = await loadData('./test/data/test_data.csv');
    let expected: FoodTruck = {
        locationId: '735318',
        applicant: 'Ziaurehman Amini',
        facilityType: 'Push Cart',
        locationDescription: 'MARKET ST: DRUMM ST intersection',
        address: '5 THE EMBARCADERO',
        status: 'REQUESTED',
        foodItems: new Set(['South American/Peruvian food']),
        latitude: 37.7943310032468,
        longitude: -122.395811053023,
        schedule: 'http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=15MFF-0159&ExportPDF=1&Filename=15MFF-0159_schedule.pdf',
        daysHours: 'Mo-We:7AM-7PM',
    };
    expect(foodTrucks).toContainEqual(expected);
})