/**
 * Moolre Gateway Configuration for Young Apostles FC
 *
 * Young Apostles FC operates on its own dedicated Moolre merchant account.
 * All payments for match tickets, kits, and season passes are deposited
 * directly into Young Apostles FC's official MoMo account.
 */

export const YAFC_MOOLRE_CONFIG = {
  merchantId: process.env.MOOLRE_MERCHANT_ID || '',
  apiKey: process.env.MOOLRE_API_KEY || '',
  accountName: 'Young Apostles FC',
  defaultCurrency: 'GHS',
};
