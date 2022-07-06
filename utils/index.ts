/**
 * @param  {T} props
 * @returns T
 * 
 * Mengebalikan object yang telah dibersihkan dari properti yang
 * bertipe undefined
 */
export const removeUndefined = <T,>(props: T): T =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  ) as T;

// Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
// >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
export const deleteUndefined = (obj: Record<string, any> | undefined): void => {
  if (obj) {
      Object.keys(obj).forEach((key: string) => {
          if (obj[key] && typeof obj[key] === 'object') {
              deleteUndefined(obj[key]);
          } else if (typeof obj[key] === 'undefined') {
              delete obj[key];
          }
      });
  }
};

/**
 * @param  {Array<string|undefined>} ...strings
 * 
 * Mengembalikan string jika semua nilai bertype string, mengembalikan
 * undefined jika salah satu nilai bertype undefined 
 */
export const concatOrUnd = (...strings: Array<string | undefined>) => {
    let result: string = '';

    for (let i of strings) {
        if (i === undefined) return undefined;
        result += i;
    }

    return result
}