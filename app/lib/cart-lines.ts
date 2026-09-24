/**
 * LinesUpdate must persist quantity/line changes for every cart, including 2+ lines.
 * TICKET-1105: never short-circuit on lineCount.
 */
export function shouldUpdateLines(_lineCount: number): boolean {
  return true;
}

export async function applyLinesUpdate<TResult, TLine>(
  updateLines: (lines: TLine[]) => Promise<TResult>,
  lines: TLine[],
  lineCount = 0,
): Promise<TResult> {
  if (!shouldUpdateLines(lineCount)) {
    throw new Error('LinesUpdate must not skip cart.updateLines');
  }

  return updateLines(lines);
}
