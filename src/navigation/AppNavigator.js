import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import LeadCaptureScreen from '../screens/LeadCaptureScreen';
import AdminScreen from '../screens/AdminScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
        <Stack.Screen name="LeadCapture" component={LeadCaptureScreen} options={{ title: 'Lead Capture' }} />
        <Stack.Screen name="Documents">
          {() => (
            <PlaceholderScreen
              title="Documents"
              message="Document module scaffolded. Integrate PDF assets and leave-behind materials here."
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Videos">
          {() => (
            <PlaceholderScreen
              title="Videos"
              message="Video module scaffolded. Hook this screen to local/streaming media later."
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Admin" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
