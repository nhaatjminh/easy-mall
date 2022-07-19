import React from "react";
import {Timeline, TimelineEvent} from 'react-event-timeline'
import './index.css'
import {CheckIcon} from '../../../../assets/icon/svg/CheckIcon'
import { CompleteDelete } from "../../../../assets/icon/svg/CompleteDelete";

const TimeLine = ({listStatus})=> { 
    const pgFormatDate = (date) => {
        const zeroPad = (d) => {
            return ("0" + d).slice(-2)
        }
    
        const parsed = new Date(date);
        parsed.setHours( parsed.getHours())
        return zeroPad(parsed.getDate()) + '/' + zeroPad(parsed.getMonth() + 1) + '/' + parsed.getUTCFullYear()
            + " " + zeroPad(parsed.getHours()) + ":" + zeroPad(parsed.getMinutes()) + ":" + zeroPad(parsed.getSeconds());
    }
    return (
        <Timeline>
            {
                listStatus ?
                listStatus.map((status, index) => (

                    <TimelineEvent 
                        title={`${status.status}`}
                        key={`key-timeline-${index}`}
                        createdAt={`${pgFormatDate(status.create_at)}`}
                        style={{ paddingBottom: 20 }}
                        icon={status.status === "DELETED" ? <CompleteDelete></CompleteDelete> :<CheckIcon></CheckIcon>}
                        titleStyle={ status.status === "DELETED" ? {
                            backgroundColor: `#f7454d`,
                            color: `#fff`,
                            fontSize: `13px`,
                            borderRadius: `50px`,
                            height: `fit-content`,
                            width: `175px`,
                            fontWeight: `bold`,
                            textAlign: `center`
                        } : status.status === "COMPLETED" ? {
                            backgroundColor: `#42e034`,
                            color: `#fff`,
                            fontSize: `13px`,
                            borderRadius: `50px`,
                            height: `fit-content`,
                            width: `175px`,
                            fontWeight: `bold`,
                            textAlign: `center`
                        } : status.status === "RESTOCK" || status.status === "PAID & RESTOCK" ? {
                            backgroundColor: `#d6d149`,
                            color: `#fff`,
                            fontSize: `13px`,
                            borderRadius: `50px`,
                            height: `fit-content`,
                            width: `175px`,
                            fontWeight: `bold`,
                            textAlign: `center`
                        } : {
                            backgroundColor: `rgb(32,183,246)`,
                            color: `#fff`,
                            fontSize: `13px`,
                            borderRadius: `50px`,
                            height: `fit-content`,
                            width: `175px`,
                            fontWeight: `bold`,
                            textAlign: `center`
                        }
                    }
                        
                        contentStyle={{ boxShadow: '0 0 5px rgb(23 24 24 / 5%), 0 1px 2px rgb(0 0 0 / 15%)'}}
                    >
                        {`${status.note ? status.note : ''}`}
                    </TimelineEvent>
                ))
                : <></>
            }
    </Timeline>
    );
}

export default TimeLine;