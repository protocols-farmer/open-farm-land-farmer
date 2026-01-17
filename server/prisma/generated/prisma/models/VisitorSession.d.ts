import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VisitorSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$VisitorSessionPayload>;
export type AggregateVisitorSession = {
    _count: VisitorSessionCountAggregateOutputType | null;
    _min: VisitorSessionMinAggregateOutputType | null;
    _max: VisitorSessionMaxAggregateOutputType | null;
};
export type VisitorSessionMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    initialIpAddress: string | null;
    initialUserAgent: string | null;
    initialPath: string | null;
    userId: string | null;
};
export type VisitorSessionMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    initialIpAddress: string | null;
    initialUserAgent: string | null;
    initialPath: string | null;
    userId: string | null;
};
export type VisitorSessionCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    initialIpAddress: number;
    initialUserAgent: number;
    initialPath: number;
    userId: number;
    _all: number;
};
export type VisitorSessionMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    initialIpAddress?: true;
    initialUserAgent?: true;
    initialPath?: true;
    userId?: true;
};
export type VisitorSessionMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    initialIpAddress?: true;
    initialUserAgent?: true;
    initialPath?: true;
    userId?: true;
};
export type VisitorSessionCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    initialIpAddress?: true;
    initialUserAgent?: true;
    initialPath?: true;
    userId?: true;
    _all?: true;
};
export type VisitorSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VisitorSessionWhereInput;
    orderBy?: Prisma.VisitorSessionOrderByWithRelationInput | Prisma.VisitorSessionOrderByWithRelationInput[];
    cursor?: Prisma.VisitorSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VisitorSessionCountAggregateInputType;
    _min?: VisitorSessionMinAggregateInputType;
    _max?: VisitorSessionMaxAggregateInputType;
};
export type GetVisitorSessionAggregateType<T extends VisitorSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateVisitorSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVisitorSession[P]> : Prisma.GetScalarType<T[P], AggregateVisitorSession[P]>;
};
export type VisitorSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VisitorSessionWhereInput;
    orderBy?: Prisma.VisitorSessionOrderByWithAggregationInput | Prisma.VisitorSessionOrderByWithAggregationInput[];
    by: Prisma.VisitorSessionScalarFieldEnum[] | Prisma.VisitorSessionScalarFieldEnum;
    having?: Prisma.VisitorSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VisitorSessionCountAggregateInputType | true;
    _min?: VisitorSessionMinAggregateInputType;
    _max?: VisitorSessionMaxAggregateInputType;
};
export type VisitorSessionGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    initialIpAddress: string | null;
    initialUserAgent: string | null;
    initialPath: string | null;
    userId: string | null;
    _count: VisitorSessionCountAggregateOutputType | null;
    _min: VisitorSessionMinAggregateOutputType | null;
    _max: VisitorSessionMaxAggregateOutputType | null;
};
type GetVisitorSessionGroupByPayload<T extends VisitorSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VisitorSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VisitorSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VisitorSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VisitorSessionGroupByOutputType[P]>;
}>>;
export type VisitorSessionWhereInput = {
    AND?: Prisma.VisitorSessionWhereInput | Prisma.VisitorSessionWhereInput[];
    OR?: Prisma.VisitorSessionWhereInput[];
    NOT?: Prisma.VisitorSessionWhereInput | Prisma.VisitorSessionWhereInput[];
    id?: Prisma.StringFilter<"VisitorSession"> | string;
    createdAt?: Prisma.DateTimeFilter<"VisitorSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VisitorSession"> | Date | string;
    initialIpAddress?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    initialUserAgent?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    initialPath?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    userId?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    pageViews?: Prisma.PageViewLogListRelationFilter;
};
export type VisitorSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    initialIpAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    initialUserAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    initialPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    pageViews?: Prisma.PageViewLogOrderByRelationAggregateInput;
};
export type VisitorSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VisitorSessionWhereInput | Prisma.VisitorSessionWhereInput[];
    OR?: Prisma.VisitorSessionWhereInput[];
    NOT?: Prisma.VisitorSessionWhereInput | Prisma.VisitorSessionWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"VisitorSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VisitorSession"> | Date | string;
    initialIpAddress?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    initialUserAgent?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    initialPath?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    userId?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    pageViews?: Prisma.PageViewLogListRelationFilter;
}, "id">;
export type VisitorSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    initialIpAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    initialUserAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    initialPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.VisitorSessionCountOrderByAggregateInput;
    _max?: Prisma.VisitorSessionMaxOrderByAggregateInput;
    _min?: Prisma.VisitorSessionMinOrderByAggregateInput;
};
export type VisitorSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.VisitorSessionScalarWhereWithAggregatesInput | Prisma.VisitorSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.VisitorSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VisitorSessionScalarWhereWithAggregatesInput | Prisma.VisitorSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VisitorSession"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"VisitorSession"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"VisitorSession"> | Date | string;
    initialIpAddress?: Prisma.StringNullableWithAggregatesFilter<"VisitorSession"> | string | null;
    initialUserAgent?: Prisma.StringNullableWithAggregatesFilter<"VisitorSession"> | string | null;
    initialPath?: Prisma.StringNullableWithAggregatesFilter<"VisitorSession"> | string | null;
    userId?: Prisma.StringNullableWithAggregatesFilter<"VisitorSession"> | string | null;
};
export type VisitorSessionCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    initialIpAddress?: string | null;
    initialUserAgent?: string | null;
    initialPath?: string | null;
    user?: Prisma.UserCreateNestedOneWithoutVisitorSessionsInput;
    pageViews?: Prisma.PageViewLogCreateNestedManyWithoutSessionInput;
};
export type VisitorSessionUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    initialIpAddress?: string | null;
    initialUserAgent?: string | null;
    initialPath?: string | null;
    userId?: string | null;
    pageViews?: Prisma.PageViewLogUncheckedCreateNestedManyWithoutSessionInput;
};
export type VisitorSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneWithoutVisitorSessionsNestedInput;
    pageViews?: Prisma.PageViewLogUpdateManyWithoutSessionNestedInput;
};
export type VisitorSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pageViews?: Prisma.PageViewLogUncheckedUpdateManyWithoutSessionNestedInput;
};
export type VisitorSessionCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    initialIpAddress?: string | null;
    initialUserAgent?: string | null;
    initialPath?: string | null;
    userId?: string | null;
};
export type VisitorSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VisitorSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VisitorSessionListRelationFilter = {
    every?: Prisma.VisitorSessionWhereInput;
    some?: Prisma.VisitorSessionWhereInput;
    none?: Prisma.VisitorSessionWhereInput;
};
export type VisitorSessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VisitorSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    initialIpAddress?: Prisma.SortOrder;
    initialUserAgent?: Prisma.SortOrder;
    initialPath?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type VisitorSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    initialIpAddress?: Prisma.SortOrder;
    initialUserAgent?: Prisma.SortOrder;
    initialPath?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type VisitorSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    initialIpAddress?: Prisma.SortOrder;
    initialUserAgent?: Prisma.SortOrder;
    initialPath?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type VisitorSessionScalarRelationFilter = {
    is?: Prisma.VisitorSessionWhereInput;
    isNot?: Prisma.VisitorSessionWhereInput;
};
export type VisitorSessionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VisitorSessionCreateWithoutUserInput, Prisma.VisitorSessionUncheckedCreateWithoutUserInput> | Prisma.VisitorSessionCreateWithoutUserInput[] | Prisma.VisitorSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VisitorSessionCreateOrConnectWithoutUserInput | Prisma.VisitorSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VisitorSessionCreateManyUserInputEnvelope;
    connect?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
};
export type VisitorSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VisitorSessionCreateWithoutUserInput, Prisma.VisitorSessionUncheckedCreateWithoutUserInput> | Prisma.VisitorSessionCreateWithoutUserInput[] | Prisma.VisitorSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VisitorSessionCreateOrConnectWithoutUserInput | Prisma.VisitorSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VisitorSessionCreateManyUserInputEnvelope;
    connect?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
};
export type VisitorSessionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VisitorSessionCreateWithoutUserInput, Prisma.VisitorSessionUncheckedCreateWithoutUserInput> | Prisma.VisitorSessionCreateWithoutUserInput[] | Prisma.VisitorSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VisitorSessionCreateOrConnectWithoutUserInput | Prisma.VisitorSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VisitorSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.VisitorSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VisitorSessionCreateManyUserInputEnvelope;
    set?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
    disconnect?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
    delete?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
    connect?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
    update?: Prisma.VisitorSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.VisitorSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VisitorSessionUpdateManyWithWhereWithoutUserInput | Prisma.VisitorSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VisitorSessionScalarWhereInput | Prisma.VisitorSessionScalarWhereInput[];
};
export type VisitorSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VisitorSessionCreateWithoutUserInput, Prisma.VisitorSessionUncheckedCreateWithoutUserInput> | Prisma.VisitorSessionCreateWithoutUserInput[] | Prisma.VisitorSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VisitorSessionCreateOrConnectWithoutUserInput | Prisma.VisitorSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VisitorSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.VisitorSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VisitorSessionCreateManyUserInputEnvelope;
    set?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
    disconnect?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
    delete?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
    connect?: Prisma.VisitorSessionWhereUniqueInput | Prisma.VisitorSessionWhereUniqueInput[];
    update?: Prisma.VisitorSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.VisitorSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VisitorSessionUpdateManyWithWhereWithoutUserInput | Prisma.VisitorSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VisitorSessionScalarWhereInput | Prisma.VisitorSessionScalarWhereInput[];
};
export type VisitorSessionCreateNestedOneWithoutPageViewsInput = {
    create?: Prisma.XOR<Prisma.VisitorSessionCreateWithoutPageViewsInput, Prisma.VisitorSessionUncheckedCreateWithoutPageViewsInput>;
    connectOrCreate?: Prisma.VisitorSessionCreateOrConnectWithoutPageViewsInput;
    connect?: Prisma.VisitorSessionWhereUniqueInput;
};
export type VisitorSessionUpdateOneRequiredWithoutPageViewsNestedInput = {
    create?: Prisma.XOR<Prisma.VisitorSessionCreateWithoutPageViewsInput, Prisma.VisitorSessionUncheckedCreateWithoutPageViewsInput>;
    connectOrCreate?: Prisma.VisitorSessionCreateOrConnectWithoutPageViewsInput;
    upsert?: Prisma.VisitorSessionUpsertWithoutPageViewsInput;
    connect?: Prisma.VisitorSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VisitorSessionUpdateToOneWithWhereWithoutPageViewsInput, Prisma.VisitorSessionUpdateWithoutPageViewsInput>, Prisma.VisitorSessionUncheckedUpdateWithoutPageViewsInput>;
};
export type VisitorSessionCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    initialIpAddress?: string | null;
    initialUserAgent?: string | null;
    initialPath?: string | null;
    pageViews?: Prisma.PageViewLogCreateNestedManyWithoutSessionInput;
};
export type VisitorSessionUncheckedCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    initialIpAddress?: string | null;
    initialUserAgent?: string | null;
    initialPath?: string | null;
    pageViews?: Prisma.PageViewLogUncheckedCreateNestedManyWithoutSessionInput;
};
export type VisitorSessionCreateOrConnectWithoutUserInput = {
    where: Prisma.VisitorSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.VisitorSessionCreateWithoutUserInput, Prisma.VisitorSessionUncheckedCreateWithoutUserInput>;
};
export type VisitorSessionCreateManyUserInputEnvelope = {
    data: Prisma.VisitorSessionCreateManyUserInput | Prisma.VisitorSessionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type VisitorSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.VisitorSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.VisitorSessionUpdateWithoutUserInput, Prisma.VisitorSessionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.VisitorSessionCreateWithoutUserInput, Prisma.VisitorSessionUncheckedCreateWithoutUserInput>;
};
export type VisitorSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.VisitorSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.VisitorSessionUpdateWithoutUserInput, Prisma.VisitorSessionUncheckedUpdateWithoutUserInput>;
};
export type VisitorSessionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.VisitorSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.VisitorSessionUpdateManyMutationInput, Prisma.VisitorSessionUncheckedUpdateManyWithoutUserInput>;
};
export type VisitorSessionScalarWhereInput = {
    AND?: Prisma.VisitorSessionScalarWhereInput | Prisma.VisitorSessionScalarWhereInput[];
    OR?: Prisma.VisitorSessionScalarWhereInput[];
    NOT?: Prisma.VisitorSessionScalarWhereInput | Prisma.VisitorSessionScalarWhereInput[];
    id?: Prisma.StringFilter<"VisitorSession"> | string;
    createdAt?: Prisma.DateTimeFilter<"VisitorSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VisitorSession"> | Date | string;
    initialIpAddress?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    initialUserAgent?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    initialPath?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
    userId?: Prisma.StringNullableFilter<"VisitorSession"> | string | null;
};
export type VisitorSessionCreateWithoutPageViewsInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    initialIpAddress?: string | null;
    initialUserAgent?: string | null;
    initialPath?: string | null;
    user?: Prisma.UserCreateNestedOneWithoutVisitorSessionsInput;
};
export type VisitorSessionUncheckedCreateWithoutPageViewsInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    initialIpAddress?: string | null;
    initialUserAgent?: string | null;
    initialPath?: string | null;
    userId?: string | null;
};
export type VisitorSessionCreateOrConnectWithoutPageViewsInput = {
    where: Prisma.VisitorSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.VisitorSessionCreateWithoutPageViewsInput, Prisma.VisitorSessionUncheckedCreateWithoutPageViewsInput>;
};
export type VisitorSessionUpsertWithoutPageViewsInput = {
    update: Prisma.XOR<Prisma.VisitorSessionUpdateWithoutPageViewsInput, Prisma.VisitorSessionUncheckedUpdateWithoutPageViewsInput>;
    create: Prisma.XOR<Prisma.VisitorSessionCreateWithoutPageViewsInput, Prisma.VisitorSessionUncheckedCreateWithoutPageViewsInput>;
    where?: Prisma.VisitorSessionWhereInput;
};
export type VisitorSessionUpdateToOneWithWhereWithoutPageViewsInput = {
    where?: Prisma.VisitorSessionWhereInput;
    data: Prisma.XOR<Prisma.VisitorSessionUpdateWithoutPageViewsInput, Prisma.VisitorSessionUncheckedUpdateWithoutPageViewsInput>;
};
export type VisitorSessionUpdateWithoutPageViewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneWithoutVisitorSessionsNestedInput;
};
export type VisitorSessionUncheckedUpdateWithoutPageViewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VisitorSessionCreateManyUserInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    initialIpAddress?: string | null;
    initialUserAgent?: string | null;
    initialPath?: string | null;
};
export type VisitorSessionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pageViews?: Prisma.PageViewLogUpdateManyWithoutSessionNestedInput;
};
export type VisitorSessionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pageViews?: Prisma.PageViewLogUncheckedUpdateManyWithoutSessionNestedInput;
};
export type VisitorSessionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    initialIpAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialUserAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    initialPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VisitorSessionCountOutputType = {
    pageViews: number;
};
export type VisitorSessionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pageViews?: boolean | VisitorSessionCountOutputTypeCountPageViewsArgs;
};
export type VisitorSessionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionCountOutputTypeSelect<ExtArgs> | null;
};
export type VisitorSessionCountOutputTypeCountPageViewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PageViewLogWhereInput;
};
export type VisitorSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    initialIpAddress?: boolean;
    initialUserAgent?: boolean;
    initialPath?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.VisitorSession$userArgs<ExtArgs>;
    pageViews?: boolean | Prisma.VisitorSession$pageViewsArgs<ExtArgs>;
    _count?: boolean | Prisma.VisitorSessionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["visitorSession"]>;
