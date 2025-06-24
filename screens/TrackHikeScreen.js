import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function TrackHikeScreen() {
  const [tracking, setTracking] = useState(false);
  const [locations, setLocations] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required to track hikes.');
      return;
    }

    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (loc) => {
        setLocations((prev) => [...prev, loc.coords]);
      }
    );

    setSubscription(sub);
    setTracking(true);
  };

  const stopTracking = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    setTracking(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Hike</Text>
      <Button
        title={tracking ? 'Stop Tracking' : 'Start Tracking'}
        onPress={tracking ? stopTracking : startTracking}
      />
      <Text style={styles.info}>Points recorded: {locations.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  info: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});
