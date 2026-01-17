import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PostShareModel = runtime.Types.Result.DefaultSelection<Prisma.$PostSharePayload>;
export type AggregatePostShare = {
    _count: PostShareCountAggregateOutputType | null;
    _min: PostShareMinAggregateOutputType | null;
    _max: PostShareMaxAggregateOutputType | null;
};
export type PostShareMinAggregateOutputType = {
    id: string | null;
    platform: $Enums.SharePlatform | null;
    createdAt: Date | null;
    postId: string | null;
    sharerId: string | null;
};
export type PostShareMaxAggregateOutputType = {
    id: string | null;
    platform: $Enums.SharePlatform | null;
    createdAt: Date | null;
    postId: string | null;
    sharerId: string | null;
};
export type PostShareCountAggregateOutputType = {
    id: number;
    platform: number;
    createdAt: number;
    postId: number;
    sharerId: number;
    _all: number;
};
export type PostShareMinAggregateInputType = {
    id?: true;
    platform?: true;
    createdAt?: true;
    postId?: true;
    sharerId?: true;
};
export type PostShareMaxAggregateInputType = {
    id?: true;
    platform?: true;
    createdAt?: true;
    postId?: true;
    sharerId?: true;
};
export type PostShareCountAggregateInputType = {
    id?: true;
    platform?: true;
    createdAt?: true;
    postId?: true;
    sharerId?: true;
    _all?: true;
};
export type PostShareAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostShareWhereInput;
    orderBy?: Prisma.PostShareOrderByWithRelationInput | Prisma.PostShareOrderByWithRelationInput[];
    cursor?: Prisma.PostShareWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostShareCountAggregateInputType;
    _min?: PostShareMinAggregateInputType;
    _max?: PostShareMaxAggregateInputType;
};
export type GetPostShareAggregateType<T extends PostShareAggregateArgs> = {
    [P in keyof T & keyof AggregatePostShare]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePostShare[P]> : Prisma.GetScalarType<T[P], AggregatePostShare[P]>;
};
export type PostShareGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostShareWhereInput;
    orderBy?: Prisma.PostShareOrderByWithAggregationInput | Prisma.PostShareOrderByWithAggregationInput[];
    by: Prisma.PostShareScalarFieldEnum[] | Prisma.PostShareScalarFieldEnum;
    having?: Prisma.PostShareScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostShareCountAggregateInputType | true;
    _min?: PostShareMinAggregateInputType;
    _max?: PostShareMaxAggregateInputType;
};
export type PostShareGroupByOutputType = {
    id: string;
    platform: $Enums.SharePlatform;
    createdAt: Date;
    postId: string;
    sharerId: string;
    _count: PostShareCountAggregateOutputType | null;
    _min: PostShareMinAggregateOutputType | null;
    _max: PostShareMaxAggregateOutputType | null;
};
type GetPostShareGroupByPayload<T extends PostShareGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostShareGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostShareGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostShareGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostShareGroupByOutputType[P]>;
}>>;
export type PostShareWhereInput = {
    AND?: Prisma.PostShareWhereInput | Prisma.PostShareWhereInput[];
    OR?: Prisma.PostShareWhereInput[];
    NOT?: Prisma.PostShareWhereInput | Prisma.PostShareWhereInput[];
    id?: Prisma.StringFilter<"PostShare"> | string;
    platform?: Prisma.EnumSharePlatformFilter<"PostShare"> | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFilter<"PostShare"> | Date | string;
    postId?: Prisma.StringFilter<"PostShare"> | string;
    sharerId?: Prisma.StringFilter<"PostShare"> | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    sharer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PostShareOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    sharerId?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
    sharer?: Prisma.UserOrderByWithRelationInput;
};
export type PostShareWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PostShareWhereInput | Prisma.PostShareWhereInput[];
    OR?: Prisma.PostShareWhereInput[];
    NOT?: Prisma.PostShareWhereInput | Prisma.PostShareWhereInput[];
    platform?: Prisma.EnumSharePlatformFilter<"PostShare"> | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFilter<"PostShare"> | Date | string;
    postId?: Prisma.StringFilter<"PostShare"> | string;
    sharerId?: Prisma.StringFilter<"PostShare"> | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    sharer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type PostShareOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    sharerId?: Prisma.SortOrder;
    _count?: Prisma.PostShareCountOrderByAggregateInput;
    _max?: Prisma.PostShareMaxOrderByAggregateInput;
    _min?: Prisma.PostShareMinOrderByAggregateInput;
};
export type PostShareScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostShareScalarWhereWithAggregatesInput | Prisma.PostShareScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostShareScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostShareScalarWhereWithAggregatesInput | Prisma.PostShareScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PostShare"> | string;
    platform?: Prisma.EnumSharePlatformWithAggregatesFilter<"PostShare"> | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PostShare"> | Date | string;
    postId?: Prisma.StringWithAggregatesFilter<"PostShare"> | string;
    sharerId?: Prisma.StringWithAggregatesFilter<"PostShare"> | string;
};
export type PostShareCreateInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutSharedByInput;
    sharer: Prisma.UserCreateNestedOneWithoutInitiatedSharesInput;
};
export type PostShareUncheckedCreateInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    postId: string;
    sharerId: string;
};
export type PostShareUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutSharedByNestedInput;
    sharer?: Prisma.UserUpdateOneRequiredWithoutInitiatedSharesNestedInput;
};
export type PostShareUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    sharerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostShareCreateManyInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    postId: string;
    sharerId: string;
};
export type PostShareUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostShareUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    sharerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostShareListRelationFilter = {
    every?: Prisma.PostShareWhereInput;
    some?: Prisma.PostShareWhereInput;
    none?: Prisma.PostShareWhereInput;
};
export type PostShareOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostShareCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    sharerId?: Prisma.SortOrder;
};
export type PostShareMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    sharerId?: Prisma.SortOrder;
};
export type PostShareMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    sharerId?: Prisma.SortOrder;
};
export type PostShareCreateNestedManyWithoutSharerInput = {
    create?: Prisma.XOR<Prisma.PostShareCreateWithoutSharerInput, Prisma.PostShareUncheckedCreateWithoutSharerInput> | Prisma.PostShareCreateWithoutSharerInput[] | Prisma.PostShareUncheckedCreateWithoutSharerInput[];
    connectOrCreate?: Prisma.PostShareCreateOrConnectWithoutSharerInput | Prisma.PostShareCreateOrConnectWithoutSharerInput[];
    createMany?: Prisma.PostShareCreateManySharerInputEnvelope;
    connect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
};
export type PostShareUncheckedCreateNestedManyWithoutSharerInput = {
    create?: Prisma.XOR<Prisma.PostShareCreateWithoutSharerInput, Prisma.PostShareUncheckedCreateWithoutSharerInput> | Prisma.PostShareCreateWithoutSharerInput[] | Prisma.PostShareUncheckedCreateWithoutSharerInput[];
    connectOrCreate?: Prisma.PostShareCreateOrConnectWithoutSharerInput | Prisma.PostShareCreateOrConnectWithoutSharerInput[];
    createMany?: Prisma.PostShareCreateManySharerInputEnvelope;
    connect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
};
export type PostShareUpdateManyWithoutSharerNestedInput = {
    create?: Prisma.XOR<Prisma.PostShareCreateWithoutSharerInput, Prisma.PostShareUncheckedCreateWithoutSharerInput> | Prisma.PostShareCreateWithoutSharerInput[] | Prisma.PostShareUncheckedCreateWithoutSharerInput[];
    connectOrCreate?: Prisma.PostShareCreateOrConnectWithoutSharerInput | Prisma.PostShareCreateOrConnectWithoutSharerInput[];
    upsert?: Prisma.PostShareUpsertWithWhereUniqueWithoutSharerInput | Prisma.PostShareUpsertWithWhereUniqueWithoutSharerInput[];
    createMany?: Prisma.PostShareCreateManySharerInputEnvelope;
    set?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    disconnect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    delete?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    connect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    update?: Prisma.PostShareUpdateWithWhereUniqueWithoutSharerInput | Prisma.PostShareUpdateWithWhereUniqueWithoutSharerInput[];
    updateMany?: Prisma.PostShareUpdateManyWithWhereWithoutSharerInput | Prisma.PostShareUpdateManyWithWhereWithoutSharerInput[];
    deleteMany?: Prisma.PostShareScalarWhereInput | Prisma.PostShareScalarWhereInput[];
};
export type PostShareUncheckedUpdateManyWithoutSharerNestedInput = {
    create?: Prisma.XOR<Prisma.PostShareCreateWithoutSharerInput, Prisma.PostShareUncheckedCreateWithoutSharerInput> | Prisma.PostShareCreateWithoutSharerInput[] | Prisma.PostShareUncheckedCreateWithoutSharerInput[];
    connectOrCreate?: Prisma.PostShareCreateOrConnectWithoutSharerInput | Prisma.PostShareCreateOrConnectWithoutSharerInput[];
    upsert?: Prisma.PostShareUpsertWithWhereUniqueWithoutSharerInput | Prisma.PostShareUpsertWithWhereUniqueWithoutSharerInput[];
    createMany?: Prisma.PostShareCreateManySharerInputEnvelope;
    set?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    disconnect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    delete?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    connect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    update?: Prisma.PostShareUpdateWithWhereUniqueWithoutSharerInput | Prisma.PostShareUpdateWithWhereUniqueWithoutSharerInput[];
    updateMany?: Prisma.PostShareUpdateManyWithWhereWithoutSharerInput | Prisma.PostShareUpdateManyWithWhereWithoutSharerInput[];
    deleteMany?: Prisma.PostShareScalarWhereInput | Prisma.PostShareScalarWhereInput[];
};
export type PostShareCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostShareCreateWithoutPostInput, Prisma.PostShareUncheckedCreateWithoutPostInput> | Prisma.PostShareCreateWithoutPostInput[] | Prisma.PostShareUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostShareCreateOrConnectWithoutPostInput | Prisma.PostShareCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostShareCreateManyPostInputEnvelope;
    connect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
};
export type PostShareUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostShareCreateWithoutPostInput, Prisma.PostShareUncheckedCreateWithoutPostInput> | Prisma.PostShareCreateWithoutPostInput[] | Prisma.PostShareUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostShareCreateOrConnectWithoutPostInput | Prisma.PostShareCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostShareCreateManyPostInputEnvelope;
    connect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
};
export type PostShareUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostShareCreateWithoutPostInput, Prisma.PostShareUncheckedCreateWithoutPostInput> | Prisma.PostShareCreateWithoutPostInput[] | Prisma.PostShareUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostShareCreateOrConnectWithoutPostInput | Prisma.PostShareCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostShareUpsertWithWhereUniqueWithoutPostInput | Prisma.PostShareUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostShareCreateManyPostInputEnvelope;
    set?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    disconnect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    delete?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    connect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    update?: Prisma.PostShareUpdateWithWhereUniqueWithoutPostInput | Prisma.PostShareUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostShareUpdateManyWithWhereWithoutPostInput | Prisma.PostShareUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostShareScalarWhereInput | Prisma.PostShareScalarWhereInput[];
};
export type PostShareUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostShareCreateWithoutPostInput, Prisma.PostShareUncheckedCreateWithoutPostInput> | Prisma.PostShareCreateWithoutPostInput[] | Prisma.PostShareUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostShareCreateOrConnectWithoutPostInput | Prisma.PostShareCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostShareUpsertWithWhereUniqueWithoutPostInput | Prisma.PostShareUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostShareCreateManyPostInputEnvelope;
    set?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    disconnect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    delete?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    connect?: Prisma.PostShareWhereUniqueInput | Prisma.PostShareWhereUniqueInput[];
    update?: Prisma.PostShareUpdateWithWhereUniqueWithoutPostInput | Prisma.PostShareUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostShareUpdateManyWithWhereWithoutPostInput | Prisma.PostShareUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostShareScalarWhereInput | Prisma.PostShareScalarWhereInput[];
};
export type EnumSharePlatformFieldUpdateOperationsInput = {
    set?: $Enums.SharePlatform;
};
export type PostShareCreateWithoutSharerInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutSharedByInput;
};
export type PostShareUncheckedCreateWithoutSharerInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    postId: string;
};
export type PostShareCreateOrConnectWithoutSharerInput = {
    where: Prisma.PostShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostShareCreateWithoutSharerInput, Prisma.PostShareUncheckedCreateWithoutSharerInput>;
};
export type PostShareCreateManySharerInputEnvelope = {
    data: Prisma.PostShareCreateManySharerInput | Prisma.PostShareCreateManySharerInput[];
    skipDuplicates?: boolean;
};
export type PostShareUpsertWithWhereUniqueWithoutSharerInput = {
    where: Prisma.PostShareWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostShareUpdateWithoutSharerInput, Prisma.PostShareUncheckedUpdateWithoutSharerInput>;
    create: Prisma.XOR<Prisma.PostShareCreateWithoutSharerInput, Prisma.PostShareUncheckedCreateWithoutSharerInput>;
};
export type PostShareUpdateWithWhereUniqueWithoutSharerInput = {
    where: Prisma.PostShareWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostShareUpdateWithoutSharerInput, Prisma.PostShareUncheckedUpdateWithoutSharerInput>;
};
export type PostShareUpdateManyWithWhereWithoutSharerInput = {
    where: Prisma.PostShareScalarWhereInput;
    data: Prisma.XOR<Prisma.PostShareUpdateManyMutationInput, Prisma.PostShareUncheckedUpdateManyWithoutSharerInput>;
};
export type PostShareScalarWhereInput = {
    AND?: Prisma.PostShareScalarWhereInput | Prisma.PostShareScalarWhereInput[];
    OR?: Prisma.PostShareScalarWhereInput[];
    NOT?: Prisma.PostShareScalarWhereInput | Prisma.PostShareScalarWhereInput[];
    id?: Prisma.StringFilter<"PostShare"> | string;
    platform?: Prisma.EnumSharePlatformFilter<"PostShare"> | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFilter<"PostShare"> | Date | string;
    postId?: Prisma.StringFilter<"PostShare"> | string;
    sharerId?: Prisma.StringFilter<"PostShare"> | string;
};
export type PostShareCreateWithoutPostInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    sharer: Prisma.UserCreateNestedOneWithoutInitiatedSharesInput;
};
export type PostShareUncheckedCreateWithoutPostInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    sharerId: string;
};
export type PostShareCreateOrConnectWithoutPostInput = {
    where: Prisma.PostShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostShareCreateWithoutPostInput, Prisma.PostShareUncheckedCreateWithoutPostInput>;
};
export type PostShareCreateManyPostInputEnvelope = {
    data: Prisma.PostShareCreateManyPostInput | Prisma.PostShareCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type PostShareUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostShareWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostShareUpdateWithoutPostInput, Prisma.PostShareUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.PostShareCreateWithoutPostInput, Prisma.PostShareUncheckedCreateWithoutPostInput>;
};
export type PostShareUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostShareWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostShareUpdateWithoutPostInput, Prisma.PostShareUncheckedUpdateWithoutPostInput>;
};
export type PostShareUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.PostShareScalarWhereInput;
    data: Prisma.XOR<Prisma.PostShareUpdateManyMutationInput, Prisma.PostShareUncheckedUpdateManyWithoutPostInput>;
};
export type PostShareCreateManySharerInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    postId: string;
};
export type PostShareUpdateWithoutSharerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutSharedByNestedInput;
};
export type PostShareUncheckedUpdateWithoutSharerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostShareUncheckedUpdateManyWithoutSharerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostShareCreateManyPostInput = {
    id?: string;
    platform: $Enums.SharePlatform;
    createdAt?: Date | string;
    sharerId: string;
};
export type PostShareUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sharer?: Prisma.UserUpdateOneRequiredWithoutInitiatedSharesNestedInput;
};
export type PostShareUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sharerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostShareUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSharePlatformFieldUpdateOperationsInput | $Enums.SharePlatform;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sharerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostShareSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    createdAt?: boolean;
    postId?: boolean;
    sharerId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    sharer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postShare"]>;
