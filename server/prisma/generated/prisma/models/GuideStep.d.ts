import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type GuideStepModel = runtime.Types.Result.DefaultSelection<Prisma.$GuideStepPayload>;
export type AggregateGuideStep = {
    _count: GuideStepCountAggregateOutputType | null;
    _avg: GuideStepAvgAggregateOutputType | null;
    _sum: GuideStepSumAggregateOutputType | null;
    _min: GuideStepMinAggregateOutputType | null;
    _max: GuideStepMaxAggregateOutputType | null;
};
export type GuideStepAvgAggregateOutputType = {
    order: number | null;
};
export type GuideStepSumAggregateOutputType = {
    order: number | null;
};
export type GuideStepMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    order: number | null;
    postId: string | null;
};
export type GuideStepMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    order: number | null;
    postId: string | null;
};
export type GuideStepCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    order: number;
    postId: number;
    _all: number;
};
export type GuideStepAvgAggregateInputType = {
    order?: true;
};
export type GuideStepSumAggregateInputType = {
    order?: true;
};
export type GuideStepMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    order?: true;
    postId?: true;
};
export type GuideStepMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    order?: true;
    postId?: true;
};
export type GuideStepCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    order?: true;
    postId?: true;
    _all?: true;
};
export type GuideStepAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuideStepWhereInput;
    orderBy?: Prisma.GuideStepOrderByWithRelationInput | Prisma.GuideStepOrderByWithRelationInput[];
    cursor?: Prisma.GuideStepWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GuideStepCountAggregateInputType;
    _avg?: GuideStepAvgAggregateInputType;
    _sum?: GuideStepSumAggregateInputType;
    _min?: GuideStepMinAggregateInputType;
    _max?: GuideStepMaxAggregateInputType;
};
export type GetGuideStepAggregateType<T extends GuideStepAggregateArgs> = {
    [P in keyof T & keyof AggregateGuideStep]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGuideStep[P]> : Prisma.GetScalarType<T[P], AggregateGuideStep[P]>;
};
export type GuideStepGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuideStepWhereInput;
    orderBy?: Prisma.GuideStepOrderByWithAggregationInput | Prisma.GuideStepOrderByWithAggregationInput[];
    by: Prisma.GuideStepScalarFieldEnum[] | Prisma.GuideStepScalarFieldEnum;
    having?: Prisma.GuideStepScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GuideStepCountAggregateInputType | true;
    _avg?: GuideStepAvgAggregateInputType;
    _sum?: GuideStepSumAggregateInputType;
    _min?: GuideStepMinAggregateInputType;
    _max?: GuideStepMaxAggregateInputType;
};
export type GuideStepGroupByOutputType = {
    id: string;
    title: string;
    description: string | null;
    order: number;
    postId: string;
    _count: GuideStepCountAggregateOutputType | null;
    _avg: GuideStepAvgAggregateOutputType | null;
    _sum: GuideStepSumAggregateOutputType | null;
    _min: GuideStepMinAggregateOutputType | null;
    _max: GuideStepMaxAggregateOutputType | null;
};
type GetGuideStepGroupByPayload<T extends GuideStepGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GuideStepGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GuideStepGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GuideStepGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GuideStepGroupByOutputType[P]>;
}>>;
export type GuideStepWhereInput = {
    AND?: Prisma.GuideStepWhereInput | Prisma.GuideStepWhereInput[];
    OR?: Prisma.GuideStepWhereInput[];
    NOT?: Prisma.GuideStepWhereInput | Prisma.GuideStepWhereInput[];
    id?: Prisma.StringFilter<"GuideStep"> | string;
    title?: Prisma.StringFilter<"GuideStep"> | string;
    description?: Prisma.StringNullableFilter<"GuideStep"> | string | null;
    order?: Prisma.IntFilter<"GuideStep"> | number;
    postId?: Prisma.StringFilter<"GuideStep"> | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    sections?: Prisma.GuideSectionListRelationFilter;
};
export type GuideStepOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
    sections?: Prisma.GuideSectionOrderByRelationAggregateInput;
};
export type GuideStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.GuideStepWhereInput | Prisma.GuideStepWhereInput[];
    OR?: Prisma.GuideStepWhereInput[];
    NOT?: Prisma.GuideStepWhereInput | Prisma.GuideStepWhereInput[];
    title?: Prisma.StringFilter<"GuideStep"> | string;
    description?: Prisma.StringNullableFilter<"GuideStep"> | string | null;
    order?: Prisma.IntFilter<"GuideStep"> | number;
    postId?: Prisma.StringFilter<"GuideStep"> | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    sections?: Prisma.GuideSectionListRelationFilter;
}, "id">;
export type GuideStepOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    _count?: Prisma.GuideStepCountOrderByAggregateInput;
    _avg?: Prisma.GuideStepAvgOrderByAggregateInput;
    _max?: Prisma.GuideStepMaxOrderByAggregateInput;
    _min?: Prisma.GuideStepMinOrderByAggregateInput;
    _sum?: Prisma.GuideStepSumOrderByAggregateInput;
};
export type GuideStepScalarWhereWithAggregatesInput = {
    AND?: Prisma.GuideStepScalarWhereWithAggregatesInput | Prisma.GuideStepScalarWhereWithAggregatesInput[];
    OR?: Prisma.GuideStepScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GuideStepScalarWhereWithAggregatesInput | Prisma.GuideStepScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"GuideStep"> | string;
    title?: Prisma.StringWithAggregatesFilter<"GuideStep"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"GuideStep"> | string | null;
    order?: Prisma.IntWithAggregatesFilter<"GuideStep"> | number;
    postId?: Prisma.StringWithAggregatesFilter<"GuideStep"> | string;
};
export type GuideStepCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    order: number;
    post: Prisma.PostCreateNestedOneWithoutStepsInput;
    sections?: Prisma.GuideSectionCreateNestedManyWithoutStepInput;
};
export type GuideStepUncheckedCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    order: number;
    postId: string;
    sections?: Prisma.GuideSectionUncheckedCreateNestedManyWithoutStepInput;
};
export type GuideStepUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    post?: Prisma.PostUpdateOneRequiredWithoutStepsNestedInput;
    sections?: Prisma.GuideSectionUpdateManyWithoutStepNestedInput;
};
export type GuideStepUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    sections?: Prisma.GuideSectionUncheckedUpdateManyWithoutStepNestedInput;
};
export type GuideStepCreateManyInput = {
    id?: string;
    title: string;
    description?: string | null;
    order: number;
    postId: string;
};
export type GuideStepUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type GuideStepUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type GuideStepListRelationFilter = {
    every?: Prisma.GuideStepWhereInput;
    some?: Prisma.GuideStepWhereInput;
    none?: Prisma.GuideStepWhereInput;
};
export type GuideStepOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GuideStepCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type GuideStepAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type GuideStepMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type GuideStepMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type GuideStepSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type GuideStepScalarRelationFilter = {
    is?: Prisma.GuideStepWhereInput;
    isNot?: Prisma.GuideStepWhereInput;
};
export type GuideStepCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.GuideStepCreateWithoutPostInput, Prisma.GuideStepUncheckedCreateWithoutPostInput> | Prisma.GuideStepCreateWithoutPostInput[] | Prisma.GuideStepUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.GuideStepCreateOrConnectWithoutPostInput | Prisma.GuideStepCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.GuideStepCreateManyPostInputEnvelope;
    connect?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
};
export type GuideStepUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.GuideStepCreateWithoutPostInput, Prisma.GuideStepUncheckedCreateWithoutPostInput> | Prisma.GuideStepCreateWithoutPostInput[] | Prisma.GuideStepUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.GuideStepCreateOrConnectWithoutPostInput | Prisma.GuideStepCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.GuideStepCreateManyPostInputEnvelope;
    connect?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
};
export type GuideStepUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.GuideStepCreateWithoutPostInput, Prisma.GuideStepUncheckedCreateWithoutPostInput> | Prisma.GuideStepCreateWithoutPostInput[] | Prisma.GuideStepUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.GuideStepCreateOrConnectWithoutPostInput | Prisma.GuideStepCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.GuideStepUpsertWithWhereUniqueWithoutPostInput | Prisma.GuideStepUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.GuideStepCreateManyPostInputEnvelope;
    set?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
    disconnect?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
    delete?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
    connect?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
    update?: Prisma.GuideStepUpdateWithWhereUniqueWithoutPostInput | Prisma.GuideStepUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.GuideStepUpdateManyWithWhereWithoutPostInput | Prisma.GuideStepUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.GuideStepScalarWhereInput | Prisma.GuideStepScalarWhereInput[];
};
export type GuideStepUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.GuideStepCreateWithoutPostInput, Prisma.GuideStepUncheckedCreateWithoutPostInput> | Prisma.GuideStepCreateWithoutPostInput[] | Prisma.GuideStepUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.GuideStepCreateOrConnectWithoutPostInput | Prisma.GuideStepCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.GuideStepUpsertWithWhereUniqueWithoutPostInput | Prisma.GuideStepUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.GuideStepCreateManyPostInputEnvelope;
    set?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
    disconnect?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
    delete?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
    connect?: Prisma.GuideStepWhereUniqueInput | Prisma.GuideStepWhereUniqueInput[];
    update?: Prisma.GuideStepUpdateWithWhereUniqueWithoutPostInput | Prisma.GuideStepUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.GuideStepUpdateManyWithWhereWithoutPostInput | Prisma.GuideStepUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.GuideStepScalarWhereInput | Prisma.GuideStepScalarWhereInput[];
};
export type GuideStepCreateNestedOneWithoutSectionsInput = {
    create?: Prisma.XOR<Prisma.GuideStepCreateWithoutSectionsInput, Prisma.GuideStepUncheckedCreateWithoutSectionsInput>;
    connectOrCreate?: Prisma.GuideStepCreateOrConnectWithoutSectionsInput;
    connect?: Prisma.GuideStepWhereUniqueInput;
};
export type GuideStepUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: Prisma.XOR<Prisma.GuideStepCreateWithoutSectionsInput, Prisma.GuideStepUncheckedCreateWithoutSectionsInput>;
    connectOrCreate?: Prisma.GuideStepCreateOrConnectWithoutSectionsInput;
    upsert?: Prisma.GuideStepUpsertWithoutSectionsInput;
    connect?: Prisma.GuideStepWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GuideStepUpdateToOneWithWhereWithoutSectionsInput, Prisma.GuideStepUpdateWithoutSectionsInput>, Prisma.GuideStepUncheckedUpdateWithoutSectionsInput>;
};
export type GuideStepCreateWithoutPostInput = {
    id?: string;
    title: string;
    description?: string | null;
    order: number;
    sections?: Prisma.GuideSectionCreateNestedManyWithoutStepInput;
};
export type GuideStepUncheckedCreateWithoutPostInput = {
    id?: string;
    title: string;
    description?: string | null;
    order: number;
    sections?: Prisma.GuideSectionUncheckedCreateNestedManyWithoutStepInput;
};
export type GuideStepCreateOrConnectWithoutPostInput = {
    where: Prisma.GuideStepWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuideStepCreateWithoutPostInput, Prisma.GuideStepUncheckedCreateWithoutPostInput>;
};
export type GuideStepCreateManyPostInputEnvelope = {
    data: Prisma.GuideStepCreateManyPostInput | Prisma.GuideStepCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type GuideStepUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.GuideStepWhereUniqueInput;
    update: Prisma.XOR<Prisma.GuideStepUpdateWithoutPostInput, Prisma.GuideStepUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.GuideStepCreateWithoutPostInput, Prisma.GuideStepUncheckedCreateWithoutPostInput>;
};
export type GuideStepUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.GuideStepWhereUniqueInput;
    data: Prisma.XOR<Prisma.GuideStepUpdateWithoutPostInput, Prisma.GuideStepUncheckedUpdateWithoutPostInput>;
};
export type GuideStepUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.GuideStepScalarWhereInput;
    data: Prisma.XOR<Prisma.GuideStepUpdateManyMutationInput, Prisma.GuideStepUncheckedUpdateManyWithoutPostInput>;
};
export type GuideStepScalarWhereInput = {
    AND?: Prisma.GuideStepScalarWhereInput | Prisma.GuideStepScalarWhereInput[];
    OR?: Prisma.GuideStepScalarWhereInput[];
    NOT?: Prisma.GuideStepScalarWhereInput | Prisma.GuideStepScalarWhereInput[];
    id?: Prisma.StringFilter<"GuideStep"> | string;
    title?: Prisma.StringFilter<"GuideStep"> | string;
    description?: Prisma.StringNullableFilter<"GuideStep"> | string | null;
    order?: Prisma.IntFilter<"GuideStep"> | number;
    postId?: Prisma.StringFilter<"GuideStep"> | string;
};
export type GuideStepCreateWithoutSectionsInput = {
    id?: string;
    title: string;
    description?: string | null;
    order: number;
    post: Prisma.PostCreateNestedOneWithoutStepsInput;
};
export type GuideStepUncheckedCreateWithoutSectionsInput = {
    id?: string;
    title: string;
    description?: string | null;
    order: number;
    postId: string;
};
export type GuideStepCreateOrConnectWithoutSectionsInput = {
    where: Prisma.GuideStepWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuideStepCreateWithoutSectionsInput, Prisma.GuideStepUncheckedCreateWithoutSectionsInput>;
};
export type GuideStepUpsertWithoutSectionsInput = {
    update: Prisma.XOR<Prisma.GuideStepUpdateWithoutSectionsInput, Prisma.GuideStepUncheckedUpdateWithoutSectionsInput>;
    create: Prisma.XOR<Prisma.GuideStepCreateWithoutSectionsInput, Prisma.GuideStepUncheckedCreateWithoutSectionsInput>;
    where?: Prisma.GuideStepWhereInput;
};
export type GuideStepUpdateToOneWithWhereWithoutSectionsInput = {
    where?: Prisma.GuideStepWhereInput;
    data: Prisma.XOR<Prisma.GuideStepUpdateWithoutSectionsInput, Prisma.GuideStepUncheckedUpdateWithoutSectionsInput>;
};
export type GuideStepUpdateWithoutSectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    post?: Prisma.PostUpdateOneRequiredWithoutStepsNestedInput;
};
export type GuideStepUncheckedUpdateWithoutSectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type GuideStepCreateManyPostInput = {
    id?: string;
    title: string;
    description?: string | null;
    order: number;
};
export type GuideStepUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    sections?: Prisma.GuideSectionUpdateManyWithoutStepNestedInput;
};
export type GuideStepUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    sections?: Prisma.GuideSectionUncheckedUpdateManyWithoutStepNestedInput;
};
export type GuideStepUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type GuideStepCountOutputType = {
    sections: number;
};
export type GuideStepCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sections?: boolean | GuideStepCountOutputTypeCountSectionsArgs;
};
export type GuideStepCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepCountOutputTypeSelect<ExtArgs> | null;
};
export type GuideStepCountOutputTypeCountSectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuideSectionWhereInput;
};
export type GuideStepSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    order?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    sections?: boolean | Prisma.GuideStep$sectionsArgs<ExtArgs>;
    _count?: boolean | Prisma.GuideStepCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["guideStep"]>;
