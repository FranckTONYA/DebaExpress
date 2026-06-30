
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Colis
 * 
 */
export type Colis = $Result.DefaultSelection<Prisma.$ColisPayload>
/**
 * Model Facture
 * 
 */
export type Facture = $Result.DefaultSelection<Prisma.$FacturePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CategoryColis: {
  DOCUMENT: 'DOCUMENT',
  ELECTRONIQUE: 'ELECTRONIQUE',
  VETEMENT: 'VETEMENT',
  FRAGILE: 'FRAGILE',
  AUTRE: 'AUTRE'
};

export type CategoryColis = (typeof CategoryColis)[keyof typeof CategoryColis]


export const StatutEnvoi: {
  ENREGISTRE: 'ENREGISTRE',
  EN_ENTREPOT: 'EN_ENTREPOT',
  EN_VOL: 'EN_VOL',
  DOUANE: 'DOUANE',
  ARRIVE_DESTINATION: 'ARRIVE_DESTINATION',
  LIVRE: 'LIVRE'
};

export type StatutEnvoi = (typeof StatutEnvoi)[keyof typeof StatutEnvoi]

}

export type CategoryColis = $Enums.CategoryColis

export const CategoryColis: typeof $Enums.CategoryColis

export type StatutEnvoi = $Enums.StatutEnvoi

