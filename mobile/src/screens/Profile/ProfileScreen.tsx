import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { ScreenLayout } from '../../components/common/ScreenLayout';
import styles from './ProfileScreen.styles';

export function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error('Failed to sign out', e);
    }
  };

  return (
    <ScreenLayout title="Profile" subtitle="Manage your account">
      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          
          <Text style={styles.userName}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role}</Text>
          </View>
        </View>

        <View style={styles.actionSection}>
          <PrimaryButton
            label="Log Out"
            onPress={handleSignOut}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}
