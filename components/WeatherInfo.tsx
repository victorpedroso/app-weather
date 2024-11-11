import React from "react";
import { View, Text, Image } from "react-native";

interface WeatherInfoProps {
  current: any;
  location: any;
  weather: any;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ current, location, weather }) => {
  return (
    <View className="mx-4 flex justify-around flex-1 mb-2">
      <Text className="text-white text-center text-2xl font-bold">
        {location?.name},
        <Text className="text-lg font-semibold text-gray-300"> {location?.region}</Text>
      </Text>
      <View className="flex-row justify-center">
        <Image source={{ uri: `https:${current?.condition?.icon}` }} className="w-52 h-52" />
      </View>
      <View className="space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">{current?.temp_c}&#176;</Text>
        <Text className="text-center text-white text-xl tracking-widest">{current?.condition?.text}</Text>
      </View>
      <View className="flex-row justify-between mx-4">
        <View className="flex-row space-x-2 items-center gap-2">
          <Image source={require("@/assets/icons/wind.png")} className="w-6 h-6" />
          <Text className="text-white font-semibold text-base">{current?.wind_kph}km</Text>
        </View>
        <View className="flex-row space-x-2 items-center gap-2">
          <Image source={require("@/assets/icons/drop.png")} className="w-6 h-6" />
          <Text className="text-white font-semibold text-base">{current?.humidity}%</Text>
        </View>
        <View className="flex-row space-x-2 items-center gap-2">
          <Image source={require("@/assets/icons/sun.png")} className="w-6 h-6" />
          <Text className="text-white font-semibold text-base">{weather?.forecast.forecastday[0]?.astro?.sunrise}</Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherInfo;
