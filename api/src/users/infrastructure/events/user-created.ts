import {EventTopic} from "../../../shared/infrastructure/event-topic-decorator";
import {UserCreated} from "../../domain/events/user-created";

EventTopic('user_created')(UserCreated);

export { UserCreated };