import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const profilePicture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvBFwvb_Vdhyy2pgn6qUkKtCruOQE0XGuX-_j-FsydWw&s';


const quickAccessItems = [
  { id: '1', title: 'Account', Ionicons: 'settings', value:'Manage ⟩' }, 
  { id: '3', title: 'Plus Status', value: 'Active ⟩' },
  { id: '4', title: 'Plus Points', value: '0' },
];

export default function ProfileScreen() {
  const renderQuickAccessItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.quickAccessItem}>
      {item.icon && <Ionicons name="settings-sharp" size={24} color="white" style={styles.quickAccessIcon} />}
      <Text style={styles.quickAccessText}>{item.title}</Text>
      {item.value && <Text style={styles.quickAccessValue}>{item.value}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>azamat s.</Text>
          <Text style={styles.profileEmail}>azamatsmagzanoff@gmail.com</Text>
        </View>
      </View>

      <FlatList
        data={quickAccessItems}
        renderItem={renderQuickAccessItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  list: {
    
    marginTop: 16,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#1C1C1C',
  },
  quickAccessIcon: {
    marginRight: 16,
  },
  quickAccessText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  quickAccessValue: {
    color: '#B3B3B3',
    fontSize: 16,
  },
});
