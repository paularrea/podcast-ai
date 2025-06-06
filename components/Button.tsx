import React from 'react';
import { Text, Pressable, ViewStyle } from 'react-native';
import { useDripsyTheme, SxProp, Text as DripsyText } from 'dripsy';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  sx?: SxProp;
}

const Button: React.FC<Props> = ({ title, onPress, disabled, sx }) => {
  const { theme } = useDripsyTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <DripsyText
        sx={{
          bg: disabled ? 'buttonDisabled' : 'primary',
          color: 'background',
          textAlign: 'center',
          fontWeight: 'bold',
          px: 16,
          py: 12,
          borderRadius: 'xl',
          ...sx,
        }}
      >
        {title}
      </DripsyText>
    </Pressable>
  );
};

export default Button;
