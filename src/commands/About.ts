import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import config from '../config';
import { ComponentType } from 'discord.js';
import { resolveKey } from '@sapphire/plugin-i18next';

@ApplyOptions<Command.Options>({
	name: "about",
	description: 'Show Informations about the bot'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		return interaction.reply({
			embeds: [
				{
					title: await resolveKey(interaction, 'about:title', { username: interaction.client.user.username }),
					fields: [
						{
							name: await resolveKey(interaction, 'about:infos:name'),
							value: await resolveKey(interaction, 'about:infos:value')
						},
						{
							name: await resolveKey(interaction, 'about:stats:name'),
							value: await resolveKey(interaction, 'about:stats:value', { guilds: interaction.client.guilds.cache.size, users: interaction.client.users.cache.size }),
						}
					],
					color: config.color
				}
			],
			components: [
				{
					type: 1,
					components: [
						{
							type: ComponentType.Button,
							label: 'Discord Analytics',
							style: 5,
							url: "https://discordanalytics.xyz"
						},
						{
							type: ComponentType.Button,
							label: await resolveKey(interaction, "commons:support"),
							style: 5,
							url: "https://discordanalytics.xyz/support"
						}
					]
				}
			]
		});
	}
}
