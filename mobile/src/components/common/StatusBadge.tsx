import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { TaskStatus } from '../../api/tasks';
import { colors, typography } from '../../theme';

interface StatusBadgeProps {
  status: TaskStatus;
  style?: StyleProp<ViewStyle>;
}

export function StatusBadge({ status, style }: StatusBadgeProps) {
  const isCompleted = status === TaskStatus.COMPLETED;
  
  const statusColor = isCompleted ? colors.statusCompletedText : colors.statusPendingText;
  const statusBg = isCompleted ? colors.statusCompleted : colors.statusPending;
  const dotColor = isCompleted ? colors.success : colors.warning;

  return (
    <View style={[styles.badge, { backgroundColor: statusBg }, style]}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={[styles.statusText, { color: statusColor }]}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    ...typography.label,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
