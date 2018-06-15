import { Component } from '@angular/core';

export class FormDataComponent {
    public property_details: property_details;
    public location: location;
    public area: area;
    public property_feature: property_feature;
    public price_details: price_details;
    public transaction_type: transaction_type;
    public additional_feature: additional_feature;
    public approved_by: approved_by;
    public flooring: flooring;
    public amenities: amenities;
    public images: any[];
    public images_data: images_data;
    public user_details: user_details;
    public enquiry_details:enquiry_details;
    
    constructor() {
        this.property_details = new property_details();
        this.location = new location();
        this.area = new area();
        this.property_feature = new property_feature();
        this.price_details = new price_details();
        this.transaction_type = new transaction_type();
        this.additional_feature = new additional_feature();
        this.approved_by = new approved_by();
        this.flooring = new flooring();
        this.amenities = new amenities();
        this.images_data = new images_data();
        this.user_details = new user_details();
        this.enquiry_details = new enquiry_details();
    }
}

export class user_details {
    public user: user;
    public otp: string;
    constructor() { 
    this.user = new user();
    }
}

export class enquiry_details {
    public user: user;
    public otp: string;
    public property_id: number;
    public interested_in: string;
    constructor() { 
    this.user = new user();
    }
}

export class user {
    public name: string;
    public country_code: string;
    public mobile: string;
    public email: string;
    public rera_id: string;
    public user_type: number;
    constructor() { }
}

export class property_details {
    public user_id: number;
    public user_type: number;
    public property_for: number;
    public property_type_id: number;
    public intersting_property_details: string;
    public landmarks_neighbourhood: string;
    public water_availability: boolean;
    public electricity_availability: boolean;
    public ownership_status: string;
    constructor() { }
}

export class location {
    public city: string;
    public name_of_society: string;
    public locality: string;
    public full_address: string;
    public land_zone_id: string;
    constructor() { }
}

export class area {
    public super_builtup_area: number;
    public builtup_area: number;
    public covered_area: number;
    public carpet_area: number;
    public measurement_id: number;
    public plot_area: number;
    public plot_length: number;
    public plot_breadth: number;
    public is_corner_plot: boolean;
    public business_type: string;
    public nearby_business: string;
    public width_of_entreance: string;
    constructor() { }
}

export class property_feature {
    public floor_no: number;
    public total_floor: number;
    public furnished_status: string;
    public washroom: number;
    public no_of_seats: number;
    public meeting_rooms: number;
    public open_hours: string;
    public lock_in_period: string;
    public pantry: string;
    public bedrooms: string;
    public balconies: string;
    public bathrooms: string;
    public willing_to_modify_interior: boolean;
    public corner_shop: boolean;
    public is_main_road_facing: boolean;
    public personl_washroom: boolean;
    public corner_showroom: boolean;
    public no_of_open_side: string;
    public road_facing_plot_width: string;
    public boundary_wall_made: boolean;
    public floors_allowed_for_construction: string;
    public any_construction_done: boolean;
    constructor() { }
}

export class price_details {
    public total_cost: string;
    public other_charges: string;
    public electricty_water_excluded: boolean;
    public security_amount: string;
    public brokerage: string;
    public response_from_brokers: boolean;
    public daily_for_office: string;
    public price_per_square_feet: boolean;
    public stamp_and_registeration_excuded: boolean;
    public maintenance_charge: string;
    public maintenance_charge_amount: string;
    public maintenance_charge_period: string;
    constructor() { }
}
export class transaction_type {
    public available_from: string;
    public available_from_month: string;
    public available_from_year: string;
    public age_of_construction: string;
    public currently_leased_out: boolean;
    public possession_status: string;
    public transaction_type: string;
    constructor() { }
}
export class additional_feature {
    public puja_room: boolean;
    public study: boolean;
    public store: boolean;
    public servant_room: boolean;
    public facing: string;
    public garden: boolean;
    public pool: boolean;
    public main_road: string;
    public covered_car_parking: string;
    public open_car_parking: string;
    public no_of_lifts: string;
    public flats_on_floor: string;
    constructor() { }
}
export class approved_by {
    public state: string;
    public authorities: string;
    constructor() { }
}
export class flooring {
    public ceramic_tiles: boolean;
    public Granite: boolean;
    public marble: boolean;
    public marbonite: boolean;
    public mosiac: boolean;
    public normal_tiles: boolean;
    public vitrified: boolean;
    public wooden: boolean;
    constructor() { }
}
export class amenities {
    public air_condition: boolean;
    public banquet_hal: boolean;
    public bar_or_lounge: boolean;
    public cafeteria: boolean;
    public club_house: boolean;
    public confrence_room: boolean;
    public dth_television_facility: boolean;
    public gymnasium: boolean;
    public intercom_facility: boolean;
    public internet: boolean;
    public jogging_track: boolean;
    public laundry_service: boolean;
    public lift: boolean;
    public manintenance_staff: boolean;
    public outdoor_tennis_court: boolean;
    public park: boolean;
    public piped_gass: boolean;
    public power_back_up: boolean;
    public private_terrace_garden: boolean;
    public ro_system: boolean;
    public rain_water_harvesting: boolean;
    public reserved_parking: boolean;
    public security: boolean;
    public service_goods_lift: boolean;
    public swimming_pool: boolean;
    public vaastu_compliant: boolean;
    public visitor_parking: boolean;
    public waste_disposal: boolean;
    public water_storage: boolean;
    constructor() { }
}
export class images_data {
    public image_label: string;
    public photo: string;
    constructor() { }
}