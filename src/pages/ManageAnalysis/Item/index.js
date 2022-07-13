
import { InputLabel, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tooltip ,CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";

const Item = ({exactData})=> {
    const [key, setKey] = useState([]);
    useEffect(() => {
        if (exactData?.data?.length) {
            const tempKey = Object.keys(exactData?.data?.[0]);
            setKey(tempKey);
        }
    }, [exactData?.data])
    return (
        <Paper elevation={5} style={{width: 850,marginBottom: 30, marginRight: 30, paddingRight: 50}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <InputLabel className='text-header' style={{paddingLeft: 20, paddingTop: 20}}>{exactData?.labelPaper}: {exactData?.total}</InputLabel>
            </div>
            <LineChart
                width={800} height={400} data={exactData?.data}
                margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
            >
                <Line type='monotone' dataKey={key[1]} stroke="#ff7300" dot={true} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date">
                    <Label y={100} value={exactData?.labelX} offset={0} position="bottom" />
                </XAxis>
                <YAxis padding={{ top: 50}} domain={['auto', 'auto']} label={{ value: exactData?.labelY, position: 'top' }}/>
                <Tooltip
                    wrapperStyle={{
                        borderColor: 'white',
                        boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                    }}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#666666' }}
                />
            </LineChart>
        </Paper> 
        
    );
}

export default Item;