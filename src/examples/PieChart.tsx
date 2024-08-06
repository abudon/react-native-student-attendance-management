import {View, Text, ColorValue } from "react-native";
import {IPieData} from "../constants/types";
import {PieChart} from "react-native-gifted-charts";


const PieChartDiagram = (props : any) => {
    const {pieChartData} = props
    const highestNumber = Math.max(...pieChartData.map((items:IPieData) => items.value))

    const renderDot = (color: ColorValue | string) => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#177AD5')}
                        <Text style={{color: 'black'}}>Ontime: {pieChartData[0].value}%</Text>
                    </View>
                    <View
                        style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
                        {renderDot('#8F80F3')}
                        <Text style={{color: 'black'}}>Late: {pieChartData[1].value}%</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View
                        style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
                        {renderDot('#FF7F97')}
                        <Text style={{color: 'black'}}>Absent: {pieChartData[2].value}%</Text>
                    </View>
                </View>
            </>
        );
    };
    return (

            <View
                style={{
                    margin: 5,
                    padding: 5,
                    borderRadius: 20,
                    backgroundColor: '#FFF',
                    flex: 1
                }}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Time Attendance:
                </Text>
                <View style={{padding: 20, alignItems: 'center'}}>
                    <PieChart
                        data={pieChartData}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        innerCircleColor={'skyblue'}
                        centerLabelComponent={() => {
                            return (
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text
                                        style={{fontSize: 22, color: 'black', fontWeight: 'bold'}}>
                                        {highestNumber}%
                                    </Text>
                                </View>
                            );
                        }}
                    />
                </View>
                {renderLegendComponent()}
            </View>
    )
}

export  default PieChartDiagram
