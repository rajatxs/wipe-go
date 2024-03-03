import makeWASocket, {
   DisconnectReason,
   fetchLatestBaileysVersion,
   useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { SESSION_ROOT } from '../config/config.js';
import {
   registerPresenceUpdateEvent,
   dispatchPresenceUpdateEvent,
   resetPresenceUpdateCounts,
} from './observer.service.js';
import logger from '../utils/logger.js';

/** @type {any} */
const msgRetryCounterMap = {};
var _waSocket;

export function waSocket() {
   return _waSocket;
}

export async function openWASocket() {
   const { state, saveCreds } = await useMultiFileAuthState(SESSION_ROOT);
   const { version } = await fetchLatestBaileysVersion();

   // @ts-ignore
   _waSocket = makeWASocket.default({
      version,
      printQRInTerminal: true,
      auth: state,

      // @ts-ignore
      msgRetryCounterMap,
   });

   _waSocket.ev.process(async (events) => {
      if (events['connection.update']) {
         const update = events['connection.update'];
         const { connection, lastDisconnect } = update;
         if (connection === 'close') {
            resetPresenceUpdateCounts();
            if (
               lastDisconnect.error && 
               // @ts-ignore
               lastDisconnect.error.output.statusCode !==
               DisconnectReason.loggedOut
            ) {
               openWASocket();
            } else {
               logger.warn('wa:service', 'connection closed');
            }
         }

         if (connection === 'open') {
            try {
               await registerPresenceUpdateEvent();
            } catch (error) {
               logger.error("wa:service", "couldn't subscribe socket events", error);
            }
         }
      }

      if (events['creds.update']) {
         await saveCreds();
      }

      if (events['presence.update']) {
         const event = events['presence.update'];
         await dispatchPresenceUpdateEvent(event);
      }
   });

   return _waSocket;
}

export function closeWASocket() {
   if (_waSocket) {
      _waSocket.end(null);
      _waSocket = null;
   }
}
