import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { IconUtils, Menu } from "@webpack/common";
import { copyToClipboard } from "@utils/clipboard";

export default definePlugin({
    name: "Copy Command Format",
    description: "Easily copy the format of a command to copy into a message! </command-name:command-id>. To get this click the command and just above the message right-click the bar that has the description of the command.",
    authors: [Devs.atomictyler],

    contextMenus: {
        "dev-context"(children) {
            const commandIdElement = document.querySelector('[id*="dev-context-devmode-copy-id-"]');
            const commandNameElement = document.querySelector('.name__84522');

            if (!commandIdElement || !commandNameElement) {
                return;
            }

            const commandId = commandIdElement.id.replace('dev-context-devmode-copy-id-', '');
            const commandName = commandNameElement.textContent?.trim().replace('/', '');

            if (commandName && commandId) {
                const commandFormat = `</${commandName}:${commandId}>`;
                children.push(
                    <Menu.MenuItem
                        id="copy-command-format"
                        label="Copy Command Format"
                        icon={() =>
                            <svg className="icon__1a58a" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm12.79 3.37a.25.25 0 0 0-.22-.37h-3.13a.75.75 0 0 0-.66.38L6.21 18.63c-.1.16.03.37.22.37h3.13c.27 0 .52-.14.66-.38l7.57-13.25Z" clip-rule="evenodd" className=""></path></svg>
                        }
                        action={() => {
                            copyToClipboard(commandFormat);
                            console.log("Copied format:", commandFormat);
                        }}
                    />
                );
            }
        },
    },
});
