import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PostViewModel = runtime.Types.Result.DefaultSelection<Prisma.$PostViewPayload>;
export type AggregatePostView = {
    _count: PostViewCountAggregateOutputType | null;
    _avg: PostViewAvgAggregateOutputType | null;
    _sum: PostViewSumAggregateOutputType | null;
    _min: PostViewMinAggregateOutputType | null;
    _max: PostViewMaxAggregateOutputType | null;
};
export type PostViewAvgAggregateOutputType = {
    viewCountByUser: number | null;
};
export type PostViewSumAggregateOutputType = {
    viewCountByUser: number | null;
};
export type PostViewMinAggregateOutputType = {
    id: string | null;
    firstViewedAt: Date | null;
    lastViewedAt: Date | null;
    viewCountByUser: number | null;
    userId: string | null;
    postId: string | null;
    anonymousVisitorId: string | null;
};
export type PostViewMaxAggregateOutputType = {
    id: string | null;
    firstViewedAt: Date | null;
    lastViewedAt: Date | null;
    viewCountByUser: number | null;
    userId: string | null;
    postId: string | null;
    anonymousVisitorId: string | null;
};
export type PostViewCountAggregateOutputType = {
    id: number;
    firstViewedAt: number;
    lastViewedAt: number;
    viewCountByUser: number;
    userId: number;
    postId: number;
    anonymousVisitorId: number;
    _all: number;
};
export type PostViewAvgAggregateInputType = {
    viewCountByUser?: true;
};
export type PostViewSumAggregateInputType = {
    viewCountByUser?: true;
};
export type PostViewMinAggregateInputType = {
    id?: true;
    firstViewedAt?: true;
    lastViewedAt?: true;
    viewCountByUser?: true;
    userId?: true;
    postId?: true;
    anonymousVisitorId?: true;
};
export type PostViewMaxAggregateInputType = {
    id?: true;
    firstViewedAt?: true;
    lastViewedAt?: true;
    viewCountByUser?: true;
    userId?: true;
    postId?: true;
    anonymousVisitorId?: true;
};
export type PostViewCountAggregateInputType = {
    id?: true;
    firstViewedAt?: true;
    lastViewedAt?: true;
    viewCountByUser?: true;
    userId?: true;
    postId?: true;
    anonymousVisitorId?: true;
    _all?: true;
};
export type PostViewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostViewWhereInput;
    orderBy?: Prisma.PostViewOrderByWithRelationInput | Prisma.PostViewOrderByWithRelationInput[];
    cursor?: Prisma.PostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostViewCountAggregateInputType;
    _avg?: PostViewAvgAggregateInputType;
    _sum?: PostViewSumAggregateInputType;
    _min?: PostViewMinAggregateInputType;
    _max?: PostViewMaxAggregateInputType;
};
export type GetPostViewAggregateType<T extends PostViewAggregateArgs> = {
    [P in keyof T & keyof AggregatePostView]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePostView[P]> : Prisma.GetScalarType<T[P], AggregatePostView[P]>;
};
export type PostViewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostViewWhereInput;
    orderBy?: Prisma.PostViewOrderByWithAggregationInput | Prisma.PostViewOrderByWithAggregationInput[];
    by: Prisma.PostViewScalarFieldEnum[] | Prisma.PostViewScalarFieldEnum;
    having?: Prisma.PostViewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostViewCountAggregateInputType | true;
    _avg?: PostViewAvgAggregateInputType;
    _sum?: PostViewSumAggregateInputType;
    _min?: PostViewMinAggregateInputType;
    _max?: PostViewMaxAggregateInputType;
};
export type PostViewGroupByOutputType = {
    id: string;
    firstViewedAt: Date;
    lastViewedAt: Date;
    viewCountByUser: number;
    userId: string | null;
    postId: string;
    anonymousVisitorId: string | null;
    _count: PostViewCountAggregateOutputType | null;
    _avg: PostViewAvgAggregateOutputType | null;
    _sum: PostViewSumAggregateOutputType | null;
    _min: PostViewMinAggregateOutputType | null;
    _max: PostViewMaxAggregateOutputType | null;
};
type GetPostViewGroupByPayload<T extends PostViewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostViewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostViewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostViewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostViewGroupByOutputType[P]>;
}>>;
export type PostViewWhereInput = {
    AND?: Prisma.PostViewWhereInput | Prisma.PostViewWhereInput[];
    OR?: Prisma.PostViewWhereInput[];
    NOT?: Prisma.PostViewWhereInput | Prisma.PostViewWhereInput[];
    id?: Prisma.StringFilter<"PostView"> | string;
    firstViewedAt?: Prisma.DateTimeFilter<"PostView"> | Date | string;
    lastViewedAt?: Prisma.DateTimeFilter<"PostView"> | Date | string;
    viewCountByUser?: Prisma.IntFilter<"PostView"> | number;
    userId?: Prisma.StringNullableFilter<"PostView"> | string | null;
    postId?: Prisma.StringFilter<"PostView"> | string;
    anonymousVisitorId?: Prisma.StringNullableFilter<"PostView"> | string | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
};
export type PostViewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    firstViewedAt?: Prisma.SortOrder;
    lastViewedAt?: Prisma.SortOrder;
    viewCountByUser?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    anonymousVisitorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    post?: Prisma.PostOrderByWithRelationInput;
};
export type PostViewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_postId?: Prisma.PostViewUserIdPostIdCompoundUniqueInput;
    anonymousVisitorId_postId?: Prisma.PostViewAnonymousVisitorIdPostIdCompoundUniqueInput;
    AND?: Prisma.PostViewWhereInput | Prisma.PostViewWhereInput[];
    OR?: Prisma.PostViewWhereInput[];
    NOT?: Prisma.PostViewWhereInput | Prisma.PostViewWhereInput[];
    firstViewedAt?: Prisma.DateTimeFilter<"PostView"> | Date | string;
    lastViewedAt?: Prisma.DateTimeFilter<"PostView"> | Date | string;
    viewCountByUser?: Prisma.IntFilter<"PostView"> | number;
    userId?: Prisma.StringNullableFilter<"PostView"> | string | null;
    postId?: Prisma.StringFilter<"PostView"> | string;
    anonymousVisitorId?: Prisma.StringNullableFilter<"PostView"> | string | null;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
}, "id" | "userId_postId" | "anonymousVisitorId_postId">;
export type PostViewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    firstViewedAt?: Prisma.SortOrder;
    lastViewedAt?: Prisma.SortOrder;
    viewCountByUser?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    anonymousVisitorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PostViewCountOrderByAggregateInput;
    _avg?: Prisma.PostViewAvgOrderByAggregateInput;
    _max?: Prisma.PostViewMaxOrderByAggregateInput;
    _min?: Prisma.PostViewMinOrderByAggregateInput;
    _sum?: Prisma.PostViewSumOrderByAggregateInput;
};
export type PostViewScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostViewScalarWhereWithAggregatesInput | Prisma.PostViewScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostViewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostViewScalarWhereWithAggregatesInput | Prisma.PostViewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PostView"> | string;
    firstViewedAt?: Prisma.DateTimeWithAggregatesFilter<"PostView"> | Date | string;
    lastViewedAt?: Prisma.DateTimeWithAggregatesFilter<"PostView"> | Date | string;
    viewCountByUser?: Prisma.IntWithAggregatesFilter<"PostView"> | number;
    userId?: Prisma.StringNullableWithAggregatesFilter<"PostView"> | string | null;
    postId?: Prisma.StringWithAggregatesFilter<"PostView"> | string;
    anonymousVisitorId?: Prisma.StringNullableWithAggregatesFilter<"PostView"> | string | null;
};
export type PostViewCreateInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    anonymousVisitorId?: string | null;
    user?: Prisma.UserCreateNestedOneWithoutPostViewsInput;
    post: Prisma.PostCreateNestedOneWithoutViewedByInput;
};
export type PostViewUncheckedCreateInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    userId?: string | null;
    postId: string;
    anonymousVisitorId?: string | null;
};
export type PostViewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneWithoutPostViewsNestedInput;
    post?: Prisma.PostUpdateOneRequiredWithoutViewedByNestedInput;
};
export type PostViewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PostViewCreateManyInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    userId?: string | null;
    postId: string;
    anonymousVisitorId?: string | null;
};
export type PostViewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PostViewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PostViewListRelationFilter = {
    every?: Prisma.PostViewWhereInput;
    some?: Prisma.PostViewWhereInput;
    none?: Prisma.PostViewWhereInput;
};
export type PostViewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostViewUserIdPostIdCompoundUniqueInput = {
    userId: string;
    postId: string;
};
export type PostViewAnonymousVisitorIdPostIdCompoundUniqueInput = {
    anonymousVisitorId: string;
    postId: string;
};
export type PostViewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstViewedAt?: Prisma.SortOrder;
    lastViewedAt?: Prisma.SortOrder;
    viewCountByUser?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    anonymousVisitorId?: Prisma.SortOrder;
};
export type PostViewAvgOrderByAggregateInput = {
    viewCountByUser?: Prisma.SortOrder;
};
export type PostViewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstViewedAt?: Prisma.SortOrder;
    lastViewedAt?: Prisma.SortOrder;
    viewCountByUser?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    anonymousVisitorId?: Prisma.SortOrder;
};
export type PostViewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstViewedAt?: Prisma.SortOrder;
    lastViewedAt?: Prisma.SortOrder;
    viewCountByUser?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    anonymousVisitorId?: Prisma.SortOrder;
};
export type PostViewSumOrderByAggregateInput = {
    viewCountByUser?: Prisma.SortOrder;
};
export type PostViewCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PostViewCreateWithoutUserInput, Prisma.PostViewUncheckedCreateWithoutUserInput> | Prisma.PostViewCreateWithoutUserInput[] | Prisma.PostViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostViewCreateOrConnectWithoutUserInput | Prisma.PostViewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PostViewCreateManyUserInputEnvelope;
    connect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
};
export type PostViewUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PostViewCreateWithoutUserInput, Prisma.PostViewUncheckedCreateWithoutUserInput> | Prisma.PostViewCreateWithoutUserInput[] | Prisma.PostViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostViewCreateOrConnectWithoutUserInput | Prisma.PostViewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PostViewCreateManyUserInputEnvelope;
    connect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
};
export type PostViewUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PostViewCreateWithoutUserInput, Prisma.PostViewUncheckedCreateWithoutUserInput> | Prisma.PostViewCreateWithoutUserInput[] | Prisma.PostViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostViewCreateOrConnectWithoutUserInput | Prisma.PostViewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PostViewUpsertWithWhereUniqueWithoutUserInput | Prisma.PostViewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PostViewCreateManyUserInputEnvelope;
    set?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    disconnect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    delete?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    connect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    update?: Prisma.PostViewUpdateWithWhereUniqueWithoutUserInput | Prisma.PostViewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PostViewUpdateManyWithWhereWithoutUserInput | Prisma.PostViewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PostViewScalarWhereInput | Prisma.PostViewScalarWhereInput[];
};
export type PostViewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PostViewCreateWithoutUserInput, Prisma.PostViewUncheckedCreateWithoutUserInput> | Prisma.PostViewCreateWithoutUserInput[] | Prisma.PostViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostViewCreateOrConnectWithoutUserInput | Prisma.PostViewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PostViewUpsertWithWhereUniqueWithoutUserInput | Prisma.PostViewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PostViewCreateManyUserInputEnvelope;
    set?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    disconnect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    delete?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    connect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    update?: Prisma.PostViewUpdateWithWhereUniqueWithoutUserInput | Prisma.PostViewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PostViewUpdateManyWithWhereWithoutUserInput | Prisma.PostViewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PostViewScalarWhereInput | Prisma.PostViewScalarWhereInput[];
};
export type PostViewCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostViewCreateWithoutPostInput, Prisma.PostViewUncheckedCreateWithoutPostInput> | Prisma.PostViewCreateWithoutPostInput[] | Prisma.PostViewUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostViewCreateOrConnectWithoutPostInput | Prisma.PostViewCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostViewCreateManyPostInputEnvelope;
    connect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
};
export type PostViewUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostViewCreateWithoutPostInput, Prisma.PostViewUncheckedCreateWithoutPostInput> | Prisma.PostViewCreateWithoutPostInput[] | Prisma.PostViewUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostViewCreateOrConnectWithoutPostInput | Prisma.PostViewCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostViewCreateManyPostInputEnvelope;
    connect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
};
export type PostViewUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostViewCreateWithoutPostInput, Prisma.PostViewUncheckedCreateWithoutPostInput> | Prisma.PostViewCreateWithoutPostInput[] | Prisma.PostViewUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostViewCreateOrConnectWithoutPostInput | Prisma.PostViewCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostViewUpsertWithWhereUniqueWithoutPostInput | Prisma.PostViewUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostViewCreateManyPostInputEnvelope;
    set?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    disconnect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    delete?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    connect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    update?: Prisma.PostViewUpdateWithWhereUniqueWithoutPostInput | Prisma.PostViewUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostViewUpdateManyWithWhereWithoutPostInput | Prisma.PostViewUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostViewScalarWhereInput | Prisma.PostViewScalarWhereInput[];
};
export type PostViewUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostViewCreateWithoutPostInput, Prisma.PostViewUncheckedCreateWithoutPostInput> | Prisma.PostViewCreateWithoutPostInput[] | Prisma.PostViewUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostViewCreateOrConnectWithoutPostInput | Prisma.PostViewCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostViewUpsertWithWhereUniqueWithoutPostInput | Prisma.PostViewUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostViewCreateManyPostInputEnvelope;
    set?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    disconnect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    delete?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    connect?: Prisma.PostViewWhereUniqueInput | Prisma.PostViewWhereUniqueInput[];
    update?: Prisma.PostViewUpdateWithWhereUniqueWithoutPostInput | Prisma.PostViewUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostViewUpdateManyWithWhereWithoutPostInput | Prisma.PostViewUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostViewScalarWhereInput | Prisma.PostViewScalarWhereInput[];
};
export type PostViewCreateWithoutUserInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    anonymousVisitorId?: string | null;
    post: Prisma.PostCreateNestedOneWithoutViewedByInput;
};
export type PostViewUncheckedCreateWithoutUserInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    postId: string;
    anonymousVisitorId?: string | null;
};
export type PostViewCreateOrConnectWithoutUserInput = {
    where: Prisma.PostViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostViewCreateWithoutUserInput, Prisma.PostViewUncheckedCreateWithoutUserInput>;
};
export type PostViewCreateManyUserInputEnvelope = {
    data: Prisma.PostViewCreateManyUserInput | Prisma.PostViewCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PostViewUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PostViewWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostViewUpdateWithoutUserInput, Prisma.PostViewUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PostViewCreateWithoutUserInput, Prisma.PostViewUncheckedCreateWithoutUserInput>;
};
export type PostViewUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PostViewWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostViewUpdateWithoutUserInput, Prisma.PostViewUncheckedUpdateWithoutUserInput>;
};
export type PostViewUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PostViewScalarWhereInput;
    data: Prisma.XOR<Prisma.PostViewUpdateManyMutationInput, Prisma.PostViewUncheckedUpdateManyWithoutUserInput>;
};
export type PostViewScalarWhereInput = {
    AND?: Prisma.PostViewScalarWhereInput | Prisma.PostViewScalarWhereInput[];
    OR?: Prisma.PostViewScalarWhereInput[];
    NOT?: Prisma.PostViewScalarWhereInput | Prisma.PostViewScalarWhereInput[];
    id?: Prisma.StringFilter<"PostView"> | string;
    firstViewedAt?: Prisma.DateTimeFilter<"PostView"> | Date | string;
    lastViewedAt?: Prisma.DateTimeFilter<"PostView"> | Date | string;
    viewCountByUser?: Prisma.IntFilter<"PostView"> | number;
    userId?: Prisma.StringNullableFilter<"PostView"> | string | null;
    postId?: Prisma.StringFilter<"PostView"> | string;
    anonymousVisitorId?: Prisma.StringNullableFilter<"PostView"> | string | null;
};
export type PostViewCreateWithoutPostInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    anonymousVisitorId?: string | null;
    user?: Prisma.UserCreateNestedOneWithoutPostViewsInput;
};
export type PostViewUncheckedCreateWithoutPostInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    userId?: string | null;
    anonymousVisitorId?: string | null;
};
export type PostViewCreateOrConnectWithoutPostInput = {
    where: Prisma.PostViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostViewCreateWithoutPostInput, Prisma.PostViewUncheckedCreateWithoutPostInput>;
};
export type PostViewCreateManyPostInputEnvelope = {
    data: Prisma.PostViewCreateManyPostInput | Prisma.PostViewCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type PostViewUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostViewWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostViewUpdateWithoutPostInput, Prisma.PostViewUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.PostViewCreateWithoutPostInput, Prisma.PostViewUncheckedCreateWithoutPostInput>;
};
export type PostViewUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostViewWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostViewUpdateWithoutPostInput, Prisma.PostViewUncheckedUpdateWithoutPostInput>;
};
export type PostViewUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.PostViewScalarWhereInput;
    data: Prisma.XOR<Prisma.PostViewUpdateManyMutationInput, Prisma.PostViewUncheckedUpdateManyWithoutPostInput>;
};
export type PostViewCreateManyUserInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    postId: string;
    anonymousVisitorId?: string | null;
};
export type PostViewUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    post?: Prisma.PostUpdateOneRequiredWithoutViewedByNestedInput;
};
export type PostViewUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PostViewUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PostViewCreateManyPostInput = {
    id?: string;
    firstViewedAt?: Date | string;
    lastViewedAt?: Date | string;
    viewCountByUser?: number;
    userId?: string | null;
    anonymousVisitorId?: string | null;
};
export type PostViewUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneWithoutPostViewsNestedInput;
};
export type PostViewUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PostViewUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastViewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    viewCountByUser?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anonymousVisitorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PostViewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstViewedAt?: boolean;
    lastViewedAt?: boolean;
    viewCountByUser?: boolean;
    userId?: boolean;
    postId?: boolean;
    anonymousVisitorId?: boolean;
    user?: boolean | Prisma.PostView$userArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postView"]>;
