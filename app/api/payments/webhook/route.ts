import { NextRequest, NextResponse } from 'next/server';
import { getOrder, saveOrder, saveMember } from '@/lib/kv';
import { MemberRecord } from '@/lib/types';

/**
 * Direct Moolre Payment Webhook for Young Apostles FC
 * All payments land directly into YAFC's own Moolre merchant account and MoMo wallet.
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({}));
    const reference = payload.reference || payload.ref || payload.tx_ref;
    const status = (payload.status || payload.payment_status || '').toLowerCase();
    const transactionId = payload.transaction_id || payload.id || `TX-${Date.now()}`;
    const amount = Number(payload.amount || payload.total || 0);

    if (!reference) {
      return NextResponse.json({ error: 'Missing payment reference' }, { status: 400 });
    }

    console.log(`[YAFC Moolre Webhook] Payment ref: ${reference}, status: ${status}, amount: GHS ${amount}`);

    const isSuccessful = /^(success|successful|completed|paid)$/.test(status);
    let order = await getOrder(reference);

    if (!order) {
      const isMemb = reference.includes('MEMB') || reference.includes('VIP');
      order = {
        id: `ORD-${Date.now()}`,
        reference,
        category: isMemb ? 'membership' : 'merch',
        customer: {
          name: payload.customer_name || 'Apostle Fan',
          phone: payload.customer_phone || payload.phone || '',
          email: payload.customer_email || '',
        },
        grossAmount: amount,
        status: isSuccessful ? 'PAID' : 'FAILED',
        createdAt: new Date().toISOString(),
      };
    }

    if (isSuccessful) {
      order.status = 'PAID';
      order.moolreTxId = transactionId;
      order.paidAt = new Date().toISOString();

      // If Membership/VIP Pass, activate fan permanently in YAFC Database
      if (order.category === 'membership') {
        const isGold = reference.includes('VIP') || (order.grossAmount >= 400);
        const tierName = isGold ? 'Gold VIP Apostle' : 'Standard Apostle';
        const passId = `YAFC-26-${Math.floor(1000 + Math.random() * 9000)}`;

        const memberRecord: MemberRecord = {
          id: passId,
          name: order.customer.name,
          phone: order.customer.phone,
          email: order.customer.email || '',
          tier: tierName,
          subscription: '2026/27 GPL Season Pass',
          status: 'Active',
          hasPaid: true,
          paidRef: reference,
          paidAmount: order.grossAmount,
          moolreTxId: transactionId,
          joinDate: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await saveMember(memberRecord);
        console.log(`[VIP Member Activated] ${order.customer.name} is now an active ${tierName} (Pass: ${passId})`);
      }

      await saveOrder(order);

      return NextResponse.json({
        success: true,
        status: 'PAID',
        reference,
        transactionId,
        message: 'Young Apostles FC payment confirmed directly to club account.',
      });
    } else {
      order.status = 'FAILED';
      await saveOrder(order);
      return NextResponse.json({ success: true, status: 'FAILED', reference });
    }
  } catch (err: any) {
    console.error('YAFC Webhook processing error:', err);
    return NextResponse.json({ error: 'Internal server error processing webhook' }, { status: 500 });
  }
}
