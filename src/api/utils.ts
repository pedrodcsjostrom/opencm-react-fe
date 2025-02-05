type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

type Camelize<T> = {
    [K in keyof T as CamelCase<string & K>]: T[K] extends Array<infer U>
    ? U extends object
    ? Array<Camelize<U>>
    : Array<U>
    : T[K] extends object
    ? Camelize<T[K]>
    : T[K];
};

export function toCamelCase<T>(obj: T): Camelize<T> {
    if (Array.isArray(obj)) {
        return obj.map((v) => toCamelCase(v)) as any;
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((result, key) => {
            const camelKey = key
                .replace(/^ID/, 'id')
                .replace(/_id(?=[_]|$)/g, '_ID')
                .replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''))
                .replace(/^[A-Z]/, c => c.toLowerCase());
            result[camelKey] = toCamelCase((obj as any)[key]);
            return result;
        }, {} as any);
    }
    return obj as any;
}