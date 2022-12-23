import { exit } from "./exit/exit.mjs";
import { showMenu } from "./menu/menu.mjs";
import { sendMessage } from "./send_message/send_message.mjs";
import { showAllPosts } from "./show_all_posts/show_all_posts.mjs";
import { State } from "./states/state.mjs";
import { states } from "./states/states.mjs";
import { suppressNodeWarnings } from "./suppress_node_warnings.mjs";
import { clear, print, prompt } from "./ui/console.mjs";

clear(true);
print("👋 Welcome to our cool blog browser!");
await prompt("⌨️ Press [ENTER] to continue! 🕶️");

suppressNodeWarnings();

main();

async function main() {
	let state = new State();

	while (true) {
		switch (state.get()) {
			case "MENU":
				const newMenuOption = await showMenu();
				state.set(newMenuOption);
				break;
			case "SEND_MESSAGE":
				const nextState = await sendMessage();
				state.set(nextState);
				break;
			case "SHOW_POSTS":
				clear();
				const posts = await showAllPosts();
				state.set(states.MENU);

				break;
			case "SHOW_USERS":
				clear();
				print("🏗️ This functionality has not been implemented!");
				await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
				state.set(states.MENU);
				break;
			case "BROWSE_POSTS":
				clear();
				print("🏗️ This functionality has not been implemented!");
				await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
				state.set(states.MENU);
				break;
			case "ADD_USER":
				clear();
				print("🏗️ This functionality has not been implemented!");
				await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
				state.set(states.MENU);
				break;
			case "UNKNOWN":
				clear();
				print("😵 We have entered an unknown state.");
				await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
				state.set(states.MENU);
				break;
			case "CABBAGE":
				clear();
				print("🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬", false);
				print("🥬      CABBAGE MODE UNLOCKED     🥬", false);
				print("🥬     Why did you want this?     🥬", false);
				print("🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬", false);
				await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
				state.set(states.MENU);
				break;
			default:
				print("🌋 Uh-oh, we've entered an invalid state: " + state.get());
				print("💥 Crashing the program now...");
				exit(99);
				break;
		}
	}
}
