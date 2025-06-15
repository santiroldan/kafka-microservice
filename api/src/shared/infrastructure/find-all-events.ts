import { promises as fs } from 'fs';
import * as path from 'path';
import { getEventTopic } from './event-topic-decorator';
import {Logger} from "@nestjs/common";

export async function findAllEvents(baseDir: string): Promise<{ topic: string; eventClass: Function }[]> {
    const logger = new Logger('FindAllEvents');
    const events: { topic: string; eventClass: Function }[] = [];
    const seen = new Set<Function>();
    const isDev = process.env.NODE_ENV !== 'production';

    const folders = await fs.readdir(baseDir, { withFileTypes: true });

    for (const folder of folders) {
        if (!folder.isDirectory()) continue;

        const eventsDir = path.join(baseDir, folder.name, 'infrastructure', 'events');

        try {
            const allowedExts = isDev ? ['.ts', '.js'] : ['.js'];

            const eventFiles = await fs.readdir(eventsDir);

            for (const file of eventFiles) {
                const ext = path.extname(file);

                if (!allowedExts.includes(ext) || file.endsWith('.d.ts')) continue;

                const fullPath = path.join(eventsDir, file);
                const module = await import(fullPath);

                for (const exportName in module) {
                    const exported = module[exportName];
                    if (typeof exported !== 'function') continue;

                    const topic = getEventTopic(exported);
                    if (topic && !seen.has(exported)) {
                        logger.log(`Evento encontrado: ${exportName} con topic: ${topic}`);
                        events.push({ topic, eventClass: exported });
                        seen.add(exported);
                    }
                }
            }
        } catch (err: any) {
            if (err.code !== 'ENOENT') {
                logger.error(`Error leyendo eventos en ${eventsDir}:`, err);
            }
        }
    }

    return events;
}
