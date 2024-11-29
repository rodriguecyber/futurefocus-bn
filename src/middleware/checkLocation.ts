import { Request, Response, NextFunction } from "express";
import * as geolib from "geolib";

export interface Location {
  latitude: number;
  longitude: number;
}

interface LocationRequest extends Request {
  body: {
    latitude: number;
    longitude: number;
  };
}

export const checkLocation = (allowedLocation: Location, maxRadius: number) => {
  return async (
    req: LocationRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userLocation: Location = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      };

      const distance = geolib.getDistance(allowedLocation, userLocation);

      if (distance <= maxRadius) {
        next();
      } else {
        res.status(403).json({
          message: "Access denied: Location out of range",
          distance,
          maxRadius,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: "Invalid location data",
      });
    }
  };
};



