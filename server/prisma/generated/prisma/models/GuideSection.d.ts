import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type GuideSectionModel = runtime.Types.Result.DefaultSelection<Prisma.$GuideSectionPayload>;
export type AggregateGuideSection = {
    _count: GuideSectionCountAggregateOutputType | null;
    _avg: GuideSectionAvgAggregateOutputType | null;
    _sum: GuideSectionSumAggregateOutputType | null;
    _min: GuideSectionMinAggregateOutputType | null;
    _max: GuideSectionMaxAggregateOutputType | null;
};
export type GuideSectionAvgAggregateOutputType = {
    order: number | null;
};
export type GuideSectionSumAggregateOutputType = {
    order: number | null;
};
export type GuideSectionMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    content: string | null;
    videoUrl: string | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    order: number | null;
    stepId: string | null;
};
export type GuideSectionMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    content: string | null;
    videoUrl: string | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    order: number | null;
    stepId: string | null;
};
export type GuideSectionCountAggregateOutputType = {
    id: number;
    title: number;
    content: number;
    videoUrl: number;
    imageUrl: number;
    imagePublicId: number;
    order: number;
    stepId: number;
    _all: number;
};
export type GuideSectionAvgAggregateInputType = {
    order?: true;
};
export type GuideSectionSumAggregateInputType = {
    order?: true;
};
export type GuideSectionMinAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    videoUrl?: true;
    imageUrl?: true;
    imagePublicId?: true;
    order?: true;
    stepId?: true;
};
export type GuideSectionMaxAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    videoUrl?: true;
    imageUrl?: true;
    imagePublicId?: true;
    order?: true;
    stepId?: true;
};
export type GuideSectionCountAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    videoUrl?: true;
    imageUrl?: true;
    imagePublicId?: true;
    order?: true;
    stepId?: true;
    _all?: true;
};
export type GuideSectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuideSectionWhereInput;
    orderBy?: Prisma.GuideSectionOrderByWithRelationInput | Prisma.GuideSectionOrderByWithRelationInput[];
    cursor?: Prisma.GuideSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GuideSectionCountAggregateInputType;
    _avg?: GuideSectionAvgAggregateInputType;
    _sum?: GuideSectionSumAggregateInputType;
    _min?: GuideSectionMinAggregateInputType;
    _max?: GuideSectionMaxAggregateInputType;
};
export type GetGuideSectionAggregateType<T extends GuideSectionAggregateArgs> = {
    [P in keyof T & keyof AggregateGuideSection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGuideSection[P]> : Prisma.GetScalarType<T[P], AggregateGuideSection[P]>;
};
export type GuideSectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuideSectionWhereInput;
    orderBy?: Prisma.GuideSectionOrderByWithAggregationInput | Prisma.GuideSectionOrderByWithAggregationInput[];
    by: Prisma.GuideSectionScalarFieldEnum[] | Prisma.GuideSectionScalarFieldEnum;
    having?: Prisma.GuideSectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GuideSectionCountAggregateInputType | true;
    _avg?: GuideSectionAvgAggregateInputType;
    _sum?: GuideSectionSumAggregateInputType;
    _min?: GuideSectionMinAggregateInputType;
    _max?: GuideSectionMaxAggregateInputType;
};
export type GuideSectionGroupByOutputType = {
    id: string;
    title: string | null;
    content: string;
    videoUrl: string | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    order: number;
    stepId: string;
    _count: GuideSectionCountAggregateOutputType | null;
    _avg: GuideSectionAvgAggregateOutputType | null;
    _sum: GuideSectionSumAggregateOutputType | null;
    _min: GuideSectionMinAggregateOutputType | null;
    _max: GuideSectionMaxAggregateOutputType | null;
};
type GetGuideSectionGroupByPayload<T extends GuideSectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GuideSectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GuideSectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GuideSectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GuideSectionGroupByOutputType[P]>;
}>>;
export type GuideSectionWhereInput = {
    AND?: Prisma.GuideSectionWhereInput | Prisma.GuideSectionWhereInput[];
    OR?: Prisma.GuideSectionWhereInput[];
    NOT?: Prisma.GuideSectionWhereInput | Prisma.GuideSectionWhereInput[];
    id?: Prisma.StringFilter<"GuideSection"> | string;
    title?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    content?: Prisma.StringFilter<"GuideSection"> | string;
    videoUrl?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    order?: Prisma.IntFilter<"GuideSection"> | number;
    stepId?: Prisma.StringFilter<"GuideSection"> | string;
    step?: Prisma.XOR<Prisma.GuideStepScalarRelationFilter, Prisma.GuideStepWhereInput>;
};
export type GuideSectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    stepId?: Prisma.SortOrder;
    step?: Prisma.GuideStepOrderByWithRelationInput;
};
export type GuideSectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.GuideSectionWhereInput | Prisma.GuideSectionWhereInput[];
    OR?: Prisma.GuideSectionWhereInput[];
    NOT?: Prisma.GuideSectionWhereInput | Prisma.GuideSectionWhereInput[];
    title?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    content?: Prisma.StringFilter<"GuideSection"> | string;
    videoUrl?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    order?: Prisma.IntFilter<"GuideSection"> | number;
    stepId?: Prisma.StringFilter<"GuideSection"> | string;
    step?: Prisma.XOR<Prisma.GuideStepScalarRelationFilter, Prisma.GuideStepWhereInput>;
}, "id">;
export type GuideSectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    stepId?: Prisma.SortOrder;
    _count?: Prisma.GuideSectionCountOrderByAggregateInput;
    _avg?: Prisma.GuideSectionAvgOrderByAggregateInput;
    _max?: Prisma.GuideSectionMaxOrderByAggregateInput;
    _min?: Prisma.GuideSectionMinOrderByAggregateInput;
    _sum?: Prisma.GuideSectionSumOrderByAggregateInput;
};
export type GuideSectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.GuideSectionScalarWhereWithAggregatesInput | Prisma.GuideSectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.GuideSectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GuideSectionScalarWhereWithAggregatesInput | Prisma.GuideSectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"GuideSection"> | string;
    title?: Prisma.StringNullableWithAggregatesFilter<"GuideSection"> | string | null;
    content?: Prisma.StringWithAggregatesFilter<"GuideSection"> | string;
    videoUrl?: Prisma.StringNullableWithAggregatesFilter<"GuideSection"> | string | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"GuideSection"> | string | null;
    imagePublicId?: Prisma.StringNullableWithAggregatesFilter<"GuideSection"> | string | null;
    order?: Prisma.IntWithAggregatesFilter<"GuideSection"> | number;
    stepId?: Prisma.StringWithAggregatesFilter<"GuideSection"> | string;
};
export type GuideSectionCreateInput = {
    id?: string;
    title?: string | null;
    content: string;
    videoUrl?: string | null;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    order: number;
    step: Prisma.GuideStepCreateNestedOneWithoutSectionsInput;
};
export type GuideSectionUncheckedCreateInput = {
    id?: string;
    title?: string | null;
    content: string;
    videoUrl?: string | null;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    order: number;
    stepId: string;
};
export type GuideSectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    step?: Prisma.GuideStepUpdateOneRequiredWithoutSectionsNestedInput;
};
export type GuideSectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    stepId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type GuideSectionCreateManyInput = {
    id?: string;
    title?: string | null;
    content: string;
    videoUrl?: string | null;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    order: number;
    stepId: string;
};
export type GuideSectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type GuideSectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    stepId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type GuideSectionListRelationFilter = {
    every?: Prisma.GuideSectionWhereInput;
    some?: Prisma.GuideSectionWhereInput;
    none?: Prisma.GuideSectionWhereInput;
};
export type GuideSectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GuideSectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    stepId?: Prisma.SortOrder;
};
export type GuideSectionAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type GuideSectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    stepId?: Prisma.SortOrder;
};
export type GuideSectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    stepId?: Prisma.SortOrder;
};
export type GuideSectionSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type GuideSectionCreateNestedManyWithoutStepInput = {
    create?: Prisma.XOR<Prisma.GuideSectionCreateWithoutStepInput, Prisma.GuideSectionUncheckedCreateWithoutStepInput> | Prisma.GuideSectionCreateWithoutStepInput[] | Prisma.GuideSectionUncheckedCreateWithoutStepInput[];
    connectOrCreate?: Prisma.GuideSectionCreateOrConnectWithoutStepInput | Prisma.GuideSectionCreateOrConnectWithoutStepInput[];
    createMany?: Prisma.GuideSectionCreateManyStepInputEnvelope;
    connect?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
};
export type GuideSectionUncheckedCreateNestedManyWithoutStepInput = {
    create?: Prisma.XOR<Prisma.GuideSectionCreateWithoutStepInput, Prisma.GuideSectionUncheckedCreateWithoutStepInput> | Prisma.GuideSectionCreateWithoutStepInput[] | Prisma.GuideSectionUncheckedCreateWithoutStepInput[];
    connectOrCreate?: Prisma.GuideSectionCreateOrConnectWithoutStepInput | Prisma.GuideSectionCreateOrConnectWithoutStepInput[];
    createMany?: Prisma.GuideSectionCreateManyStepInputEnvelope;
    connect?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
};
export type GuideSectionUpdateManyWithoutStepNestedInput = {
    create?: Prisma.XOR<Prisma.GuideSectionCreateWithoutStepInput, Prisma.GuideSectionUncheckedCreateWithoutStepInput> | Prisma.GuideSectionCreateWithoutStepInput[] | Prisma.GuideSectionUncheckedCreateWithoutStepInput[];
    connectOrCreate?: Prisma.GuideSectionCreateOrConnectWithoutStepInput | Prisma.GuideSectionCreateOrConnectWithoutStepInput[];
    upsert?: Prisma.GuideSectionUpsertWithWhereUniqueWithoutStepInput | Prisma.GuideSectionUpsertWithWhereUniqueWithoutStepInput[];
    createMany?: Prisma.GuideSectionCreateManyStepInputEnvelope;
    set?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
    disconnect?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
    delete?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
    connect?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
    update?: Prisma.GuideSectionUpdateWithWhereUniqueWithoutStepInput | Prisma.GuideSectionUpdateWithWhereUniqueWithoutStepInput[];
    updateMany?: Prisma.GuideSectionUpdateManyWithWhereWithoutStepInput | Prisma.GuideSectionUpdateManyWithWhereWithoutStepInput[];
    deleteMany?: Prisma.GuideSectionScalarWhereInput | Prisma.GuideSectionScalarWhereInput[];
};
export type GuideSectionUncheckedUpdateManyWithoutStepNestedInput = {
    create?: Prisma.XOR<Prisma.GuideSectionCreateWithoutStepInput, Prisma.GuideSectionUncheckedCreateWithoutStepInput> | Prisma.GuideSectionCreateWithoutStepInput[] | Prisma.GuideSectionUncheckedCreateWithoutStepInput[];
    connectOrCreate?: Prisma.GuideSectionCreateOrConnectWithoutStepInput | Prisma.GuideSectionCreateOrConnectWithoutStepInput[];
    upsert?: Prisma.GuideSectionUpsertWithWhereUniqueWithoutStepInput | Prisma.GuideSectionUpsertWithWhereUniqueWithoutStepInput[];
    createMany?: Prisma.GuideSectionCreateManyStepInputEnvelope;
    set?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
    disconnect?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
    delete?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
    connect?: Prisma.GuideSectionWhereUniqueInput | Prisma.GuideSectionWhereUniqueInput[];
    update?: Prisma.GuideSectionUpdateWithWhereUniqueWithoutStepInput | Prisma.GuideSectionUpdateWithWhereUniqueWithoutStepInput[];
    updateMany?: Prisma.GuideSectionUpdateManyWithWhereWithoutStepInput | Prisma.GuideSectionUpdateManyWithWhereWithoutStepInput[];
    deleteMany?: Prisma.GuideSectionScalarWhereInput | Prisma.GuideSectionScalarWhereInput[];
};
export type GuideSectionCreateWithoutStepInput = {
    id?: string;
    title?: string | null;
    content: string;
    videoUrl?: string | null;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    order: number;
};
export type GuideSectionUncheckedCreateWithoutStepInput = {
    id?: string;
    title?: string | null;
    content: string;
    videoUrl?: string | null;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    order: number;
};
export type GuideSectionCreateOrConnectWithoutStepInput = {
    where: Prisma.GuideSectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuideSectionCreateWithoutStepInput, Prisma.GuideSectionUncheckedCreateWithoutStepInput>;
};
export type GuideSectionCreateManyStepInputEnvelope = {
    data: Prisma.GuideSectionCreateManyStepInput | Prisma.GuideSectionCreateManyStepInput[];
    skipDuplicates?: boolean;
};
export type GuideSectionUpsertWithWhereUniqueWithoutStepInput = {
    where: Prisma.GuideSectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.GuideSectionUpdateWithoutStepInput, Prisma.GuideSectionUncheckedUpdateWithoutStepInput>;
    create: Prisma.XOR<Prisma.GuideSectionCreateWithoutStepInput, Prisma.GuideSectionUncheckedCreateWithoutStepInput>;
};
export type GuideSectionUpdateWithWhereUniqueWithoutStepInput = {
    where: Prisma.GuideSectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.GuideSectionUpdateWithoutStepInput, Prisma.GuideSectionUncheckedUpdateWithoutStepInput>;
};
export type GuideSectionUpdateManyWithWhereWithoutStepInput = {
    where: Prisma.GuideSectionScalarWhereInput;
    data: Prisma.XOR<Prisma.GuideSectionUpdateManyMutationInput, Prisma.GuideSectionUncheckedUpdateManyWithoutStepInput>;
};
export type GuideSectionScalarWhereInput = {
    AND?: Prisma.GuideSectionScalarWhereInput | Prisma.GuideSectionScalarWhereInput[];
    OR?: Prisma.GuideSectionScalarWhereInput[];
    NOT?: Prisma.GuideSectionScalarWhereInput | Prisma.GuideSectionScalarWhereInput[];
    id?: Prisma.StringFilter<"GuideSection"> | string;
    title?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    content?: Prisma.StringFilter<"GuideSection"> | string;
    videoUrl?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"GuideSection"> | string | null;
    order?: Prisma.IntFilter<"GuideSection"> | number;
    stepId?: Prisma.StringFilter<"GuideSection"> | string;
};
export type GuideSectionCreateManyStepInput = {
    id?: string;
    title?: string | null;
    content: string;
    videoUrl?: string | null;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    order: number;
};
export type GuideSectionUpdateWithoutStepInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type GuideSectionUncheckedUpdateWithoutStepInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type GuideSectionUncheckedUpdateManyWithoutStepInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type GuideSectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    videoUrl?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    order?: boolean;
    stepId?: boolean;
    step?: boolean | Prisma.GuideStepDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["guideSection"]>;
