import pkg from "date-fns-tz";

const utcDate: Date = pkg.zonedTimeToUtc("2000-01-01T00:00:00", "Asia/Tokyo");
console.log(utcDate);
