/**
 * DiscountCodesUpdate must persist codes for every cart, including 2+ lines.
 * TICKET-1042: never short-circuit on lineCount.
 */
export function shouldUpdateDiscountCodes(_lineCount: number): boolean {
  return true;
}

export async function applyDiscountCodesUpdate<TResult>(
  updateDiscountCodes: (discountCodes: string[]) => Promise<TResult>,
  discountCodes: string[],
  lineCount = 0,
): Promise<TResult> {
  if (!shouldUpdateDiscountCodes(lineCount)) {
    throw new Error(
      'DiscountCodesUpdate must not skip cart.updateDiscountCodes',
    );
  }

  return updateDiscountCodes(discountCodes);
}
