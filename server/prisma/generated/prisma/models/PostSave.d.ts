import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PostSaveModel = runtime.Types.Result.DefaultSelection<Prisma.$PostSavePayload>;
export type AggregatePostSave = {
    _count: PostSaveCountAggregateOutputType | null;
    _min: PostSaveMinAggregateOutputType | null;
    _max: PostSaveMaxAggregateOutputType | null;
};
export type PostSaveMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    userId: string | null;
    postId: string | null;
};
export type PostSaveMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    userId: string | null;
    postId: string | null;
};
export type PostSaveCountAggregateOutputType = {
    id: number;
    createdAt: number;
    userId: number;
    postId: number;
    _all: number;
};
export type PostSaveMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    userId?: true;
    postId?: true;
};
export type PostSaveMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    userId?: true;
    postId?: true;
};
export type PostSaveCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    userId?: true;
    postId?: true;
    _all?: true;
};
export type PostSaveAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostSaveWhereInput;
    orderBy?: Prisma.PostSaveOrderByWithRelationInput | Prisma.PostSaveOrderByWithRelationInput[];
    cursor?: Prisma.PostSaveWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostSaveCountAggregateInputType;
    _min?: PostSaveMinAggregateInputType;
    _max?: PostSaveMaxAggregateInputType;
};
export type GetPostSaveAggregateType<T extends PostSaveAggregateArgs> = {
    [P in keyof T & keyof AggregatePostSave]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePostSave[P]> : Prisma.GetScalarType<T[P], AggregatePostSave[P]>;
};
export type PostSaveGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostSaveWhereInput;
    orderBy?: Prisma.PostSaveOrderByWithAggregationInput | Prisma.PostSaveOrderByWithAggregationInput[];
    by: Prisma.PostSaveScalarFieldEnum[] | Prisma.PostSaveScalarFieldEnum;
    having?: Prisma.PostSaveScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostSaveCountAggregateInputType | true;
    _min?: PostSaveMinAggregateInputType;
    _max?: PostSaveMaxAggregateInputType;
};
export type PostSaveGroupByOutputType = {
    id: string;
    createdAt: Date;
    userId: string;
    postId: string;
    _count: PostSaveCountAggregateOutputType | null;
    _min: PostSaveMinAggregateOutputType | null;
    _max: PostSaveMaxAggregateOutputType | null;
};
type GetPostSaveGroupByPayload<T extends PostSaveGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostSaveGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostSaveGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostSaveGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostSaveGroupByOutputType[P]>;
}>>;
export type PostSaveWhereInput = {
    AND?: Prisma.PostSaveWhereInput | Prisma.PostSaveWhereInput[];
    OR?: Prisma.PostSaveWhereInput[];
    NOT?: Prisma.PostSaveWhereInput | Prisma.PostSaveWhereInput[];
    id?: Prisma.StringFilter<"PostSave"> | string;
    createdAt?: Prisma.DateTimeFilter<"PostSave"> | Date | string;
    userId?: Prisma.StringFilter<"PostSave"> | string;
    postId?: Prisma.StringFilter<"PostSave"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
};
export type PostSaveOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    post?: Prisma.PostOrderByWithRelationInput;
};
export type PostSaveWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_postId?: Prisma.PostSaveUserIdPostIdCompoundUniqueInput;
    AND?: Prisma.PostSaveWhereInput | Prisma.PostSaveWhereInput[];
    OR?: Prisma.PostSaveWhereInput[];
    NOT?: Prisma.PostSaveWhereInput | Prisma.PostSaveWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"PostSave"> | Date | string;
    userId?: Prisma.StringFilter<"PostSave"> | string;
    postId?: Prisma.StringFilter<"PostSave"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
}, "id" | "userId_postId">;
export type PostSaveOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    _count?: Prisma.PostSaveCountOrderByAggregateInput;
    _max?: Prisma.PostSaveMaxOrderByAggregateInput;
    _min?: Prisma.PostSaveMinOrderByAggregateInput;
};
export type PostSaveScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostSaveScalarWhereWithAggregatesInput | Prisma.PostSaveScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostSaveScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostSaveScalarWhereWithAggregatesInput | Prisma.PostSaveScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PostSave"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PostSave"> | Date | string;
    userId?: Prisma.StringWithAggregatesFilter<"PostSave"> | string;
    postId?: Prisma.StringWithAggregatesFilter<"PostSave"> | string;
};
export type PostSaveCreateInput = {
    id?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSavedPostsInput;
    post: Prisma.PostCreateNestedOneWithoutSavedByInput;
};
export type PostSaveUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    userId: string;
    postId: string;
};
export type PostSaveUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSavedPostsNestedInput;
    post?: Prisma.PostUpdateOneRequiredWithoutSavedByNestedInput;
};
export type PostSaveUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostSaveCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    userId: string;
    postId: string;
};
export type PostSaveUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostSaveUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostSaveListRelationFilter = {
    every?: Prisma.PostSaveWhereInput;
    some?: Prisma.PostSaveWhereInput;
    none?: Prisma.PostSaveWhereInput;
};
export type PostSaveOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostSaveUserIdPostIdCompoundUniqueInput = {
    userId: string;
    postId: string;
};
export type PostSaveCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type PostSaveMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type PostSaveMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type PostSaveCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PostSaveCreateWithoutUserInput, Prisma.PostSaveUncheckedCreateWithoutUserInput> | Prisma.PostSaveCreateWithoutUserInput[] | Prisma.PostSaveUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostSaveCreateOrConnectWithoutUserInput | Prisma.PostSaveCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PostSaveCreateManyUserInputEnvelope;
    connect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
};
export type PostSaveUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PostSaveCreateWithoutUserInput, Prisma.PostSaveUncheckedCreateWithoutUserInput> | Prisma.PostSaveCreateWithoutUserInput[] | Prisma.PostSaveUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostSaveCreateOrConnectWithoutUserInput | Prisma.PostSaveCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PostSaveCreateManyUserInputEnvelope;
    connect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
};
export type PostSaveUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PostSaveCreateWithoutUserInput, Prisma.PostSaveUncheckedCreateWithoutUserInput> | Prisma.PostSaveCreateWithoutUserInput[] | Prisma.PostSaveUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostSaveCreateOrConnectWithoutUserInput | Prisma.PostSaveCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PostSaveUpsertWithWhereUniqueWithoutUserInput | Prisma.PostSaveUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PostSaveCreateManyUserInputEnvelope;
    set?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    disconnect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    delete?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    connect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    update?: Prisma.PostSaveUpdateWithWhereUniqueWithoutUserInput | Prisma.PostSaveUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PostSaveUpdateManyWithWhereWithoutUserInput | Prisma.PostSaveUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PostSaveScalarWhereInput | Prisma.PostSaveScalarWhereInput[];
};
export type PostSaveUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PostSaveCreateWithoutUserInput, Prisma.PostSaveUncheckedCreateWithoutUserInput> | Prisma.PostSaveCreateWithoutUserInput[] | Prisma.PostSaveUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostSaveCreateOrConnectWithoutUserInput | Prisma.PostSaveCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PostSaveUpsertWithWhereUniqueWithoutUserInput | Prisma.PostSaveUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PostSaveCreateManyUserInputEnvelope;
    set?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    disconnect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    delete?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    connect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    update?: Prisma.PostSaveUpdateWithWhereUniqueWithoutUserInput | Prisma.PostSaveUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PostSaveUpdateManyWithWhereWithoutUserInput | Prisma.PostSaveUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PostSaveScalarWhereInput | Prisma.PostSaveScalarWhereInput[];
};
export type PostSaveCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostSaveCreateWithoutPostInput, Prisma.PostSaveUncheckedCreateWithoutPostInput> | Prisma.PostSaveCreateWithoutPostInput[] | Prisma.PostSaveUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostSaveCreateOrConnectWithoutPostInput | Prisma.PostSaveCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostSaveCreateManyPostInputEnvelope;
    connect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
};
export type PostSaveUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostSaveCreateWithoutPostInput, Prisma.PostSaveUncheckedCreateWithoutPostInput> | Prisma.PostSaveCreateWithoutPostInput[] | Prisma.PostSaveUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostSaveCreateOrConnectWithoutPostInput | Prisma.PostSaveCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostSaveCreateManyPostInputEnvelope;
    connect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
};
export type PostSaveUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostSaveCreateWithoutPostInput, Prisma.PostSaveUncheckedCreateWithoutPostInput> | Prisma.PostSaveCreateWithoutPostInput[] | Prisma.PostSaveUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostSaveCreateOrConnectWithoutPostInput | Prisma.PostSaveCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostSaveUpsertWithWhereUniqueWithoutPostInput | Prisma.PostSaveUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostSaveCreateManyPostInputEnvelope;
    set?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    disconnect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    delete?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    connect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    update?: Prisma.PostSaveUpdateWithWhereUniqueWithoutPostInput | Prisma.PostSaveUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostSaveUpdateManyWithWhereWithoutPostInput | Prisma.PostSaveUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostSaveScalarWhereInput | Prisma.PostSaveScalarWhereInput[];
};
export type PostSaveUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostSaveCreateWithoutPostInput, Prisma.PostSaveUncheckedCreateWithoutPostInput> | Prisma.PostSaveCreateWithoutPostInput[] | Prisma.PostSaveUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostSaveCreateOrConnectWithoutPostInput | Prisma.PostSaveCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostSaveUpsertWithWhereUniqueWithoutPostInput | Prisma.PostSaveUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostSaveCreateManyPostInputEnvelope;
    set?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    disconnect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    delete?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    connect?: Prisma.PostSaveWhereUniqueInput | Prisma.PostSaveWhereUniqueInput[];
    update?: Prisma.PostSaveUpdateWithWhereUniqueWithoutPostInput | Prisma.PostSaveUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostSaveUpdateManyWithWhereWithoutPostInput | Prisma.PostSaveUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostSaveScalarWhereInput | Prisma.PostSaveScalarWhereInput[];
};
export type PostSaveCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutSavedByInput;
};
export type PostSaveUncheckedCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    postId: string;
};
export type PostSaveCreateOrConnectWithoutUserInput = {
    where: Prisma.PostSaveWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostSaveCreateWithoutUserInput, Prisma.PostSaveUncheckedCreateWithoutUserInput>;
};
export type PostSaveCreateManyUserInputEnvelope = {
    data: Prisma.PostSaveCreateManyUserInput | Prisma.PostSaveCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PostSaveUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PostSaveWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostSaveUpdateWithoutUserInput, Prisma.PostSaveUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PostSaveCreateWithoutUserInput, Prisma.PostSaveUncheckedCreateWithoutUserInput>;
};
export type PostSaveUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PostSaveWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostSaveUpdateWithoutUserInput, Prisma.PostSaveUncheckedUpdateWithoutUserInput>;
};
export type PostSaveUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PostSaveScalarWhereInput;
    data: Prisma.XOR<Prisma.PostSaveUpdateManyMutationInput, Prisma.PostSaveUncheckedUpdateManyWithoutUserInput>;
};
export type PostSaveScalarWhereInput = {
    AND?: Prisma.PostSaveScalarWhereInput | Prisma.PostSaveScalarWhereInput[];
    OR?: Prisma.PostSaveScalarWhereInput[];
    NOT?: Prisma.PostSaveScalarWhereInput | Prisma.PostSaveScalarWhereInput[];
    id?: Prisma.StringFilter<"PostSave"> | string;
    createdAt?: Prisma.DateTimeFilter<"PostSave"> | Date | string;
    userId?: Prisma.StringFilter<"PostSave"> | string;
    postId?: Prisma.StringFilter<"PostSave"> | string;
};
export type PostSaveCreateWithoutPostInput = {
    id?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSavedPostsInput;
};
export type PostSaveUncheckedCreateWithoutPostInput = {
    id?: string;
    createdAt?: Date | string;
    userId: string;
};
export type PostSaveCreateOrConnectWithoutPostInput = {
    where: Prisma.PostSaveWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostSaveCreateWithoutPostInput, Prisma.PostSaveUncheckedCreateWithoutPostInput>;
};
export type PostSaveCreateManyPostInputEnvelope = {
    data: Prisma.PostSaveCreateManyPostInput | Prisma.PostSaveCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type PostSaveUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostSaveWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostSaveUpdateWithoutPostInput, Prisma.PostSaveUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.PostSaveCreateWithoutPostInput, Prisma.PostSaveUncheckedCreateWithoutPostInput>;
};
export type PostSaveUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostSaveWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostSaveUpdateWithoutPostInput, Prisma.PostSaveUncheckedUpdateWithoutPostInput>;
};
export type PostSaveUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.PostSaveScalarWhereInput;
    data: Prisma.XOR<Prisma.PostSaveUpdateManyMutationInput, Prisma.PostSaveUncheckedUpdateManyWithoutPostInput>;
};
export type PostSaveCreateManyUserInput = {
    id?: string;
    createdAt?: Date | string;
    postId: string;
};
export type PostSaveUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutSavedByNestedInput;
};
export type PostSaveUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostSaveUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostSaveCreateManyPostInput = {
    id?: string;
    createdAt?: Date | string;
    userId: string;
};
export type PostSaveUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSavedPostsNestedInput;
};
export type PostSaveUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostSaveUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostSaveSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    userId?: boolean;
    postId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postSave"]>;
