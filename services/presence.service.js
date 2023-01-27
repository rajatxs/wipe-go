import { sqlite } from '../utils/sqlite.js';

/**
 * Returns presence history record by given `id`
 * @param {number} id
 * @returns {Promise<PresenceHistory>}
 */
export async function getPresenceHistoryById(id) {
   const result = await sqlite().get(
      'SELECT * FROM pres_hist WHERE id = ? LIMIT 1;',
      [id]
   );

   return Array.isArray(result) ? result[0] : result;
}

/**
 * Returns list of presence history record
 * @param {number} subId
 * @param {number} limit
 * @returns {Promise<PresenceHistory[]>}
 */
export function getPresenceHistoryBySubId(subId, limit) {
   return sqlite().get(
      'SELECT * FROM pres_hist WHERE sub_id = ? ORDER BY id DESC LIMIT ?;',
      [subId, limit]
   );
}

/**
 * Inserts presence history record
 * @param {Pick<PresenceHistory, 'status'|'lastseen'|'sub_id'|'tag'>} data
 */
export async function insertPresenceHistoryRecord(data) {
   const stmt = await sqlite().prepare(
      'INSERT INTO pres_hist(status, lastseen, sub_id, tag) VALUES (?, ?, ?, ?);',
      [data.status, data.lastseen, data.sub_id, data.tag]
   );

   return stmt.run();
}

/**
 * Deletes presence history record by given `id`
 * @param {number} id
 */
export async function deletePresenceHistoryRecordById(id) {
   const stmt = await sqlite().prepare(
      'DELETE FROM pres_hist WHERE id = ?;',
      [id]
   );

   return stmt.run();
}

/**
 * Deletes all presence history records by given `subId`
 * @param {number} subId
 */
export async function deletePresenceHistoryRecordBySubId(subId) {
   const stmt = await sqlite().prepare(
      'DELETE FROM pres_hist WHERE sub_id = ?;',
      [subId]
   );

   return stmt.run();
}
