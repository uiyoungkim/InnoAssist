// Erzeugungsmuster -> Factory Methode
class Message {
  constructor(content) {
    this.content = content;
  }
}

class UserMessage extends Message {
  constructor(content) {
    super(content);
    this.side = "right";
    this.color = "purple";
  }
}

class AiMessage extends Message {
  constructor(content) {
    super(content);
    this.side = "left";
    this.color = "gray";
  }
}

class MessageFactory {
  static createMessage(type, content) {
    switch (type) {
      case "user":
        return new UserMessage(content);
      case "ai":
        return new AiMessage(content);
      default:
        throw new Error("Invalid message type");
    }
  }
}
