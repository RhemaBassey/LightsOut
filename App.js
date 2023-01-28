import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Vibration,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const App = () => {
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const data = Array.from({ length: 60 }, (_, i) => ({
    key: (i + 1).toString(),
    value: (i + 1).toString().padStart(2, "0"),
  }));

  // timer
  useEffect(() => {
    let intervalId = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(selected * 60);
  };

  return (
    <View style={styles.container}>
      {isRunning && (
        <View style={styles.timer}>
          <Text style={styles.timerLabel}>TIMER:</Text>
          <Text style={styles.timerCountdown}>
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </Text>
          <Text style={styles.timerText}>Phone will remain off for {Number(selected2)} {selected2 == 1 ? "minute":"minutes"}</Text>
        </View>
      )}
      <Text style={styles.setTimeLabel}>Set timer (mins):</Text>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        style={styles.input}
      />
      {selected != "" && (
        <Text style={{ paddingTop: 20 }}>
          {" "}
          Selected: {Number(selected)}{" "}
          {Number(selected) == 1 ? "minute" : "minutes"}
        </Text>
      )}

      <View style={styles.timeOut}>
        <Text style={styles.setTimeLabel}>Set screen-off duration (mins):</Text>
        {/* <TextInput
          style={styles.timeOutInput}
          keyboardType="numeric"
          onChangeText={(text) => {
            console.log(text);
          }}
          placeholder="-"
        /> */}
        <SelectList
          setSelected={(val) => setSelected2(val)}
          data={data}
          save="value"
          style={styles.input}
        />
        {selected2 != "" && (
          <Text style={{ paddingTop: 20 }}>
            {" "}
            Selected: {Number(selected2)}{" "}
            {Number(selected2) == 1 ? "minute" : "minutes"}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={handleStart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
  timerLabel: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  timerCountdown: {
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingBottom: 30,
  },
  timeOut: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 45,
  },
  setTimeLabel: {
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10,
  },
  timeOutInput: {
    width: 60,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom:20,
  },
  timerText:{
    fontSize: 12
  }
});

export default App;