export type PostViewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstViewedAt?: boolean;
    lastViewedAt?: boolean;
    viewCountByUser?: boolean;
    userId?: boolean;
    postId?: boolean;
    anonymousVisitorId?: boolean;
    user?: boolean | Prisma.PostView$userArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postView"]>;
export type PostViewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstViewedAt?: boolean;
    lastViewedAt?: boolean;
    viewCountByUser?: boolean;
    userId?: boolean;
    postId?: boolean;
    anonymousVisitorId?: boolean;
    user?: boolean | Prisma.PostView$userArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postView"]>;
export type PostViewSelectScalar = {
    id?: boolean;
    firstViewedAt?: boolean;
    lastViewedAt?: boolean;
    viewCountByUser?: boolean;
    userId?: boolean;
    postId?: boolean;
    anonymousVisitorId?: boolean;
};
export type PostViewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "firstViewedAt" | "lastViewedAt" | "viewCountByUser" | "userId" | "postId" | "anonymousVisitorId", ExtArgs["result"]["postView"]>;
export type PostViewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.PostView$userArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type PostViewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.PostView$userArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type PostViewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.PostView$userArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type $PostViewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PostView";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
        post: Prisma.$PostPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        firstViewedAt: Date;
        lastViewedAt: Date;
        viewCountByUser: number;
        userId: string | null;
        postId: string;
        anonymousVisitorId: string | null;
    }, ExtArgs["result"]["postView"]>;
    composites: {};
};
export type PostViewGetPayload<S extends boolean | null | undefined | PostViewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostViewPayload, S>;
export type PostViewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostViewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostViewCountAggregateInputType | true;
};
export interface PostViewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PostView'];
        meta: {
            name: 'PostView';
        };
    };
    findUnique<T extends PostViewFindUniqueArgs>(args: Prisma.SelectSubset<T, PostViewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostViewClient<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostViewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostViewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostViewClient<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostViewFindFirstArgs>(args?: Prisma.SelectSubset<T, PostViewFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostViewClient<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostViewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostViewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostViewClient<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostViewFindManyArgs>(args?: Prisma.SelectSubset<T, PostViewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostViewCreateArgs>(args: Prisma.SelectSubset<T, PostViewCreateArgs<ExtArgs>>): Prisma.Prisma__PostViewClient<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostViewCreateManyArgs>(args?: Prisma.SelectSubset<T, PostViewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostViewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostViewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostViewDeleteArgs>(args: Prisma.SelectSubset<T, PostViewDeleteArgs<ExtArgs>>): Prisma.Prisma__PostViewClient<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostViewUpdateArgs>(args: Prisma.SelectSubset<T, PostViewUpdateArgs<ExtArgs>>): Prisma.Prisma__PostViewClient<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostViewDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostViewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostViewUpdateManyArgs>(args: Prisma.SelectSubset<T, PostViewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostViewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostViewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostViewUpsertArgs>(args: Prisma.SelectSubset<T, PostViewUpsertArgs<ExtArgs>>): Prisma.Prisma__PostViewClient<runtime.Types.Result.GetResult<Prisma.$PostViewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostViewCountArgs>(args?: Prisma.Subset<T, PostViewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostViewCountAggregateOutputType> : number>;
    aggregate<T extends PostViewAggregateArgs>(args: Prisma.Subset<T, PostViewAggregateArgs>): Prisma.PrismaPromise<GetPostViewAggregateType<T>>;
    groupBy<T extends PostViewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostViewGroupByArgs['orderBy'];
    } : {
        orderBy?: PostViewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostViewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostViewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostViewFieldRefs;
}
export interface Prisma__PostViewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.PostView$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostView$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostViewFieldRefs {
    readonly id: Prisma.FieldRef<"PostView", 'String'>;
    readonly firstViewedAt: Prisma.FieldRef<"PostView", 'DateTime'>;
    readonly lastViewedAt: Prisma.FieldRef<"PostView", 'DateTime'>;
    readonly viewCountByUser: Prisma.FieldRef<"PostView", 'Int'>;
    readonly userId: Prisma.FieldRef<"PostView", 'String'>;
    readonly postId: Prisma.FieldRef<"PostView", 'String'>;
    readonly anonymousVisitorId: Prisma.FieldRef<"PostView", 'String'>;
}
export type PostViewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    where: Prisma.PostViewWhereUniqueInput;
};
export type PostViewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    where: Prisma.PostViewWhereUniqueInput;
};
export type PostViewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    where?: Prisma.PostViewWhereInput;
    orderBy?: Prisma.PostViewOrderByWithRelationInput | Prisma.PostViewOrderByWithRelationInput[];
    cursor?: Prisma.PostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostViewScalarFieldEnum | Prisma.PostViewScalarFieldEnum[];
};
export type PostViewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    where?: Prisma.PostViewWhereInput;
    orderBy?: Prisma.PostViewOrderByWithRelationInput | Prisma.PostViewOrderByWithRelationInput[];
    cursor?: Prisma.PostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostViewScalarFieldEnum | Prisma.PostViewScalarFieldEnum[];
};
export type PostViewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    where?: Prisma.PostViewWhereInput;
    orderBy?: Prisma.PostViewOrderByWithRelationInput | Prisma.PostViewOrderByWithRelationInput[];
    cursor?: Prisma.PostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostViewScalarFieldEnum | Prisma.PostViewScalarFieldEnum[];
};
export type PostViewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostViewCreateInput, Prisma.PostViewUncheckedCreateInput>;
};
export type PostViewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostViewCreateManyInput | Prisma.PostViewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostViewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    data: Prisma.PostViewCreateManyInput | Prisma.PostViewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostViewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostViewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostViewUpdateInput, Prisma.PostViewUncheckedUpdateInput>;
    where: Prisma.PostViewWhereUniqueInput;
};
export type PostViewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostViewUpdateManyMutationInput, Prisma.PostViewUncheckedUpdateManyInput>;
    where?: Prisma.PostViewWhereInput;
    limit?: number;
};
export type PostViewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostViewUpdateManyMutationInput, Prisma.PostViewUncheckedUpdateManyInput>;
    where?: Prisma.PostViewWhereInput;
    limit?: number;
    include?: Prisma.PostViewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostViewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    where: Prisma.PostViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostViewCreateInput, Prisma.PostViewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostViewUpdateInput, Prisma.PostViewUncheckedUpdateInput>;
};
export type PostViewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
    where: Prisma.PostViewWhereUniqueInput;
};
export type PostViewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostViewWhereInput;
    limit?: number;
};
export type PostView$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type PostViewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostViewSelect<ExtArgs> | null;
    omit?: Prisma.PostViewOmit<ExtArgs> | null;
    include?: Prisma.PostViewInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PostView.d.ts.map