export type VisitorSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    initialIpAddress?: boolean;
    initialUserAgent?: boolean;
    initialPath?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.VisitorSession$userArgs<ExtArgs>;
}, ExtArgs["result"]["visitorSession"]>;
export type VisitorSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    initialIpAddress?: boolean;
    initialUserAgent?: boolean;
    initialPath?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.VisitorSession$userArgs<ExtArgs>;
}, ExtArgs["result"]["visitorSession"]>;
export type VisitorSessionSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    initialIpAddress?: boolean;
    initialUserAgent?: boolean;
    initialPath?: boolean;
    userId?: boolean;
};
export type VisitorSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "initialIpAddress" | "initialUserAgent" | "initialPath" | "userId", ExtArgs["result"]["visitorSession"]>;
export type VisitorSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.VisitorSession$userArgs<ExtArgs>;
    pageViews?: boolean | Prisma.VisitorSession$pageViewsArgs<ExtArgs>;
    _count?: boolean | Prisma.VisitorSessionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type VisitorSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.VisitorSession$userArgs<ExtArgs>;
};
export type VisitorSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.VisitorSession$userArgs<ExtArgs>;
};
export type $VisitorSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VisitorSession";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
        pageViews: Prisma.$PageViewLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        initialIpAddress: string | null;
        initialUserAgent: string | null;
        initialPath: string | null;
        userId: string | null;
    }, ExtArgs["result"]["visitorSession"]>;
    composites: {};
};
export type VisitorSessionGetPayload<S extends boolean | null | undefined | VisitorSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload, S>;
export type VisitorSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VisitorSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VisitorSessionCountAggregateInputType | true;
};
export interface VisitorSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VisitorSession'];
        meta: {
            name: 'VisitorSession';
        };
    };
    findUnique<T extends VisitorSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, VisitorSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VisitorSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VisitorSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VisitorSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, VisitorSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VisitorSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VisitorSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VisitorSessionFindManyArgs>(args?: Prisma.SelectSubset<T, VisitorSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VisitorSessionCreateArgs>(args: Prisma.SelectSubset<T, VisitorSessionCreateArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VisitorSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, VisitorSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VisitorSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VisitorSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VisitorSessionDeleteArgs>(args: Prisma.SelectSubset<T, VisitorSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VisitorSessionUpdateArgs>(args: Prisma.SelectSubset<T, VisitorSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VisitorSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, VisitorSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VisitorSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, VisitorSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VisitorSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VisitorSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VisitorSessionUpsertArgs>(args: Prisma.SelectSubset<T, VisitorSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__VisitorSessionClient<runtime.Types.Result.GetResult<Prisma.$VisitorSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VisitorSessionCountArgs>(args?: Prisma.Subset<T, VisitorSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VisitorSessionCountAggregateOutputType> : number>;
    aggregate<T extends VisitorSessionAggregateArgs>(args: Prisma.Subset<T, VisitorSessionAggregateArgs>): Prisma.PrismaPromise<GetVisitorSessionAggregateType<T>>;
    groupBy<T extends VisitorSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VisitorSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: VisitorSessionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VisitorSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitorSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VisitorSessionFieldRefs;
}
export interface Prisma__VisitorSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.VisitorSession$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VisitorSession$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    pageViews<T extends Prisma.VisitorSession$pageViewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VisitorSession$pageViewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PageViewLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VisitorSessionFieldRefs {
    readonly id: Prisma.FieldRef<"VisitorSession", 'String'>;
    readonly createdAt: Prisma.FieldRef<"VisitorSession", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"VisitorSession", 'DateTime'>;
    readonly initialIpAddress: Prisma.FieldRef<"VisitorSession", 'String'>;
    readonly initialUserAgent: Prisma.FieldRef<"VisitorSession", 'String'>;
    readonly initialPath: Prisma.FieldRef<"VisitorSession", 'String'>;
    readonly userId: Prisma.FieldRef<"VisitorSession", 'String'>;
}
export type VisitorSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    where: Prisma.VisitorSessionWhereUniqueInput;
};
export type VisitorSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    where: Prisma.VisitorSessionWhereUniqueInput;
};
export type VisitorSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    where?: Prisma.VisitorSessionWhereInput;
    orderBy?: Prisma.VisitorSessionOrderByWithRelationInput | Prisma.VisitorSessionOrderByWithRelationInput[];
    cursor?: Prisma.VisitorSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VisitorSessionScalarFieldEnum | Prisma.VisitorSessionScalarFieldEnum[];
};
export type VisitorSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    where?: Prisma.VisitorSessionWhereInput;
    orderBy?: Prisma.VisitorSessionOrderByWithRelationInput | Prisma.VisitorSessionOrderByWithRelationInput[];
    cursor?: Prisma.VisitorSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VisitorSessionScalarFieldEnum | Prisma.VisitorSessionScalarFieldEnum[];
};
export type VisitorSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    where?: Prisma.VisitorSessionWhereInput;
    orderBy?: Prisma.VisitorSessionOrderByWithRelationInput | Prisma.VisitorSessionOrderByWithRelationInput[];
    cursor?: Prisma.VisitorSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VisitorSessionScalarFieldEnum | Prisma.VisitorSessionScalarFieldEnum[];
};
export type VisitorSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VisitorSessionCreateInput, Prisma.VisitorSessionUncheckedCreateInput>;
};
export type VisitorSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VisitorSessionCreateManyInput | Prisma.VisitorSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VisitorSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    data: Prisma.VisitorSessionCreateManyInput | Prisma.VisitorSessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VisitorSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VisitorSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VisitorSessionUpdateInput, Prisma.VisitorSessionUncheckedUpdateInput>;
    where: Prisma.VisitorSessionWhereUniqueInput;
};
export type VisitorSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VisitorSessionUpdateManyMutationInput, Prisma.VisitorSessionUncheckedUpdateManyInput>;
    where?: Prisma.VisitorSessionWhereInput;
    limit?: number;
};
export type VisitorSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VisitorSessionUpdateManyMutationInput, Prisma.VisitorSessionUncheckedUpdateManyInput>;
    where?: Prisma.VisitorSessionWhereInput;
    limit?: number;
    include?: Prisma.VisitorSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VisitorSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    where: Prisma.VisitorSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.VisitorSessionCreateInput, Prisma.VisitorSessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VisitorSessionUpdateInput, Prisma.VisitorSessionUncheckedUpdateInput>;
};
export type VisitorSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
    where: Prisma.VisitorSessionWhereUniqueInput;
};
export type VisitorSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VisitorSessionWhereInput;
    limit?: number;
};
export type VisitorSession$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type VisitorSession$pageViewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type VisitorSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VisitorSessionSelect<ExtArgs> | null;
    omit?: Prisma.VisitorSessionOmit<ExtArgs> | null;
    include?: Prisma.VisitorSessionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=VisitorSession.d.ts.map