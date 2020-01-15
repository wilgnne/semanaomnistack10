module.exports = (arrayAsString) => {
    return arrayAsString.split(",").map (element => element.trim ())
};