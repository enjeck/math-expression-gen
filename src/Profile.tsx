import { View, Heading, Text, Flex, Button, Loader } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
// import { listSaves } from './graphql/queries';
import { MathJax } from "better-react-mathjax";
import { AccountSettings } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
const client = generateClient<Schema>();

function Profile() {
    useEffect(() => {
        getResults();
    }, []);

    const handleSuccess = () => {
        alert('user has been successfully deleted')
    }

    const [saves, setSaves] = useState<{ num: number, content: string | undefined }[]>()
    const [loading, setLoading] = useState(false)

    async function getResults() {
        setLoading(true)
        try {
            const saves = await client.models.Share.list()
            if (saves.data) {
                let savesFormatted = saves.data.map((item) => { return { num: Number(item.num), content: item.content?.toString() } })
                setSaves(savesFormatted)
            }
        } catch (err) {
            console.error('Error fetching saves:', err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <View className="main" margin={'auto'} padding={'20px'} >
                <Authenticator>
                    {({ signOut, user }) => (
                        <View>
                            <Flex justifyContent={'space-between'}>
                                <Heading level={6}> Hello, {user?.username} </Heading>
                                <Button onClick={signOut}>Sign out</Button>
                            </Flex>

                            {!loading ?
                                <View margin='40px 20px'>

                                    {saves?.length ? <View> <Heading level={4}>My saved expressions</Heading>
                                        {saves ? saves.map((save, i) => {
                                            return <View key={i} marginTop='20px'> <Text>Number: {save.num} </Text>
                                                <Flex className="output" height={'90px'} border={'1px solid aliceblue'} justifyContent={'center'} alignItems={'center'}>
                                                    <MathJax>{`\\(${save.content}\\)`}</MathJax>
                                                </Flex>
                                            </View>
                                        }) : ""} </View> : <Text> Nothing saved yet.</Text>}

                                </View> : <Flex width='100%' justifyContent={'center'} padding='50px 0'> <Text> Loading...</Text><Loader size='large' /></Flex>}
                            <AccountSettings.DeleteUser onSuccess={handleSuccess} />
                        </View>
                    )}

                </Authenticator>
            </View >
        </>

    );
}

export default Profile;