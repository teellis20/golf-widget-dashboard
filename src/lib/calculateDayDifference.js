export default 
  function calculateDayDifference(ts, tz){
    const d=new Date(ts); if(isNaN(d)) return 0;
    const f=new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit"});
    const a=new Date(f.format(d)+"T00:00:00");
    const b=new Date(f.format(new Date())+"T00:00:00");
    return ((b-a)/864e5)|0;
  }