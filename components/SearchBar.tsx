import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/outline";
import { theme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";

interface SearchBarProps {
  showSearh: boolean;
  setShowSearh: React.Dispatch<React.SetStateAction<boolean>>;
  locations: any[];
  handleSearch: (value: string) => void;
  handleLocation: (loc: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ showSearh, setShowSearh, locations, handleSearch, handleLocation }) => {
  return (
    <SafeAreaView style={{ height: "7%" }} className="mx-4 relative z-50">
      <View className="flex-row justify-end items-center rounded-full" style={{ backgroundColor: showSearh ? theme.bgWhite(0.2) : "transparent" }}>
        {showSearh && (
          <TextInput
            onChangeText={handleSearch}
            placeholder="Pesquisar cidade"
            placeholderTextColor="lightgray"
            className="pl-6 h-10 pb-1 flex-1 text-base text-white"
          />
        )}
        <TouchableOpacity
          style={{ backgroundColor: theme.bgWhite(0.3) }}
          className="rounded-full p-3 m-1"
          onPress={() => setShowSearh(!showSearh)}
        >
          <MagnifyingGlassIcon color="white" size={20} />
        </TouchableOpacity>
      </View>

      {locations.length > 0 && showSearh && (
        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
          {locations.map((location, index) => {
            let showBorder = index + 1 !== locations.length;
            let borderClass = showBorder ? "border-b-2 border-b-gray-400" : "";
            return (
              <TouchableOpacity key={index} className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`} onPress={() => handleLocation(location)}>
                <MapPinIcon color="gray" size={20} />
                <Text className="text-black text-lg ml-2">{location?.name}, {location?.country}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchBar;
