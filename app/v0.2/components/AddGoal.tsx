import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

function AddGoal({
  setGoals,
}: {
  setGoals: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [goalText, setGoalText] = React.useState("");

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          value={goalText}
          onChangeText={(text) => setGoalText(text)}
          style={styles.textInput}
          placeholderTextColor="lightgray"
          placeholder="Type your goal here.."
        />
        <Button
          onPress={() => {
            if (goalText.trim() === "") return;
            setGoals((goals: string[]) => [...goals, goalText]);
            setGoalText("");
          }}
          title="Add Goal"
        />
      </View>
    </>
  );
}

export default AddGoal;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 5,
    borderBottomWidth: 5,
    borderBottomColor: "lightblue",
    flex: 1,
  },
  textInput: {
    color: "white",
    borderWidth: 1,
    borderColor: "lightblue",
    width: "70%",
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
});
