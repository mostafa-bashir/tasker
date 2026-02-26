import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { colors, spacing, typography } from '../../theme';

interface ScreenLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  scrollable?: boolean;
  headerContent?: ReactNode;
  showBackButton?: boolean;
}

export function ScreenLayout({
  children,
  title,
  subtitle,
  scrollable = false,
  headerContent,
  showBackButton = false,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const ContentWrapper = scrollable ? ScrollView : View;
  const contentStyle = scrollable ? styles.scrollContent : styles.content;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ImageBackground 
        source={require('../../../assets/bg.png')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(21, 21, 37, 0.7)', 'rgba(31, 31, 53, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>

      {(title || headerContent || showBackButton) && (
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <View style={styles.headerTextContainer}>
            {showBackButton && (
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
            )}
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          {headerContent && <View>{headerContent}</View>}
        </View>
      )}

      <ContentWrapper 
        style={contentStyle}
        contentContainerStyle={scrollable ? styles.scrollContentContainer : undefined}
        keyboardShouldPersistTaps={scrollable ? 'handled' : undefined}
      >
        {children}
      </ContentWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  headerTextContainer: {
    flex: 1,
  },
  backButton: {
    marginBottom: spacing.sm,
  },
  backButtonText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 40,
    paddingHorizontal: spacing.lg,
  },
});
