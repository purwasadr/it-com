// Mengebalikan object yang telah dibersihkan dari properti yang
// bertipe undefined
export const removeUndefined = <T,>(props: T): T =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  ) as T;

// Mengembalikan string jika semua nilai bertype string, mengembalikan
// undefined jika salah satu nilai bertype undefined 
export const concatOrUnd = (...strings: Array<string | undefined>) => {
    let result: string = '';

    for (let i of strings) {
        if (i === undefined) return undefined;
        result += i;
    }

    return result
}