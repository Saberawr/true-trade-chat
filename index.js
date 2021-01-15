'use strict';

class truetradechat {
	
	constructor(mod) {
		
		this.mod = mod;
		this.command = mod.command;
		this.hook = null;
		var enabled;
		enabled = true;
		// # say = 0, party = 1, guild = 2, area = 3, trade = 4, greet = 9,
		// # private = 11-18, p-notice = 21, emote = 26, global = 27, r-notice = 25,
		// # raid = 32, megaphone = 213, guild-adv = 214
		const channels = [3, 27];
		const terms = ["wts", "wtb", "wtt", "buy", "sell", "trade", "trading"];
		
		// command
		mod.command.add('ttc', {
			'$none': () => {
				enabled = !enabled;
			this.send(`${enabled ? 'En' : 'Dis'}abled.`);
			},
			'$default': () => {
				this.send(`Invalid argument.`);
			}
		});
		
		// network
		this.hook = mod.hook('S_CHAT', 3, { filter: { fake: null }, order: 11 }, (e) => {
			if (enabled) {
				if (channels.includes(e.channel)) {
					var isTradeMsg = false;
					terms.forEach(function(value, index, array) {
						var lowerCaseMessage = e.message.toLowerCase();
						if (lowerCaseMessage.includes(value)) {
							isTradeMsg = true;
							return true;
						}
					});
					if (isTradeMsg) {
						e.channel = 4;
						return true;
					}
				}
			}
		});
	}
	
	// send
	send(message) {
		this.command.message(': ' + message);
	}
	
	destructor() {
		this.command.remove('ttc');
		this.mod.unhook(this.hook);
		this.hook = null;
	}
	
}

module.exports = { NetworkMod: truetradechat };