const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		if (!interaction.guild.available) {
			await interaction.reply('This server is unavailable');
		} else {
			console.log(interaction);
			interaction.channel.send(`${interaction.guild} outputted to console`);
		}
	},
};