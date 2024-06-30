export class FoodTruck {
    constructor(public locationId?: string,
                public applicant?: string,
                public facilityType?: string,
                public locationDescription?: string,
                public address?: string,
                public status?: string,
                public foodItems?: Set<string>,
                public latitude?: number,
                public longitude?: number,
                public schedule?: string,
                public daysHours?: string) {
    }
}