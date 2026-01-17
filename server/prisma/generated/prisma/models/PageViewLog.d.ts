import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PageViewLogModel = runtime.Types.Result.DefaultSelection<Prisma.$PageViewLogPayload>;
export type AggregatePageViewLog = {
    _count: PageViewLogCountAggregateOutputType | null;
    _min: PageViewLogMinAggregateOutputType | null;
    _max: PageViewLogMaxAggregateOutputType | null;
};
export type PageViewLogMinAggregateOutputType = {
    id: string | null;
    path: string | null;
    createdAt: Date | null;
    sessionId: string | null;
};
export type PageViewLogMaxAggregateOutputType = {
    id: string | null;
    path: string | null;
    createdAt: Date | null;
    sessionId: string | null;
};
export type PageViewLogCountAggregateOutputType = {
    id: number;
    path: number;
    createdAt: number;
    sessionId: number;
    _all: number;
};
export type PageViewLogMinAggregateInputType = {
    id?: true;
    path?: true;
    createdAt?: true;
    sessionId?: true;
};
export type PageViewLogMaxAggregateInputType = {
    id?: true;
    path?: true;
    createdAt?: true;
    sessionId?: true;
};
export type PageViewLogCountAggregateInputType = {
    id?: true;
    path?: true;
    createdAt?: true;
    sessionId?: true;
    _all?: true;
};
export type PageViewLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PageViewLogWhereInput;
    orderBy?: Prisma.PageViewLogOrderByWithRelationInput | Prisma.PageViewLogOrderByWithRelationInput[];
    cursor?: Prisma.PageViewLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PageViewLogCountAggregateInputType;
    _min?: PageViewLogMinAggregateInputType;
    _max?: PageViewLogMaxAggregateInputType;
};
export type GetPageViewLogAggregateType<T extends PageViewLogAggregateArgs> = {
    [P in keyof T & keyof AggregatePageViewLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePageViewLog[P]> : Prisma.GetScalarType<T[P], AggregatePageViewLog[P]>;
};
export type PageViewLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PageViewLogWhereInput;
    orderBy?: Prisma.PageViewLogOrderByWithAggregationInput | Prisma.PageViewLogOrderByWithAggregationInput[];
    by: Prisma.PageViewLogScalarFieldEnum[] | Prisma.PageViewLogScalarFieldEnum;
    having?: Prisma.PageViewLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PageViewLogCountAggregateInputType | true;
    _min?: PageViewLogMinAggregateInputType;
    _max?: PageViewLogMaxAggregateInputType;
};
export type PageViewLogGroupByOutputType = {
    id: string;
    path: string;
    createdAt: Date;
    sessionId: string;
    _count: PageViewLogCountAggregateOutputType | null;
    _min: PageViewLogMinAggregateOutputType | null;
    _max: PageViewLogMaxAggregateOutputType | null;
};
type GetPageViewLogGroupByPayload<T extends PageViewLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PageViewLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PageViewLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PageViewLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PageViewLogGroupByOutputType[P]>;
}>>;
export type PageViewLogWhereInput = {
    AND?: Prisma.PageViewLogWhereInput | Prisma.PageViewLogWhereInput[];
    OR?: Prisma.PageViewLogWhereInput[];
    NOT?: Prisma.PageViewLogWhereInput | Prisma.PageViewLogWhereInput[];
    id?: Prisma.StringFilter<"PageViewLog"> | string;
    path?: Prisma.StringFilter<"PageViewLog"> | string;
    createdAt?: Prisma.DateTimeFilter<"PageViewLog"> | Date | string;
    sessionId?: Prisma.StringFilter<"PageViewLog"> | string;
    session?: Prisma.XOR<Prisma.VisitorSessionScalarRelationFilter, Prisma.VisitorSessionWhereInput>;
};
export type PageViewLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    session?: Prisma.VisitorSessionOrderByWithRelationInput;
};
export type PageViewLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PageViewLogWhereInput | Prisma.PageViewLogWhereInput[];
    OR?: Prisma.PageViewLogWhereInput[];
    NOT?: Prisma.PageViewLogWhereInput | Prisma.PageViewLogWhereInput[];
    path?: Prisma.StringFilter<"PageViewLog"> | string;
    createdAt?: Prisma.DateTimeFilter<"PageViewLog"> | Date | string;
    sessionId?: Prisma.StringFilter<"PageViewLog"> | string;
    session?: Prisma.XOR<Prisma.VisitorSessionScalarRelationFilter, Prisma.VisitorSessionWhereInput>;
}, "id">;
export type PageViewLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    _count?: Prisma.PageViewLogCountOrderByAggregateInput;
    _max?: Prisma.PageViewLogMaxOrderByAggregateInput;
    _min?: Prisma.PageViewLogMinOrderByAggregateInput;
};
export type PageViewLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.PageViewLogScalarWhereWithAggregatesInput | Prisma.PageViewLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.PageViewLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PageViewLogScalarWhereWithAggregatesInput | Prisma.PageViewLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PageViewLog"> | string;
    path?: Prisma.StringWithAggregatesFilter<"PageViewLog"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PageViewLog"> | Date | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"PageViewLog"> | string;
};
export type PageViewLogCreateInput = {
    id?: string;
    path: string;
    createdAt?: Date | string;
    session: Prisma.VisitorSessionCreateNestedOneWithoutPageViewsInput;
};
export type PageViewLogUncheckedCreateInput = {
    id?: string;
    path: string;
    createdAt?: Date | string;
    sessionId: string;
};
export type PageViewLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.VisitorSessionUpdateOneRequiredWithoutPageViewsNestedInput;
};
export type PageViewLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PageViewLogCreateManyInput = {
    id?: string;
    path: string;
    createdAt?: Date | string;
    sessionId: string;
};
export type PageViewLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PageViewLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PageViewLogListRelationFilter = {
    every?: Prisma.PageViewLogWhereInput;
    some?: Prisma.PageViewLogWhereInput;
    none?: Prisma.PageViewLogWhereInput;
};
export type PageViewLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PageViewLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
};
export type PageViewLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
};
export type PageViewLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
};
export type PageViewLogCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.PageViewLogCreateWithoutSessionInput, Prisma.PageViewLogUncheckedCreateWithoutSessionInput> | Prisma.PageViewLogCreateWithoutSessionInput[] | Prisma.PageViewLogUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.PageViewLogCreateOrConnectWithoutSessionInput | Prisma.PageViewLogCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.PageViewLogCreateManySessionInputEnvelope;
    connect?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
};
export type PageViewLogUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.PageViewLogCreateWithoutSessionInput, Prisma.PageViewLogUncheckedCreateWithoutSessionInput> | Prisma.PageViewLogCreateWithoutSessionInput[] | Prisma.PageViewLogUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.PageViewLogCreateOrConnectWithoutSessionInput | Prisma.PageViewLogCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.PageViewLogCreateManySessionInputEnvelope;
    connect?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
};
export type PageViewLogUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.PageViewLogCreateWithoutSessionInput, Prisma.PageViewLogUncheckedCreateWithoutSessionInput> | Prisma.PageViewLogCreateWithoutSessionInput[] | Prisma.PageViewLogUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.PageViewLogCreateOrConnectWithoutSessionInput | Prisma.PageViewLogCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.PageViewLogUpsertWithWhereUniqueWithoutSessionInput | Prisma.PageViewLogUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.PageViewLogCreateManySessionInputEnvelope;
    set?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
    disconnect?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
    delete?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
    connect?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
    update?: Prisma.PageViewLogUpdateWithWhereUniqueWithoutSessionInput | Prisma.PageViewLogUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.PageViewLogUpdateManyWithWhereWithoutSessionInput | Prisma.PageViewLogUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.PageViewLogScalarWhereInput | Prisma.PageViewLogScalarWhereInput[];
};
export type PageViewLogUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.PageViewLogCreateWithoutSessionInput, Prisma.PageViewLogUncheckedCreateWithoutSessionInput> | Prisma.PageViewLogCreateWithoutSessionInput[] | Prisma.PageViewLogUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.PageViewLogCreateOrConnectWithoutSessionInput | Prisma.PageViewLogCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.PageViewLogUpsertWithWhereUniqueWithoutSessionInput | Prisma.PageViewLogUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.PageViewLogCreateManySessionInputEnvelope;
    set?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
    disconnect?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
    delete?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
    connect?: Prisma.PageViewLogWhereUniqueInput | Prisma.PageViewLogWhereUniqueInput[];
    update?: Prisma.PageViewLogUpdateWithWhereUniqueWithoutSessionInput | Prisma.PageViewLogUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.PageViewLogUpdateManyWithWhereWithoutSessionInput | Prisma.PageViewLogUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.PageViewLogScalarWhereInput | Prisma.PageViewLogScalarWhereInput[];
};
export type PageViewLogCreateWithoutSessionInput = {
    id?: string;
    path: string;
    createdAt?: Date | string;
};
export type PageViewLogUncheckedCreateWithoutSessionInput = {
    id?: string;
    path: string;
    createdAt?: Date | string;
};
export type PageViewLogCreateOrConnectWithoutSessionInput = {
    where: Prisma.PageViewLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PageViewLogCreateWithoutSessionInput, Prisma.PageViewLogUncheckedCreateWithoutSessionInput>;
};
export type PageViewLogCreateManySessionInputEnvelope = {
    data: Prisma.PageViewLogCreateManySessionInput | Prisma.PageViewLogCreateManySessionInput[];
    skipDuplicates?: boolean;
};
export type PageViewLogUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.PageViewLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.PageViewLogUpdateWithoutSessionInput, Prisma.PageViewLogUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.PageViewLogCreateWithoutSessionInput, Prisma.PageViewLogUncheckedCreateWithoutSessionInput>;
};
export type PageViewLogUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.PageViewLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.PageViewLogUpdateWithoutSessionInput, Prisma.PageViewLogUncheckedUpdateWithoutSessionInput>;
};
export type PageViewLogUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.PageViewLogScalarWhereInput;
    data: Prisma.XOR<Prisma.PageViewLogUpdateManyMutationInput, Prisma.PageViewLogUncheckedUpdateManyWithoutSessionInput>;
};
export type PageViewLogScalarWhereInput = {
    AND?: Prisma.PageViewLogScalarWhereInput | Prisma.PageViewLogScalarWhereInput[];
    OR?: Prisma.PageViewLogScalarWhereInput[];
    NOT?: Prisma.PageViewLogScalarWhereInput | Prisma.PageViewLogScalarWhereInput[];
    id?: Prisma.StringFilter<"PageViewLog"> | string;
    path?: Prisma.StringFilter<"PageViewLog"> | string;
    createdAt?: Prisma.DateTimeFilter<"PageViewLog"> | Date | string;
    sessionId?: Prisma.StringFilter<"PageViewLog"> | string;
};
export type PageViewLogCreateManySessionInput = {
    id?: string;
    path: string;
    createdAt?: Date | string;
};
export type PageViewLogUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PageViewLogUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PageViewLogUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PageViewLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    path?: boolean;
    createdAt?: boolean;
    sessionId?: boolean;
    session?: boolean | Prisma.VisitorSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pageViewLog"]>;
