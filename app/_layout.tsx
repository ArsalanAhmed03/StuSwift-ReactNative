import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(auth)/login">
      <Stack.Screen name="(auth)/index" />
      <Stack.Screen name="(auth)/signup" />
      <Stack.Screen name="(tabs)" /> {/* Main tab navigation */}
    </Stack>
  );
};

export default Layout;
