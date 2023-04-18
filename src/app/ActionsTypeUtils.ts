export type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
