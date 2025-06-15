import { Logger } from '@nestjs/common';
import * as path from 'path';
import { promises as fs } from 'fs';
import {DomainEventConstructor} from "../../domain/events/domain-event";

export async function findAllEvents(baseDir: string): Promise<{ topic: string; eventClass: DomainEventConstructor }[]> {
    const logger = new Logger('FindAllEvents');
    const events: { topic: string; eventClass: DomainEventConstructor }[] = [];
    const seen = new Set<DomainEventConstructor>();
    const isDev = process.env.NODE_ENV !== 'production';

    const folders = await fs.readdir(baseDir, { withFileTypes: true });

    for (const folder of folders) {
        if (!folder.isDirectory()) continue;

        const eventsDir = path.join(baseDir, folder.name, 'domain', 'events');

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

                    if (!('eventName' in exported)) {
                        logger.warn(`La clase ${exportName} no tiene 'eventName' estático definido`);
                        continue;
                    }

                    const eventClass = exported as DomainEventConstructor;

                    if (seen.has(eventClass)) continue;

                    logger.log(`Evento encontrado ${exportName} con topic: ${eventClass.eventName}`);

                    events.push({ topic: eventClass.eventName, eventClass });
                    seen.add(eventClass);
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
