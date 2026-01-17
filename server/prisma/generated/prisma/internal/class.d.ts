import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userSettings(): Prisma.UserSettingsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get follow(): Prisma.FollowDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get post(): Prisma.PostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get guideStep(): Prisma.GuideStepDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get guideSection(): Prisma.GuideSectionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get postImage(): Prisma.PostImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tag(): Prisma.TagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get postTag(): Prisma.PostTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get projectUpdate(): Prisma.ProjectUpdateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get update(): Prisma.UpdateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get opportunity(): Prisma.OpportunityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get opportunityTag(): Prisma.OpportunityTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get comment(): Prisma.CommentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get postLike(): Prisma.PostLikeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get postSave(): Prisma.PostSaveDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get postShare(): Prisma.PostShareDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get commentUserReaction(): Prisma.CommentUserReactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get postView(): Prisma.PostViewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get visitorSession(): Prisma.VisitorSessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pageViewLog(): Prisma.PageViewLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map