import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

const AVATARS = [
  { id: 'lotus', image: require('@/assets/images/avatar-lotus.png') },
  { id: 'om', image: require('@/assets/images/avatar-om.png') },
  { id: 'meditation', image: require('@/assets/images/avatar-meditation.png') },
];

interface AvatarPickerProps {
  selectedAvatar: string;
  onAvatarSelect: (avatar: string) => void;
}

export function AvatarPicker({ selectedAvatar, onAvatarSelect }: AvatarPickerProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {AVATARS.map((avatar) => (
        <Pressable
          key={avatar.id}
          style={[
            styles.avatarButton,
            { borderColor: theme.backgroundTertiary },
            selectedAvatar === avatar.id && {
              borderColor: theme.primary,
              borderWidth: 3,
            },
          ]}
          onPress={() => onAvatarSelect(avatar.id)}
        >
          <Image source={avatar.image} style={styles.avatarImage} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'center',
  },
  avatarButton: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
