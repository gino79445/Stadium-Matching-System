function format_date(dateISOString, timeZone = 'Asia/Taipei', location = 'zh-TW') {
    var date = new Date(dateISOString);
    date = date.toLocaleString(location, { timeZone: timeZone });
    date = date.replace("午", "午 ");
    return date;
}

module.exports = {
    format_date
}