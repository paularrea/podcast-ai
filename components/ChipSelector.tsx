import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useDripsyTheme } from 'dripsy';

interface ChipSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  scrollable?: boolean;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({
  label,
  options = [],
  selected,
  onSelect,
  scrollable = true,
}) => {
  const { theme } = useDripsyTheme();
  const colors = theme.colors;
  const radii = theme.radii;

  const Wrapper = scrollable ? ScrollView : View;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Wrapper
        horizontal={scrollable}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={scrollable && styles.horizontalScroll}
        style={!scrollable && styles.wrap}
      >
        {Array.isArray(options) &&
          options.map((option) => (
            <Pressable
              key={option}
              onPress={() => onSelect(option)}
              style={[
                styles.chip,
                {
                  borderRadius: radii.md,
                  backgroundColor: selected === option ? colors.secondary : colors.background,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: selected === option ? colors.background : colors.text,
                  fontWeight: '600',
                  minWidth: 56,
                  textAlign: 'center',
                }}
              >
                {option}
              </Text>
            </Pressable>
          ))}
      </Wrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { marginBottom: 8, fontSize: 16, fontWeight: '600' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 0,
  },
  horizontalScroll: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ChipSelector;