export type GuideSectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    videoUrl?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    order?: boolean;
    stepId?: boolean;
    step?: boolean | Prisma.GuideStepDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["guideSection"]>;
export type GuideSectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    videoUrl?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    order?: boolean;
    stepId?: boolean;
    step?: boolean | Prisma.GuideStepDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["guideSection"]>;
export type GuideSectionSelectScalar = {
    id?: boolean;
    title?: boolean;
    content?: boolean;
    videoUrl?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    order?: boolean;
    stepId?: boolean;
};
export type GuideSectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "content" | "videoUrl" | "imageUrl" | "imagePublicId" | "order" | "stepId", ExtArgs["result"]["guideSection"]>;
export type GuideSectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    step?: boolean | Prisma.GuideStepDefaultArgs<ExtArgs>;
};
export type GuideSectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    step?: boolean | Prisma.GuideStepDefaultArgs<ExtArgs>;
};
export type GuideSectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    step?: boolean | Prisma.GuideStepDefaultArgs<ExtArgs>;
};
export type $GuideSectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GuideSection";
    objects: {
        step: Prisma.$GuideStepPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string | null;
        content: string;
        videoUrl: string | null;
        imageUrl: string | null;
        imagePublicId: string | null;
        order: number;
        stepId: string;
    }, ExtArgs["result"]["guideSection"]>;
    composites: {};
};
export type GuideSectionGetPayload<S extends boolean | null | undefined | GuideSectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload, S>;
export type GuideSectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GuideSectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GuideSectionCountAggregateInputType | true;
};
export interface GuideSectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GuideSection'];
        meta: {
            name: 'GuideSection';
        };
    };
    findUnique<T extends GuideSectionFindUniqueArgs>(args: Prisma.SelectSubset<T, GuideSectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GuideSectionClient<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GuideSectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GuideSectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GuideSectionClient<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GuideSectionFindFirstArgs>(args?: Prisma.SelectSubset<T, GuideSectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__GuideSectionClient<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GuideSectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GuideSectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GuideSectionClient<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GuideSectionFindManyArgs>(args?: Prisma.SelectSubset<T, GuideSectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GuideSectionCreateArgs>(args: Prisma.SelectSubset<T, GuideSectionCreateArgs<ExtArgs>>): Prisma.Prisma__GuideSectionClient<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GuideSectionCreateManyArgs>(args?: Prisma.SelectSubset<T, GuideSectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GuideSectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GuideSectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GuideSectionDeleteArgs>(args: Prisma.SelectSubset<T, GuideSectionDeleteArgs<ExtArgs>>): Prisma.Prisma__GuideSectionClient<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GuideSectionUpdateArgs>(args: Prisma.SelectSubset<T, GuideSectionUpdateArgs<ExtArgs>>): Prisma.Prisma__GuideSectionClient<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GuideSectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, GuideSectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GuideSectionUpdateManyArgs>(args: Prisma.SelectSubset<T, GuideSectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GuideSectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GuideSectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GuideSectionUpsertArgs>(args: Prisma.SelectSubset<T, GuideSectionUpsertArgs<ExtArgs>>): Prisma.Prisma__GuideSectionClient<runtime.Types.Result.GetResult<Prisma.$GuideSectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GuideSectionCountArgs>(args?: Prisma.Subset<T, GuideSectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GuideSectionCountAggregateOutputType> : number>;
    aggregate<T extends GuideSectionAggregateArgs>(args: Prisma.Subset<T, GuideSectionAggregateArgs>): Prisma.PrismaPromise<GetGuideSectionAggregateType<T>>;
    groupBy<T extends GuideSectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GuideSectionGroupByArgs['orderBy'];
    } : {
        orderBy?: GuideSectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GuideSectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuideSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GuideSectionFieldRefs;
}
export interface Prisma__GuideSectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    step<T extends Prisma.GuideStepDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GuideStepDefaultArgs<ExtArgs>>): Prisma.Prisma__GuideStepClient<runtime.Types.Result.GetResult<Prisma.$GuideStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GuideSectionFieldRefs {
    readonly id: Prisma.FieldRef<"GuideSection", 'String'>;
    readonly title: Prisma.FieldRef<"GuideSection", 'String'>;
    readonly content: Prisma.FieldRef<"GuideSection", 'String'>;
    readonly videoUrl: Prisma.FieldRef<"GuideSection", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"GuideSection", 'String'>;
    readonly imagePublicId: Prisma.FieldRef<"GuideSection", 'String'>;
    readonly order: Prisma.FieldRef<"GuideSection", 'Int'>;
    readonly stepId: Prisma.FieldRef<"GuideSection", 'String'>;
}
export type GuideSectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelect<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    include?: Prisma.GuideSectionInclude<ExtArgs> | null;
    where: Prisma.GuideSectionWhereUniqueInput;
};
export type GuideSectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelect<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    include?: Prisma.GuideSectionInclude<ExtArgs> | null;
    where: Prisma.GuideSectionWhereUniqueInput;
};
export type GuideSectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GuideSectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GuideSectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GuideSectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelect<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    include?: Prisma.GuideSectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuideSectionCreateInput, Prisma.GuideSectionUncheckedCreateInput>;
};
export type GuideSectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GuideSectionCreateManyInput | Prisma.GuideSectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GuideSectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    data: Prisma.GuideSectionCreateManyInput | Prisma.GuideSectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GuideSectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GuideSectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelect<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    include?: Prisma.GuideSectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuideSectionUpdateInput, Prisma.GuideSectionUncheckedUpdateInput>;
    where: Prisma.GuideSectionWhereUniqueInput;
};
export type GuideSectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GuideSectionUpdateManyMutationInput, Prisma.GuideSectionUncheckedUpdateManyInput>;
    where?: Prisma.GuideSectionWhereInput;
    limit?: number;
};
export type GuideSectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuideSectionUpdateManyMutationInput, Prisma.GuideSectionUncheckedUpdateManyInput>;
    where?: Prisma.GuideSectionWhereInput;
    limit?: number;
    include?: Prisma.GuideSectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GuideSectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelect<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    include?: Prisma.GuideSectionInclude<ExtArgs> | null;
    where: Prisma.GuideSectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuideSectionCreateInput, Prisma.GuideSectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GuideSectionUpdateInput, Prisma.GuideSectionUncheckedUpdateInput>;
};
export type GuideSectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelect<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    include?: Prisma.GuideSectionInclude<ExtArgs> | null;
    where: Prisma.GuideSectionWhereUniqueInput;
};
export type GuideSectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuideSectionWhereInput;
    limit?: number;
};
export type GuideSectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuideSectionSelect<ExtArgs> | null;
    omit?: Prisma.GuideSectionOmit<ExtArgs> | null;
    include?: Prisma.GuideSectionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=GuideSection.d.ts.map