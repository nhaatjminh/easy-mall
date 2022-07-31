import { parseLocaleNumber } from "../../../../utils/parseLocaleNumber";

export const CustomTooltipForSale = ({ active, payload, label }) => {
    return (
        <>
            {active && 
                <div style={{padding: '10px 10px 0 10px',backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>

                    <p style={{fontWeight: 'bold', color: '#666666'}}>Date: {payload[0]?.payload?.date}</p>
                    <p style={{ color: '#ff7300' }}>Sales: {parseLocaleNumber(payload[0]?.payload?.Sales)} </p>
                </div>
            }
        </>
    )
};