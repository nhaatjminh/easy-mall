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
        parsed.setHours( parsed.getHours() + 10 )
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
                        icon={status.status === "DELETED" ? <CompleteDelete></CompleteDelete> :<CheckIcon></CheckIcon>}
                        titleStyle={{ fontWeight: 'bold'}}
                        contentStyle={{ boxShadow: 'rgb(0 0 0 / 50%) 0px 1px 3px 0px'}}
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