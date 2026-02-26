import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { colors, spacing, typography } from '../../theme';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function TextField({
  label,
  error,
  style,
  labelStyle,
  containerStyle,
  ...rest
}: TextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <TextInput
        {...rest}
        style={[styles.input, !!error && styles.inputError, style]}
        placeholderTextColor={colors.textLight}
        selectionColor={colors.primary}
        cursorColor={colors.primary} // Android
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: 6,
    color: colors.textMuted,
    ...typography.caption,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    marginTop: spacing.xs,
    color: colors.error,
    ...typography.label,
  },
});

