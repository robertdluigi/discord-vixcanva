const Canvas = require('canvas');
const { formatVariable, applyText } = require('../../utils/functions');

const badges = [ 1, 7 ]; // min, max
const profileBadges = [ 1, 3 ];

module.exports = class ProfileCard {
	constructor() {
		this.backgroundImage = `${__dirname}/../../assets/img/1px.png`;
		this.avatar = `${__dirname}/../../assets/img/default-avatar.png`;
		this.level = '1';
		this.rank = '10';
		this.rankName = 'Rank Name';
		this.reputation = '0';
		this.username = 'username';
		this.xpCurrent = 0;
		this.xpNeeded = 1000;
		this.addonReputation = true;
		this.addonRank = true;
		this.addonRankName = true;
		this.addonBadges = true;
		this.addonProfileBadges = true;
		this.colorBackground = '#000000';
		this.colorLevelBox = '#ff7b4b';
		this.colorReputationBox = '#ff7b4b';
		this.colorLevel = '#ffffff';
		this.colorRank = '#ffffff';
		this.colorRankName = '#ffffff';
		this.colorUsername = '#ffffff';
		this.colorReputation = '#ffffff';
		this.colorBackgroundBar = '#000000';
		this.colorNeededXp = '#ffffff';
		this.colorBar = '#ffffff';
		this.colorNoBadges = '#000000';
		this.colorBadgesBox = '#000000';
		this.radiusCorner = '20';
		this.opacityAvatar = '0.4';
		this.opacityBadges = '0.4';
		this.opacityLevel = '1';
		this.opacityBackgroundBar = '0.4';
		this.opacityReputation = '1';
		this.opacityNoBadges = '0.4';
		this.textLevel = 'Level: {level}';
		this.textNeededXp = '{current}/{needed} for next rank';
		this.textReputation = '+{reputation} rep';
		for (let i = badges[0]; i <= badges[1]; i++)
			this[`badge${i}`] = null;
		for (let i = profileBadges[0]; i <= profileBadges[1]; i++)
			this[`profileBadge${i}`] = null;
	}

	setAvatar(value) {
		this.avatar = value;
		return this;
	}

	setUsername(value) {
		this.username = value;
		return this;
	}

	setRank(value) {
		this.rank = value;
		return this;
	}

	setLevel(value) {
		this.level = value;
		return this;
	}

	setReputation(value) {
		this.reputation = value;
		return this;
	}

	setRankName(value) {
		this.rankName = value;
		return this;
	}

	setBackground(value) {
		this.backgroundImage = value;
		return this;
	}

	setXP(variable, value) {
		const formattedVariable = formatVariable('xp', variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setColor(variable, value) {
		const formattedVariable = formatVariable('color', variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setText(variable, value) {
		const formattedVariable = formatVariable('text', variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setOpacity(variable, value) {
		const formattedVariable = formatVariable('opacity', variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setAddon(variable, value) {
		const formattedVariable = formatVariable('addon', variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setBadge(userBadges) {
		for (let i = 0; i < userBadges.length; i++) {
			this[`badge${i + 1}`] = userBadges[i];
		}
		return this;
	}

	setProfileBadges(profileBadges) {
		for (let i = 0; i < profileBadges.length; i++) {
			const badge = profileBadges[i];
			if (badge === 'developer' || badge === 'premium') {
				this[`profileBadge${i + 1}`] = badge;
			}
		}
		return this;
	}

	setRadius(value) {
		this.radiusCorner = value;
		return this;
	}

	async toAttachment() {
		let canvas = Canvas.createCanvas(600, 600), ctx = canvas.getContext('2d');

		const lvlText = this.textLevel.replace(/{level}/g, this.level);
		const repText = this.textReputation.replace(/{reputation}/g, this.reputation);

    // Load and draw the background image if it's set
    if (this.backgroundImage) {
      let background = await Canvas.loadImage(this.backgroundImage);
      ctx.drawImage(background, 0, 0, 600, 180);
    } else {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, 600, 180);
    }

    // Fill the top part of the canvas with gray as a Facebook cover
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 180, 600, 420);

		// Draw layer
		//    ctx.fillStyle = "#000000";
		//    ctx.globalAlpha = this.opacityAvatar;
		//    ctx.fillRect(50, 0, 240, canvas.height);
		//    ctx.globalAlpha = 1;

		// Avatar

		// Calculate the center of the canvas
		const centerX = canvas.width / 2;

		// Define the new avatar size and positioning
		const avatarSize = 150; // New size for the avatar
		const avatarX = centerX - avatarSize / 2; // Center the avatar horizontally
		const avatarY = 75; // Position the avatar 30px from the top

		// Load and draw the avatar
		let avatar = await Canvas.loadImage(this.avatar);

		// Create a clipping path for a circular avatar
		ctx.save();
		ctx.beginPath();
		ctx.arc(centerX, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		// Draw the clipped avatar
		ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);

		// Restore the canvas state to remove the clipping path
		ctx.restore();

		// Calculate the border position based on the modified avatarY
		const borderY = avatarY + avatarSize / 2;

		// Draw a border around the circular avatar
		ctx.strokeStyle = 'white'; // Border color
		ctx.lineWidth = 5; // Border width
		ctx.beginPath();
		ctx.arc(centerX, borderY, avatarSize / 2 + 5, 0, Math.PI * 2, true); // Adjust the border size
		ctx.closePath();
		ctx.stroke();

		// Username
		ctx.textAlign = 'left';
		ctx.fillStyle = this.colorUsername;
		const userX = 255;
		const userY = 285; // 275px from the top
		ctx.font = applyText(canvas, this.username, 32, 100, 'Bold');
		ctx.fillText(this.username, userX, userY);

		// Profile badges

		// Level
		/*    const levelText = this.textLevel.replace(/{level}/g, this.level);
    ctx.fillStyle = this.colorLevelBox;
    ctx.globalAlpha = this.opacityLevel;
    const levelBoxWidth = 160; // Width of the level box
    const levelBoxHeight = 60; // Height of the level box
    const levelBoxX = levelBoxWidth / 2; // Center the level box horizontally
    const levelBoxY = avatarY + avatarSize + 20; // Position it below the avatar with 20px spacing
    ctx.fillRect(levelBoxX, levelBoxY, levelBoxWidth, levelBoxHeight);

    ctx.globalAlpha = 1;
    ctx.fillStyle = this.colorLevel;
    ctx.font = applyText(canvas, levelText, 24, levelBoxWidth, "Bold"); // Adjust the font size
    ctx.textAlign = "center";
    ctx.fillText(levelText, centerX / 2 - 20, levelBoxY + levelBoxHeight / 2 + 12); // Center the text horizontally and vertically in the level box

    // Rep
    if (this.addonReputation) {
      ctx.fillStyle = this.colorReputationBox;
      ctx.globalAlpha = this.opacityReputation;
      ctx.fillRect(50 + 30, 30 + 180 + 30 + 50 + 30, 180, 70);
      ctx.globalAlpha = 1;
      ctx.fillStyle = this.colorReputation;
      ctx.font = applyText(canvas, repText, 32, 170, "Bold");
      ctx.textAlign = "center";
      ctx.fillText(repText, 50 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 50);
    }



    // Rank
    if (this.addonRank) {
      ctx.textAlign = "right";
      ctx.fillStyle = this.colorRank;
      ctx.font = applyText(canvas, "#" + this.rank, 45, 194, "Bold");
      ctx.fillText("#" + this.rank, canvas.width - 50 - 5, 80);
    }
    if (this.addonRankName) {
      ctx.textAlign = "left";
      ctx.fillStyle = this.colorRankName;
      ctx.font = applyText(canvas, this.rankName, 35, 690, "Bold");
      ctx.fillText(this.rankName, 50 + 240 + 45 + 5, 80 + 45 + 15);
    }
*/
		// Badges
		if (this.addonBadges) {
			// Create the background box with the specified color and opacity
			ctx.fillStyle = 'rgba(69, 69, 69, 0.5)'; // Background color: #454545, 50% opacity
			ctx.fillRect(48, 475, 500, 90); // Fill the badges box

			// Set the stroke style with a linear gradient for the stroke
			const strokeGradient = ctx.createLinearGradient(48, 475, 548, 565);
			strokeGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)'); // White with 50% opacity at the top left
			strokeGradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Black with 0% opacity at the bottom center

			ctx.strokeStyle = strokeGradient; // Apply the linear gradient to the stroke
			ctx.lineWidth = 1; // Adjust the stroke width as needed

			ctx.strokeRect(48, 475, 500, 90); // Add a stroke around the badges box

			ctx.fillStyle = this.colorNoBadges;

			const badgeSize = 48;
			const badgeSpacing = 10; // Adjust the distance between badges as needed

			for (let index = 0; index < badges.length; index++) {
				let badge = `badge${index + 1}`;
				if (!this[badge] || this[badge].toLowerCase() === 'none') {
					// Check if badge is set to "none"
					ctx.globalAlpha = this.opacityNoBadges;
					ctx.textAlign = 'center';
					ctx.font = applyText(canvas, '.', 120, 50, 'Bold');
					ctx.fillText('.', 75 * index + 390, 540); // Adjust the y-coordinate for the text
				} else {
					ctx.globalAlpha = 1;
					let badgeImg = await Canvas.loadImage(`${__dirname}/../../assets/img/rank/${this[badge].toLowerCase()}.png`); // Load badge image directly from this[badge]
					ctx.drawImage(badgeImg, 48 + index * (badgeSize + badgeSpacing), 475, badgeSize, badgeSize); // Adjust the x-coordinate for the badge image
				}
			}
		}

		// Badges
		if (this.addonProfileBadges) {
			const badgeNames = [ 'developer', 'premium' ];
			const badgeSize = 48;
			const badgeSpacing = 50;
			let currentX = 500;

			for (let index = 0; index < badgeNames.length; index++) {
				let badge = `profileBadge${index + 1}`;
				if (this[badge] && badgeNames.includes(this[badge].toLowerCase())) {
					// Check if the badge is set correctly
					ctx.globalAlpha = 1;
					let badgeImg = await Canvas.loadImage(
						`${__dirname}/../../assets/img/badges/${this[badge].toLowerCase()}.png`
					);
					ctx.drawImage(badgeImg, currentX, 200, badgeSize, badgeSize);
					currentX -= badgeSpacing; // Move to the next position
				}
			}
		}

		/*    // XP
    ctx.globalAlpha = 1;
    const latestXP = Number(this.xpNeeded) - Number(this.xpCurrent);
    const textXPEdited = this.textNeededXp
      .replace(/{needed}/g, this.xpNeeded)
      .replace(/{current}/g, this.xpCurrent)
      .replace(/{latest}/g, latestXP);
    ctx.textAlign = "center";
    ctx.fillStyle = this.colorNeededXp;
    ctx.font = applyText(canvas, textXPEdited, 25, 690, "Bold");
    ctx.fillText(
      textXPEdited,
      50 + 240 + 45 + 5 + 690 / 2,
      80 + 45 + 15 + 30 + 90
    );
    ctx.beginPath();
    ctx.moveTo(240 + 50 + 50 + 25, 80 + 45 + 10 + 40);
    ctx.lineTo(240 + 50 + 50 + 700 - 25, 80 + 45 + 10 + 40);
    ctx.quadraticCurveTo(
      240 + 50 + 50 + 700,
      80 + 45 + 10 + 40,
      240 + 50 + 50 + 700,
      80 + 45 + 10 + 40 + 25
    );
    ctx.lineTo(240 + 50 + 50 + 700, 80 + 45 + 10 + 40 + 50 - 25);
    ctx.quadraticCurveTo(
      240 + 50 + 50 + 700,
      80 + 45 + 10 + 40 + 50,
      240 + 50 + 50 + 700 - 25,
      80 + 45 + 10 + 40 + 50
    );
    ctx.lineTo(240 + 50 + 50 + 25, 80 + 45 + 10 + 40 + 50);
    ctx.quadraticCurveTo(
      240 + 50 + 50,
      80 + 45 + 10 + 40 + 50,
      240 + 50 + 50,
      80 + 45 + 10 + 40 + 50 - 25
    );
    ctx.lineTo(240 + 50 + 50, 80 + 45 + 10 + 40 + 25);
    ctx.quadraticCurveTo(
      240 + 50 + 50,
      80 + 45 + 10 + 40,
      240 + 50 + 50 + 25,
      80 + 45 + 10 + 40
    );
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = this.colorBackgroundBar;
    ctx.globalAlpha = this.opacityBackgroundBar;
    ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, 700, 50);
    ctx.fillStyle = this.colorBar;
    ctx.globalAlpha = 1;
    const percent = (100 * this.xpCurrent) / this.xpNeeded;
    const progress = (percent * 700) / 100;
    ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, progress, 50);
    ctx.restore();*/
		return canvas;
	}
};
