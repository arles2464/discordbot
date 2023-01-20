const { AttachmentBuilder, Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isStringSelectMenu()) return;

		if (interaction.customId === 'reaction') {
			const reactImage = new AttachmentBuilder('images/' + interaction.values[0] + '.png');

			if (reactImage !== 'ERROR') {
				await interaction.update({ content: 'highly relevant and humourous image selected', components: [] });
				await interaction.channel.send({ content: `${interaction.user.username}'s live reaction`, files: [reactImage] });
			} else {
				console.log('ERROR: File not found');
				console.log(interaction.user);
				console.log(interaction.values[0]);
				await interaction.update({ content: 'you dumb shit you broke my god damn bot... how do you even manage I mean the file names are literally hard-coded like honestly this shouldn\'t even be possible yet here we are. anyways error logged. place a bug report on the [github](https://github.com/arles2464/discordbot/issues) please', components: [] });
				await interaction.channel.send({ content: `ERROR: File not found. ${interaction.user.username}#${interaction.user.discriminator} broke the bot (rookie mistake)`, files: ['https://media.discordapp.net/attachments/1062978791745531974/1065620774448275546/epic-embed-fail.gif?width=576&height=491'] });
			}
		}
	},
};