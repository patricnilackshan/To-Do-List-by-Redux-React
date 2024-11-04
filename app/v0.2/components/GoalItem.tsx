import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
function GoalItem({
  goals,
  setGoals,
}: {
  goals: string[];
  setGoals: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const deleteGoal = (index: number) => {
    setGoals((goals) => goals.filter((goal, i) => i !== index));
  };

  return (
    <>
      <View style={styles.imageContainer}>
        {goals.length === 0 && (
          <>
            <Image
              style={styles.image}
              source={require("../assets/goal.jpg")}
            />
            <Text style={styles.goalText}>Add Some Goals</Text>
          </>
        )}
      </View>
      <FlatList
        data={goals}
        renderItem={(goal) => (
          <View style={styles.goalItem}>
            <Pressable
              android_ripple={styles.goalRipple}
              onPress={() => {
                deleteGoal(goal.index);
              }}
            >
              <Text style={styles.goalText}>{goal.item}</Text>
            </Pressable>
          </View>
        )}
      />
    </>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    marginVertical: 10,
    borderRadius: 6,
    backgroundColor: "#123456",
  },
  goalText: {
    margin: 4,
    padding: 8,
    color: "white",
    fontSize: 16,
  },
  goalRipple: {
    color: "lightblue",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
});
