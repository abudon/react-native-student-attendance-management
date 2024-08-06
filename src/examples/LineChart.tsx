import {useState} from "react";
import {LineChart} from "react-native-gifted-charts";
import {Text, View} from "react-native";
import {Blocks} from "../components";
import {RadioButton} from "react-native-paper";
import {routes} from "../constants/routes";

const LineChartDiagram = (props : any) => {
    const {data1, data2} = props
    const data = [
        {value: 70},
        {value: 36},
        {value: 50},
        {value: 40},
        {value: 18},
        {value: 38},
    ];

    const [currentData, setCurrentData] = useState(data);
    const [choice, setChoice] = useState<string>('daily');


    const handleChoiceChange = (value: string) => {
        setChoice(value);
        if ( data1 && data2) {
            setCurrentData(value === 'daily' ? data1: data2);
        }
    };
    const renderTitle = () => {
        return (
            <View style={{marginVertical: 30}}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                    Attendance Comparison Chart:
                </Text>
            </View>
        )
    }







    return (
            <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    marginBottom: 30,
                }}>
                {renderTitle()}
                <RadioButton.Group onValueChange={handleChoiceChange} value={choice} >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                            marginHorizontal: 20,
                            flex: 1,
                            flexDirection: 'row',
                            marginBottom: 10,

                        }}
                    >
                        <Blocks flex={1} row align={'center'}>
                            <RadioButton value="daily" color={'skyblue'} />
                            <Text >Daily</Text>
                        </Blocks>
                        <Blocks flex={1} row align={'center'}>
                            <RadioButton value="monthly" color={'skyblue'} />
                            <Text >Monthly</Text>
                        </Blocks>
                    </View>
                </RadioButton.Group>

                <LineChart
                    areaChart
                    curved
                    data={currentData}
                    height={250}
                    showVerticalLines
                    spacing={100}
                    initialSpacing={30}
                    color1="skyblue"
                    textColor1="green"
                    hideDataPoints
                    dataPointsColor1="blue"
                    startFillColor1="skyblue"
                    startOpacity={0.8}
                    endOpacity={0.3}
                    xAxisThickness={0}
                    yAxisThickness={0}
                />
            </View>
    );
};
export default LineChartDiagram
