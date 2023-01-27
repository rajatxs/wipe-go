import { hostname } from 'os';

/**
 * Returns system tag for identification
 * @returns {string}
 */
export function getTag() {
   const buff = Buffer.from(hostname());
   return buff.toString('hex').slice(0, 8);
}

export function serializeObject(o = {}) {
   const queryTemplate = Object.keys(o)
      .map((key) => `${key}=?`)
      .join(',');

   return {
      queryTemplate,
      params: Object.values(o),
   };
}
