import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import { theme } from "@/theme";

interface DailyForecastProps {
  forecast: any[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  return (
    <View className="mb-2 space-y-3">
      <View className="flex-row items-center mx-5 space-x-2 mb-5">
        <CalendarDaysIcon size={22} color="white" />
        <Text className="text-white text-base">Previsão diária</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 10 }} showsHorizontalScrollIndicator={false}>
        {forecast?.map((day, index) => {
          let date = new Date(day?.date);
          let options: Intl.DateTimeFormatOptions = { weekday: "long" };
          let dayName = date.toLocaleDateString("pt-BR", options).split("-")[0];

          return (
            <View
              key={index}
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image source={{ uri: `https:${day.day?.condition?.icon}` }} className="h-11 w-11" />
              <Text className="text-white">{dayName}</Text>
              <Text className="text-white text-xl font-semibold">{day?.day?.avgtemp_c}&#176;</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DailyForecast;
