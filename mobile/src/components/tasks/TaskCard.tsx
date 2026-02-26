import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Task } from '../../api/tasks';
import { colors, spacing, typography } from '../../theme';
import { StatusBadge } from '../common/StatusBadge';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  showAssignee?: boolean;
}

export function TaskCard({ task, onPress, showAssignee = true }: TaskCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
        <StatusBadge status={task.status} />
      </View>

      {task.description && (
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
      )}

      {showAssignee && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Assigned to:</Text>
          <Text style={styles.infoValue}>{task.assignedUser.email}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {showAssignee ? `By: ${task.createdBy.email}` : `Created by: ${task.createdBy.email}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24, // Slightly rounder for friendliness
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: colors.primary, // Tinted shadow for depth
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.bodySemibold,
    fontSize: 18,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoLabel: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textLight,
    marginRight: spacing.xs,
  },
  infoValue: {
    ...typography.caption,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    ...typography.label,
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
});
