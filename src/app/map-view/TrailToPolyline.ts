import { TrailClassification } from "../TrailClassification";

export class TrailToPolyline {
    
    constructor(private code : string,
        private classification: String,
        private polyline: L.Polyline){
    }

    getCode() : string {
        return this.code;
    }

    getClassification(): TrailClassification {
        if(this.classification == "E"){
            return TrailClassification.E
        }
        if(this.classification == "T"){
            return TrailClassification.T
        }
        if(this.classification == "EE"){
            return TrailClassification.EE
        }
        return TrailClassification.EEA;
    }

    getPolyline() : L.Polyline {
        return this.polyline;
    }


}