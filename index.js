const Canvas = require("canvas");

// Register Poppins Bold font
Canvas.registerFont(`${__dirname}/assets/fonts/Poppins-Bold.ttf`, { family: "Bold" });
// Register Poppins Medium font
Canvas.registerFont(`${__dirname}/assets/fonts/Poppins-Medium.ttf`, { family: "Medium" });
// Register Poppins Thin font
Canvas.registerFont(`${__dirname}/assets/fonts/Poppins-Thin.ttf`, { family: "Thin" });

module.exports.ProfileCard = require('./src/Profile/ProfileCard');
