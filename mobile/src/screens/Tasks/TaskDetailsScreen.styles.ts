import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  statusSection: {
    marginBottom: spacing.xl,
    flexDirection: 'row',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  statusText: {
    ...typography.label,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 24,
    marginBottom: 32,
  },
  descriptionMuted: {
    ...typography.body,
    color: colors.textLight,
    fontStyle: 'italic',
    marginBottom: 32,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    ...typography.label,
    fontSize: 9,
    color: colors.textLight,
    marginBottom: 4,
  },
  infoValue: {
    ...typography.bodySemibold,
    fontSize: 13,
    color: colors.text,
  },
  actions: {
    gap: 16,
    marginBottom: 40,
  },
  adminActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editButtonText: {
    ...typography.bodySemibold,
    color: colors.text,
    fontSize: 14,
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.2)',
  },
  deleteButtonText: {
    ...typography.bodySemibold,
    color: colors.error,
    fontSize: 14,
  },
});
