# discord-vixcanva

[![downloadsBadge](https://img.shields.io/npm/dt/discord-vixcanva?style=for-the-badge)](https://npmjs.com/discord-vixcanva)
[![versionBadge](https://img.shields.io/npm/v/discord-vixcanva?style=for-the-badge)](https://npmjs.com/discord-canvas)
[![CodeFactor](https://www.codefactor.io/repository/github/robertdluigi/discord-vixcanva/badge)](https://www.codefactor.io/repository/github/robertdluigi/discord-vixcanva)

A powerful Discord bot utility for creating and customizing canvas images.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can easily install the `discord-vixcanva` package via npm:

```bash
npm install discord-vixcanva
```

## usage

You can import the package in your files like this:

```js
const { Canvas } = require('discord-vixcanva');
```
## Example
```js
const { Canvas } = require('discord-vixcanva');

// Create a canvas
const canvas = new Canvas(200, 100);

// Customize and draw on the canvas
canvas.setColor('blue');
canvas.drawRect(0, 0, 200, 100);
canvas.drawText('Hello, Canvas!', 20, 50, 'white', '24px Arial');

// Send the canvas image to a Discord channel
const attachment = canvas.toAttachment();
message.channel.send('Here\'s your canvas image:', attachment);
```

## Thank you for using our package!
