import { promises as fs } from 'fs';
import * as path from 'path';
import { getEventTopic } from './event-topic-decorator';

export async function findAllEvents(baseDir: string): Promise<{ topic: string; eventClass: Function }[]> {
    const events: { topic: string; eventClass: Function }[] = [];

    const folders = await fs.readdir(baseDir, { withFileTypes: true });

    for (const folder of folders) {
        if (!folder.isDirectory()) continue;

        const eventsDir = path.join(baseDir, folder.name, 'infrastructure', 'events');

        try {
            const eventFiles = await fs.readdir(eventsDir);

            for (const file of eventFiles) {
                if (!file.endsWith('.js') && !file.endsWith('.ts')) continue;

                const fullPath = path.join(eventsDir, file);
                const module = await import(fullPath);

                for (const exportName in module) {
                    const exported = module[exportName];
                    if (typeof exported !== 'function') continue;

                    const topic = getEventTopic(exported);
                    if (topic) {
                        events.push({ topic, eventClass: exported });
                    }
                }
            }
        } catch (err: any) {
            if (err.code !== 'ENOENT') {
                console.error(`Error leyendo eventos en ${eventsDir}:`, err);
            }
        }
    }

    return events;
}
