import {View, Text, Button, TextInput} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Modal} from "../components";


// @ts-ignore
const ChildComponent = ({ onPress }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)

    }
const handleOpen = () => {
  setOpen(true)
}

    return (
        <View>
            <Button title="Click me" onPress={handleOpen} />
            <Modal visible={open} onRequestClose={handleClose}>
                <View>
                    <Text>This is the modal content.</Text>
                </View>
            </Modal>
        </View>
    );
};


export default function Home() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);



    const incrementCallBack = useCallback(
        () => {
            setCount(prevState => prevState + step)
        },
        [step],
    );

    // @ts-ignore
    const onChanege = (text)=>{
        setStep(parseInt(text))
    }


    return (
        <View>
            <Text>Count: {count}</Text>
            {/* ChildComponent receiving the memoized incrementCount callback */}
            <ChildComponent onPress={incrementCallBack} />
            {/* TextInput to update the 'step' state */}
            <TextInput
                style={{ borderWidth: 1, marginTop: 10, padding: 5 }}
                keyboardType="numeric"
                value={String(step)}
                onChangeText={onChanege}
            />
        </View>
    )
}
