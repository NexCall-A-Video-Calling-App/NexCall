

import moment, { duration } from 'moment'

const countdwonTimer = (date,time)=>{

    const now = moment();
    // get current time 
    // meeting time and - now time get
    // remaning time 
    const meetimeTime = moment(`${date} ${time}`);
    // add total time 
    // sub opration 
    const durationTime = moment.duration(meetimeTime.diff(now));
    if(durationTime.asSeconds()>=0)
    {
        return "Meeting started";
    }

    // then 
    const hour = Math.floor(durationTime.asHours());
    // get hour formate
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${hour}h ${minutes}m ${seconds}s`;



}
export default countdwonTimer;