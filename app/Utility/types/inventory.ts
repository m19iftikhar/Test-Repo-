export interface MeetingRoomsType {
  recId?: string;
  locationId?: string;
  locationName?: string;
  floorId?: string;
  floorName?: string;
  resourceTypeId?: string;
  name?: string;
  capacity?: number;
  revenueAccountId?: string;
  description?: string;
  resourcePriceModelist?: ResourcePriceModelist[];
  resourceAmenityPriceModelList?: any[];
}

export interface ResourcePriceModelist {
  resourcePriceDurationName?: string;
  recId?: string;
  fkResourceId?: string;
  fkResourcePriceDurationId?: string;
  value?: number;
  rateDescription?: null;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: null;
  updatedBy?: string;
}

export interface Amenity {
  recId?: string;
  name?: string;
  price?: null;
  isAcive?: boolean;
}
export interface Location {
  recId?: string;
  locationName?: string;
  hoursStart?: string;
  hoursEnd?: string;
  timeZone?: string;
  timeZoneName?: string;
  description?: string;
  isOpen?: boolean;
}
