import "./global.css"
import { Text, View } from "react-native";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                Welcome to Nativewind!
            </Text>
        </View>
    );
}

// import { View, Text, FlatList } from 'react-native';
// import { Link } from 'expo-router';
// import Button from "app/components/Button";
// import Card from "app/components/Card";

// const apps = [
//     { id: '1', name: 'ABC Mouse', category: 'Education' },
//     { id: '2', name: 'Minecraft', category: 'Games' },
//     { id: '3', name: 'Duolingo', category: 'Education' },
// ];

// export default function Home() {
//     return (
//         <View className="flex-1 p-4 bg-gray-50">
//             <Text className="text-2xl font-bold mb-6">Recommended Apps</Text>

//             <FlatList
//                 data={apps}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <Card className="mb-4">
//                         <Text className="font-bold text-lg">{item.name}</Text>
//                         <Text className="text-gray-600">{item.category}</Text>

//                         <Link
//                             href={{
//                                 pathname: "/features/reviews/create",
//                                 params: { appId: item.id, appName: item.name }
//                             }}
//                             asChild
//                         >
//                             <Button className="mt-3">Write Review</Button>
//                         </Link>
//                     </Card>
//                 )}
//             />
//         </View>
//     );
// }
