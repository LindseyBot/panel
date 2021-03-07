import {TextChannel} from "./text-channel";
import {VoiceChannel} from "./voice-channel";

export class Guild {

  id: string;
  name: string;
  iconUrl: string;

  textChannels: TextChannel[];
  voiceChannels: VoiceChannel[];

}
