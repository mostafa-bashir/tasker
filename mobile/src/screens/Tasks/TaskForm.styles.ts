import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.text,
  },
  formContainer: {
    padding: spacing.lg,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  sectionLabel: {
    ...typography.label,
    fontSize: 10,
    color: colors.textLight,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  userList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 40,
  },
  userButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userButtonSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  userButtonText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textMuted,
  },
  userButtonTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  buttonContainer: {
    marginTop: spacing.xl,
    marginBottom: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
