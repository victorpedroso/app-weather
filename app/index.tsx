import React, { useCallback, useEffect, useState } from "react";
import { View, Alert, Image, SafeAreaView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { fetchLocations, fetchWeatherForecast } from "@/api/weather";
import { getData, storeData } from "@/utils/asyncStorage";
import SearchBar from "@/components/SearchBar";
import WeatherInfo from "@/components/WeatherInfo";
import DailyForecast from "@/components/DailyForecast";
import * as Progress from "react-native-progress";
import { debounce, set } from "lodash";

export default function Index() {
  const [showSearh, setShowSearh] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc: any) => {
    setLocations([]);
    setShowSearh(false);
    setLoading(true);
    fetchWeatherForecast({ cityName: loc.name, days: 7 }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData("cidade", loc.name);
    });
  };

  const handleSearch = (value: any) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value })
        .then(data => setLocations(data))
        .catch(error => Alert.alert("Erro", error.message));
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("cidade");
    let cityName = myCity || "sap jose dos campos";
    fetchWeatherForecast({ cityName, days: 7 }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image blurRadius={70} source={require("@/assets/images/bg.png")} className="absolute h-full w-full" />
      {!loading ? (
        <SafeAreaView className="flex flex-1">
          <SearchBar
            showSearh={showSearh}
            setShowSearh={setShowSearh}
            locations={locations}
            handleSearch={handleTextDebounce}
            handleLocation={handleLocation}
          />
          <WeatherInfo current={current} location={location} weather={weather} />
          <DailyForecast forecast={weather?.forecast?.forecastday} />
        </SafeAreaView>
      ) : (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b3" />
        </View>
      )}
    </View>
  );
}
