// components/ToggleRow.tsx
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useDripsyTheme } from 'dripsy';

interface ToggleRowProps {
  label: string;
  value: 'single' | 'dialogue';
  onToggle: (val: 'single' | 'dialogue') => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, value, onToggle }) => {
  const { theme } = useDripsyTheme();
  const colors = theme.colors;

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>      
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={styles.toggleContainer}>
        <Text style={{ color: colors.text, marginRight: 8 }}>Single</Text>
        <Switch
          value={value === 'dialogue'}
          onValueChange={(v) => onToggle(v ? 'dialogue' : 'single')}
          trackColor={{ false: colors.muted, true: colors.primary }}
          thumbColor={value === 'dialogue' ? colors.text : colors.background}
        />
        <Text style={{ color: colors.text, marginLeft: 8 }}>Dialogue</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ToggleRow;
