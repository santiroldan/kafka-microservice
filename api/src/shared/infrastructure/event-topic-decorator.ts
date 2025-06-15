import 'reflect-metadata';

const EVENT_TOPIC_METADATA_KEY = Symbol('EVENT_TOPIC');

export function EventTopic(topic: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(EVENT_TOPIC_METADATA_KEY, topic, target);
    };
}

export function getEventTopic(target: Function): string | undefined {
    return Reflect.getMetadata(EVENT_TOPIC_METADATA_KEY, target);
}
