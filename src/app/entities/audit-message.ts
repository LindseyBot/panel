export class AuditMessage {

  guildId: string;
  level: string;
  message: string;
  timestamp: string;

  channel: AuditMessageChannel;
  user: AuditMessageUser;

}

export class AuditMessageChannel {

  id: string;
  name: string;
  type: string;

}

export class AuditMessageUser {

  id: string;
  name: string;

}
