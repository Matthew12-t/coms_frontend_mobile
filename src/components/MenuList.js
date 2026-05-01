import { Image, Text, View } from "react-native";

import { formatCurrencyIDR } from "../utils/format";

const MenuList = ({ menus }) => {
  if (!menus?.length) {
    return (
      <Text className="text-xs text-slate-500">No menu available right now.</Text>
    );
  }

  return (
    <View className="gap-3">
      {menus.map((menu) => (
        <View
          key={menu.id}
          className="flex-row gap-3 rounded-2xl bg-slate-50 p-3"
        >
          {menu.image_url ? (
            <Image
              source={{ uri: menu.image_url }}
              className="h-14 w-14 rounded-xl"
            />
          ) : null}
          <View className="flex-1">
            <Text className="text-sm font-semibold text-slate-900">
              {menu.name}
            </Text>
            {menu.description ? (
              <Text className="text-xs text-slate-500" numberOfLines={1}>
                {menu.description}
              </Text>
            ) : null}
            <Text className="mt-1 text-xs font-bold text-slate-900">
              {formatCurrencyIDR(menu.price)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MenuList;
