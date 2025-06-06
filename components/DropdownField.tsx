import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { useDripsyTheme } from 'dripsy';

interface DropdownProps {
  label: string;
  data: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}

const DropdownField: React.FC<DropdownProps> = ({ label, data, value, onChange }) => {
  const { theme } = useDripsyTheme();
  const colors = theme.colors;
  const radii = theme.radii;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <RNDropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => onChange(item.value)}
        style={[
          styles.dropdown,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderRadius: radii.md,
          },
        ]}
        selectedTextStyle={{ color: colors.text }}
        placeholder="Select an option"
        placeholderStyle={{ color: colors.placeholder }}
        itemTextStyle={{ color: colors.text }}
        containerStyle={{
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radii.md,
          paddingVertical: 8,
          maxHeight: 240,
        }}
        activeColor={colors.secondaryBg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { marginBottom: 8, fontSize: 16, fontWeight: '600' },
  dropdown: {
    height: 50,
    borderWidth: 0,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});

export default DropdownField;
