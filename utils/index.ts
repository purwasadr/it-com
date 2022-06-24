export const removeUndefined = <T,>(props: T): T =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  ) as T;

export const concatOrUnd = (...strings: Array<string | undefined>) => {
    let result: string = '';

    for (let i of strings) {
        if (i === undefined) return undefined;
        result += i;
    }

    return result
}