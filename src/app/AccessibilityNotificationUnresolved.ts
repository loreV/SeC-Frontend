import { TrailCoordinates } from "./TrailCoordinates";

export interface AccessibilityNotificationUnresolved { 
    _id: string,
    code: string, 
    description: string,
    reportDate: Date,
    isMinor: boolean,
    position: TrailCoordinates
}