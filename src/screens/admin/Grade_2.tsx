import React, {useEffect, useState} from 'react'
import {Blocks, Text} from "../../components";
import {SectionList, StyleSheet} from "react-native";
import useClassList from "../../constants/data/useClassList";
import {useUsers} from "../../constants/data";

function Grade_2() {
    const grade = '2'
    const {users} = useUsers()
    const {studentRecord} = useClassList(grade)
    const [classNumber, setClassNumber] = useState<number>(0);
    useEffect(() => {
        if (users){
            const getClassNumbers = users.filter(user => user.type === 'student' &&
                user.grade === grade).length
            setClassNumber(getClassNumbers)
        }
    }, [users]);


    return (
        <Blocks
            style={{
                width: '100%',
                height: "100%",
                backgroundColor: "#f8f8f8"
            }}
        >

            <Blocks
                blur
                intensity={10}
                tint={'dark'}
                flex={1}
                align={'center'}
                justify={"center"}
                style={{
                    height: "100%",
                    width: "100%"
                }}
            >
                <Text
                    h5
                    black
                    padding={15}
                    style={{
                        textAlign: 'left',
                        width: "100%"
                    }}>Your Attendance</Text>

                <SectionList
                    style={{
                        height: "100%",
                        width: "100%",
                    }}
                    sections={studentRecord}
                    keyExtractor={(item, index) => item.key + index}
                    renderItem={({ item }) => (
                        <Blocks
                            padding={10}
                            marginVertical={5}
                            marginHorizontal={15}
                            card
                            flex={1}
                            row
                            white>
                            <Blocks
                                card
                                color={'#005f33'}
                                flex={1}
                                wrap={'wrap'}
                            >
                                <Text bold  white p>{item.name.split(" ")[0]}</Text>
                                <Text bold  white p>{item.name.split(" ")[1]}</Text>

                            </Blocks>
                            <Blocks
                                flex={1}
                                align={'center'}
                                justify={'center'}
                                marginTop={15}
                            >
                                <Blocks><Text bold black p>{item.check.toLowerCase() == 'check-in'?item.time.split(" ")[4]:"--:--"}</Text></Blocks>
                                <Blocks><Text bold black p>Check In</Text></Blocks>
                            </Blocks>

                            <Blocks
                                flex={1}
                                align={'center'}
                                justify={'center'}
                                marginTop={15}
                            >
                                <Blocks><Text bold black p>{item.check.toLowerCase() == 'check-out'?item.time.split(" ")[4]:"--:--"}</Text></Blocks>
                                <Blocks><Text bold black p>Check Out</Text></Blocks>
                            </Blocks>

                        </Blocks>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Blocks
                            margin={15}
                            card
                            style={styles.header}>
                            <Text style={styles.headerText}>{title}</Text>
                        </Blocks>
                    )}
                />

                <Text
                    size={18}
                    paddingHorizontal={20}
                    style={{
                        fontFamily: 'Poppins',
                        fontWeight: '900',
                        textAlign: 'right',
                        width: "100%",
                        fontStyle: "italic"
                    }}
                >
                    {`Class Total: ${classNumber}`}
                </Text>


            </Blocks>
        </Blocks>

    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { height: 40, backgroundColor: '#f1f8ff', justifyContent: 'center' },
    headerText: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
    item: { padding: 10 },
    text: { fontSize: 16 },
});
export default Grade_2
