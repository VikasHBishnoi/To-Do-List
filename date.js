exports.getDate=getDate;
function getDate() {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    return today.toLocaleDateString('en-us', options);
}

exports.getDay=getDay;
function getDay() {
    let today = new Date();
    let options = {
        weekday: "long",
    };
    return today.toLocaleDateString('en-us', options);
}