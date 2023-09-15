import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import HomeStack from './components/BottomTab';


export default function MyGame({ route }) {
  const { game, pendingRequests, acceptedRequests } = route.params;

  const renderRequest = ({ item }) => {
    return (
      <View style={styles.requestItemPending}>
        <Text style={styles.requestText}>User Sub: {item.requester_sub}</Text>
      </View>
    );
  };

  const renderAccepted = ({ item }) => {
    return (
      <View style={styles.requestItemAccepted}>
        <Text style={styles.requestText}>User Sub: {item.requester_sub}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Game</Text>
      {/* Accepted Requests */}
      <View style={styles.listContainer}>
        <Text style={styles.subTitleAccepted}>Accepted Requests</Text>
        <FlatList
          data={acceptedRequests}
          renderItem={renderAccepted}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* Divider */}
      <View style={styles.divider}></View>
      {/* Pending Requests */}
      <View style={styles.listContainer}>
        <Text style={styles.subTitlePending}>Pending Requests</Text>
        <FlatList
          data={pendingRequests}
          renderItem={renderRequest}
          keyExtractor={(item) => item.id}
        />
      </View>

      <HomeStack></HomeStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',  // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',  // Dark gray text
  },
  subTitleAccepted: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',  // Green text
  },
  subTitlePending: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF9800',  // Orange text
  },
  listContainer: {
    flex: 1,
  },
  requestItemAccepted: {
    backgroundColor: '#E8F5E9',  // Light green background
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  requestItemPending: {
    backgroundColor: '#FFF3E0',  // Light orange background
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  requestText: {
    fontSize: 16,
    color: '#333',  // Dark gray text
  },
  divider: {
    height: 20,
    backgroundColor: '#EEE',  // Very light gray
  },
});