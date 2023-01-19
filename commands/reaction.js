const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('My live reaction to this information'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('reaction')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'Stable 💀',
							description: 'Stable? that\'s for horses',
							value: 'stableSkull',
						},
						{
							label: 'Sincerely Sorry',
							description: 'I am sincerely sorry for cyberbullying',
							value: 'sincerelySorry',
						},
						{
							label: 'Bin Crown',
							description: 'you dropped your crown king',
							value: 'binCrown',
						},
						{
							label: 'Goku 🤓',
							description: 'nerd goku',
							value: 'nerdGoku',
						},
					),
			);

		await interaction.reply({ content: 'Select witty reaction image:', ephemeral: true, components: [row] });
	},
};