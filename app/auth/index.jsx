import { View, Text, SafeAreaView } from 'react-native'
import React, { use, useState } from 'react'
import { auth } from 'firebase'

const index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (params) => {

    }

    const signup = async (params) => {

    }

    return (
        <SafeAreaView>
            <Text> Index </Text>
        </SafeAreaView>
    )
}

export default index 