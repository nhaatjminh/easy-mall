
import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip ,CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";

const Item = ()=> { 
    const data03 = [
        { date: 'Jan 04 2016', price: 105.35 },
        { date: 'Jan 05 2016', price: 102.71 },
        { date: 'Jan 06 2016', price: 100.7 },
        { date: 'Jan 07 2016', price: 96.45 },
        { date: 'Jan 08 2016', price: 96.96 },
        { date: 'Jan 11 2016', price: 98.53 },
        { date: 'Jan 12 2016', price: 99.96 },
        { date: 'Jan 13 2016', price: 97.39 },
        { date: 'Jan 14 2016', price: 99.52 },
        { date: 'Jan 15 2016', price: 97.13 },
        { date: 'Jan 19 2016', price: 96.66 },
        { date: 'Jan 20 2016', price: 96.79 },
        { date: 'Jan 21 2016', price: 96.3 },
        { date: 'Jan 22 2016', price: 101.42 },
        { date: 'Jan 25 2016', price: 99.44 },
        { date: 'Jan 26 2016', price: 99.99 },
        { date: 'Jan 27 2016', price: 93.42 },
        { date: 'Jan 28 2016', price: 94.09 },
        { date: 'Jan 29 2016', price: 97.34 },
        { date: 'Feb 01 2016', price: 96.43 },
        { date: 'Feb 02 2016', price: 94.48 },
        { date: 'Feb 03 2016', price: 96.35 },
        { date: 'Feb 04 2016', price: 96.6 },
        { date: 'Feb 05 2016', price: 94.02 },
        { date: 'Feb 08 2016', price: 95.01 },
        { date: 'Feb 09 2016', price: 94.99 },
        { date: 'Feb 10 2016', price: 94.27 },
        { date: 'Feb 11 2016', price: 93.7 },
        { date: 'Feb 12 2016', price: 93.99 }
      ];
    return (
        <LineChart
            width={600} height={400} data={data03}
            margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
            <Line type='monotone' dataKey="price" stroke="#ff7300" dot={true} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date">
                <Label y={100} value="Date" offset={0} position="bottom" />
            </XAxis>
            <YAxis domain={['auto', 'auto']} label={{ value: 'Price', angle: -90, position: 'insideLeft' }}/>
            <Tooltip
                wrapperStyle={{
                    borderColor: 'white',
                    boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                }}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            />
        </LineChart>
    );
}

export default Item;