export const StatutEnvoi: typeof $Enums.StatutEnvoi

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Clients
 * const clients = await prisma.client.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Clients
   * const clients = await prisma.client.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.colis`: Exposes CRUD operations for the **Colis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colis
    * const colis = await prisma.colis.findMany()
    * ```
    */
  get colis(): Prisma.ColisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.facture`: Exposes CRUD operations for the **Facture** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Factures
    * const factures = await prisma.facture.findMany()
    * ```
    */
  get facture(): Prisma.FactureDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Client: 'Client',
    Colis: 'Colis',
    Facture: 'Facture'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "client" | "colis" | "facture"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Colis: {
        payload: Prisma.$ColisPayload<ExtArgs>
        fields: Prisma.ColisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          findFirst: {
            args: Prisma.ColisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          findMany: {
            args: Prisma.ColisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>[]
          }
          create: {
            args: Prisma.ColisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          createMany: {
            args: Prisma.ColisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>[]
          }
          delete: {
            args: Prisma.ColisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          update: {
            args: Prisma.ColisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          deleteMany: {
            args: Prisma.ColisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>[]
          }
          upsert: {
            args: Prisma.ColisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          aggregate: {
            args: Prisma.ColisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColis>
          }
          groupBy: {
            args: Prisma.ColisGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColisGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColisCountArgs<ExtArgs>
            result: $Utils.Optional<ColisCountAggregateOutputType> | number
          }
        }
      }
      Facture: {
        payload: Prisma.$FacturePayload<ExtArgs>
        fields: Prisma.FactureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FactureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FactureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>
          }
          findFirst: {
            args: Prisma.FactureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FactureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>
          }
          findMany: {
            args: Prisma.FactureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>[]
          }
          create: {
            args: Prisma.FactureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>
          }
          createMany: {
            args: Prisma.FactureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FactureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>[]
          }
          delete: {
            args: Prisma.FactureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>
          }
          update: {
            args: Prisma.FactureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>
          }
          deleteMany: {
            args: Prisma.FactureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FactureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FactureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>[]
          }
          upsert: {
            args: Prisma.FactureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturePayload>
          }
          aggregate: {
            args: Prisma.FactureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFacture>
          }
          groupBy: {
            args: Prisma.FactureGroupByArgs<ExtArgs>
            result: $Utils.Optional<FactureGroupByOutputType>[]
          }
          count: {
            args: Prisma.FactureCountArgs<ExtArgs>
            result: $Utils.Optional<FactureCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    client?: ClientOmit
    colis?: ColisOmit
    facture?: FactureOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    colis: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colis?: boolean | ClientCountOutputTypeCountColisArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountColisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColisWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    nom: string | null
    email: string | null
    telephone: string | null
    adresse: string | null
    createdAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    email: string | null
    telephone: string | null
    adresse: string | null
    createdAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    nom: number
    email: number
    telephone: number
    adresse: number
    createdAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    nom?: true
    email?: true
    telephone?: true
    adresse?: true
    createdAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    nom?: true
    email?: true
    telephone?: true
    adresse?: true
    createdAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    nom?: true
    email?: true
    telephone?: true
    adresse?: true
    createdAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    nom: string
    email: string
    telephone: string
    adresse: string
    createdAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    email?: boolean
    telephone?: boolean
    adresse?: boolean
    createdAt?: boolean
    colis?: boolean | Client$colisArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    email?: boolean
    telephone?: boolean
    adresse?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    email?: boolean
    telephone?: boolean
    adresse?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    nom?: boolean
    email?: boolean
    telephone?: boolean
    adresse?: boolean
    createdAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "email" | "telephone" | "adresse" | "createdAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colis?: boolean | Client$colisArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      colis: Prisma.$ColisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      email: string
      telephone: string
      adresse: string
      createdAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    colis<T extends Client$colisArgs<ExtArgs> = {}>(args?: Subset<T, Client$colisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly nom: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly telephone: FieldRef<"Client", 'String'>
    readonly adresse: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.colis
   */
  export type Client$colisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    where?: ColisWhereInput
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    cursor?: ColisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColisScalarFieldEnum | ColisScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Colis
   */

  export type AggregateColis = {
    _count: ColisCountAggregateOutputType | null
    _avg: ColisAvgAggregateOutputType | null
    _sum: ColisSumAggregateOutputType | null
    _min: ColisMinAggregateOutputType | null
    _max: ColisMaxAggregateOutputType | null
  }

  export type ColisAvgAggregateOutputType = {
    poids: number | null
    prixCalculer: number | null
  }

  export type ColisSumAggregateOutputType = {
    poids: number | null
    prixCalculer: number | null
  }

  export type ColisMinAggregateOutputType = {
    id: string | null
    codeSuivi: string | null
    description: string | null
    categorie: $Enums.CategoryColis | null
    poids: number | null
    prixCalculer: number | null
    statut: $Enums.StatutEnvoi | null
    expediteurId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ColisMaxAggregateOutputType = {
    id: string | null
    codeSuivi: string | null
    description: string | null
    categorie: $Enums.CategoryColis | null
    poids: number | null
    prixCalculer: number | null
    statut: $Enums.StatutEnvoi | null
    expediteurId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ColisCountAggregateOutputType = {
    id: number
    codeSuivi: number
    description: number
    categorie: number
    poids: number
    prixCalculer: number
    statut: number
    expediteurId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ColisAvgAggregateInputType = {
    poids?: true
    prixCalculer?: true
  }

  export type ColisSumAggregateInputType = {
    poids?: true
    prixCalculer?: true
  }

  export type ColisMinAggregateInputType = {
    id?: true
    codeSuivi?: true
    description?: true
    categorie?: true
    poids?: true
    prixCalculer?: true
    statut?: true
    expediteurId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ColisMaxAggregateInputType = {
    id?: true
    codeSuivi?: true
    description?: true
    categorie?: true
    poids?: true
    prixCalculer?: true
    statut?: true
    expediteurId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ColisCountAggregateInputType = {
    id?: true
    codeSuivi?: true
    description?: true
    categorie?: true
    poids?: true
    prixCalculer?: true
    statut?: true
    expediteurId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ColisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colis to aggregate.
     */
    where?: ColisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colis to fetch.
     */
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colis
    **/
    _count?: true | ColisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColisMaxAggregateInputType
  }

  export type GetColisAggregateType<T extends ColisAggregateArgs> = {
        [P in keyof T & keyof AggregateColis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColis[P]>
      : GetScalarType<T[P], AggregateColis[P]>
  }




  export type ColisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColisWhereInput
    orderBy?: ColisOrderByWithAggregationInput | ColisOrderByWithAggregationInput[]
    by: ColisScalarFieldEnum[] | ColisScalarFieldEnum
    having?: ColisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColisCountAggregateInputType | true
    _avg?: ColisAvgAggregateInputType
    _sum?: ColisSumAggregateInputType
    _min?: ColisMinAggregateInputType
    _max?: ColisMaxAggregateInputType
  }

  export type ColisGroupByOutputType = {
    id: string
    codeSuivi: string
    description: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut: $Enums.StatutEnvoi
    expediteurId: string
    createdAt: Date
    updatedAt: Date
    _count: ColisCountAggregateOutputType | null
    _avg: ColisAvgAggregateOutputType | null
    _sum: ColisSumAggregateOutputType | null
    _min: ColisMinAggregateOutputType | null
    _max: ColisMaxAggregateOutputType | null
  }

  type GetColisGroupByPayload<T extends ColisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColisGroupByOutputType[P]>
            : GetScalarType<T[P], ColisGroupByOutputType[P]>
        }
      >
    >


  export type ColisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codeSuivi?: boolean
    description?: boolean
    categorie?: boolean
    poids?: boolean
    prixCalculer?: boolean
    statut?: boolean
    expediteurId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expediteur?: boolean | ClientDefaultArgs<ExtArgs>
    facture?: boolean | Colis$factureArgs<ExtArgs>
  }, ExtArgs["result"]["colis"]>

  export type ColisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codeSuivi?: boolean
    description?: boolean
    categorie?: boolean
    poids?: boolean
    prixCalculer?: boolean
    statut?: boolean
    expediteurId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expediteur?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colis"]>

  export type ColisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codeSuivi?: boolean
    description?: boolean
    categorie?: boolean
    poids?: boolean
    prixCalculer?: boolean
    statut?: boolean
    expediteurId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expediteur?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colis"]>

  export type ColisSelectScalar = {
    id?: boolean
    codeSuivi?: boolean
    description?: boolean
    categorie?: boolean
    poids?: boolean
    prixCalculer?: boolean
    statut?: boolean
    expediteurId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ColisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codeSuivi" | "description" | "categorie" | "poids" | "prixCalculer" | "statut" | "expediteurId" | "createdAt" | "updatedAt", ExtArgs["result"]["colis"]>
  export type ColisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | ClientDefaultArgs<ExtArgs>
    facture?: boolean | Colis$factureArgs<ExtArgs>
  }
  export type ColisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type ColisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $ColisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Colis"
    objects: {
      expediteur: Prisma.$ClientPayload<ExtArgs>
      facture: Prisma.$FacturePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codeSuivi: string
      description: string | null
      categorie: $Enums.CategoryColis
      poids: number
      prixCalculer: number
      statut: $Enums.StatutEnvoi
      expediteurId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["colis"]>
    composites: {}
  }

  type ColisGetPayload<S extends boolean | null | undefined | ColisDefaultArgs> = $Result.GetResult<Prisma.$ColisPayload, S>

  type ColisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColisCountAggregateInputType | true
    }

  export interface ColisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Colis'], meta: { name: 'Colis' } }
    /**
     * Find zero or one Colis that matches the filter.
     * @param {ColisFindUniqueArgs} args - Arguments to find a Colis
     * @example
     * // Get one Colis
     * const colis = await prisma.colis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColisFindUniqueArgs>(args: SelectSubset<T, ColisFindUniqueArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Colis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColisFindUniqueOrThrowArgs} args - Arguments to find a Colis
     * @example
     * // Get one Colis
     * const colis = await prisma.colis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColisFindUniqueOrThrowArgs>(args: SelectSubset<T, ColisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Colis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisFindFirstArgs} args - Arguments to find a Colis
     * @example
     * // Get one Colis
     * const colis = await prisma.colis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColisFindFirstArgs>(args?: SelectSubset<T, ColisFindFirstArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Colis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisFindFirstOrThrowArgs} args - Arguments to find a Colis
     * @example
     * // Get one Colis
     * const colis = await prisma.colis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColisFindFirstOrThrowArgs>(args?: SelectSubset<T, ColisFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Colis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colis
     * const colis = await prisma.colis.findMany()
     * 
     * // Get first 10 Colis
     * const colis = await prisma.colis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const colisWithIdOnly = await prisma.colis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColisFindManyArgs>(args?: SelectSubset<T, ColisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Colis.
     * @param {ColisCreateArgs} args - Arguments to create a Colis.
     * @example
     * // Create one Colis
     * const Colis = await prisma.colis.create({
     *   data: {
     *     // ... data to create a Colis
     *   }
     * })
     * 
     */
    create<T extends ColisCreateArgs>(args: SelectSubset<T, ColisCreateArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Colis.
     * @param {ColisCreateManyArgs} args - Arguments to create many Colis.
     * @example
     * // Create many Colis
     * const colis = await prisma.colis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColisCreateManyArgs>(args?: SelectSubset<T, ColisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Colis and returns the data saved in the database.
     * @param {ColisCreateManyAndReturnArgs} args - Arguments to create many Colis.
     * @example
     * // Create many Colis
     * const colis = await prisma.colis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Colis and only return the `id`
     * const colisWithIdOnly = await prisma.colis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColisCreateManyAndReturnArgs>(args?: SelectSubset<T, ColisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Colis.
     * @param {ColisDeleteArgs} args - Arguments to delete one Colis.
     * @example
     * // Delete one Colis
     * const Colis = await prisma.colis.delete({
     *   where: {
     *     // ... filter to delete one Colis
     *   }
     * })
     * 
     */
    delete<T extends ColisDeleteArgs>(args: SelectSubset<T, ColisDeleteArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Colis.
     * @param {ColisUpdateArgs} args - Arguments to update one Colis.
     * @example
     * // Update one Colis
     * const colis = await prisma.colis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColisUpdateArgs>(args: SelectSubset<T, ColisUpdateArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Colis.
     * @param {ColisDeleteManyArgs} args - Arguments to filter Colis to delete.
     * @example
     * // Delete a few Colis
     * const { count } = await prisma.colis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColisDeleteManyArgs>(args?: SelectSubset<T, ColisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colis
     * const colis = await prisma.colis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColisUpdateManyArgs>(args: SelectSubset<T, ColisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colis and returns the data updated in the database.
     * @param {ColisUpdateManyAndReturnArgs} args - Arguments to update many Colis.
     * @example
     * // Update many Colis
     * const colis = await prisma.colis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Colis and only return the `id`
     * const colisWithIdOnly = await prisma.colis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ColisUpdateManyAndReturnArgs>(args: SelectSubset<T, ColisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Colis.
     * @param {ColisUpsertArgs} args - Arguments to update or create a Colis.
     * @example
     * // Update or create a Colis
     * const colis = await prisma.colis.upsert({
     *   create: {
     *     // ... data to create a Colis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Colis we want to update
     *   }
     * })
     */
    upsert<T extends ColisUpsertArgs>(args: SelectSubset<T, ColisUpsertArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Colis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisCountArgs} args - Arguments to filter Colis to count.
     * @example
     * // Count the number of Colis
     * const count = await prisma.colis.count({
     *   where: {
     *     // ... the filter for the Colis we want to count
     *   }
     * })
    **/
    count<T extends ColisCountArgs>(
      args?: Subset<T, ColisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Colis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColisAggregateArgs>(args: Subset<T, ColisAggregateArgs>): Prisma.PrismaPromise<GetColisAggregateType<T>>

    /**
     * Group by Colis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColisGroupByArgs['orderBy'] }
        : { orderBy?: ColisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Colis model
   */
  readonly fields: ColisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Colis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expediteur<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    facture<T extends Colis$factureArgs<ExtArgs> = {}>(args?: Subset<T, Colis$factureArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Colis model
   */
  interface ColisFieldRefs {
    readonly id: FieldRef<"Colis", 'String'>
    readonly codeSuivi: FieldRef<"Colis", 'String'>
    readonly description: FieldRef<"Colis", 'String'>
    readonly categorie: FieldRef<"Colis", 'CategoryColis'>
    readonly poids: FieldRef<"Colis", 'Float'>
    readonly prixCalculer: FieldRef<"Colis", 'Float'>
    readonly statut: FieldRef<"Colis", 'StatutEnvoi'>
    readonly expediteurId: FieldRef<"Colis", 'String'>
    readonly createdAt: FieldRef<"Colis", 'DateTime'>
    readonly updatedAt: FieldRef<"Colis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Colis findUnique
   */
  export type ColisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where: ColisWhereUniqueInput
  }

  /**
   * Colis findUniqueOrThrow
   */
  export type ColisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where: ColisWhereUniqueInput
  }

  /**
   * Colis findFirst
   */
  export type ColisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where?: ColisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colis to fetch.
     */
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colis.
     */
    cursor?: ColisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colis.
     */
    distinct?: ColisScalarFieldEnum | ColisScalarFieldEnum[]
  }

  /**
   * Colis findFirstOrThrow
   */
  export type ColisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where?: ColisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colis to fetch.
     */
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colis.
     */
    cursor?: ColisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colis.
     */
    distinct?: ColisScalarFieldEnum | ColisScalarFieldEnum[]
  }

  /**
   * Colis findMany
   */
  export type ColisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where?: ColisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colis to fetch.
     */
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colis.
     */
    cursor?: ColisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colis.
     */
    distinct?: ColisScalarFieldEnum | ColisScalarFieldEnum[]
  }

  /**
   * Colis create
   */
  export type ColisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * The data needed to create a Colis.
     */
    data: XOR<ColisCreateInput, ColisUncheckedCreateInput>
  }

  /**
   * Colis createMany
   */
  export type ColisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colis.
     */
    data: ColisCreateManyInput | ColisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Colis createManyAndReturn
   */
  export type ColisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * The data used to create many Colis.
     */
    data: ColisCreateManyInput | ColisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Colis update
   */
  export type ColisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * The data needed to update a Colis.
     */
    data: XOR<ColisUpdateInput, ColisUncheckedUpdateInput>
    /**
     * Choose, which Colis to update.
     */
    where: ColisWhereUniqueInput
  }

  /**
   * Colis updateMany
   */
  export type ColisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colis.
     */
    data: XOR<ColisUpdateManyMutationInput, ColisUncheckedUpdateManyInput>
    /**
     * Filter which Colis to update
     */
    where?: ColisWhereInput
    /**
     * Limit how many Colis to update.
     */
    limit?: number
  }

  /**
   * Colis updateManyAndReturn
   */
  export type ColisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * The data used to update Colis.
     */
    data: XOR<ColisUpdateManyMutationInput, ColisUncheckedUpdateManyInput>
    /**
     * Filter which Colis to update
     */
    where?: ColisWhereInput
    /**
     * Limit how many Colis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Colis upsert
   */
  export type ColisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * The filter to search for the Colis to update in case it exists.
     */
    where: ColisWhereUniqueInput
    /**
     * In case the Colis found by the `where` argument doesn't exist, create a new Colis with this data.
     */
    create: XOR<ColisCreateInput, ColisUncheckedCreateInput>
    /**
     * In case the Colis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColisUpdateInput, ColisUncheckedUpdateInput>
  }

  /**
   * Colis delete
   */
  export type ColisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
    /**
     * Filter which Colis to delete.
     */
    where: ColisWhereUniqueInput
  }

  /**
   * Colis deleteMany
   */
  export type ColisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colis to delete
     */
    where?: ColisWhereInput
    /**
     * Limit how many Colis to delete.
     */
    limit?: number
  }

  /**
   * Colis.facture
   */
  export type Colis$factureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    where?: FactureWhereInput
  }

  /**
   * Colis without action
   */
  export type ColisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColisInclude<ExtArgs> | null
  }


  /**
   * Model Facture
   */

  export type AggregateFacture = {
    _count: FactureCountAggregateOutputType | null
    _avg: FactureAvgAggregateOutputType | null
    _sum: FactureSumAggregateOutputType | null
    _min: FactureMinAggregateOutputType | null
    _max: FactureMaxAggregateOutputType | null
  }

  export type FactureAvgAggregateOutputType = {
    montantHT: number | null
    tva: number | null
    montantTTC: number | null
  }

  export type FactureSumAggregateOutputType = {
    montantHT: number | null
    tva: number | null
    montantTTC: number | null
  }

  export type FactureMinAggregateOutputType = {
    id: string | null
    numeroFact: string | null
    montantHT: number | null
    tva: number | null
    montantTTC: number | null
    estPaye: boolean | null
    colisId: string | null
    createdAt: Date | null
  }

  export type FactureMaxAggregateOutputType = {
    id: string | null
    numeroFact: string | null
    montantHT: number | null
    tva: number | null
    montantTTC: number | null
    estPaye: boolean | null
    colisId: string | null
    createdAt: Date | null
  }

  export type FactureCountAggregateOutputType = {
    id: number
    numeroFact: number
    montantHT: number
    tva: number
    montantTTC: number
    estPaye: number
    colisId: number
    createdAt: number
    _all: number
  }


  export type FactureAvgAggregateInputType = {
    montantHT?: true
    tva?: true
    montantTTC?: true
  }

  export type FactureSumAggregateInputType = {
    montantHT?: true
    tva?: true
    montantTTC?: true
  }

  export type FactureMinAggregateInputType = {
    id?: true
    numeroFact?: true
    montantHT?: true
    tva?: true
    montantTTC?: true
    estPaye?: true
    colisId?: true
    createdAt?: true
  }

  export type FactureMaxAggregateInputType = {
    id?: true
    numeroFact?: true
    montantHT?: true
    tva?: true
    montantTTC?: true
    estPaye?: true
    colisId?: true
    createdAt?: true
  }

  export type FactureCountAggregateInputType = {
    id?: true
    numeroFact?: true
    montantHT?: true
    tva?: true
    montantTTC?: true
    estPaye?: true
    colisId?: true
    createdAt?: true
    _all?: true
  }

  export type FactureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Facture to aggregate.
     */
    where?: FactureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Factures to fetch.
     */
    orderBy?: FactureOrderByWithRelationInput | FactureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FactureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Factures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Factures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Factures
    **/
    _count?: true | FactureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FactureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FactureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FactureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FactureMaxAggregateInputType
  }

  export type GetFactureAggregateType<T extends FactureAggregateArgs> = {
        [P in keyof T & keyof AggregateFacture]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFacture[P]>
      : GetScalarType<T[P], AggregateFacture[P]>
  }




  export type FactureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FactureWhereInput
    orderBy?: FactureOrderByWithAggregationInput | FactureOrderByWithAggregationInput[]
    by: FactureScalarFieldEnum[] | FactureScalarFieldEnum
    having?: FactureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FactureCountAggregateInputType | true
    _avg?: FactureAvgAggregateInputType
    _sum?: FactureSumAggregateInputType
    _min?: FactureMinAggregateInputType
    _max?: FactureMaxAggregateInputType
  }

  export type FactureGroupByOutputType = {
    id: string
    numeroFact: string
    montantHT: number
    tva: number
    montantTTC: number
    estPaye: boolean
    colisId: string
    createdAt: Date
    _count: FactureCountAggregateOutputType | null
    _avg: FactureAvgAggregateOutputType | null
    _sum: FactureSumAggregateOutputType | null
    _min: FactureMinAggregateOutputType | null
    _max: FactureMaxAggregateOutputType | null
  }

  type GetFactureGroupByPayload<T extends FactureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FactureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FactureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FactureGroupByOutputType[P]>
            : GetScalarType<T[P], FactureGroupByOutputType[P]>
        }
      >
    >


  export type FactureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroFact?: boolean
    montantHT?: boolean
    tva?: boolean
    montantTTC?: boolean
    estPaye?: boolean
    colisId?: boolean
    createdAt?: boolean
    colis?: boolean | ColisDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facture"]>

  export type FactureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroFact?: boolean
    montantHT?: boolean
    tva?: boolean
    montantTTC?: boolean
    estPaye?: boolean
    colisId?: boolean
    createdAt?: boolean
    colis?: boolean | ColisDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facture"]>

  export type FactureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroFact?: boolean
    montantHT?: boolean
    tva?: boolean
    montantTTC?: boolean
    estPaye?: boolean
    colisId?: boolean
    createdAt?: boolean
    colis?: boolean | ColisDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facture"]>

  export type FactureSelectScalar = {
    id?: boolean
    numeroFact?: boolean
    montantHT?: boolean
    tva?: boolean
    montantTTC?: boolean
    estPaye?: boolean
    colisId?: boolean
    createdAt?: boolean
  }

  export type FactureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numeroFact" | "montantHT" | "tva" | "montantTTC" | "estPaye" | "colisId" | "createdAt", ExtArgs["result"]["facture"]>
  export type FactureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colis?: boolean | ColisDefaultArgs<ExtArgs>
  }
  export type FactureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colis?: boolean | ColisDefaultArgs<ExtArgs>
  }
  export type FactureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colis?: boolean | ColisDefaultArgs<ExtArgs>
  }

  export type $FacturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Facture"
    objects: {
      colis: Prisma.$ColisPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numeroFact: string
      montantHT: number
      tva: number
      montantTTC: number
      estPaye: boolean
      colisId: string
      createdAt: Date
    }, ExtArgs["result"]["facture"]>
    composites: {}
  }

  type FactureGetPayload<S extends boolean | null | undefined | FactureDefaultArgs> = $Result.GetResult<Prisma.$FacturePayload, S>

  type FactureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FactureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FactureCountAggregateInputType | true
    }

  export interface FactureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Facture'], meta: { name: 'Facture' } }
    /**
     * Find zero or one Facture that matches the filter.
     * @param {FactureFindUniqueArgs} args - Arguments to find a Facture
     * @example
     * // Get one Facture
     * const facture = await prisma.facture.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FactureFindUniqueArgs>(args: SelectSubset<T, FactureFindUniqueArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Facture that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FactureFindUniqueOrThrowArgs} args - Arguments to find a Facture
     * @example
     * // Get one Facture
     * const facture = await prisma.facture.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FactureFindUniqueOrThrowArgs>(args: SelectSubset<T, FactureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Facture that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactureFindFirstArgs} args - Arguments to find a Facture
     * @example
     * // Get one Facture
     * const facture = await prisma.facture.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FactureFindFirstArgs>(args?: SelectSubset<T, FactureFindFirstArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Facture that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactureFindFirstOrThrowArgs} args - Arguments to find a Facture
     * @example
     * // Get one Facture
     * const facture = await prisma.facture.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FactureFindFirstOrThrowArgs>(args?: SelectSubset<T, FactureFindFirstOrThrowArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Factures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Factures
     * const factures = await prisma.facture.findMany()
     * 
     * // Get first 10 Factures
     * const factures = await prisma.facture.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const factureWithIdOnly = await prisma.facture.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FactureFindManyArgs>(args?: SelectSubset<T, FactureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Facture.
     * @param {FactureCreateArgs} args - Arguments to create a Facture.
     * @example
     * // Create one Facture
     * const Facture = await prisma.facture.create({
     *   data: {
     *     // ... data to create a Facture
     *   }
     * })
     * 
     */
    create<T extends FactureCreateArgs>(args: SelectSubset<T, FactureCreateArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Factures.
     * @param {FactureCreateManyArgs} args - Arguments to create many Factures.
     * @example
     * // Create many Factures
     * const facture = await prisma.facture.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FactureCreateManyArgs>(args?: SelectSubset<T, FactureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Factures and returns the data saved in the database.
     * @param {FactureCreateManyAndReturnArgs} args - Arguments to create many Factures.
     * @example
     * // Create many Factures
     * const facture = await prisma.facture.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Factures and only return the `id`
     * const factureWithIdOnly = await prisma.facture.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FactureCreateManyAndReturnArgs>(args?: SelectSubset<T, FactureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Facture.
     * @param {FactureDeleteArgs} args - Arguments to delete one Facture.
     * @example
     * // Delete one Facture
     * const Facture = await prisma.facture.delete({
     *   where: {
     *     // ... filter to delete one Facture
     *   }
     * })
     * 
     */
    delete<T extends FactureDeleteArgs>(args: SelectSubset<T, FactureDeleteArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Facture.
     * @param {FactureUpdateArgs} args - Arguments to update one Facture.
     * @example
     * // Update one Facture
     * const facture = await prisma.facture.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FactureUpdateArgs>(args: SelectSubset<T, FactureUpdateArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Factures.
     * @param {FactureDeleteManyArgs} args - Arguments to filter Factures to delete.
     * @example
     * // Delete a few Factures
     * const { count } = await prisma.facture.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FactureDeleteManyArgs>(args?: SelectSubset<T, FactureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Factures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Factures
     * const facture = await prisma.facture.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FactureUpdateManyArgs>(args: SelectSubset<T, FactureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Factures and returns the data updated in the database.
     * @param {FactureUpdateManyAndReturnArgs} args - Arguments to update many Factures.
     * @example
     * // Update many Factures
     * const facture = await prisma.facture.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Factures and only return the `id`
     * const factureWithIdOnly = await prisma.facture.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FactureUpdateManyAndReturnArgs>(args: SelectSubset<T, FactureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Facture.
     * @param {FactureUpsertArgs} args - Arguments to update or create a Facture.
     * @example
     * // Update or create a Facture
     * const facture = await prisma.facture.upsert({
     *   create: {
     *     // ... data to create a Facture
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Facture we want to update
     *   }
     * })
     */
    upsert<T extends FactureUpsertArgs>(args: SelectSubset<T, FactureUpsertArgs<ExtArgs>>): Prisma__FactureClient<$Result.GetResult<Prisma.$FacturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Factures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactureCountArgs} args - Arguments to filter Factures to count.
     * @example
     * // Count the number of Factures
     * const count = await prisma.facture.count({
     *   where: {
     *     // ... the filter for the Factures we want to count
     *   }
     * })
    **/
    count<T extends FactureCountArgs>(
      args?: Subset<T, FactureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FactureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Facture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FactureAggregateArgs>(args: Subset<T, FactureAggregateArgs>): Prisma.PrismaPromise<GetFactureAggregateType<T>>

    /**
     * Group by Facture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FactureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FactureGroupByArgs['orderBy'] }
        : { orderBy?: FactureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FactureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFactureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Facture model
   */
  readonly fields: FactureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Facture.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FactureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    colis<T extends ColisDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ColisDefaultArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Facture model
   */
  interface FactureFieldRefs {
    readonly id: FieldRef<"Facture", 'String'>
    readonly numeroFact: FieldRef<"Facture", 'String'>
    readonly montantHT: FieldRef<"Facture", 'Float'>
    readonly tva: FieldRef<"Facture", 'Float'>
    readonly montantTTC: FieldRef<"Facture", 'Float'>
    readonly estPaye: FieldRef<"Facture", 'Boolean'>
    readonly colisId: FieldRef<"Facture", 'String'>
    readonly createdAt: FieldRef<"Facture", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Facture findUnique
   */
  export type FactureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * Filter, which Facture to fetch.
     */
    where: FactureWhereUniqueInput
  }

  /**
   * Facture findUniqueOrThrow
   */
  export type FactureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * Filter, which Facture to fetch.
     */
    where: FactureWhereUniqueInput
  }

  /**
   * Facture findFirst
   */
  export type FactureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * Filter, which Facture to fetch.
     */
    where?: FactureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Factures to fetch.
     */
    orderBy?: FactureOrderByWithRelationInput | FactureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Factures.
     */
    cursor?: FactureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Factures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Factures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Factures.
     */
    distinct?: FactureScalarFieldEnum | FactureScalarFieldEnum[]
  }

  /**
   * Facture findFirstOrThrow
   */
  export type FactureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * Filter, which Facture to fetch.
     */
    where?: FactureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Factures to fetch.
     */
    orderBy?: FactureOrderByWithRelationInput | FactureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Factures.
     */
    cursor?: FactureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Factures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Factures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Factures.
     */
    distinct?: FactureScalarFieldEnum | FactureScalarFieldEnum[]
  }

  /**
   * Facture findMany
   */
  export type FactureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * Filter, which Factures to fetch.
     */
    where?: FactureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Factures to fetch.
     */
    orderBy?: FactureOrderByWithRelationInput | FactureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Factures.
     */
    cursor?: FactureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Factures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Factures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Factures.
     */
    distinct?: FactureScalarFieldEnum | FactureScalarFieldEnum[]
  }

  /**
   * Facture create
   */
  export type FactureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * The data needed to create a Facture.
     */
    data: XOR<FactureCreateInput, FactureUncheckedCreateInput>
  }

  /**
   * Facture createMany
   */
  export type FactureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Factures.
     */
    data: FactureCreateManyInput | FactureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Facture createManyAndReturn
   */
  export type FactureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * The data used to create many Factures.
     */
    data: FactureCreateManyInput | FactureCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Facture update
   */
  export type FactureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * The data needed to update a Facture.
     */
    data: XOR<FactureUpdateInput, FactureUncheckedUpdateInput>
    /**
     * Choose, which Facture to update.
     */
    where: FactureWhereUniqueInput
  }

  /**
   * Facture updateMany
   */
  export type FactureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Factures.
     */
    data: XOR<FactureUpdateManyMutationInput, FactureUncheckedUpdateManyInput>
    /**
     * Filter which Factures to update
     */
    where?: FactureWhereInput
    /**
     * Limit how many Factures to update.
     */
    limit?: number
  }

  /**
   * Facture updateManyAndReturn
   */
  export type FactureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * The data used to update Factures.
     */
    data: XOR<FactureUpdateManyMutationInput, FactureUncheckedUpdateManyInput>
    /**
     * Filter which Factures to update
     */
    where?: FactureWhereInput
    /**
     * Limit how many Factures to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Facture upsert
   */
  export type FactureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * The filter to search for the Facture to update in case it exists.
     */
    where: FactureWhereUniqueInput
    /**
     * In case the Facture found by the `where` argument doesn't exist, create a new Facture with this data.
     */
    create: XOR<FactureCreateInput, FactureUncheckedCreateInput>
    /**
     * In case the Facture was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FactureUpdateInput, FactureUncheckedUpdateInput>
  }

  /**
   * Facture delete
   */
  export type FactureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
    /**
     * Filter which Facture to delete.
     */
    where: FactureWhereUniqueInput
  }

  /**
   * Facture deleteMany
   */
  export type FactureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Factures to delete
     */
    where?: FactureWhereInput
    /**
     * Limit how many Factures to delete.
     */
    limit?: number
  }

  /**
   * Facture without action
   */
  export type FactureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facture
     */
    select?: FactureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facture
     */
    omit?: FactureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactureInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClientScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    email: 'email',
    telephone: 'telephone',
    adresse: 'adresse',
    createdAt: 'createdAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ColisScalarFieldEnum: {
    id: 'id',
    codeSuivi: 'codeSuivi',
    description: 'description',
    categorie: 'categorie',
    poids: 'poids',
    prixCalculer: 'prixCalculer',
    statut: 'statut',
    expediteurId: 'expediteurId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ColisScalarFieldEnum = (typeof ColisScalarFieldEnum)[keyof typeof ColisScalarFieldEnum]


  export const FactureScalarFieldEnum: {
    id: 'id',
    numeroFact: 'numeroFact',
    montantHT: 'montantHT',
    tva: 'tva',
    montantTTC: 'montantTTC',
    estPaye: 'estPaye',
    colisId: 'colisId',
    createdAt: 'createdAt'
  };

  export type FactureScalarFieldEnum = (typeof FactureScalarFieldEnum)[keyof typeof FactureScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CategoryColis'
   */
  export type EnumCategoryColisFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoryColis'>
    


  /**
   * Reference to a field of type 'CategoryColis[]'
   */
  export type ListEnumCategoryColisFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoryColis[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'StatutEnvoi'
   */
  export type EnumStatutEnvoiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutEnvoi'>
    


  /**
   * Reference to a field of type 'StatutEnvoi[]'
   */
  export type ListEnumStatutEnvoiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutEnvoi[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    nom?: StringFilter<"Client"> | string
    email?: StringFilter<"Client"> | string
    telephone?: StringFilter<"Client"> | string
    adresse?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    colis?: ColisListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    adresse?: SortOrder
    createdAt?: SortOrder
    colis?: ColisOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    nom?: StringFilter<"Client"> | string
    telephone?: StringFilter<"Client"> | string
    adresse?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    colis?: ColisListRelationFilter
  }, "id" | "email">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    adresse?: SortOrder
    createdAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    nom?: StringWithAggregatesFilter<"Client"> | string
    email?: StringWithAggregatesFilter<"Client"> | string
    telephone?: StringWithAggregatesFilter<"Client"> | string
    adresse?: StringWithAggregatesFilter<"Client"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type ColisWhereInput = {
    AND?: ColisWhereInput | ColisWhereInput[]
    OR?: ColisWhereInput[]
    NOT?: ColisWhereInput | ColisWhereInput[]
    id?: StringFilter<"Colis"> | string
    codeSuivi?: StringFilter<"Colis"> | string
    description?: StringNullableFilter<"Colis"> | string | null
    categorie?: EnumCategoryColisFilter<"Colis"> | $Enums.CategoryColis
    poids?: FloatFilter<"Colis"> | number
    prixCalculer?: FloatFilter<"Colis"> | number
    statut?: EnumStatutEnvoiFilter<"Colis"> | $Enums.StatutEnvoi
    expediteurId?: StringFilter<"Colis"> | string
    createdAt?: DateTimeFilter<"Colis"> | Date | string
    updatedAt?: DateTimeFilter<"Colis"> | Date | string
    expediteur?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    facture?: XOR<FactureNullableScalarRelationFilter, FactureWhereInput> | null
  }

  export type ColisOrderByWithRelationInput = {
    id?: SortOrder
    codeSuivi?: SortOrder
    description?: SortOrderInput | SortOrder
    categorie?: SortOrder
    poids?: SortOrder
    prixCalculer?: SortOrder
    statut?: SortOrder
    expediteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expediteur?: ClientOrderByWithRelationInput
    facture?: FactureOrderByWithRelationInput
  }

  export type ColisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codeSuivi?: string
    AND?: ColisWhereInput | ColisWhereInput[]
    OR?: ColisWhereInput[]
    NOT?: ColisWhereInput | ColisWhereInput[]
    description?: StringNullableFilter<"Colis"> | string | null
    categorie?: EnumCategoryColisFilter<"Colis"> | $Enums.CategoryColis
    poids?: FloatFilter<"Colis"> | number
    prixCalculer?: FloatFilter<"Colis"> | number
    statut?: EnumStatutEnvoiFilter<"Colis"> | $Enums.StatutEnvoi
    expediteurId?: StringFilter<"Colis"> | string
    createdAt?: DateTimeFilter<"Colis"> | Date | string
    updatedAt?: DateTimeFilter<"Colis"> | Date | string
    expediteur?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    facture?: XOR<FactureNullableScalarRelationFilter, FactureWhereInput> | null
  }, "id" | "codeSuivi">

  export type ColisOrderByWithAggregationInput = {
    id?: SortOrder
    codeSuivi?: SortOrder
    description?: SortOrderInput | SortOrder
    categorie?: SortOrder
    poids?: SortOrder
    prixCalculer?: SortOrder
    statut?: SortOrder
    expediteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ColisCountOrderByAggregateInput
    _avg?: ColisAvgOrderByAggregateInput
    _max?: ColisMaxOrderByAggregateInput
    _min?: ColisMinOrderByAggregateInput
    _sum?: ColisSumOrderByAggregateInput
  }

  export type ColisScalarWhereWithAggregatesInput = {
    AND?: ColisScalarWhereWithAggregatesInput | ColisScalarWhereWithAggregatesInput[]
    OR?: ColisScalarWhereWithAggregatesInput[]
    NOT?: ColisScalarWhereWithAggregatesInput | ColisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Colis"> | string
    codeSuivi?: StringWithAggregatesFilter<"Colis"> | string
    description?: StringNullableWithAggregatesFilter<"Colis"> | string | null
    categorie?: EnumCategoryColisWithAggregatesFilter<"Colis"> | $Enums.CategoryColis
    poids?: FloatWithAggregatesFilter<"Colis"> | number
    prixCalculer?: FloatWithAggregatesFilter<"Colis"> | number
    statut?: EnumStatutEnvoiWithAggregatesFilter<"Colis"> | $Enums.StatutEnvoi
    expediteurId?: StringWithAggregatesFilter<"Colis"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Colis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Colis"> | Date | string
  }

  export type FactureWhereInput = {
    AND?: FactureWhereInput | FactureWhereInput[]
    OR?: FactureWhereInput[]
    NOT?: FactureWhereInput | FactureWhereInput[]
    id?: StringFilter<"Facture"> | string
    numeroFact?: StringFilter<"Facture"> | string
    montantHT?: FloatFilter<"Facture"> | number
    tva?: FloatFilter<"Facture"> | number
    montantTTC?: FloatFilter<"Facture"> | number
    estPaye?: BoolFilter<"Facture"> | boolean
    colisId?: StringFilter<"Facture"> | string
    createdAt?: DateTimeFilter<"Facture"> | Date | string
    colis?: XOR<ColisScalarRelationFilter, ColisWhereInput>
  }

  export type FactureOrderByWithRelationInput = {
    id?: SortOrder
    numeroFact?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    estPaye?: SortOrder
    colisId?: SortOrder
    createdAt?: SortOrder
    colis?: ColisOrderByWithRelationInput
  }

  export type FactureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numeroFact?: string
    colisId?: string
    AND?: FactureWhereInput | FactureWhereInput[]
    OR?: FactureWhereInput[]
    NOT?: FactureWhereInput | FactureWhereInput[]
    montantHT?: FloatFilter<"Facture"> | number
    tva?: FloatFilter<"Facture"> | number
    montantTTC?: FloatFilter<"Facture"> | number
    estPaye?: BoolFilter<"Facture"> | boolean
    createdAt?: DateTimeFilter<"Facture"> | Date | string
    colis?: XOR<ColisScalarRelationFilter, ColisWhereInput>
  }, "id" | "numeroFact" | "colisId">

  export type FactureOrderByWithAggregationInput = {
    id?: SortOrder
    numeroFact?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    estPaye?: SortOrder
    colisId?: SortOrder
    createdAt?: SortOrder
    _count?: FactureCountOrderByAggregateInput
    _avg?: FactureAvgOrderByAggregateInput
    _max?: FactureMaxOrderByAggregateInput
    _min?: FactureMinOrderByAggregateInput
    _sum?: FactureSumOrderByAggregateInput
  }

  export type FactureScalarWhereWithAggregatesInput = {
    AND?: FactureScalarWhereWithAggregatesInput | FactureScalarWhereWithAggregatesInput[]
    OR?: FactureScalarWhereWithAggregatesInput[]
    NOT?: FactureScalarWhereWithAggregatesInput | FactureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Facture"> | string
    numeroFact?: StringWithAggregatesFilter<"Facture"> | string
    montantHT?: FloatWithAggregatesFilter<"Facture"> | number
    tva?: FloatWithAggregatesFilter<"Facture"> | number
    montantTTC?: FloatWithAggregatesFilter<"Facture"> | number
    estPaye?: BoolWithAggregatesFilter<"Facture"> | boolean
    colisId?: StringWithAggregatesFilter<"Facture"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Facture"> | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    nom: string
    email: string
    telephone: string
    adresse: string
    createdAt?: Date | string
    colis?: ColisCreateNestedManyWithoutExpediteurInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    nom: string
    email: string
    telephone: string
    adresse: string
    createdAt?: Date | string
    colis?: ColisUncheckedCreateNestedManyWithoutExpediteurInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colis?: ColisUpdateManyWithoutExpediteurNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colis?: ColisUncheckedUpdateManyWithoutExpediteurNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    nom: string
    email: string
    telephone: string
    adresse: string
    createdAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColisCreateInput = {
    id?: string
    codeSuivi: string
    description?: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut?: $Enums.StatutEnvoi
    createdAt?: Date | string
    updatedAt?: Date | string
    expediteur: ClientCreateNestedOneWithoutColisInput
    facture?: FactureCreateNestedOneWithoutColisInput
  }

  export type ColisUncheckedCreateInput = {
    id?: string
    codeSuivi: string
    description?: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut?: $Enums.StatutEnvoi
    expediteurId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    facture?: FactureUncheckedCreateNestedOneWithoutColisInput
  }

  export type ColisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expediteur?: ClientUpdateOneRequiredWithoutColisNestedInput
    facture?: FactureUpdateOneWithoutColisNestedInput
  }

  export type ColisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    expediteurId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    facture?: FactureUncheckedUpdateOneWithoutColisNestedInput
  }

  export type ColisCreateManyInput = {
    id?: string
    codeSuivi: string
    description?: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut?: $Enums.StatutEnvoi
    expediteurId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    expediteurId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactureCreateInput = {
    id?: string
    numeroFact: string
    montantHT: number
    tva?: number
    montantTTC: number
    estPaye?: boolean
    createdAt?: Date | string
    colis: ColisCreateNestedOneWithoutFactureInput
  }

  export type FactureUncheckedCreateInput = {
    id?: string
    numeroFact: string
    montantHT: number
    tva?: number
    montantTTC: number
    estPaye?: boolean
    colisId: string
    createdAt?: Date | string
  }

  export type FactureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroFact?: StringFieldUpdateOperationsInput | string
    montantHT?: FloatFieldUpdateOperationsInput | number
    tva?: FloatFieldUpdateOperationsInput | number
    montantTTC?: FloatFieldUpdateOperationsInput | number
    estPaye?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colis?: ColisUpdateOneRequiredWithoutFactureNestedInput
  }

  export type FactureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroFact?: StringFieldUpdateOperationsInput | string
    montantHT?: FloatFieldUpdateOperationsInput | number
    tva?: FloatFieldUpdateOperationsInput | number
    montantTTC?: FloatFieldUpdateOperationsInput | number
    estPaye?: BoolFieldUpdateOperationsInput | boolean
    colisId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactureCreateManyInput = {
    id?: string
    numeroFact: string
    montantHT: number
    tva?: number
    montantTTC: number
    estPaye?: boolean
    colisId: string
    createdAt?: Date | string
  }

  export type FactureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroFact?: StringFieldUpdateOperationsInput | string
    montantHT?: FloatFieldUpdateOperationsInput | number
    tva?: FloatFieldUpdateOperationsInput | number
    montantTTC?: FloatFieldUpdateOperationsInput | number
    estPaye?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroFact?: StringFieldUpdateOperationsInput | string
    montantHT?: FloatFieldUpdateOperationsInput | number
    tva?: FloatFieldUpdateOperationsInput | number
    montantTTC?: FloatFieldUpdateOperationsInput | number
    estPaye?: BoolFieldUpdateOperationsInput | boolean
    colisId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ColisListRelationFilter = {
    every?: ColisWhereInput
    some?: ColisWhereInput
    none?: ColisWhereInput
  }

  export type ColisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    adresse?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    adresse?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    adresse?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumCategoryColisFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryColis | EnumCategoryColisFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryColis[] | ListEnumCategoryColisFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoryColis[] | ListEnumCategoryColisFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryColisFilter<$PrismaModel> | $Enums.CategoryColis
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumStatutEnvoiFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutEnvoi | EnumStatutEnvoiFieldRefInput<$PrismaModel>
    in?: $Enums.StatutEnvoi[] | ListEnumStatutEnvoiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutEnvoi[] | ListEnumStatutEnvoiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutEnvoiFilter<$PrismaModel> | $Enums.StatutEnvoi
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type FactureNullableScalarRelationFilter = {
    is?: FactureWhereInput | null
    isNot?: FactureWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ColisCountOrderByAggregateInput = {
    id?: SortOrder
    codeSuivi?: SortOrder
    description?: SortOrder
    categorie?: SortOrder
    poids?: SortOrder
    prixCalculer?: SortOrder
    statut?: SortOrder
    expediteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColisAvgOrderByAggregateInput = {
    poids?: SortOrder
    prixCalculer?: SortOrder
  }

  export type ColisMaxOrderByAggregateInput = {
    id?: SortOrder
    codeSuivi?: SortOrder
    description?: SortOrder
    categorie?: SortOrder
    poids?: SortOrder
    prixCalculer?: SortOrder
    statut?: SortOrder
    expediteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColisMinOrderByAggregateInput = {
    id?: SortOrder
    codeSuivi?: SortOrder
    description?: SortOrder
    categorie?: SortOrder
    poids?: SortOrder
    prixCalculer?: SortOrder
    statut?: SortOrder
    expediteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColisSumOrderByAggregateInput = {
    poids?: SortOrder
    prixCalculer?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumCategoryColisWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryColis | EnumCategoryColisFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryColis[] | ListEnumCategoryColisFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoryColis[] | ListEnumCategoryColisFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryColisWithAggregatesFilter<$PrismaModel> | $Enums.CategoryColis
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryColisFilter<$PrismaModel>
    _max?: NestedEnumCategoryColisFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumStatutEnvoiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutEnvoi | EnumStatutEnvoiFieldRefInput<$PrismaModel>
    in?: $Enums.StatutEnvoi[] | ListEnumStatutEnvoiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutEnvoi[] | ListEnumStatutEnvoiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutEnvoiWithAggregatesFilter<$PrismaModel> | $Enums.StatutEnvoi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutEnvoiFilter<$PrismaModel>
    _max?: NestedEnumStatutEnvoiFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ColisScalarRelationFilter = {
    is?: ColisWhereInput
    isNot?: ColisWhereInput
  }

  export type FactureCountOrderByAggregateInput = {
    id?: SortOrder
    numeroFact?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    estPaye?: SortOrder
    colisId?: SortOrder
    createdAt?: SortOrder
  }

  export type FactureAvgOrderByAggregateInput = {
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
  }

  export type FactureMaxOrderByAggregateInput = {
    id?: SortOrder
    numeroFact?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    estPaye?: SortOrder
    colisId?: SortOrder
    createdAt?: SortOrder
  }

  export type FactureMinOrderByAggregateInput = {
    id?: SortOrder
    numeroFact?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    estPaye?: SortOrder
    colisId?: SortOrder
    createdAt?: SortOrder
  }

  export type FactureSumOrderByAggregateInput = {
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ColisCreateNestedManyWithoutExpediteurInput = {
    create?: XOR<ColisCreateWithoutExpediteurInput, ColisUncheckedCreateWithoutExpediteurInput> | ColisCreateWithoutExpediteurInput[] | ColisUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: ColisCreateOrConnectWithoutExpediteurInput | ColisCreateOrConnectWithoutExpediteurInput[]
    createMany?: ColisCreateManyExpediteurInputEnvelope
    connect?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
  }

  export type ColisUncheckedCreateNestedManyWithoutExpediteurInput = {
    create?: XOR<ColisCreateWithoutExpediteurInput, ColisUncheckedCreateWithoutExpediteurInput> | ColisCreateWithoutExpediteurInput[] | ColisUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: ColisCreateOrConnectWithoutExpediteurInput | ColisCreateOrConnectWithoutExpediteurInput[]
    createMany?: ColisCreateManyExpediteurInputEnvelope
    connect?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ColisUpdateManyWithoutExpediteurNestedInput = {
    create?: XOR<ColisCreateWithoutExpediteurInput, ColisUncheckedCreateWithoutExpediteurInput> | ColisCreateWithoutExpediteurInput[] | ColisUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: ColisCreateOrConnectWithoutExpediteurInput | ColisCreateOrConnectWithoutExpediteurInput[]
    upsert?: ColisUpsertWithWhereUniqueWithoutExpediteurInput | ColisUpsertWithWhereUniqueWithoutExpediteurInput[]
    createMany?: ColisCreateManyExpediteurInputEnvelope
    set?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
    disconnect?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
    delete?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
    connect?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
    update?: ColisUpdateWithWhereUniqueWithoutExpediteurInput | ColisUpdateWithWhereUniqueWithoutExpediteurInput[]
    updateMany?: ColisUpdateManyWithWhereWithoutExpediteurInput | ColisUpdateManyWithWhereWithoutExpediteurInput[]
    deleteMany?: ColisScalarWhereInput | ColisScalarWhereInput[]
  }

  export type ColisUncheckedUpdateManyWithoutExpediteurNestedInput = {
    create?: XOR<ColisCreateWithoutExpediteurInput, ColisUncheckedCreateWithoutExpediteurInput> | ColisCreateWithoutExpediteurInput[] | ColisUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: ColisCreateOrConnectWithoutExpediteurInput | ColisCreateOrConnectWithoutExpediteurInput[]
    upsert?: ColisUpsertWithWhereUniqueWithoutExpediteurInput | ColisUpsertWithWhereUniqueWithoutExpediteurInput[]
    createMany?: ColisCreateManyExpediteurInputEnvelope
    set?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
    disconnect?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
    delete?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
    connect?: ColisWhereUniqueInput | ColisWhereUniqueInput[]
    update?: ColisUpdateWithWhereUniqueWithoutExpediteurInput | ColisUpdateWithWhereUniqueWithoutExpediteurInput[]
    updateMany?: ColisUpdateManyWithWhereWithoutExpediteurInput | ColisUpdateManyWithWhereWithoutExpediteurInput[]
    deleteMany?: ColisScalarWhereInput | ColisScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutColisInput = {
    create?: XOR<ClientCreateWithoutColisInput, ClientUncheckedCreateWithoutColisInput>
    connectOrCreate?: ClientCreateOrConnectWithoutColisInput
    connect?: ClientWhereUniqueInput
  }

  export type FactureCreateNestedOneWithoutColisInput = {
    create?: XOR<FactureCreateWithoutColisInput, FactureUncheckedCreateWithoutColisInput>
    connectOrCreate?: FactureCreateOrConnectWithoutColisInput
    connect?: FactureWhereUniqueInput
  }

  export type FactureUncheckedCreateNestedOneWithoutColisInput = {
    create?: XOR<FactureCreateWithoutColisInput, FactureUncheckedCreateWithoutColisInput>
    connectOrCreate?: FactureCreateOrConnectWithoutColisInput
    connect?: FactureWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumCategoryColisFieldUpdateOperationsInput = {
    set?: $Enums.CategoryColis
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatutEnvoiFieldUpdateOperationsInput = {
    set?: $Enums.StatutEnvoi
  }

  export type ClientUpdateOneRequiredWithoutColisNestedInput = {
    create?: XOR<ClientCreateWithoutColisInput, ClientUncheckedCreateWithoutColisInput>
    connectOrCreate?: ClientCreateOrConnectWithoutColisInput
    upsert?: ClientUpsertWithoutColisInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutColisInput, ClientUpdateWithoutColisInput>, ClientUncheckedUpdateWithoutColisInput>
  }

  export type FactureUpdateOneWithoutColisNestedInput = {
    create?: XOR<FactureCreateWithoutColisInput, FactureUncheckedCreateWithoutColisInput>
    connectOrCreate?: FactureCreateOrConnectWithoutColisInput
    upsert?: FactureUpsertWithoutColisInput
    disconnect?: FactureWhereInput | boolean
    delete?: FactureWhereInput | boolean
    connect?: FactureWhereUniqueInput
    update?: XOR<XOR<FactureUpdateToOneWithWhereWithoutColisInput, FactureUpdateWithoutColisInput>, FactureUncheckedUpdateWithoutColisInput>
  }

  export type FactureUncheckedUpdateOneWithoutColisNestedInput = {
    create?: XOR<FactureCreateWithoutColisInput, FactureUncheckedCreateWithoutColisInput>
    connectOrCreate?: FactureCreateOrConnectWithoutColisInput
    upsert?: FactureUpsertWithoutColisInput
    disconnect?: FactureWhereInput | boolean
    delete?: FactureWhereInput | boolean
    connect?: FactureWhereUniqueInput
    update?: XOR<XOR<FactureUpdateToOneWithWhereWithoutColisInput, FactureUpdateWithoutColisInput>, FactureUncheckedUpdateWithoutColisInput>
  }

  export type ColisCreateNestedOneWithoutFactureInput = {
    create?: XOR<ColisCreateWithoutFactureInput, ColisUncheckedCreateWithoutFactureInput>
    connectOrCreate?: ColisCreateOrConnectWithoutFactureInput
    connect?: ColisWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ColisUpdateOneRequiredWithoutFactureNestedInput = {
    create?: XOR<ColisCreateWithoutFactureInput, ColisUncheckedCreateWithoutFactureInput>
    connectOrCreate?: ColisCreateOrConnectWithoutFactureInput
    upsert?: ColisUpsertWithoutFactureInput
    connect?: ColisWhereUniqueInput
    update?: XOR<XOR<ColisUpdateToOneWithWhereWithoutFactureInput, ColisUpdateWithoutFactureInput>, ColisUncheckedUpdateWithoutFactureInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumCategoryColisFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryColis | EnumCategoryColisFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryColis[] | ListEnumCategoryColisFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoryColis[] | ListEnumCategoryColisFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryColisFilter<$PrismaModel> | $Enums.CategoryColis
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatutEnvoiFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutEnvoi | EnumStatutEnvoiFieldRefInput<$PrismaModel>
    in?: $Enums.StatutEnvoi[] | ListEnumStatutEnvoiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutEnvoi[] | ListEnumStatutEnvoiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutEnvoiFilter<$PrismaModel> | $Enums.StatutEnvoi
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCategoryColisWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryColis | EnumCategoryColisFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryColis[] | ListEnumCategoryColisFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoryColis[] | ListEnumCategoryColisFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryColisWithAggregatesFilter<$PrismaModel> | $Enums.CategoryColis
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryColisFilter<$PrismaModel>
    _max?: NestedEnumCategoryColisFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumStatutEnvoiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutEnvoi | EnumStatutEnvoiFieldRefInput<$PrismaModel>
    in?: $Enums.StatutEnvoi[] | ListEnumStatutEnvoiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutEnvoi[] | ListEnumStatutEnvoiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutEnvoiWithAggregatesFilter<$PrismaModel> | $Enums.StatutEnvoi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutEnvoiFilter<$PrismaModel>
    _max?: NestedEnumStatutEnvoiFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ColisCreateWithoutExpediteurInput = {
    id?: string
    codeSuivi: string
    description?: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut?: $Enums.StatutEnvoi
    createdAt?: Date | string
    updatedAt?: Date | string
    facture?: FactureCreateNestedOneWithoutColisInput
  }

  export type ColisUncheckedCreateWithoutExpediteurInput = {
    id?: string
    codeSuivi: string
    description?: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut?: $Enums.StatutEnvoi
    createdAt?: Date | string
    updatedAt?: Date | string
    facture?: FactureUncheckedCreateNestedOneWithoutColisInput
  }

  export type ColisCreateOrConnectWithoutExpediteurInput = {
    where: ColisWhereUniqueInput
    create: XOR<ColisCreateWithoutExpediteurInput, ColisUncheckedCreateWithoutExpediteurInput>
  }

  export type ColisCreateManyExpediteurInputEnvelope = {
    data: ColisCreateManyExpediteurInput | ColisCreateManyExpediteurInput[]
    skipDuplicates?: boolean
  }

  export type ColisUpsertWithWhereUniqueWithoutExpediteurInput = {
    where: ColisWhereUniqueInput
    update: XOR<ColisUpdateWithoutExpediteurInput, ColisUncheckedUpdateWithoutExpediteurInput>
    create: XOR<ColisCreateWithoutExpediteurInput, ColisUncheckedCreateWithoutExpediteurInput>
  }

  export type ColisUpdateWithWhereUniqueWithoutExpediteurInput = {
    where: ColisWhereUniqueInput
    data: XOR<ColisUpdateWithoutExpediteurInput, ColisUncheckedUpdateWithoutExpediteurInput>
  }

  export type ColisUpdateManyWithWhereWithoutExpediteurInput = {
    where: ColisScalarWhereInput
    data: XOR<ColisUpdateManyMutationInput, ColisUncheckedUpdateManyWithoutExpediteurInput>
  }

  export type ColisScalarWhereInput = {
    AND?: ColisScalarWhereInput | ColisScalarWhereInput[]
    OR?: ColisScalarWhereInput[]
    NOT?: ColisScalarWhereInput | ColisScalarWhereInput[]
    id?: StringFilter<"Colis"> | string
    codeSuivi?: StringFilter<"Colis"> | string
    description?: StringNullableFilter<"Colis"> | string | null
    categorie?: EnumCategoryColisFilter<"Colis"> | $Enums.CategoryColis
    poids?: FloatFilter<"Colis"> | number
    prixCalculer?: FloatFilter<"Colis"> | number
    statut?: EnumStatutEnvoiFilter<"Colis"> | $Enums.StatutEnvoi
    expediteurId?: StringFilter<"Colis"> | string
    createdAt?: DateTimeFilter<"Colis"> | Date | string
    updatedAt?: DateTimeFilter<"Colis"> | Date | string
  }

  export type ClientCreateWithoutColisInput = {
    id?: string
    nom: string
    email: string
    telephone: string
    adresse: string
    createdAt?: Date | string
  }

  export type ClientUncheckedCreateWithoutColisInput = {
    id?: string
    nom: string
    email: string
    telephone: string
    adresse: string
    createdAt?: Date | string
  }

  export type ClientCreateOrConnectWithoutColisInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutColisInput, ClientUncheckedCreateWithoutColisInput>
  }

  export type FactureCreateWithoutColisInput = {
    id?: string
    numeroFact: string
    montantHT: number
    tva?: number
    montantTTC: number
    estPaye?: boolean
    createdAt?: Date | string
  }

  export type FactureUncheckedCreateWithoutColisInput = {
    id?: string
    numeroFact: string
    montantHT: number
    tva?: number
    montantTTC: number
    estPaye?: boolean
    createdAt?: Date | string
  }

  export type FactureCreateOrConnectWithoutColisInput = {
    where: FactureWhereUniqueInput
    create: XOR<FactureCreateWithoutColisInput, FactureUncheckedCreateWithoutColisInput>
  }

  export type ClientUpsertWithoutColisInput = {
    update: XOR<ClientUpdateWithoutColisInput, ClientUncheckedUpdateWithoutColisInput>
    create: XOR<ClientCreateWithoutColisInput, ClientUncheckedCreateWithoutColisInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutColisInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutColisInput, ClientUncheckedUpdateWithoutColisInput>
  }

  export type ClientUpdateWithoutColisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateWithoutColisInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactureUpsertWithoutColisInput = {
    update: XOR<FactureUpdateWithoutColisInput, FactureUncheckedUpdateWithoutColisInput>
    create: XOR<FactureCreateWithoutColisInput, FactureUncheckedCreateWithoutColisInput>
    where?: FactureWhereInput
  }

  export type FactureUpdateToOneWithWhereWithoutColisInput = {
    where?: FactureWhereInput
    data: XOR<FactureUpdateWithoutColisInput, FactureUncheckedUpdateWithoutColisInput>
  }

  export type FactureUpdateWithoutColisInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroFact?: StringFieldUpdateOperationsInput | string
    montantHT?: FloatFieldUpdateOperationsInput | number
    tva?: FloatFieldUpdateOperationsInput | number
    montantTTC?: FloatFieldUpdateOperationsInput | number
    estPaye?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactureUncheckedUpdateWithoutColisInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroFact?: StringFieldUpdateOperationsInput | string
    montantHT?: FloatFieldUpdateOperationsInput | number
    tva?: FloatFieldUpdateOperationsInput | number
    montantTTC?: FloatFieldUpdateOperationsInput | number
    estPaye?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColisCreateWithoutFactureInput = {
    id?: string
    codeSuivi: string
    description?: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut?: $Enums.StatutEnvoi
    createdAt?: Date | string
    updatedAt?: Date | string
    expediteur: ClientCreateNestedOneWithoutColisInput
  }

  export type ColisUncheckedCreateWithoutFactureInput = {
    id?: string
    codeSuivi: string
    description?: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut?: $Enums.StatutEnvoi
    expediteurId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColisCreateOrConnectWithoutFactureInput = {
    where: ColisWhereUniqueInput
    create: XOR<ColisCreateWithoutFactureInput, ColisUncheckedCreateWithoutFactureInput>
  }

  export type ColisUpsertWithoutFactureInput = {
    update: XOR<ColisUpdateWithoutFactureInput, ColisUncheckedUpdateWithoutFactureInput>
    create: XOR<ColisCreateWithoutFactureInput, ColisUncheckedCreateWithoutFactureInput>
    where?: ColisWhereInput
  }

  export type ColisUpdateToOneWithWhereWithoutFactureInput = {
    where?: ColisWhereInput
    data: XOR<ColisUpdateWithoutFactureInput, ColisUncheckedUpdateWithoutFactureInput>
  }

  export type ColisUpdateWithoutFactureInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expediteur?: ClientUpdateOneRequiredWithoutColisNestedInput
  }

  export type ColisUncheckedUpdateWithoutFactureInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    expediteurId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColisCreateManyExpediteurInput = {
    id?: string
    codeSuivi: string
    description?: string | null
    categorie: $Enums.CategoryColis
    poids: number
    prixCalculer: number
    statut?: $Enums.StatutEnvoi
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColisUpdateWithoutExpediteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    facture?: FactureUpdateOneWithoutColisNestedInput
  }

  export type ColisUncheckedUpdateWithoutExpediteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    facture?: FactureUncheckedUpdateOneWithoutColisNestedInput
  }

  export type ColisUncheckedUpdateManyWithoutExpediteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeSuivi?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categorie?: EnumCategoryColisFieldUpdateOperationsInput | $Enums.CategoryColis
    poids?: FloatFieldUpdateOperationsInput | number
    prixCalculer?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutEnvoiFieldUpdateOperationsInput | $Enums.StatutEnvoi
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}