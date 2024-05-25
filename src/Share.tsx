import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { View, Flex, Loader } from '@aws-amplify/ui-react';
import { MathJax } from "better-react-mathjax";
// import { getShare } from './graphql/queries';
import type { Schema } from "../amplify/data/resource";
const client = generateClient<Schema>();


function Share() {
    const { id } = useParams();
    const [expression, setExpression] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchShareContent();
    }, [id]);

    async function fetchShareContent() {
        setLoading(true)
        try {
            if (id) {
                const share = await client.models.Share.get({id})
                if (share.data?.content) {
                    setExpression(share.data?.content)
                }
            }
        } catch (err) {
            setError("Share not found")
            console.error('Error creating share:', err);
        }
        setLoading(false)

    }

    return (
        <View>
            {!error ? <View className="main" margin={'auto'} padding={'20px'}>
                <Flex className="output" height={'90px'} border={'1px solid aliceblue'} justifyContent={'center'} alignItems={'center'}>
                    {loading ? <Loader size="large" /> : <MathJax>{`\\(${expression}\\)`}</MathJax>}
                </Flex>
            </View> : <View> Could not find share </View>}
        </View>

    );
}

export default Share;