import React from "react";
import { View, StyleSheet } from "react-native";
import { AddGoal, GoalItem } from "../components";
import { StatusBar } from "expo-status-bar";
function App() {
  const [goals, setGoals] = React.useState(["Task 1", "Task 2"]);

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <AddGoal setGoals={setGoals} />
        <View style={styles.goalsContainer}>
          <GoalItem goals={goals} setGoals={setGoals} />
        </View>
      </View>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 5,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#26648e",
  },

  goalsContainer: {
    flex: 4,
    paddingVertical: 12,
  },
});
