import {View, Text} from "react-native";
import {BarChart} from "react-native-gifted-charts";

const BarChartDiagram = (props : any) => {
    const {barChartData} = props

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
                    Weekly Report:
                </Text>
            </View>
        )
    }

    return (
        <View
            style={{
                backgroundColor: '#dfdfdf',
                paddingBottom: 40,
                borderRadius: 10,
            }}>
            {renderTitle()}
            <BarChart
                data={barChartData}
                barWidth={8}
                spacing={24}
                roundedTop
                roundedBottom
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{color: 'gray'}}
                noOfSections={3}
            />
        </View>
    );
};

export default BarChartDiagram
