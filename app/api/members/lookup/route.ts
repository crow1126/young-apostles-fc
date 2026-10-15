import { NextRequest, NextResponse } from 'next/server';
import { getMember } from '@/lib/kv';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || searchParams.get('phone') || searchParams.get('id');

    if (!query) {
      return NextResponse.json({ error: 'Missing phone number or Pass ID' }, { status: 400 });
    }

    const member = await getMember(query);

    if (!member) {
      return NextResponse.json({
        found: false,
        message: 'No active membership found for this number or Pass ID.',
      }, { status: 404 });
    }

    // Determine active VIP perks
    const isVip = member.tier.includes('VIP') || member.tier.includes('Gold');
    const discountPercent = isVip ? 0.15 : (member.tier.includes('Standard') ? 0.05 : 0);

    return NextResponse.json({
      found: true,
      member: {
        id: member.id,
        name: member.name,
        phone: member.phone,
        email: member.email || '',
        tier: member.tier,
        subscription: member.subscription,
        status: member.status,
        hasPaid: member.hasPaid,
        memberSince: member.joinDate,
        perks: {
          isVip,
          storeDiscountPercent: discountPercent,
          storeDiscountLabel: isVip ? '15% Gold VIP Discount' : '5% Member Discount',
          badgeText: isVip ? 'Gold VIP Apostle' : 'Official Member',
        },
      },
    });
  } catch (err: any) {
    console.error('Member lookup error:', err);
    return NextResponse.json({ error: 'Failed to lookup member' }, { status: 500 });
  }
}
