import React, { Children, ReactNode, useContext, useEffect, useState } from "react";

interface Location {
  latitude: number; 
  longitude: number; 
}

const LocationContext = React.createContext<Location>({} as Location);

export function LocationProvider({ children }: any) {
  const [location, setLocation] = useState<Location>({} as Location);

  function handleLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
    }
  };

  useEffect(() => {
    handleLocation();
  }, []);

  return(
    <LocationContext.Provider 
      value={{ latitude: location.latitude, longitude: location.longitude}}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext);

  return context;
}