export type GuideStepSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    order?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["guideStep"]>;
export type GuideStepSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    order?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["guideStep"]>;
export type GuideStepSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    order?: boolean;
    postId?: boolean;
};
export type GuideStepOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "order" | "postId", ExtArgs["result"]["guideStep"]>;
export type GuideStepInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    sections?: boolean | Prisma.GuideStep$sectionsArgs<ExtArgs>;
    _count?: boolean | Prisma.GuideStepCountOutputTypeDefaultArgs<ExtArgs>;
};
export type GuideStepIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type GuideStepIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type $GuideStepPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GuideStep";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
        sections: Prisma.$GuideSectionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        description: string | null;
        order: number;
        postId: string;
    }, ExtArgs["result"]["guideStep"]>;
    composites: {};
};
export type GuideStepGetPayload<S extends boolean | null | undefined | GuideStepDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GuideStepPayload, S>;
export type GuideStepCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GuideStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GuideStepCountAggregateInputType | true;
};
export interface GuideStepDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GuideStep'];
        meta: {
            name: 'GuideStep';
        };
    };
    findUnique<T extends GuideStepFindUniqueArgs>(args: Prisma.SelectSubset<T, GuideStepFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GuideStepFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GuideStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GuideStepFindFirstArgs>(args?: Prisma.SelectSubset<T, GuideStepFindFirstArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GuideStepFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GuideStepFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GuideStepFindManyArgs>(args?: Prisma.SelectSubset<T, GuideStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GuideStepCreateArgs>(args: Prisma.SelectSubset<T, GuideStepCreateArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GuideStepCreateManyArgs>(args?: Prisma.SelectSubset<T, GuideStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GuideStepCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GuideStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GuideStepDeleteArgs>(args: Prisma.SelectSubset<T, GuideStepDeleteArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GuideStepUpdateArgs>(args: Prisma.SelectSubset<T, GuideStepUpdateArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GuideStepDeleteManyArgs>(args?: Prisma.SelectSubset<T, GuideStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GuideStepUpdateManyArgs>(args: Prisma.SelectSubset<T, GuideStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GuideStepUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GuideStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GuideStepUpsertArgs>(args: Prisma.SelectSubset<T, GuideStepUpsertArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GuideStepCountArgs>(args?: Prisma.Subset<T, GuideStepCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GuideStepCountAggregateOutputType> : number>;
    aggregate<T extends GuideStepAggregateArgs>(args: Prisma.Subset<T, GuideStepAggregateArgs>): Prisma.PrismaPromise<GetGuideStepAggregateType<T>>;
    groupBy<T extends GuideStepGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GuideStepGroupByArgs['orderBy'];
    } : {
        orderBy?: GuideStepGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GuideStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuideStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GuideStepFieldRefs;
}
export interface Prisma__GuideStepClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sections<T extends Prisma.GuideStep$sectionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GuideStep$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GuideStepFieldRefs {
    readonly id: Prisma.FieldRef<"GuideStep", 'String'>;
    readonly title: Prisma.FieldRef<"GuideStep", 'String'>;
    readonly description: Prisma.FieldRef<"GuideStep", 'String'>;
    readonly order: Prisma.FieldRef<"GuideStep", 'Int'>;
    readonly postId: Prisma.FieldRef<"GuideStep", 'String'>;
}
export type GuideStepFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    where: Prisma.GuideStepWhereUniqueInput;
};
export type GuideStepFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    where: Prisma.GuideStepWhereUniqueInput;
};
export type GuideStepFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    where?: Prisma.GuideStepWhereInput;
    orderBy?: Prisma.GuideStepOrderByWithRelationInput | Prisma.GuideStepOrderByWithRelationInput[];
    cursor?: Prisma.GuideStepWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuideStepScalarFieldEnum | Prisma.GuideStepScalarFieldEnum[];
};
export type GuideStepFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    where?: Prisma.GuideStepWhereInput;
    orderBy?: Prisma.GuideStepOrderByWithRelationInput | Prisma.GuideStepOrderByWithRelationInput[];
    cursor?: Prisma.GuideStepWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuideStepScalarFieldEnum | Prisma.GuideStepScalarFieldEnum[];
};
export type GuideStepFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    where?: Prisma.GuideStepWhereInput;
    orderBy?: Prisma.GuideStepOrderByWithRelationInput | Prisma.GuideStepOrderByWithRelationInput[];
    cursor?: Prisma.GuideStepWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuideStepScalarFieldEnum | Prisma.GuideStepScalarFieldEnum[];
};
export type GuideStepCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuideStepCreateInput, Prisma.GuideStepUncheckedCreateInput>;
};
export type GuideStepCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GuideStepCreateManyInput | Prisma.GuideStepCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GuideStepCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    data: Prisma.GuideStepCreateManyInput | Prisma.GuideStepCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GuideStepIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GuideStepUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuideStepUpdateInput, Prisma.GuideStepUncheckedUpdateInput>;
    where: Prisma.GuideStepWhereUniqueInput;
};
export type GuideStepUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GuideStepUpdateManyMutationInput, Prisma.GuideStepUncheckedUpdateManyInput>;
    where?: Prisma.GuideStepWhereInput;
    limit?: number;
};
export type GuideStepUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuideStepUpdateManyMutationInput, Prisma.GuideStepUncheckedUpdateManyInput>;
    where?: Prisma.GuideStepWhereInput;
    limit?: number;
    include?: Prisma.GuideStepIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GuideStepUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    where: Prisma.GuideStepWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuideStepCreateInput, Prisma.GuideStepUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GuideStepUpdateInput, Prisma.GuideStepUncheckedUpdateInput>;
};
export type GuideStepDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
    where: Prisma.GuideStepWhereUniqueInput;
};
export type GuideStepDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuideStepWhereInput;
    limit?: number;
};
export type GuideStep$sectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelect<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    include?: Prisma.GuideSectionInclude<ExtArgs> | null;
    where?: Prisma.GuideSectionWhereInput;
    orderBy?: Prisma.GuideSectionOrderByWithRelationInput | Prisma.GuideSectionOrderByWithRelationInput[];
    cursor?: Prisma.GuideSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuideSectionScalarFieldEnum | Prisma.GuideSectionScalarFieldEnum[];
};
export type GuideStepDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideStepSelect<ExtArgs> | null;
    omit?: Prisma.GuideStepOmit<ExtArgs> | null;
    include?: Prisma.GuideStepInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=GuideStep.d.ts.map