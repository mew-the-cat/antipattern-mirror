import {Advisor} from "../models/advisor.model";
import {Chat} from "../models/chat.model";
import {Client} from "../models/client.model";
import {Interest} from "../models/interest.model";
import {Match} from "../models/match.model";
import {Message} from "../models/message.model";
import {User} from "../models/user.model";
import {UserInterest} from "../models/userinterest.model";

export function initializeAssociations() {
    Advisor.associate();
    Chat.associate();
    Client.associate();
    Interest.associate();
    Match.associate();
    Message.associate();
    User.associate();
    UserInterest.associate();
}