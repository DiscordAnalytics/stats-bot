import './lib/setup';
import '@sapphire/plugin-i18next/register';

import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { InternationalizationContext } from '@sapphire/plugin-i18next';

const client = new SapphireClient({
	logger: {
		level: LogLevel.Debug
	},
	intents: [GatewayIntentBits.Guilds],
	i18n: {
		fetchLanguage: (context: InternationalizationContext) => {
			if (!context.interactionLocale || !["en-GB", "fr-FR"].includes(context.interactionLocale)) return "en-GB"
			else return context.interactionLocale
		}
	}
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info(`Logged in as ${client.user!.tag}`);
	} catch (error) {
		client.logger.fatal(error);
		await client.destroy();
		process.exit(1);
	}
};

void main();
