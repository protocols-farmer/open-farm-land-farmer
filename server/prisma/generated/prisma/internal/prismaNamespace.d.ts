import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
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
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly RefreshToken: "RefreshToken";
    readonly UserSettings: "UserSettings";
    readonly Follow: "Follow";
    readonly Post: "Post";
    readonly GuideStep: "GuideStep";
    readonly GuideSection: "GuideSection";
    readonly PostImage: "PostImage";
    readonly Tag: "Tag";
    readonly PostTag: "PostTag";
    readonly ProjectUpdate: "ProjectUpdate";
    readonly Update: "Update";
    readonly Opportunity: "Opportunity";
    readonly OpportunityTag: "OpportunityTag";
    readonly Comment: "Comment";
    readonly PostLike: "PostLike";
    readonly PostSave: "PostSave";
    readonly PostShare: "PostShare";
    readonly CommentUserReaction: "CommentUserReaction";
    readonly Notification: "Notification";
    readonly PostView: "PostView";
    readonly VisitorSession: "VisitorSession";
    readonly PageViewLog: "PageViewLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "refreshToken" | "userSettings" | "follow" | "post" | "guideStep" | "guideSection" | "postImage" | "tag" | "postTag" | "projectUpdate" | "update" | "opportunity" | "opportunityTag" | "comment" | "postLike" | "postSave" | "postShare" | "commentUserReaction" | "notification" | "postView" | "visitorSession" | "pageViewLog";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        UserSettings: {
            payload: Prisma.$UserSettingsPayload<ExtArgs>;
            fields: Prisma.UserSettingsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserSettingsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserSettingsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>;
                };
                findFirst: {
                    args: Prisma.UserSettingsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserSettingsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>;
                };
                findMany: {
                    args: Prisma.UserSettingsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>[];
                };
                create: {
                    args: Prisma.UserSettingsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>;
                };
                createMany: {
                    args: Prisma.UserSettingsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserSettingsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>[];
                };
                delete: {
                    args: Prisma.UserSettingsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>;
                };
                update: {
                    args: Prisma.UserSettingsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>;
                };
                deleteMany: {
                    args: Prisma.UserSettingsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserSettingsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserSettingsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>[];
                };
                upsert: {
                    args: Prisma.UserSettingsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingsPayload>;
                };
                aggregate: {
                    args: Prisma.UserSettingsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserSettings>;
                };
                groupBy: {
                    args: Prisma.UserSettingsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserSettingsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserSettingsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserSettingsCountAggregateOutputType> | number;
                };
            };
        };
        Follow: {
            payload: Prisma.$FollowPayload<ExtArgs>;
            fields: Prisma.FollowFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FollowFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                findFirst: {
                    args: Prisma.FollowFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                findMany: {
                    args: Prisma.FollowFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                create: {
                    args: Prisma.FollowCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                createMany: {
                    args: Prisma.FollowCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                delete: {
                    args: Prisma.FollowDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                update: {
                    args: Prisma.FollowUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                deleteMany: {
                    args: Prisma.FollowDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FollowUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                upsert: {
                    args: Prisma.FollowUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                aggregate: {
                    args: Prisma.FollowAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFollow>;
                };
                groupBy: {
                    args: Prisma.FollowGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FollowGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FollowCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FollowCountAggregateOutputType> | number;
                };
            };
        };
        Post: {
            payload: Prisma.$PostPayload<ExtArgs>;
            fields: Prisma.PostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                findFirst: {
                    args: Prisma.PostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                findMany: {
                    args: Prisma.PostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>[];
                };
                create: {
                    args: Prisma.PostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                createMany: {
                    args: Prisma.PostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>[];
                };
                delete: {
                    args: Prisma.PostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                update: {
                    args: Prisma.PostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                deleteMany: {
                    args: Prisma.PostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>[];
                };
                upsert: {
                    args: Prisma.PostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                aggregate: {
                    args: Prisma.PostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePost>;
                };
                groupBy: {
                    args: Prisma.PostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostCountAggregateOutputType> | number;
                };
            };
        };
        GuideStep: {
            payload: Prisma.$GuideStepPayload<ExtArgs>;
            fields: Prisma.GuideStepFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GuideStepFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GuideStepFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>;
                };
                findFirst: {
                    args: Prisma.GuideStepFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GuideStepFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>;
                };
                findMany: {
                    args: Prisma.GuideStepFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>[];
                };
                create: {
                    args: Prisma.GuideStepCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>;
                };
                createMany: {
                    args: Prisma.GuideStepCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GuideStepCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>[];
                };
                delete: {
                    args: Prisma.GuideStepDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>;
                };
                update: {
                    args: Prisma.GuideStepUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>;
                };
                deleteMany: {
                    args: Prisma.GuideStepDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GuideStepUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GuideStepUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>[];
                };
                upsert: {
                    args: Prisma.GuideStepUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideStepPayload>;
                };
                aggregate: {
                    args: Prisma.GuideStepAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGuideStep>;
                };
                groupBy: {
                    args: Prisma.GuideStepGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GuideStepGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GuideStepCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GuideStepCountAggregateOutputType> | number;
                };
            };
        };
        GuideSection: {
            payload: Prisma.$GuideSectionPayload<ExtArgs>;
            fields: Prisma.GuideSectionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GuideSectionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GuideSectionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>;
                };
                findFirst: {
                    args: Prisma.GuideSectionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GuideSectionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>;
                };
                findMany: {
                    args: Prisma.GuideSectionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>[];
                };
                create: {
                    args: Prisma.GuideSectionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>;
                };
                createMany: {
                    args: Prisma.GuideSectionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GuideSectionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>[];
                };
                delete: {
                    args: Prisma.GuideSectionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>;
                };
                update: {
                    args: Prisma.GuideSectionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>;
                };
                deleteMany: {
                    args: Prisma.GuideSectionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GuideSectionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GuideSectionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>[];
                };
                upsert: {
                    args: Prisma.GuideSectionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuideSectionPayload>;
                };
                aggregate: {
                    args: Prisma.GuideSectionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGuideSection>;
                };
                groupBy: {
                    args: Prisma.GuideSectionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GuideSectionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GuideSectionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GuideSectionCountAggregateOutputType> | number;
                };
            };
        };
        PostImage: {
            payload: Prisma.$PostImagePayload<ExtArgs>;
            fields: Prisma.PostImageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostImageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostImageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>;
                };
                findFirst: {
                    args: Prisma.PostImageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostImageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>;
                };
                findMany: {
                    args: Prisma.PostImageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>[];
                };
                create: {
                    args: Prisma.PostImageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>;
                };
                createMany: {
                    args: Prisma.PostImageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostImageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>[];
                };
                delete: {
                    args: Prisma.PostImageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>;
                };
                update: {
                    args: Prisma.PostImageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>;
                };
                deleteMany: {
                    args: Prisma.PostImageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostImageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostImageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>[];
                };
                upsert: {
                    args: Prisma.PostImageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostImagePayload>;
                };
                aggregate: {
                    args: Prisma.PostImageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePostImage>;
                };
                groupBy: {
                    args: Prisma.PostImageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostImageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostImageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostImageCountAggregateOutputType> | number;
                };
            };
        };
        Tag: {
            payload: Prisma.$TagPayload<ExtArgs>;
            fields: Prisma.TagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                findFirst: {
                    args: Prisma.TagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                findMany: {
                    args: Prisma.TagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                create: {
                    args: Prisma.TagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                createMany: {
                    args: Prisma.TagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                delete: {
                    args: Prisma.TagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                update: {
                    args: Prisma.TagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                deleteMany: {
                    args: Prisma.TagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                upsert: {
                    args: Prisma.TagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                aggregate: {
                    args: Prisma.TagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTag>;
                };
                groupBy: {
                    args: Prisma.TagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TagCountAggregateOutputType> | number;
                };
            };
        };
        PostTag: {
            payload: Prisma.$PostTagPayload<ExtArgs>;
            fields: Prisma.PostTagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostTagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostTagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                findFirst: {
                    args: Prisma.PostTagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostTagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                findMany: {
                    args: Prisma.PostTagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>[];
                };
                create: {
                    args: Prisma.PostTagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                createMany: {
                    args: Prisma.PostTagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostTagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>[];
                };
                delete: {
                    args: Prisma.PostTagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                update: {
                    args: Prisma.PostTagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                deleteMany: {
                    args: Prisma.PostTagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostTagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostTagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>[];
                };
                upsert: {
                    args: Prisma.PostTagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                aggregate: {
                    args: Prisma.PostTagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePostTag>;
                };
                groupBy: {
                    args: Prisma.PostTagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostTagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostTagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostTagCountAggregateOutputType> | number;
                };
            };
        };
        ProjectUpdate: {
            payload: Prisma.$ProjectUpdatePayload<ExtArgs>;
            fields: Prisma.ProjectUpdateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectUpdateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectUpdateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>;
                };
                findFirst: {
                    args: Prisma.ProjectUpdateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectUpdateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>;
                };
                findMany: {
                    args: Prisma.ProjectUpdateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>[];
                };
                create: {
                    args: Prisma.ProjectUpdateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>;
                };
                createMany: {
                    args: Prisma.ProjectUpdateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProjectUpdateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>[];
                };
                delete: {
                    args: Prisma.ProjectUpdateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>;
                };
                update: {
                    args: Prisma.ProjectUpdateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectUpdateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectUpdateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProjectUpdateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>[];
                };
                upsert: {
                    args: Prisma.ProjectUpdateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectUpdatePayload>;
                };
                aggregate: {
                    args: Prisma.ProjectUpdateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProjectUpdate>;
                };
                groupBy: {
                    args: Prisma.ProjectUpdateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectUpdateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectUpdateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectUpdateCountAggregateOutputType> | number;
                };
            };
        };
        Update: {
            payload: Prisma.$UpdatePayload<ExtArgs>;
            fields: Prisma.UpdateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UpdateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UpdateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>;
                };
                findFirst: {
                    args: Prisma.UpdateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UpdateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>;
                };
                findMany: {
                    args: Prisma.UpdateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>[];
                };
                create: {
                    args: Prisma.UpdateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>;
                };
                createMany: {
                    args: Prisma.UpdateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UpdateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>[];
                };
                delete: {
                    args: Prisma.UpdateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>;
                };
                update: {
                    args: Prisma.UpdateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>;
                };
                deleteMany: {
                    args: Prisma.UpdateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UpdateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UpdateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>[];
                };
                upsert: {
                    args: Prisma.UpdateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UpdatePayload>;
                };
                aggregate: {
                    args: Prisma.UpdateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUpdate>;
                };
                groupBy: {
                    args: Prisma.UpdateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UpdateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UpdateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UpdateCountAggregateOutputType> | number;
                };
            };
        };
        Opportunity: {
            payload: Prisma.$OpportunityPayload<ExtArgs>;
            fields: Prisma.OpportunityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OpportunityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OpportunityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                findFirst: {
                    args: Prisma.OpportunityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OpportunityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                findMany: {
                    args: Prisma.OpportunityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>[];
                };
                create: {
                    args: Prisma.OpportunityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                createMany: {
                    args: Prisma.OpportunityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OpportunityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>[];
                };
                delete: {
                    args: Prisma.OpportunityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                update: {
                    args: Prisma.OpportunityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                deleteMany: {
                    args: Prisma.OpportunityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OpportunityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OpportunityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>[];
                };
                upsert: {
                    args: Prisma.OpportunityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                aggregate: {
                    args: Prisma.OpportunityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOpportunity>;
                };
                groupBy: {
                    args: Prisma.OpportunityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OpportunityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OpportunityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OpportunityCountAggregateOutputType> | number;
                };
            };
        };
        OpportunityTag: {
            payload: Prisma.$OpportunityTagPayload<ExtArgs>;
            fields: Prisma.OpportunityTagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OpportunityTagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OpportunityTagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>;
                };
                findFirst: {
                    args: Prisma.OpportunityTagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OpportunityTagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>;
                };
                findMany: {
                    args: Prisma.OpportunityTagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>[];
                };
                create: {
                    args: Prisma.OpportunityTagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>;
                };
                createMany: {
                    args: Prisma.OpportunityTagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OpportunityTagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>[];
                };
                delete: {
                    args: Prisma.OpportunityTagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>;
                };
                update: {
                    args: Prisma.OpportunityTagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>;
                };
                deleteMany: {
                    args: Prisma.OpportunityTagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OpportunityTagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OpportunityTagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>[];
                };
                upsert: {
                    args: Prisma.OpportunityTagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityTagPayload>;
                };
                aggregate: {
                    args: Prisma.OpportunityTagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOpportunityTag>;
                };
                groupBy: {
                    args: Prisma.OpportunityTagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OpportunityTagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OpportunityTagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OpportunityTagCountAggregateOutputType> | number;
                };
            };
        };
        Comment: {
            payload: Prisma.$CommentPayload<ExtArgs>;
            fields: Prisma.CommentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                findFirst: {
                    args: Prisma.CommentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                findMany: {
                    args: Prisma.CommentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                create: {
                    args: Prisma.CommentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                createMany: {
                    args: Prisma.CommentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                delete: {
                    args: Prisma.CommentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                update: {
                    args: Prisma.CommentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                deleteMany: {
                    args: Prisma.CommentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                upsert: {
                    args: Prisma.CommentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                aggregate: {
                    args: Prisma.CommentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateComment>;
                };
                groupBy: {
                    args: Prisma.CommentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentCountAggregateOutputType> | number;
                };
            };
        };
        PostLike: {
            payload: Prisma.$PostLikePayload<ExtArgs>;
            fields: Prisma.PostLikeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostLikeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostLikeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>;
                };
                findFirst: {
                    args: Prisma.PostLikeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostLikeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>;
                };
                findMany: {
                    args: Prisma.PostLikeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>[];
                };
                create: {
                    args: Prisma.PostLikeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>;
                };
                createMany: {
                    args: Prisma.PostLikeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostLikeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>[];
                };
                delete: {
                    args: Prisma.PostLikeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>;
                };
                update: {
                    args: Prisma.PostLikeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>;
                };
                deleteMany: {
                    args: Prisma.PostLikeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostLikeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostLikeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>[];
                };
                upsert: {
                    args: Prisma.PostLikeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostLikePayload>;
                };
                aggregate: {
                    args: Prisma.PostLikeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePostLike>;
                };
                groupBy: {
                    args: Prisma.PostLikeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostLikeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostLikeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostLikeCountAggregateOutputType> | number;
                };
            };
        };
        PostSave: {
            payload: Prisma.$PostSavePayload<ExtArgs>;
            fields: Prisma.PostSaveFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostSaveFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostSaveFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>;
                };
                findFirst: {
                    args: Prisma.PostSaveFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostSaveFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>;
                };
                findMany: {
                    args: Prisma.PostSaveFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>[];
                };
                create: {
                    args: Prisma.PostSaveCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>;
                };
                createMany: {
                    args: Prisma.PostSaveCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostSaveCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>[];
                };
                delete: {
                    args: Prisma.PostSaveDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>;
                };
                update: {
                    args: Prisma.PostSaveUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>;
                };
                deleteMany: {
                    args: Prisma.PostSaveDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostSaveUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostSaveUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>[];
                };
                upsert: {
                    args: Prisma.PostSaveUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSavePayload>;
                };
                aggregate: {
                    args: Prisma.PostSaveAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePostSave>;
                };
                groupBy: {
                    args: Prisma.PostSaveGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostSaveGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostSaveCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostSaveCountAggregateOutputType> | number;
                };
            };
        };
        PostShare: {
            payload: Prisma.$PostSharePayload<ExtArgs>;
            fields: Prisma.PostShareFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostShareFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostShareFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>;
                };
                findFirst: {
                    args: Prisma.PostShareFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostShareFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>;
                };
                findMany: {
                    args: Prisma.PostShareFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>[];
                };
                create: {
                    args: Prisma.PostShareCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>;
                };
                createMany: {
                    args: Prisma.PostShareCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostShareCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>[];
                };
                delete: {
                    args: Prisma.PostShareDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>;
                };
                update: {
                    args: Prisma.PostShareUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>;
                };
                deleteMany: {
                    args: Prisma.PostShareDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostShareUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostShareUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>[];
                };
                upsert: {
                    args: Prisma.PostShareUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostSharePayload>;
                };
                aggregate: {
                    args: Prisma.PostShareAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePostShare>;
                };
                groupBy: {
                    args: Prisma.PostShareGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostShareGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostShareCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostShareCountAggregateOutputType> | number;
                };
            };
        };
        CommentUserReaction: {
            payload: Prisma.$CommentUserReactionPayload<ExtArgs>;
            fields: Prisma.CommentUserReactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommentUserReactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommentUserReactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>;
                };
                findFirst: {
                    args: Prisma.CommentUserReactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommentUserReactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>;
                };
                findMany: {
                    args: Prisma.CommentUserReactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>[];
                };
                create: {
                    args: Prisma.CommentUserReactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>;
                };
                createMany: {
                    args: Prisma.CommentUserReactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommentUserReactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>[];
                };
                delete: {
                    args: Prisma.CommentUserReactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>;
                };
                update: {
                    args: Prisma.CommentUserReactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>;
                };
                deleteMany: {
                    args: Prisma.CommentUserReactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommentUserReactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommentUserReactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>[];
                };
                upsert: {
                    args: Prisma.CommentUserReactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentUserReactionPayload>;
                };
                aggregate: {
                    args: Prisma.CommentUserReactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommentUserReaction>;
                };
                groupBy: {
                    args: Prisma.CommentUserReactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentUserReactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommentUserReactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentUserReactionCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        PostView: {
            payload: Prisma.$PostViewPayload<ExtArgs>;
            fields: Prisma.PostViewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostViewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostViewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>;
                };
                findFirst: {
                    args: Prisma.PostViewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostViewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>;
                };
                findMany: {
                    args: Prisma.PostViewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>[];
                };
                create: {
                    args: Prisma.PostViewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>;
                };
                createMany: {
                    args: Prisma.PostViewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostViewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>[];
                };
                delete: {
                    args: Prisma.PostViewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>;
                };
                update: {
                    args: Prisma.PostViewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>;
                };
                deleteMany: {
                    args: Prisma.PostViewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostViewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostViewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>[];
                };
                upsert: {
                    args: Prisma.PostViewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostViewPayload>;
                };
                aggregate: {
                    args: Prisma.PostViewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePostView>;
                };
                groupBy: {
                    args: Prisma.PostViewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostViewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostViewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostViewCountAggregateOutputType> | number;
                };
            };
        };
        VisitorSession: {
            payload: Prisma.$VisitorSessionPayload<ExtArgs>;
            fields: Prisma.VisitorSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VisitorSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VisitorSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>;
                };
                findFirst: {
                    args: Prisma.VisitorSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VisitorSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>;
                };
                findMany: {
                    args: Prisma.VisitorSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>[];
                };
                create: {
                    args: Prisma.VisitorSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>;
                };
                createMany: {
                    args: Prisma.VisitorSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VisitorSessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>[];
                };
                delete: {
                    args: Prisma.VisitorSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>;
                };
                update: {
                    args: Prisma.VisitorSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.VisitorSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VisitorSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VisitorSessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>[];
                };
                upsert: {
                    args: Prisma.VisitorSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitorSessionPayload>;
                };
                aggregate: {
                    args: Prisma.VisitorSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVisitorSession>;
                };
                groupBy: {
                    args: Prisma.VisitorSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VisitorSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VisitorSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VisitorSessionCountAggregateOutputType> | number;
                };
            };
        };
        PageViewLog: {
            payload: Prisma.$PageViewLogPayload<ExtArgs>;
            fields: Prisma.PageViewLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PageViewLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PageViewLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>;
                };
                findFirst: {
                    args: Prisma.PageViewLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PageViewLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>;
                };
                findMany: {
                    args: Prisma.PageViewLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>[];
                };
                create: {
                    args: Prisma.PageViewLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>;
                };
                createMany: {
                    args: Prisma.PageViewLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PageViewLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>[];
                };
                delete: {
                    args: Prisma.PageViewLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>;
                };
                update: {
                    args: Prisma.PageViewLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>;
                };
                deleteMany: {
                    args: Prisma.PageViewLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PageViewLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PageViewLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>[];
                };
                upsert: {
                    args: Prisma.PageViewLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PageViewLogPayload>;
                };
                aggregate: {
                    args: Prisma.PageViewLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePageViewLog>;
                };
                groupBy: {
                    args: Prisma.PageViewLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PageViewLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PageViewLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PageViewLogCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly username: "username";
    readonly email: "email";
    readonly hashedPassword: "hashedPassword";
    readonly bio: "bio";
    readonly title: "title";
    readonly location: "location";
    readonly profileImage: "profileImage";
    readonly bannerImage: "bannerImage";
    readonly joinedAt: "joinedAt";
    readonly updatedAt: "updatedAt";
    readonly status: "status";
    readonly systemRole: "systemRole";
    readonly deactivatedAt: "deactivatedAt";
    readonly twitterUrl: "twitterUrl";
    readonly githubUrl: "githubUrl";
    readonly linkedinUrl: "linkedinUrl";
    readonly websiteUrl: "websiteUrl";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly jti: "jti";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly revoked: "revoked";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const UserSettingsScalarFieldEnum: {
    readonly id: "id";
    readonly theme: "theme";
    readonly notificationsEnabled: "notificationsEnabled";
    readonly emailMarketing: "emailMarketing";
    readonly emailSocial: "emailSocial";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
};
export type UserSettingsScalarFieldEnum = (typeof UserSettingsScalarFieldEnum)[keyof typeof UserSettingsScalarFieldEnum];
export declare const FollowScalarFieldEnum: {
    readonly followerId: "followerId";
    readonly followingId: "followingId";
    readonly createdAt: "createdAt";
};
export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum];
export declare const PostScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly content: "content";
    readonly category: "category";
    readonly isQuestion: "isQuestion";
    readonly isResolved: "isResolved";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly externalLink: "externalLink";
    readonly githubLink: "githubLink";
    readonly upvotesCount: "upvotesCount";
    readonly likesCount: "likesCount";
    readonly viewsCount: "viewsCount";
    readonly savedCount: "savedCount";
    readonly sharesCount: "sharesCount";
    readonly commentsCount: "commentsCount";
    readonly authorId: "authorId";
};
export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum];
export declare const GuideStepScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly order: "order";
    readonly postId: "postId";
};
export type GuideStepScalarFieldEnum = (typeof GuideStepScalarFieldEnum)[keyof typeof GuideStepScalarFieldEnum];
export declare const GuideSectionScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly content: "content";
    readonly videoUrl: "videoUrl";
    readonly imageUrl: "imageUrl";
    readonly imagePublicId: "imagePublicId";
    readonly order: "order";
    readonly stepId: "stepId";
};
export type GuideSectionScalarFieldEnum = (typeof GuideSectionScalarFieldEnum)[keyof typeof GuideSectionScalarFieldEnum];
export declare const PostImageScalarFieldEnum: {
    readonly id: "id";
    readonly url: "url";
    readonly publicId: "publicId";
    readonly altText: "altText";
    readonly order: "order";
    readonly postId: "postId";
};
export type PostImageScalarFieldEnum = (typeof PostImageScalarFieldEnum)[keyof typeof PostImageScalarFieldEnum];
export declare const TagScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum];
export declare const PostTagScalarFieldEnum: {
    readonly postId: "postId";
    readonly tagId: "tagId";
};
export type PostTagScalarFieldEnum = (typeof PostTagScalarFieldEnum)[keyof typeof PostTagScalarFieldEnum];
export declare const ProjectUpdateScalarFieldEnum: {
    readonly id: "id";
    readonly version: "version";
    readonly date: "date";
    readonly title: "title";
    readonly description: "description";
    readonly category: "category";
    readonly imageUrl: "imageUrl";
    readonly imagePublicId: "imagePublicId";
    readonly createdAt: "createdAt";
    readonly postId: "postId";
};
export type ProjectUpdateScalarFieldEnum = (typeof ProjectUpdateScalarFieldEnum)[keyof typeof ProjectUpdateScalarFieldEnum];
export declare const UpdateScalarFieldEnum: {
    readonly id: "id";
    readonly version: "version";
    readonly title: "title";
    readonly category: "category";
    readonly content: "content";
    readonly publishedAt: "publishedAt";
    readonly authorId: "authorId";
};
export type UpdateScalarFieldEnum = (typeof UpdateScalarFieldEnum)[keyof typeof UpdateScalarFieldEnum];
export declare const OpportunityScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly companyName: "companyName";
    readonly companyLogo: "companyLogo";
    readonly location: "location";
    readonly type: "type";
    readonly isRemote: "isRemote";
    readonly imageUrl: "imageUrl";
    readonly imagePublicId: "imagePublicId";
    readonly salaryRange: "salaryRange";
    readonly fullDescription: "fullDescription";
    readonly responsibilities: "responsibilities";
    readonly qualifications: "qualifications";
    readonly applyUrl: "applyUrl";
    readonly postedAt: "postedAt";
    readonly posterId: "posterId";
};
export type OpportunityScalarFieldEnum = (typeof OpportunityScalarFieldEnum)[keyof typeof OpportunityScalarFieldEnum];
export declare const OpportunityTagScalarFieldEnum: {
    readonly opportunityId: "opportunityId";
    readonly tagId: "tagId";
};
export type OpportunityTagScalarFieldEnum = (typeof OpportunityTagScalarFieldEnum)[keyof typeof OpportunityTagScalarFieldEnum];
export declare const CommentScalarFieldEnum: {
    readonly id: "id";
    readonly text: "text";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly level: "level";
    readonly likesCount: "likesCount";
    readonly dislikesCount: "dislikesCount";
    readonly postId: "postId";
    readonly authorId: "authorId";
    readonly parentId: "parentId";
};
export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];
export declare const PostLikeScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly userId: "userId";
    readonly postId: "postId";
};
export type PostLikeScalarFieldEnum = (typeof PostLikeScalarFieldEnum)[keyof typeof PostLikeScalarFieldEnum];
export declare const PostSaveScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly userId: "userId";
    readonly postId: "postId";
};
export type PostSaveScalarFieldEnum = (typeof PostSaveScalarFieldEnum)[keyof typeof PostSaveScalarFieldEnum];
export declare const PostShareScalarFieldEnum: {
    readonly id: "id";
    readonly platform: "platform";
    readonly createdAt: "createdAt";
    readonly postId: "postId";
    readonly sharerId: "sharerId";
};
export type PostShareScalarFieldEnum = (typeof PostShareScalarFieldEnum)[keyof typeof PostShareScalarFieldEnum];
export declare const CommentUserReactionScalarFieldEnum: {
    readonly id: "id";
    readonly reaction: "reaction";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
    readonly commentId: "commentId";
};
export type CommentUserReactionScalarFieldEnum = (typeof CommentUserReactionScalarFieldEnum)[keyof typeof CommentUserReactionScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly read: "read";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly recipientId: "recipientId";
    readonly senderId: "senderId";
    readonly postId: "postId";
    readonly commentId: "commentId";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const PostViewScalarFieldEnum: {
    readonly id: "id";
    readonly firstViewedAt: "firstViewedAt";
    readonly lastViewedAt: "lastViewedAt";
    readonly viewCountByUser: "viewCountByUser";
    readonly userId: "userId";
    readonly postId: "postId";
    readonly anonymousVisitorId: "anonymousVisitorId";
};
export type PostViewScalarFieldEnum = (typeof PostViewScalarFieldEnum)[keyof typeof PostViewScalarFieldEnum];
export declare const VisitorSessionScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly initialIpAddress: "initialIpAddress";
    readonly initialUserAgent: "initialUserAgent";
    readonly initialPath: "initialPath";
    readonly userId: "userId";
};
export type VisitorSessionScalarFieldEnum = (typeof VisitorSessionScalarFieldEnum)[keyof typeof VisitorSessionScalarFieldEnum];
export declare const PageViewLogScalarFieldEnum: {
    readonly id: "id";
    readonly path: "path";
    readonly createdAt: "createdAt";
    readonly sessionId: "sessionId";
};
export type PageViewLogScalarFieldEnum = (typeof PageViewLogScalarFieldEnum)[keyof typeof PageViewLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>;
export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>;
export type EnumSystemRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SystemRole'>;
export type ListEnumSystemRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SystemRole[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumThemePreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ThemePreference'>;
export type ListEnumThemePreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ThemePreference[]'>;
export type EnumPostCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostCategory'>;
export type ListEnumPostCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostCategory[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumProjectUpdateCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectUpdateCategory'>;
export type ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectUpdateCategory[]'>;
export type EnumUpdateCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UpdateCategory'>;
export type ListEnumUpdateCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UpdateCategory[]'>;
export type EnumOpportunityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OpportunityType'>;
export type ListEnumOpportunityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OpportunityType[]'>;
export type EnumSharePlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SharePlatform'>;
export type ListEnumSharePlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SharePlatform[]'>;
export type EnumCommentReactionStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommentReactionState'>;
export type ListEnumCommentReactionStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommentReactionState[]'>;
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    userSettings?: Prisma.UserSettingsOmit;
    follow?: Prisma.FollowOmit;
    post?: Prisma.PostOmit;
    guideStep?: Prisma.GuideStepOmit;
    guideSection?: Prisma.GuideSectionOmit;
    postImage?: Prisma.PostImageOmit;
    tag?: Prisma.TagOmit;
    postTag?: Prisma.PostTagOmit;
    projectUpdate?: Prisma.ProjectUpdateOmit;
    update?: Prisma.UpdateOmit;
    opportunity?: Prisma.OpportunityOmit;
    opportunityTag?: Prisma.OpportunityTagOmit;
    comment?: Prisma.CommentOmit;
    postLike?: Prisma.PostLikeOmit;
    postSave?: Prisma.PostSaveOmit;
    postShare?: Prisma.PostShareOmit;
    commentUserReaction?: Prisma.CommentUserReactionOmit;
    notification?: Prisma.NotificationOmit;
    postView?: Prisma.PostViewOmit;
    visitorSession?: Prisma.VisitorSessionOmit;
    pageViewLog?: Prisma.PageViewLogOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map