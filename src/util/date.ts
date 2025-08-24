const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function getAbbrevMonth(date: Date){
  return months[date.getMonth()];
}

export function getAbbrevMonthWithPeriod(date: Date){
  const month = getAbbrevMonth(date);
  if(month === "May") return month;
  return month + ".";
}

const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function getFullMonth(date: Date){
  return fullMonths[date.getMonth()];
}

const abbrev = ["st", "nd", "rd"];
export function getDayAbbrev(date: Date){
  const day = date.getDay();
  const rem = day % 10;
  return (day + 1).toString() + (rem < abbrev.length ? abbrev[rem] : "th");
}