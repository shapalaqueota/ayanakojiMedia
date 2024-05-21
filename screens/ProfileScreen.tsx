import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, Button } from 'react-native';
import ManageAccount from './icons/manageAccount.svg';
import AniPlus from './icons/aniPlusIc.svg';
import AniPoint from './icons/aniPoint.svg';
import SystemIcon from './icons/system.svg';
import DarkIcon from './icons/dark.svg';
import LightIcon from './icons/light.svg';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainApp'>;

const profilePicture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvBFwvb_Vdhyy2pgn6qUkKtCruOQE0XGuX-_j-FsydWw&s';

const quickAccessItems = [
  { id: '1', title: 'Account', icon: ManageAccount, value: 'Manage ⟩' },
  { id: '3', title: 'Plus Status', icon: AniPlus, value: 'Active ⟩' },
  { id: '4', title: 'Plus Points', icon: AniPoint, value: '0' },
];

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export default function ProfileScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    phone_number: '',
    email_verified: false,
  });
  const [theme, setTheme] = useState('System');
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = await getAuthHeaders();
        const response = await fetch('http://192.168.31.127:8080/users/:id', { headers });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          Alert.alert('Error', data.error || 'An error occurred');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred');
      }
    };

    fetchUserData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSaveChanges = async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch('http://192.168.31.127:8080/users/update', {
        method: 'PUT',
        headers,
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Changes saved successfully');
        toggleModal();
      } else {
        Alert.alert('Error', data.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    }
  };

  const handleVerifyEmail = () => {
    // Add logic to verify email
    Alert.alert('Verification email sent');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  const renderQuickAccessItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.quickAccessItem} onPress={toggleModal}>
      {item.icon && <item.icon width={19} height={19} style={styles.quickAccessIcon} />}
      <Text style={styles.quickAccessText}>{item.title}</Text>
      {item.value && <Text style={styles.quickAccessValue}>{item.value}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>{user.username}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      <FlatList
        data={quickAccessItems}
        renderItem={renderQuickAccessItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <Button title="Logout" onPress={handleLogout} color="#FF0000" />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Manage Account</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.emailContainer}>
                <TextInput
                  style={styles.inputEmail}
                  value={user.email}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                  editable={false}
                />
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyEmail}>
                  <Text style={styles.verifyButtonText}>verify ✉️</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.verificationStatus}>
                {user.email_verified ? 'Your email is verified!' : 'Your email is not verified! 😐'}
              </Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={user.username}
                onChangeText={(text) => setUser({ ...user, username: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={user.password}
                onChangeText={(text) => setUser({ ...user, password: text })}
                secureTextEntry
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Design theme</Text>
              <View style={styles.themeOptions}>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    theme === 'System' && styles.selectedThemeOption,
                  ]}
                  onPress={() => setTheme('System')}
                >
                  <SystemIcon width={24} height={24} />
                  <Text style={styles.themeOptionText}>System</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    theme === 'Dark' && styles.selectedThemeOption,
                  ]}
                  onPress={() => setTheme('Dark')}
                >
                  <DarkIcon width={24} height={24} />
                  <Text style={styles.themeOptionText}>Dark</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    theme === 'Light' && styles.selectedThemeOption,
                  ]}
                  onPress={() => setTheme('Light')}
                >
                  <LightIcon width={24} height={24} />
                  <Text style={styles.themeOptionText}>Light</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleSaveChanges}>
              <LinearGradient
                colors={['#212121', '#878787']}
                style={styles.saveButton}
                start={{ x: 0.45, y: 0 }}
                end={{ x: 0.7, y: 2 }}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#1C1C1C',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '60%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#484848',
  },
  inputEmail: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#484848',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifyButton: {
    backgroundColor: '#333333',
    paddingVertical: 11.5,
    paddingHorizontal: 13.5,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: '#484848',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  verificationStatus: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeOption: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#333333',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#484848',
  },
  selectedThemeOption: {
    backgroundColor: '#0E84FF',
  },
  themeOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
  saveButton: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
