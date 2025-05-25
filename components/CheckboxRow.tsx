import React from 'react';
import { Pressable, View, Text } from 'dripsy';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

export default function CheckboxRow({ label, value, onValueChange }: Props) {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        mb: 3,
      }}
    >
      <View
        sx={{
          width: 20,
          height: 20,
          borderWidth: 2,
          borderColor: 'primary',
          bg: value ? 'primary' : 'background',
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
          mr: 12,
        }}
      >
        {value && <Ionicons name="checkmark" size={14} color="black" />}
      </View>
      <Text sx={{ color: 'text', fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}
