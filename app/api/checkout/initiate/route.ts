import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { OrderRecord } from '@/lib/types';
import { saveOrder, getMember } from '@/lib/kv';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type = 'merch', // 'merch' | 'membership'
      customer,
      items = [],
      tier = 'Gold VIP Apostle',
    } = body;

    if (!customer || !customer.phone || !customer.name) {
      return NextResponse.json({ error: 'Customer name and phone number are required.' }, { status: 400 });
    }

    const cleanPhone = customer.phone.replace(/[\s\-\+]/g, '');

    // Check if customer is an active VIP member for store discounts
    const existingMember = await getMember(cleanPhone);
    const isVipMember = Boolean(
      existingMember &&
      existingMember.status === 'Active' &&
      existingMember.hasPaid &&
      (existingMember.tier.includes('VIP') || existingMember.tier.includes('Gold'))
    );
    const isStdMember = Boolean(
      existingMember &&
      existingMember.status === 'Active' &&
      existingMember.hasPaid &&
      existingMember.tier.includes('Standard')
    );

    let grossAmount = 0;
    let discountApplied = 0;

    if (type === 'membership') {
      const isGold = tier.includes('VIP') || tier.includes('Gold');
      grossAmount = isGold ? 500 : 200;
    } else {
      // Merch cart calculation
      const subtotal = items.reduce((acc: number, item: any) => acc + (Number(item.price || 0) * Number(item.qty || 1)), 0);
      const deliveryFee = 25; // standard GHS 25 delivery
      
      let discountRate = 0;
      if (isVipMember) discountRate = 0.15; // 15% VIP discount
      else if (isStdMember) discountRate = 0.05; // 5% Standard member discount

      discountApplied = Number((subtotal * discountRate).toFixed(2));
      grossAmount = Number((subtotal - discountApplied + deliveryFee).toFixed(2));
    }

    // Reference generation: deterministic prefix
    const prefix = type === 'membership' ? 'YAFC-MEMB' : 'YAFC-MERCH';
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    const reference = `${prefix}-${dateStr}-${randomHex}`;

    // Estimated Moolre Fee (standard 2%)
    const feeRate = Number(process.env.MOOLRE_GATEWAY_FEE_PERCENT || 0.02);
    const gatewayFee = Number((grossAmount * feeRate).toFixed(2));
    const netPayoutAmount = Number((grossAmount - gatewayFee).toFixed(2));

    const order: OrderRecord = {
      id: crypto.randomUUID(),
      reference,
      category: type,
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || '',
        city: customer.city || '',
        address: customer.address || '',
      },
      items: type === 'membership' ? [{ name: tier, qty: 1, price: grossAmount }] : items,
      grossAmount,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    await saveOrder(order);

    return NextResponse.json({
      success: true,
      reference,
      grossAmount,
      discountApplied,
      category: type,
      callbackUrl: `https://youngapostlesfcgh.com/payment-callback.html?ref=${reference}&amount=${grossAmount}&status=success`,
    });
  } catch (err: any) {
    console.error('Initiate checkout error:', err);
    return NextResponse.json({ error: 'Failed to initiate order checkout' }, { status: 500 });
  }
}
