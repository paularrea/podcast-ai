import { Text, TextInput, View } from "dripsy";

export const InputField = ({ label, value, onChangeText, placeholder, error }) => (
  <View sx={{ mb: "lg" }}>
    <Text sx={{ variant: "text.label", mb: 2 }}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      sx={{
        borderWidth: 1,
        borderColor: error ? "error" : "border",
        borderRadius: 8,
        px: 12,
        py: 10,
      }}
    />
    {error && <Text sx={{ color: "error", mt: 1 }}>{error}</Text>}
  </View>
);
