import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import './App.css'
import { StepperField, View, Heading, Text, Flex, Button, Message, Loader } from '@aws-amplify/ui-react';
import OptionsCheckboxes from "./OptionsCheckboxes.tsx";
import { convert } from "./genExpressions.ts"
import { MathJax } from "better-react-mathjax";
import { nanoid } from 'nanoid'
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from "../amplify/data/resource";
const client = generateClient<Schema>();

function Home() {
    useEffect(() => {
        getUser();
    }, []);

    const [options, setOptions] = useState({
        gammaFuncCheckBox: false,
        eulersIdentityCheckBox: true,
        limitExponentialCheckBox: true,
        limitPolynomialCheckBox: true,
        geometricSeriesCheckBox: true,
    })
    const [inputNumber, setInputNumber] = useState(0)
    const [expression, setExpression] = useState("")
    const [userId, setUserId] = useState("")
    const [lastestShare, setLatestShare] = useState("")
    const [error, setError] = useState("")
    const [isSaved, setIsSaved] = useState(false)
    const [loading, setLoading] = useState(false)

    function getUser() {
        getCurrentUser().then((value) => {
            setUserId(value?.userId)
        }, (reason) => {
            console.error(reason)
        })
    }

    async function share() {
        let shareId: string|undefined = nanoid(8)
        setLoading(true)
        try {
            const shareData = { id: shareId, content: expression, num: inputNumber };
            const newShare = await client.models.Share.create(shareData);
            shareId = newShare.data?.id?.toString()
            if (shareId) {
                setLatestShare(window.location.href + 'share/' + shareId)
            }
        } catch (err) {
            setError("Cannot create share")
            console.error('Error creating share:', err);
        }
        setLoading(false)
    }

    async function save() {
        setLoading(true)
        setIsSaved(false)
        try {
            const saveData = { num: inputNumber, content: expression };
            await client.models.Share.create(saveData);
            setIsSaved(true)
        } catch (err) {
            setError("Cannot save item.")
            console.error('Error saving item:', err);
        }
        setLoading(false)
    }

    async function generate() {
        setLoading(true)
        setExpression(convert(inputNumber, options))
        setLoading(false)
    }

    return (

        <View>
            <View className="main" margin={'auto'} padding={'20px'}>
                <View margin={'30px 0'} >
                    <Heading level={3}> Math expression generator.</Heading>
                    <Text variation="primary" as="p" fontWeight={400} fontStyle="normal" textDecoration="none">
                        What is a complicated math equation that equals x? Let's find out
                    </Text>
                </View>

                <StepperField max={1000} min={0} step={1} id="input" label="Enter an integer between 0 and 1000 inclusive" onStepChange={(newValue) => setInputNumber(newValue)} margin={'10px 0'} />
                <Flex justifyContent={'space-between'} >
                    <Button onClick={() => generate()} backgroundColor={'aliceblue'}>Generate</Button>
                </Flex>

                <OptionsCheckboxes options={options} setOptions={setOptions} />

                <Flex className="output" height={'90px'} border={'1px solid aliceblue'} justifyContent={'center'} alignItems={'center'}>
                    {loading ? <Loader size="large" /> : <MathJax>{`\\(${expression}\\)`}</MathJax>}

                </Flex>
                {expression ?
                    <View>
                        <Flex margin={'10px 0'} justifyContent={'space-between'}>
                            {userId ? <Button onClick={() => save()}>Save</Button> : ''}
                            <Button onClick={() => share()} backgroundColor={'aliceblue'}>Share</Button>
                        </Flex> {lastestShare && !error ? <Message isDismissible={true} dismissLabel="Dismiss" colorTheme="success">
                            <Heading level={5}> Share URL</Heading>
                            <Text >{lastestShare}</Text> </Message> : ''}

                        {error ? <Message isDismissible={true} dismissLabel="Dismiss" colorTheme="error"> {error} </Message> : ''}

                        {isSaved ? <Message isDismissible={true} dismissLabel="Dismiss" colorTheme="success"> Expression is saved! Visit your profile to view it. </Message> : ''}

                    </View> : ''

                }
                <View>
                    <Heading level={6} marginTop='50px'>Tips</Heading>
                    <ul>
                        <li> There is an endless number of math expressions for every number. Click "Generate" several times for a different output.</li>
                        <li> Right click (or long press if on a mobile device) on an equation to
                            copy the TeX commands or MathML code. </li>
                    </ul>
                </View>

            </View>
        </View>
    );
}

export default Home;