export type PageViewLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    path?: boolean;
    createdAt?: boolean;
    sessionId?: boolean;
    session?: boolean | Prisma.VisitorSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pageViewLog"]>;
export type PageViewLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    path?: boolean;
    createdAt?: boolean;
    sessionId?: boolean;
    session?: boolean | Prisma.VisitorSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pageViewLog"]>;
export type PageViewLogSelectScalar = {
    id?: boolean;
    path?: boolean;
    createdAt?: boolean;
    sessionId?: boolean;
};
export type PageViewLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "path" | "createdAt" | "sessionId", ExtArgs["result"]["pageViewLog"]>;
export type PageViewLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.VisitorSessionDefaultArgs<ExtArgs>;
};
export type PageViewLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.VisitorSessionDefaultArgs<ExtArgs>;
};
export type PageViewLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.VisitorSessionDefaultArgs<ExtArgs>;
};
export type $PageViewLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PageViewLog";
    objects: {
        session: Prisma.$VisitorSessionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        path: string;
        createdAt: Date;
        sessionId: string;
    }, ExtArgs["result"]["pageViewLog"]>;
    composites: {};
};
export type PageViewLogGetPayload<S extends boolean | null | undefined | PageViewLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload, S>;
export type PageViewLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PageViewLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PageViewLogCountAggregateInputType | true;
};
export interface PageViewLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PageViewLog'];
        meta: {
            name: 'PageViewLog';
        };
    };
    findUnique<T extends PageViewLogFindUniqueArgs>(args: Prisma.SelectSubset<T, PageViewLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PageViewLogClient<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PageViewLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PageViewLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PageViewLogClient<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PageViewLogFindFirstArgs>(args?: Prisma.SelectSubset<T, PageViewLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__PageViewLogClient<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PageViewLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PageViewLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PageViewLogClient<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PageViewLogFindManyArgs>(args?: Prisma.SelectSubset<T, PageViewLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PageViewLogCreateArgs>(args: Prisma.SelectSubset<T, PageViewLogCreateArgs<ExtArgs>>): Prisma.Prisma__PageViewLogClient<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PageViewLogCreateManyArgs>(args?: Prisma.SelectSubset<T, PageViewLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PageViewLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PageViewLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PageViewLogDeleteArgs>(args: Prisma.SelectSubset<T, PageViewLogDeleteArgs<ExtArgs>>): Prisma.Prisma__PageViewLogClient<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PageViewLogUpdateArgs>(args: Prisma.SelectSubset<T, PageViewLogUpdateArgs<ExtArgs>>): Prisma.Prisma__PageViewLogClient<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PageViewLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, PageViewLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PageViewLogUpdateManyArgs>(args: Prisma.SelectSubset<T, PageViewLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PageViewLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PageViewLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PageViewLogUpsertArgs>(args: Prisma.SelectSubset<T, PageViewLogUpsertArgs<ExtArgs>>): Prisma.Prisma__PageViewLogClient<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PageViewLogCountArgs>(args?: Prisma.Subset<T, PageViewLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PageViewLogCountAggregateOutputType> : number>;
    aggregate<T extends PageViewLogAggregateArgs>(args: Prisma.Subset<T, PageViewLogAggregateArgs>): Prisma.PrismaPromise<GetPageViewLogAggregateType<T>>;
    groupBy<T extends PageViewLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PageViewLogGroupByArgs['orderBy'];
    } : {
        orderBy?: PageViewLogGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PageViewLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageViewLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PageViewLogFieldRefs;
}
export interface Prisma__PageViewLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.VisitorSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VisitorSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PageViewLogFieldRefs {
    readonly id: Prisma.FieldRef<"PageViewLog", 'String'>;
    readonly path: Prisma.FieldRef<"PageViewLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PageViewLog", 'DateTime'>;
    readonly sessionId: Prisma.FieldRef<"PageViewLog", 'String'>;
}
export type PageViewLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    where: Prisma.PageViewLogWhereUniqueInput;
};
export type PageViewLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    where: Prisma.PageViewLogWhereUniqueInput;
};
export type PageViewLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    where?: Prisma.PageViewLogWhereInput;
    orderBy?: Prisma.PageViewLogOrderByWithRelationInput | Prisma.PageViewLogOrderByWithRelationInput[];
    cursor?: Prisma.PageViewLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PageViewLogScalarFieldEnum | Prisma.PageViewLogScalarFieldEnum[];
};
export type PageViewLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    where?: Prisma.PageViewLogWhereInput;
    orderBy?: Prisma.PageViewLogOrderByWithRelationInput | Prisma.PageViewLogOrderByWithRelationInput[];
    cursor?: Prisma.PageViewLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PageViewLogScalarFieldEnum | Prisma.PageViewLogScalarFieldEnum[];
};
export type PageViewLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    where?: Prisma.PageViewLogWhereInput;
    orderBy?: Prisma.PageViewLogOrderByWithRelationInput | Prisma.PageViewLogOrderByWithRelationInput[];
    cursor?: Prisma.PageViewLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PageViewLogScalarFieldEnum | Prisma.PageViewLogScalarFieldEnum[];
};
export type PageViewLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PageViewLogCreateInput, Prisma.PageViewLogUncheckedCreateInput>;
};
export type PageViewLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PageViewLogCreateManyInput | Prisma.PageViewLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PageViewLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    data: Prisma.PageViewLogCreateManyInput | Prisma.PageViewLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PageViewLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PageViewLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PageViewLogUpdateInput, Prisma.PageViewLogUncheckedUpdateInput>;
    where: Prisma.PageViewLogWhereUniqueInput;
};
export type PageViewLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PageViewLogUpdateManyMutationInput, Prisma.PageViewLogUncheckedUpdateManyInput>;
    where?: Prisma.PageViewLogWhereInput;
    limit?: number;
};
export type PageViewLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PageViewLogUpdateManyMutationInput, Prisma.PageViewLogUncheckedUpdateManyInput>;
    where?: Prisma.PageViewLogWhereInput;
    limit?: number;
    include?: Prisma.PageViewLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PageViewLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    where: Prisma.PageViewLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PageViewLogCreateInput, Prisma.PageViewLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PageViewLogUpdateInput, Prisma.PageViewLogUncheckedUpdateInput>;
};
export type PageViewLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
    where: Prisma.PageViewLogWhereUniqueInput;
};
export type PageViewLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PageViewLogWhereInput;
    limit?: number;
};
export type PageViewLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PageViewLogSelect<ExtArgs> | null;
    omit?: Prisma.PageViewLogOmit<ExtArgs> | null;
    include?: Prisma.PageViewLogInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PageViewLog.d.ts.map