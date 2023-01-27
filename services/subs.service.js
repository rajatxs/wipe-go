import { sqlite } from '../utils/sqlite.js';
import { serializeObject } from '../utils/common.js';
import { deletePresenceHistoryRecordBySubId } from './presence.service.js';

/**
 * Returns subscription record by given `id`
 * @param {number} id
 * @returns {Promise<Subscription>}
 */
export async function getSubscriptionById(id) {
   const result = await sqlite().get(
      'SELECT * FROM subs WHERE id = ? LIMIT 1;',
      [id]
   );

   return Array.isArray(result) ? result[0] : result;
}

/**
 * Returns all subscription
 * @returns {Promise<Subscription[]>}
 */
export function getAllSubscriptions() {
   return sqlite().all('SELECT * FROM subs ORDER BY id DESC;', []);
}

/**
 * Returns list of subscription
 * @param {SubscriptionEvent} event
 * @param {number} limit
 * @returns {Promise<Subscription[]>}
 */
export function getSubscriptions(event, limit = 10) {
   return sqlite().all(
      'SELECT * FROM subs WHERE enabled = 1 AND event = ? LIMIT ?;',
      [event, limit]
   );
}

/**
 * Returns list of subscription by given `phone`
 * @param {SubscriptionEvent} event
 * @param {string} phone
 * @returns {Promise<Subscription[]>}
 */
export function getSubscriptionByPhone(event, phone) {
   return sqlite().all(
      'SELECT * FROM subs WHERE enabled = 1 AND event = ? AND phone = ?;',
      [event, phone]
   );
}

/**
 * Inserts subscription record
 * @param {Pick<Subscription, 'alias'|'event'|'phone'|'tag'>} data
 */
export async function createSubscription(data) {
   const stmt = await sqlite().prepare(
      'INSERT INTO subs(alias, event, phone, tag) VALUES (?, ?, ?, ?);',
      [data.alias, data.event, data.phone, data.tag]
   );

   return stmt.run();
}

/**
 * Updates subscription record by given `id`
 * @param {number} id
 * @param {Partial<Pick<Subscription, 'alias'|'enabled'>>} data
 */
export async function updateSubscription(id, data) {
   const { queryTemplate, params } = serializeObject(data);

   delete data['id'];
   delete data['event'];
   delete data['phone'];
   delete data['tag'];
   delete data['created_at'];

   const stmt = await sqlite().prepare(
      `UPDATE subs SET ${queryTemplate} WHERE id = ?;`,
      [...params, id]
   );

   return stmt.run();
}

/**
 * Deletes subscription record by given `id`
 * @param {number} id
 */
export async function deleteSubscription(id) {
   await deletePresenceHistoryRecordBySubId(id);
   const stmt = await sqlite().prepare('DELETE FROM subs WHERE id = ?;', [id]);
   return stmt.run();
}
