import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OpportunityTagModel = runtime.Types.Result.DefaultSelection<Prisma.$OpportunityTagPayload>;
export type AggregateOpportunityTag = {
    _count: OpportunityTagCountAggregateOutputType | null;
    _min: OpportunityTagMinAggregateOutputType | null;
    _max: OpportunityTagMaxAggregateOutputType | null;
};
export type OpportunityTagMinAggregateOutputType = {
    opportunityId: string | null;
    tagId: string | null;
};
export type OpportunityTagMaxAggregateOutputType = {
    opportunityId: string | null;
    tagId: string | null;
};
export type OpportunityTagCountAggregateOutputType = {
    opportunityId: number;
    tagId: number;
    _all: number;
};
export type OpportunityTagMinAggregateInputType = {
    opportunityId?: true;
    tagId?: true;
};
export type OpportunityTagMaxAggregateInputType = {
    opportunityId?: true;
    tagId?: true;
};
export type OpportunityTagCountAggregateInputType = {
    opportunityId?: true;
    tagId?: true;
    _all?: true;
};
export type OpportunityTagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpportunityTagWhereInput;
    orderBy?: Prisma.OpportunityTagOrderByWithRelationInput | Prisma.OpportunityTagOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityTagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OpportunityTagCountAggregateInputType;
    _min?: OpportunityTagMinAggregateInputType;
    _max?: OpportunityTagMaxAggregateInputType;
};
export type GetOpportunityTagAggregateType<T extends OpportunityTagAggregateArgs> = {
    [P in keyof T & keyof AggregateOpportunityTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOpportunityTag[P]> : Prisma.GetScalarType<T[P], AggregateOpportunityTag[P]>;
};
export type OpportunityTagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpportunityTagWhereInput;
    orderBy?: Prisma.OpportunityTagOrderByWithAggregationInput | Prisma.OpportunityTagOrderByWithAggregationInput[];
    by: Prisma.OpportunityTagScalarFieldEnum[] | Prisma.OpportunityTagScalarFieldEnum;
    having?: Prisma.OpportunityTagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OpportunityTagCountAggregateInputType | true;
    _min?: OpportunityTagMinAggregateInputType;
    _max?: OpportunityTagMaxAggregateInputType;
};
export type OpportunityTagGroupByOutputType = {
    opportunityId: string;
    tagId: string;
    _count: OpportunityTagCountAggregateOutputType | null;
    _min: OpportunityTagMinAggregateOutputType | null;
    _max: OpportunityTagMaxAggregateOutputType | null;
};
type GetOpportunityTagGroupByPayload<T extends OpportunityTagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OpportunityTagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OpportunityTagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OpportunityTagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OpportunityTagGroupByOutputType[P]>;
}>>;
export type OpportunityTagWhereInput = {
    AND?: Prisma.OpportunityTagWhereInput | Prisma.OpportunityTagWhereInput[];
    OR?: Prisma.OpportunityTagWhereInput[];
    NOT?: Prisma.OpportunityTagWhereInput | Prisma.OpportunityTagWhereInput[];
    opportunityId?: Prisma.StringFilter<"OpportunityTag"> | string;
    tagId?: Prisma.StringFilter<"OpportunityTag"> | string;
    opportunity?: Prisma.XOR<Prisma.OpportunityScalarRelationFilter, Prisma.OpportunityWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
};
export type OpportunityTagOrderByWithRelationInput = {
    opportunityId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    opportunity?: Prisma.OpportunityOrderByWithRelationInput;
    tag?: Prisma.TagOrderByWithRelationInput;
};
export type OpportunityTagWhereUniqueInput = Prisma.AtLeast<{
    opportunityId_tagId?: Prisma.OpportunityTagOpportunityIdTagIdCompoundUniqueInput;
    AND?: Prisma.OpportunityTagWhereInput | Prisma.OpportunityTagWhereInput[];
    OR?: Prisma.OpportunityTagWhereInput[];
    NOT?: Prisma.OpportunityTagWhereInput | Prisma.OpportunityTagWhereInput[];
    opportunityId?: Prisma.StringFilter<"OpportunityTag"> | string;
    tagId?: Prisma.StringFilter<"OpportunityTag"> | string;
    opportunity?: Prisma.XOR<Prisma.OpportunityScalarRelationFilter, Prisma.OpportunityWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
}, "opportunityId_tagId">;
export type OpportunityTagOrderByWithAggregationInput = {
    opportunityId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    _count?: Prisma.OpportunityTagCountOrderByAggregateInput;
    _max?: Prisma.OpportunityTagMaxOrderByAggregateInput;
    _min?: Prisma.OpportunityTagMinOrderByAggregateInput;
};
export type OpportunityTagScalarWhereWithAggregatesInput = {
    AND?: Prisma.OpportunityTagScalarWhereWithAggregatesInput | Prisma.OpportunityTagScalarWhereWithAggregatesInput[];
    OR?: Prisma.OpportunityTagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OpportunityTagScalarWhereWithAggregatesInput | Prisma.OpportunityTagScalarWhereWithAggregatesInput[];
    opportunityId?: Prisma.StringWithAggregatesFilter<"OpportunityTag"> | string;
    tagId?: Prisma.StringWithAggregatesFilter<"OpportunityTag"> | string;
};
export type OpportunityTagCreateInput = {
    opportunity: Prisma.OpportunityCreateNestedOneWithoutTagsInput;
    tag: Prisma.TagCreateNestedOneWithoutOpportunitiesInput;
};
export type OpportunityTagUncheckedCreateInput = {
    opportunityId: string;
    tagId: string;
};
export type OpportunityTagUpdateInput = {
    opportunity?: Prisma.OpportunityUpdateOneRequiredWithoutTagsNestedInput;
    tag?: Prisma.TagUpdateOneRequiredWithoutOpportunitiesNestedInput;
};
export type OpportunityTagUncheckedUpdateInput = {
    opportunityId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OpportunityTagCreateManyInput = {
    opportunityId: string;
    tagId: string;
};
export type OpportunityTagUpdateManyMutationInput = {};
export type OpportunityTagUncheckedUpdateManyInput = {
    opportunityId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OpportunityTagListRelationFilter = {
    every?: Prisma.OpportunityTagWhereInput;
    some?: Prisma.OpportunityTagWhereInput;
    none?: Prisma.OpportunityTagWhereInput;
};
export type OpportunityTagOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OpportunityTagOpportunityIdTagIdCompoundUniqueInput = {
    opportunityId: string;
    tagId: string;
};
export type OpportunityTagCountOrderByAggregateInput = {
    opportunityId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type OpportunityTagMaxOrderByAggregateInput = {
    opportunityId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type OpportunityTagMinOrderByAggregateInput = {
    opportunityId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type OpportunityTagCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.OpportunityTagCreateWithoutTagInput, Prisma.OpportunityTagUncheckedCreateWithoutTagInput> | Prisma.OpportunityTagCreateWithoutTagInput[] | Prisma.OpportunityTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.OpportunityTagCreateOrConnectWithoutTagInput | Prisma.OpportunityTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.OpportunityTagCreateManyTagInputEnvelope;
    connect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
};
export type OpportunityTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.OpportunityTagCreateWithoutTagInput, Prisma.OpportunityTagUncheckedCreateWithoutTagInput> | Prisma.OpportunityTagCreateWithoutTagInput[] | Prisma.OpportunityTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.OpportunityTagCreateOrConnectWithoutTagInput | Prisma.OpportunityTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.OpportunityTagCreateManyTagInputEnvelope;
    connect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
};
export type OpportunityTagUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.OpportunityTagCreateWithoutTagInput, Prisma.OpportunityTagUncheckedCreateWithoutTagInput> | Prisma.OpportunityTagCreateWithoutTagInput[] | Prisma.OpportunityTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.OpportunityTagCreateOrConnectWithoutTagInput | Prisma.OpportunityTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.OpportunityTagUpsertWithWhereUniqueWithoutTagInput | Prisma.OpportunityTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.OpportunityTagCreateManyTagInputEnvelope;
    set?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    disconnect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    delete?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    connect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    update?: Prisma.OpportunityTagUpdateWithWhereUniqueWithoutTagInput | Prisma.OpportunityTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.OpportunityTagUpdateManyWithWhereWithoutTagInput | Prisma.OpportunityTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.OpportunityTagScalarWhereInput | Prisma.OpportunityTagScalarWhereInput[];
};
export type OpportunityTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.OpportunityTagCreateWithoutTagInput, Prisma.OpportunityTagUncheckedCreateWithoutTagInput> | Prisma.OpportunityTagCreateWithoutTagInput[] | Prisma.OpportunityTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.OpportunityTagCreateOrConnectWithoutTagInput | Prisma.OpportunityTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.OpportunityTagUpsertWithWhereUniqueWithoutTagInput | Prisma.OpportunityTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.OpportunityTagCreateManyTagInputEnvelope;
    set?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    disconnect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    delete?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    connect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    update?: Prisma.OpportunityTagUpdateWithWhereUniqueWithoutTagInput | Prisma.OpportunityTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.OpportunityTagUpdateManyWithWhereWithoutTagInput | Prisma.OpportunityTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.OpportunityTagScalarWhereInput | Prisma.OpportunityTagScalarWhereInput[];
};
export type OpportunityTagCreateNestedManyWithoutOpportunityInput = {
    create?: Prisma.XOR<Prisma.OpportunityTagCreateWithoutOpportunityInput, Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput> | Prisma.OpportunityTagCreateWithoutOpportunityInput[] | Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput[];
    connectOrCreate?: Prisma.OpportunityTagCreateOrConnectWithoutOpportunityInput | Prisma.OpportunityTagCreateOrConnectWithoutOpportunityInput[];
    createMany?: Prisma.OpportunityTagCreateManyOpportunityInputEnvelope;
    connect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
};
export type OpportunityTagUncheckedCreateNestedManyWithoutOpportunityInput = {
    create?: Prisma.XOR<Prisma.OpportunityTagCreateWithoutOpportunityInput, Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput> | Prisma.OpportunityTagCreateWithoutOpportunityInput[] | Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput[];
    connectOrCreate?: Prisma.OpportunityTagCreateOrConnectWithoutOpportunityInput | Prisma.OpportunityTagCreateOrConnectWithoutOpportunityInput[];
    createMany?: Prisma.OpportunityTagCreateManyOpportunityInputEnvelope;
    connect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
};
export type OpportunityTagUpdateManyWithoutOpportunityNestedInput = {
    create?: Prisma.XOR<Prisma.OpportunityTagCreateWithoutOpportunityInput, Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput> | Prisma.OpportunityTagCreateWithoutOpportunityInput[] | Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput[];
    connectOrCreate?: Prisma.OpportunityTagCreateOrConnectWithoutOpportunityInput | Prisma.OpportunityTagCreateOrConnectWithoutOpportunityInput[];
    upsert?: Prisma.OpportunityTagUpsertWithWhereUniqueWithoutOpportunityInput | Prisma.OpportunityTagUpsertWithWhereUniqueWithoutOpportunityInput[];
    createMany?: Prisma.OpportunityTagCreateManyOpportunityInputEnvelope;
    set?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    disconnect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    delete?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    connect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    update?: Prisma.OpportunityTagUpdateWithWhereUniqueWithoutOpportunityInput | Prisma.OpportunityTagUpdateWithWhereUniqueWithoutOpportunityInput[];
    updateMany?: Prisma.OpportunityTagUpdateManyWithWhereWithoutOpportunityInput | Prisma.OpportunityTagUpdateManyWithWhereWithoutOpportunityInput[];
    deleteMany?: Prisma.OpportunityTagScalarWhereInput | Prisma.OpportunityTagScalarWhereInput[];
};
export type OpportunityTagUncheckedUpdateManyWithoutOpportunityNestedInput = {
    create?: Prisma.XOR<Prisma.OpportunityTagCreateWithoutOpportunityInput, Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput> | Prisma.OpportunityTagCreateWithoutOpportunityInput[] | Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput[];
    connectOrCreate?: Prisma.OpportunityTagCreateOrConnectWithoutOpportunityInput | Prisma.OpportunityTagCreateOrConnectWithoutOpportunityInput[];
    upsert?: Prisma.OpportunityTagUpsertWithWhereUniqueWithoutOpportunityInput | Prisma.OpportunityTagUpsertWithWhereUniqueWithoutOpportunityInput[];
    createMany?: Prisma.OpportunityTagCreateManyOpportunityInputEnvelope;
    set?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    disconnect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    delete?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    connect?: Prisma.OpportunityTagWhereUniqueInput | Prisma.OpportunityTagWhereUniqueInput[];
    update?: Prisma.OpportunityTagUpdateWithWhereUniqueWithoutOpportunityInput | Prisma.OpportunityTagUpdateWithWhereUniqueWithoutOpportunityInput[];
    updateMany?: Prisma.OpportunityTagUpdateManyWithWhereWithoutOpportunityInput | Prisma.OpportunityTagUpdateManyWithWhereWithoutOpportunityInput[];
    deleteMany?: Prisma.OpportunityTagScalarWhereInput | Prisma.OpportunityTagScalarWhereInput[];
};
export type OpportunityTagCreateWithoutTagInput = {
    opportunity: Prisma.OpportunityCreateNestedOneWithoutTagsInput;
};
export type OpportunityTagUncheckedCreateWithoutTagInput = {
    opportunityId: string;
};
export type OpportunityTagCreateOrConnectWithoutTagInput = {
    where: Prisma.OpportunityTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpportunityTagCreateWithoutTagInput, Prisma.OpportunityTagUncheckedCreateWithoutTagInput>;
};
export type OpportunityTagCreateManyTagInputEnvelope = {
    data: Prisma.OpportunityTagCreateManyTagInput | Prisma.OpportunityTagCreateManyTagInput[];
    skipDuplicates?: boolean;
};
export type OpportunityTagUpsertWithWhereUniqueWithoutTagInput = {
    where: Prisma.OpportunityTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.OpportunityTagUpdateWithoutTagInput, Prisma.OpportunityTagUncheckedUpdateWithoutTagInput>;
    create: Prisma.XOR<Prisma.OpportunityTagCreateWithoutTagInput, Prisma.OpportunityTagUncheckedCreateWithoutTagInput>;
};
export type OpportunityTagUpdateWithWhereUniqueWithoutTagInput = {
    where: Prisma.OpportunityTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.OpportunityTagUpdateWithoutTagInput, Prisma.OpportunityTagUncheckedUpdateWithoutTagInput>;
};
export type OpportunityTagUpdateManyWithWhereWithoutTagInput = {
    where: Prisma.OpportunityTagScalarWhereInput;
    data: Prisma.XOR<Prisma.OpportunityTagUpdateManyMutationInput, Prisma.OpportunityTagUncheckedUpdateManyWithoutTagInput>;
};
export type OpportunityTagScalarWhereInput = {
    AND?: Prisma.OpportunityTagScalarWhereInput | Prisma.OpportunityTagScalarWhereInput[];
    OR?: Prisma.OpportunityTagScalarWhereInput[];
    NOT?: Prisma.OpportunityTagScalarWhereInput | Prisma.OpportunityTagScalarWhereInput[];
    opportunityId?: Prisma.StringFilter<"OpportunityTag"> | string;
    tagId?: Prisma.StringFilter<"OpportunityTag"> | string;
};
export type OpportunityTagCreateWithoutOpportunityInput = {
    tag: Prisma.TagCreateNestedOneWithoutOpportunitiesInput;
};
export type OpportunityTagUncheckedCreateWithoutOpportunityInput = {
    tagId: string;
};
export type OpportunityTagCreateOrConnectWithoutOpportunityInput = {
    where: Prisma.OpportunityTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpportunityTagCreateWithoutOpportunityInput, Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput>;
};
export type OpportunityTagCreateManyOpportunityInputEnvelope = {
    data: Prisma.OpportunityTagCreateManyOpportunityInput | Prisma.OpportunityTagCreateManyOpportunityInput[];
    skipDuplicates?: boolean;
};
export type OpportunityTagUpsertWithWhereUniqueWithoutOpportunityInput = {
    where: Prisma.OpportunityTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.OpportunityTagUpdateWithoutOpportunityInput, Prisma.OpportunityTagUncheckedUpdateWithoutOpportunityInput>;
    create: Prisma.XOR<Prisma.OpportunityTagCreateWithoutOpportunityInput, Prisma.OpportunityTagUncheckedCreateWithoutOpportunityInput>;
};
export type OpportunityTagUpdateWithWhereUniqueWithoutOpportunityInput = {
    where: Prisma.OpportunityTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.OpportunityTagUpdateWithoutOpportunityInput, Prisma.OpportunityTagUncheckedUpdateWithoutOpportunityInput>;
};
export type OpportunityTagUpdateManyWithWhereWithoutOpportunityInput = {
    where: Prisma.OpportunityTagScalarWhereInput;
    data: Prisma.XOR<Prisma.OpportunityTagUpdateManyMutationInput, Prisma.OpportunityTagUncheckedUpdateManyWithoutOpportunityInput>;
};
export type OpportunityTagCreateManyTagInput = {
    opportunityId: string;
};
export type OpportunityTagUpdateWithoutTagInput = {
    opportunity?: Prisma.OpportunityUpdateOneRequiredWithoutTagsNestedInput;
};
export type OpportunityTagUncheckedUpdateWithoutTagInput = {
    opportunityId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OpportunityTagUncheckedUpdateManyWithoutTagInput = {
    opportunityId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OpportunityTagCreateManyOpportunityInput = {
    tagId: string;
};
export type OpportunityTagUpdateWithoutOpportunityInput = {
    tag?: Prisma.TagUpdateOneRequiredWithoutOpportunitiesNestedInput;
};
export type OpportunityTagUncheckedUpdateWithoutOpportunityInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OpportunityTagUncheckedUpdateManyWithoutOpportunityInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OpportunityTagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    opportunityId?: boolean;
    tagId?: boolean;
    opportunity?: boolean | Prisma.OpportunityDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["opportunityTag"]>;
export type OpportunityTagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    opportunityId?: boolean;
    tagId?: boolean;
    opportunity?: boolean | Prisma.OpportunityDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["opportunityTag"]>;
export type OpportunityTagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    opportunityId?: boolean;
    tagId?: boolean;
    opportunity?: boolean | Prisma.OpportunityDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["opportunityTag"]>;
export type OpportunityTagSelectScalar = {
    opportunityId?: boolean;
    tagId?: boolean;
};
export type OpportunityTagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"opportunityId" | "tagId", ExtArgs["result"]["opportunityTag"]>;
export type OpportunityTagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    opportunity?: boolean | Prisma.OpportunityDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type OpportunityTagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    opportunity?: boolean | Prisma.OpportunityDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type OpportunityTagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    opportunity?: boolean | Prisma.OpportunityDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type $OpportunityTagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OpportunityTag";
    objects: {
        opportunity: Prisma.$OpportunityPayload<ExtArgs>;
        tag: Prisma.$TagPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        opportunityId: string;
        tagId: string;
    }, ExtArgs["result"]["opportunityTag"]>;
    composites: {};
};
export type OpportunityTagGetPayload<S extends boolean | null | undefined | OpportunityTagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload, S>;
export type OpportunityTagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OpportunityTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OpportunityTagCountAggregateInputType | true;
};
export interface OpportunityTagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OpportunityTag'];
        meta: {
            name: 'OpportunityTag';
        };
    };
    findUnique<T extends OpportunityTagFindUniqueArgs>(args: Prisma.SelectSubset<T, OpportunityTagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OpportunityTagClient<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OpportunityTagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OpportunityTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OpportunityTagClient<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OpportunityTagFindFirstArgs>(args?: Prisma.SelectSubset<T, OpportunityTagFindFirstArgs<ExtArgs>>): Prisma.Prisma__OpportunityTagClient<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OpportunityTagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OpportunityTagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OpportunityTagClient<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OpportunityTagFindManyArgs>(args?: Prisma.SelectSubset<T, OpportunityTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OpportunityTagCreateArgs>(args: Prisma.SelectSubset<T, OpportunityTagCreateArgs<ExtArgs>>): Prisma.Prisma__OpportunityTagClient<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OpportunityTagCreateManyArgs>(args?: Prisma.SelectSubset<T, OpportunityTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OpportunityTagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OpportunityTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OpportunityTagDeleteArgs>(args: Prisma.SelectSubset<T, OpportunityTagDeleteArgs<ExtArgs>>): Prisma.Prisma__OpportunityTagClient<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OpportunityTagUpdateArgs>(args: Prisma.SelectSubset<T, OpportunityTagUpdateArgs<ExtArgs>>): Prisma.Prisma__OpportunityTagClient<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OpportunityTagDeleteManyArgs>(args?: Prisma.SelectSubset<T, OpportunityTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OpportunityTagUpdateManyArgs>(args: Prisma.SelectSubset<T, OpportunityTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OpportunityTagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OpportunityTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OpportunityTagUpsertArgs>(args: Prisma.SelectSubset<T, OpportunityTagUpsertArgs<ExtArgs>>): Prisma.Prisma__OpportunityTagClient<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OpportunityTagCountArgs>(args?: Prisma.Subset<T, OpportunityTagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OpportunityTagCountAggregateOutputType> : number>;
    aggregate<T extends OpportunityTagAggregateArgs>(args: Prisma.Subset<T, OpportunityTagAggregateArgs>): Prisma.PrismaPromise<GetOpportunityTagAggregateType<T>>;
    groupBy<T extends OpportunityTagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OpportunityTagGroupByArgs['orderBy'];
    } : {
        orderBy?: OpportunityTagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OpportunityTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpportunityTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OpportunityTagFieldRefs;
}
export interface Prisma__OpportunityTagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    opportunity<T extends Prisma.OpportunityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OpportunityDefaultArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tag<T extends Prisma.TagDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TagDefaultArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OpportunityTagFieldRefs {
    readonly opportunityId: Prisma.FieldRef<"OpportunityTag", 'String'>;
    readonly tagId: Prisma.FieldRef<"OpportunityTag", 'String'>;
}
export type OpportunityTagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    where: Prisma.OpportunityTagWhereUniqueInput;
};
export type OpportunityTagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    where: Prisma.OpportunityTagWhereUniqueInput;
};
export type OpportunityTagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    where?: Prisma.OpportunityTagWhereInput;
    orderBy?: Prisma.OpportunityTagOrderByWithRelationInput | Prisma.OpportunityTagOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OpportunityTagScalarFieldEnum | Prisma.OpportunityTagScalarFieldEnum[];
};
export type OpportunityTagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    where?: Prisma.OpportunityTagWhereInput;
    orderBy?: Prisma.OpportunityTagOrderByWithRelationInput | Prisma.OpportunityTagOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OpportunityTagScalarFieldEnum | Prisma.OpportunityTagScalarFieldEnum[];
};
export type OpportunityTagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    where?: Prisma.OpportunityTagWhereInput;
    orderBy?: Prisma.OpportunityTagOrderByWithRelationInput | Prisma.OpportunityTagOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OpportunityTagScalarFieldEnum | Prisma.OpportunityTagScalarFieldEnum[];
};
export type OpportunityTagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpportunityTagCreateInput, Prisma.OpportunityTagUncheckedCreateInput>;
};
export type OpportunityTagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OpportunityTagCreateManyInput | Prisma.OpportunityTagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OpportunityTagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    data: Prisma.OpportunityTagCreateManyInput | Prisma.OpportunityTagCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OpportunityTagIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OpportunityTagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpportunityTagUpdateInput, Prisma.OpportunityTagUncheckedUpdateInput>;
    where: Prisma.OpportunityTagWhereUniqueInput;
};
export type OpportunityTagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OpportunityTagUpdateManyMutationInput, Prisma.OpportunityTagUncheckedUpdateManyInput>;
    where?: Prisma.OpportunityTagWhereInput;
    limit?: number;
};
export type OpportunityTagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpportunityTagUpdateManyMutationInput, Prisma.OpportunityTagUncheckedUpdateManyInput>;
    where?: Prisma.OpportunityTagWhereInput;
    limit?: number;
    include?: Prisma.OpportunityTagIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OpportunityTagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    where: Prisma.OpportunityTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpportunityTagCreateInput, Prisma.OpportunityTagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OpportunityTagUpdateInput, Prisma.OpportunityTagUncheckedUpdateInput>;
};
export type OpportunityTagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    where: Prisma.OpportunityTagWhereUniqueInput;
};
export type OpportunityTagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpportunityTagWhereInput;
    limit?: number;
};
export type OpportunityTagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=OpportunityTag.d.ts.map