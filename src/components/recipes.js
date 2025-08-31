import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Recipes({ categories, foods }) {
  const navigation = useNavigation();

  // ✅ Render individual recipe cards
  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          keyExtractor={(item, index) => item.recipeId || item.idFood || index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  // ✅ Match your data fields
  const recipeName = item.recipeName || "Unnamed Recipe";
  const recipeDescription = item.cookingDescription || item.recipeCategory || "No description available";
  const recipeImage =
    item.recipeImage ||
    "https://via.placeholder.com/300x200.png?text=No+Image";

  return (
    <View
      style={[styles.cardContainer, { paddingHorizontal: 10 }]}
      testID="articleDisplay"
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
        style={{ flex: 1 }}
      >
        <Image
          source={{ uri: recipeImage }}
          style={styles.articleImage}
          resizeMode="cover"
        />
        <Text style={styles.articleText} numberOfLines={1}>
          {recipeName}
        </Text>
        <Text style={styles.articleDescription} numberOfLines={2}>
          {recipeDescription}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  cardContainer: {
    flex: 1,
    marginBottom: hp(2),
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
  },
  articleImage: {
    width: "100%",
    height: hp(20),
    backgroundColor: "#f3f3f3",
  },
  articleText: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: "#000",
    marginHorizontal: wp(2),
    marginTop: hp(1),
  },
  articleDescription: {
    fontSize: hp(1.5),
    color: "#555",
    marginHorizontal: wp(2),
    marginBottom: hp(1.5),
  },
  row: {
    justifyContent: "space-between",
  },
});