import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { colors, typography } from '../../theme';

interface PrimaryButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
  loading,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, (disabled || loading) && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    color: colors.white,
    ...typography.bodySemibold,
  },
});

