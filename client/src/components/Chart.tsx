import React from 'react';
import { VictoryLine, VictoryChart, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

function movingAvg(array: number[], count: number, qualifier?: Function) {
    // calculate average for subarray
    var avg = function (array: number[], qualifier?: Function) {
        var sum = 0, count = 0, val;
        for (var i in array) {
            val = array[i];
            if (!qualifier || qualifier(val)) {
                sum += val;
                count++;
            }
        }

        return sum / count;
    };

    var result = [], val;

    // pad beginning of result with null values
    for (var i = 0; i < count - 1; i++)
        result.push(null);

    // calculate average for each subarray and add to result
    for (var i = 0, len = array.length - count; i <= len; i++) {

        val = avg(array.slice(i, i + count), qualifier);
        if (isNaN(val))
            result.push(null);
        else
            result.push(val);
    }

    return result;
}

const Chart = ({ data, x, y, movingAverageSize = 10 }: any) => {
    const movingAverage = movingAvg(data.map((d: any) => d[y]), movingAverageSize).map((m: any, i: number) => {
        return {
            [x]: data[i]?.[x],
            [y]: m ?? 0,
        };
    });

    console.log(movingAverage);

    return (
        <div>
            <VictoryChart
                width={550}
                height={300}
                scale={{ x: "time" }}
                containerComponent={
                    <VictoryVoronoiContainer
                        responsive={false}
                        labels={({ datum }: any) => `${datum[y]}`}
                        labelComponent={<VictoryTooltip />}
                    />
                }
            >
                <VictoryLine
                    style={{
                        data: { stroke: "tomato" }
                    }}
                    
                    data={data}
                    x={x}
                    y={y}
                />

                {/* moving average line */}
                <VictoryLine
                    style={{
                        data: { stroke: "blue" }
                    }}
                    interpolation="basis"
                    data={movingAverage}
                    x={x}
                    y={y}
                />
            </VictoryChart>
        </div>
    )
}

export default Chart;