export type PostSaveSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    userId?: boolean;
    postId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postSave"]>;
export type PostSaveSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    userId?: boolean;
    postId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postSave"]>;
export type PostSaveSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    userId?: boolean;
    postId?: boolean;
};
export type PostSaveOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "userId" | "postId", ExtArgs["result"]["postSave"]>;
export type PostSaveInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type PostSaveIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type PostSaveIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type $PostSavePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PostSave";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        post: Prisma.$PostPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        userId: string;
        postId: string;
    }, ExtArgs["result"]["postSave"]>;
    composites: {};
};
export type PostSaveGetPayload<S extends boolean | null | undefined | PostSaveDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostSavePayload, S>;
export type PostSaveCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostSaveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostSaveCountAggregateInputType | true;
};
export interface PostSaveDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PostSave'];
        meta: {
            name: 'PostSave';
        };
    };
    findUnique<T extends PostSaveFindUniqueArgs>(args: Prisma.SelectSubset<T, PostSaveFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostSaveClient<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostSaveFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostSaveFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostSaveClient<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostSaveFindFirstArgs>(args?: Prisma.SelectSubset<T, PostSaveFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostSaveClient<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostSaveFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostSaveFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostSaveClient<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostSaveFindManyArgs>(args?: Prisma.SelectSubset<T, PostSaveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostSaveCreateArgs>(args: Prisma.SelectSubset<T, PostSaveCreateArgs<ExtArgs>>): Prisma.Prisma__PostSaveClient<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostSaveCreateManyArgs>(args?: Prisma.SelectSubset<T, PostSaveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostSaveCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostSaveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostSaveDeleteArgs>(args: Prisma.SelectSubset<T, PostSaveDeleteArgs<ExtArgs>>): Prisma.Prisma__PostSaveClient<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostSaveUpdateArgs>(args: Prisma.SelectSubset<T, PostSaveUpdateArgs<ExtArgs>>): Prisma.Prisma__PostSaveClient<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostSaveDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostSaveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostSaveUpdateManyArgs>(args: Prisma.SelectSubset<T, PostSaveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostSaveUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostSaveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostSaveUpsertArgs>(args: Prisma.SelectSubset<T, PostSaveUpsertArgs<ExtArgs>>): Prisma.Prisma__PostSaveClient<runtime.Types.Result.GetResult<Prisma.$PostSavePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostSaveCountArgs>(args?: Prisma.Subset<T, PostSaveCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostSaveCountAggregateOutputType> : number>;
    aggregate<T extends PostSaveAggregateArgs>(args: Prisma.Subset<T, PostSaveAggregateArgs>): Prisma.PrismaPromise<GetPostSaveAggregateType<T>>;
    groupBy<T extends PostSaveGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostSaveGroupByArgs['orderBy'];
    } : {
        orderBy?: PostSaveGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostSaveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostSaveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostSaveFieldRefs;
}
export interface Prisma__PostSaveClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostSaveFieldRefs {
    readonly id: Prisma.FieldRef<"PostSave", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PostSave", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"PostSave", 'String'>;
    readonly postId: Prisma.FieldRef<"PostSave", 'String'>;
}
export type PostSaveFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    where: Prisma.PostSaveWhereUniqueInput;
};
export type PostSaveFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    where: Prisma.PostSaveWhereUniqueInput;
};
export type PostSaveFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    where?: Prisma.PostSaveWhereInput;
    orderBy?: Prisma.PostSaveOrderByWithRelationInput | Prisma.PostSaveOrderByWithRelationInput[];
    cursor?: Prisma.PostSaveWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostSaveScalarFieldEnum | Prisma.PostSaveScalarFieldEnum[];
};
export type PostSaveFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    where?: Prisma.PostSaveWhereInput;
    orderBy?: Prisma.PostSaveOrderByWithRelationInput | Prisma.PostSaveOrderByWithRelationInput[];
    cursor?: Prisma.PostSaveWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostSaveScalarFieldEnum | Prisma.PostSaveScalarFieldEnum[];
};
export type PostSaveFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    where?: Prisma.PostSaveWhereInput;
    orderBy?: Prisma.PostSaveOrderByWithRelationInput | Prisma.PostSaveOrderByWithRelationInput[];
    cursor?: Prisma.PostSaveWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostSaveScalarFieldEnum | Prisma.PostSaveScalarFieldEnum[];
};
export type PostSaveCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostSaveCreateInput, Prisma.PostSaveUncheckedCreateInput>;
};
export type PostSaveCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostSaveCreateManyInput | Prisma.PostSaveCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostSaveCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    data: Prisma.PostSaveCreateManyInput | Prisma.PostSaveCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostSaveIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostSaveUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostSaveUpdateInput, Prisma.PostSaveUncheckedUpdateInput>;
    where: Prisma.PostSaveWhereUniqueInput;
};
export type PostSaveUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostSaveUpdateManyMutationInput, Prisma.PostSaveUncheckedUpdateManyInput>;
    where?: Prisma.PostSaveWhereInput;
    limit?: number;
};
export type PostSaveUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostSaveUpdateManyMutationInput, Prisma.PostSaveUncheckedUpdateManyInput>;
    where?: Prisma.PostSaveWhereInput;
    limit?: number;
    include?: Prisma.PostSaveIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostSaveUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    where: Prisma.PostSaveWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostSaveCreateInput, Prisma.PostSaveUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostSaveUpdateInput, Prisma.PostSaveUncheckedUpdateInput>;
};
export type PostSaveDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
    where: Prisma.PostSaveWhereUniqueInput;
};
export type PostSaveDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostSaveWhereInput;
    limit?: number;
};
export type PostSaveDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSaveSelect<ExtArgs> | null;
    omit?: Prisma.PostSaveOmit<ExtArgs> | null;
    include?: Prisma.PostSaveInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PostSave.d.ts.map