import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import peaksData from '../assets/adk_high_peaks.json';

const STORAGE_KEY = '@completed_peaks';

export default function PeaksScreen() {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    loadCompleted();
  }, []);

  const loadCompleted = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load peak data:', e);
    }
  };

  const togglePeak = async (name) => {
    const updated = { ...completed, [name]: !completed[name] };
    setCompleted(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const renderItem = ({ item }) => {
    const isDone = completed[item.name];
    return (
      <TouchableOpacity style={[styles.item, isDone && styles.completed]} onPress={() => togglePeak(item.name)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.elevation}>{item.elevation_ft} ft</Text>
        <Text style={styles.status}>{isDone ? '✓' : ''}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Adirondack 46 High Peaks</Text>
      <FlatList
        data={peaksData}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  completed: {
    backgroundColor: '#cce5cc',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  elevation: {
    fontSize: 14,
    color: '#444',
  },
  status: {
    position: 'absolute',
    right: 16,
    top: 16,
    fontSize: 20,
    color: '#2e7d32',
  },
});