export type PostShareSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    createdAt?: boolean;
    postId?: boolean;
    sharerId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    sharer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postShare"]>;
export type PostShareSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    createdAt?: boolean;
    postId?: boolean;
    sharerId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    sharer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postShare"]>;
export type PostShareSelectScalar = {
    id?: boolean;
    platform?: boolean;
    createdAt?: boolean;
    postId?: boolean;
    sharerId?: boolean;
};
export type PostShareOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "platform" | "createdAt" | "postId" | "sharerId", ExtArgs["result"]["postShare"]>;
export type PostShareInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    sharer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PostShareIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    sharer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PostShareIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    sharer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PostSharePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PostShare";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
        sharer: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        platform: $Enums.SharePlatform;
        createdAt: Date;
        postId: string;
        sharerId: string;
    }, ExtArgs["result"]["postShare"]>;
    composites: {};
};
export type PostShareGetPayload<S extends boolean | null | undefined | PostShareDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostSharePayload, S>;
export type PostShareCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostShareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostShareCountAggregateInputType | true;
};
export interface PostShareDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PostShare'];
        meta: {
            name: 'PostShare';
        };
    };
    findUnique<T extends PostShareFindUniqueArgs>(args: Prisma.SelectSubset<T, PostShareFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostShareClient<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostShareFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostShareFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostShareClient<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostShareFindFirstArgs>(args?: Prisma.SelectSubset<T, PostShareFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostShareClient<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostShareFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostShareFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostShareClient<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostShareFindManyArgs>(args?: Prisma.SelectSubset<T, PostShareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostShareCreateArgs>(args: Prisma.SelectSubset<T, PostShareCreateArgs<ExtArgs>>): Prisma.Prisma__PostShareClient<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostShareCreateManyArgs>(args?: Prisma.SelectSubset<T, PostShareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostShareCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostShareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostShareDeleteArgs>(args: Prisma.SelectSubset<T, PostShareDeleteArgs<ExtArgs>>): Prisma.Prisma__PostShareClient<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostShareUpdateArgs>(args: Prisma.SelectSubset<T, PostShareUpdateArgs<ExtArgs>>): Prisma.Prisma__PostShareClient<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostShareDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostShareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostShareUpdateManyArgs>(args: Prisma.SelectSubset<T, PostShareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostShareUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostShareUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostShareUpsertArgs>(args: Prisma.SelectSubset<T, PostShareUpsertArgs<ExtArgs>>): Prisma.Prisma__PostShareClient<runtime.Types.Result.GetResult<Prisma.$PostSharePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostShareCountArgs>(args?: Prisma.Subset<T, PostShareCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostShareCountAggregateOutputType> : number>;
    aggregate<T extends PostShareAggregateArgs>(args: Prisma.Subset<T, PostShareAggregateArgs>): Prisma.PrismaPromise<GetPostShareAggregateType<T>>;
    groupBy<T extends PostShareGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostShareGroupByArgs['orderBy'];
    } : {
        orderBy?: PostShareGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostShareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostShareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostShareFieldRefs;
}
export interface Prisma__PostShareClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sharer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostShareFieldRefs {
    readonly id: Prisma.FieldRef<"PostShare", 'String'>;
    readonly platform: Prisma.FieldRef<"PostShare", 'SharePlatform'>;
    readonly createdAt: Prisma.FieldRef<"PostShare", 'DateTime'>;
    readonly postId: Prisma.FieldRef<"PostShare", 'String'>;
    readonly sharerId: Prisma.FieldRef<"PostShare", 'String'>;
}
export type PostShareFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    where: Prisma.PostShareWhereUniqueInput;
};
export type PostShareFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    where: Prisma.PostShareWhereUniqueInput;
};
export type PostShareFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    where?: Prisma.PostShareWhereInput;
    orderBy?: Prisma.PostShareOrderByWithRelationInput | Prisma.PostShareOrderByWithRelationInput[];
    cursor?: Prisma.PostShareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostShareScalarFieldEnum | Prisma.PostShareScalarFieldEnum[];
};
export type PostShareFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    where?: Prisma.PostShareWhereInput;
    orderBy?: Prisma.PostShareOrderByWithRelationInput | Prisma.PostShareOrderByWithRelationInput[];
    cursor?: Prisma.PostShareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostShareScalarFieldEnum | Prisma.PostShareScalarFieldEnum[];
};
export type PostShareFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    where?: Prisma.PostShareWhereInput;
    orderBy?: Prisma.PostShareOrderByWithRelationInput | Prisma.PostShareOrderByWithRelationInput[];
    cursor?: Prisma.PostShareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostShareScalarFieldEnum | Prisma.PostShareScalarFieldEnum[];
};
export type PostShareCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostShareCreateInput, Prisma.PostShareUncheckedCreateInput>;
};
export type PostShareCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostShareCreateManyInput | Prisma.PostShareCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostShareCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    data: Prisma.PostShareCreateManyInput | Prisma.PostShareCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostShareIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostShareUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostShareUpdateInput, Prisma.PostShareUncheckedUpdateInput>;
    where: Prisma.PostShareWhereUniqueInput;
};
export type PostShareUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostShareUpdateManyMutationInput, Prisma.PostShareUncheckedUpdateManyInput>;
    where?: Prisma.PostShareWhereInput;
    limit?: number;
};
export type PostShareUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostShareUpdateManyMutationInput, Prisma.PostShareUncheckedUpdateManyInput>;
    where?: Prisma.PostShareWhereInput;
    limit?: number;
    include?: Prisma.PostShareIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostShareUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    where: Prisma.PostShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostShareCreateInput, Prisma.PostShareUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostShareUpdateInput, Prisma.PostShareUncheckedUpdateInput>;
};
export type PostShareDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
    where: Prisma.PostShareWhereUniqueInput;
};
export type PostShareDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostShareWhereInput;
    limit?: number;
};
export type PostShareDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostShareSelect<ExtArgs> | null;
    omit?: Prisma.PostShareOmit<ExtArgs> | null;
    include?: Prisma.PostShareInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PostShare.d.ts.map