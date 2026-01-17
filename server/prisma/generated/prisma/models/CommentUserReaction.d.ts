import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommentUserReactionModel = runtime.Types.Result.DefaultSelection<Prisma.$CommentUserReactionPayload>;
export type AggregateCommentUserReaction = {
    _count: CommentUserReactionCountAggregateOutputType | null;
    _min: CommentUserReactionMinAggregateOutputType | null;
    _max: CommentUserReactionMaxAggregateOutputType | null;
};
export type CommentUserReactionMinAggregateOutputType = {
    id: string | null;
    reaction: $Enums.CommentReactionState | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
    commentId: string | null;
};
export type CommentUserReactionMaxAggregateOutputType = {
    id: string | null;
    reaction: $Enums.CommentReactionState | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
    commentId: string | null;
};
export type CommentUserReactionCountAggregateOutputType = {
    id: number;
    reaction: number;
    createdAt: number;
    updatedAt: number;
    userId: number;
    commentId: number;
    _all: number;
};
export type CommentUserReactionMinAggregateInputType = {
    id?: true;
    reaction?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    commentId?: true;
};
export type CommentUserReactionMaxAggregateInputType = {
    id?: true;
    reaction?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    commentId?: true;
};
export type CommentUserReactionCountAggregateInputType = {
    id?: true;
    reaction?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    commentId?: true;
    _all?: true;
};
export type CommentUserReactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentUserReactionWhereInput;
    orderBy?: Prisma.CommentUserReactionOrderByWithRelationInput | Prisma.CommentUserReactionOrderByWithRelationInput[];
    cursor?: Prisma.CommentUserReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommentUserReactionCountAggregateInputType;
    _min?: CommentUserReactionMinAggregateInputType;
    _max?: CommentUserReactionMaxAggregateInputType;
};
export type GetCommentUserReactionAggregateType<T extends CommentUserReactionAggregateArgs> = {
    [P in keyof T & keyof AggregateCommentUserReaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommentUserReaction[P]> : Prisma.GetScalarType<T[P], AggregateCommentUserReaction[P]>;
};
export type CommentUserReactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentUserReactionWhereInput;
    orderBy?: Prisma.CommentUserReactionOrderByWithAggregationInput | Prisma.CommentUserReactionOrderByWithAggregationInput[];
    by: Prisma.CommentUserReactionScalarFieldEnum[] | Prisma.CommentUserReactionScalarFieldEnum;
    having?: Prisma.CommentUserReactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommentUserReactionCountAggregateInputType | true;
    _min?: CommentUserReactionMinAggregateInputType;
    _max?: CommentUserReactionMaxAggregateInputType;
};
export type CommentUserReactionGroupByOutputType = {
    id: string;
    reaction: $Enums.CommentReactionState;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    commentId: string;
    _count: CommentUserReactionCountAggregateOutputType | null;
    _min: CommentUserReactionMinAggregateOutputType | null;
    _max: CommentUserReactionMaxAggregateOutputType | null;
};
type GetCommentUserReactionGroupByPayload<T extends CommentUserReactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommentUserReactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommentUserReactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommentUserReactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommentUserReactionGroupByOutputType[P]>;
}>>;
export type CommentUserReactionWhereInput = {
    AND?: Prisma.CommentUserReactionWhereInput | Prisma.CommentUserReactionWhereInput[];
    OR?: Prisma.CommentUserReactionWhereInput[];
    NOT?: Prisma.CommentUserReactionWhereInput | Prisma.CommentUserReactionWhereInput[];
    id?: Prisma.StringFilter<"CommentUserReaction"> | string;
    reaction?: Prisma.EnumCommentReactionStateFilter<"CommentUserReaction"> | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFilter<"CommentUserReaction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommentUserReaction"> | Date | string;
    userId?: Prisma.StringFilter<"CommentUserReaction"> | string;
    commentId?: Prisma.StringFilter<"CommentUserReaction"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    comment?: Prisma.XOR<Prisma.CommentScalarRelationFilter, Prisma.CommentWhereInput>;
};
export type CommentUserReactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reaction?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    comment?: Prisma.CommentOrderByWithRelationInput;
};
export type CommentUserReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_commentId?: Prisma.CommentUserReactionUserIdCommentIdCompoundUniqueInput;
    AND?: Prisma.CommentUserReactionWhereInput | Prisma.CommentUserReactionWhereInput[];
    OR?: Prisma.CommentUserReactionWhereInput[];
    NOT?: Prisma.CommentUserReactionWhereInput | Prisma.CommentUserReactionWhereInput[];
    reaction?: Prisma.EnumCommentReactionStateFilter<"CommentUserReaction"> | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFilter<"CommentUserReaction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommentUserReaction"> | Date | string;
    userId?: Prisma.StringFilter<"CommentUserReaction"> | string;
    commentId?: Prisma.StringFilter<"CommentUserReaction"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    comment?: Prisma.XOR<Prisma.CommentScalarRelationFilter, Prisma.CommentWhereInput>;
}, "id" | "userId_commentId">;
export type CommentUserReactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reaction?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
    _count?: Prisma.CommentUserReactionCountOrderByAggregateInput;
    _max?: Prisma.CommentUserReactionMaxOrderByAggregateInput;
    _min?: Prisma.CommentUserReactionMinOrderByAggregateInput;
};
export type CommentUserReactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommentUserReactionScalarWhereWithAggregatesInput | Prisma.CommentUserReactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommentUserReactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommentUserReactionScalarWhereWithAggregatesInput | Prisma.CommentUserReactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CommentUserReaction"> | string;
    reaction?: Prisma.EnumCommentReactionStateWithAggregatesFilter<"CommentUserReaction"> | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommentUserReaction"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CommentUserReaction"> | Date | string;
    userId?: Prisma.StringWithAggregatesFilter<"CommentUserReaction"> | string;
    commentId?: Prisma.StringWithAggregatesFilter<"CommentUserReaction"> | string;
};
export type CommentUserReactionCreateInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCommentReactionsInput;
    comment: Prisma.CommentCreateNestedOneWithoutReactionsInput;
};
export type CommentUserReactionUncheckedCreateInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    commentId: string;
};
export type CommentUserReactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCommentReactionsNestedInput;
    comment?: Prisma.CommentUpdateOneRequiredWithoutReactionsNestedInput;
};
export type CommentUserReactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CommentUserReactionCreateManyInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    commentId: string;
};
export type CommentUserReactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CommentUserReactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CommentUserReactionListRelationFilter = {
    every?: Prisma.CommentUserReactionWhereInput;
    some?: Prisma.CommentUserReactionWhereInput;
    none?: Prisma.CommentUserReactionWhereInput;
};
export type CommentUserReactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommentUserReactionUserIdCommentIdCompoundUniqueInput = {
    userId: string;
    commentId: string;
};
export type CommentUserReactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reaction?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
};
export type CommentUserReactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reaction?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
};
export type CommentUserReactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reaction?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
};
export type CommentUserReactionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutUserInput, Prisma.CommentUserReactionUncheckedCreateWithoutUserInput> | Prisma.CommentUserReactionCreateWithoutUserInput[] | Prisma.CommentUserReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentUserReactionCreateOrConnectWithoutUserInput | Prisma.CommentUserReactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommentUserReactionCreateManyUserInputEnvelope;
    connect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
};
export type CommentUserReactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutUserInput, Prisma.CommentUserReactionUncheckedCreateWithoutUserInput> | Prisma.CommentUserReactionCreateWithoutUserInput[] | Prisma.CommentUserReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentUserReactionCreateOrConnectWithoutUserInput | Prisma.CommentUserReactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CommentUserReactionCreateManyUserInputEnvelope;
    connect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
};
export type CommentUserReactionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutUserInput, Prisma.CommentUserReactionUncheckedCreateWithoutUserInput> | Prisma.CommentUserReactionCreateWithoutUserInput[] | Prisma.CommentUserReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentUserReactionCreateOrConnectWithoutUserInput | Prisma.CommentUserReactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommentUserReactionUpsertWithWhereUniqueWithoutUserInput | Prisma.CommentUserReactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommentUserReactionCreateManyUserInputEnvelope;
    set?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    disconnect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    delete?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    connect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    update?: Prisma.CommentUserReactionUpdateWithWhereUniqueWithoutUserInput | Prisma.CommentUserReactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommentUserReactionUpdateManyWithWhereWithoutUserInput | Prisma.CommentUserReactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommentUserReactionScalarWhereInput | Prisma.CommentUserReactionScalarWhereInput[];
};
export type CommentUserReactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutUserInput, Prisma.CommentUserReactionUncheckedCreateWithoutUserInput> | Prisma.CommentUserReactionCreateWithoutUserInput[] | Prisma.CommentUserReactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CommentUserReactionCreateOrConnectWithoutUserInput | Prisma.CommentUserReactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CommentUserReactionUpsertWithWhereUniqueWithoutUserInput | Prisma.CommentUserReactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CommentUserReactionCreateManyUserInputEnvelope;
    set?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    disconnect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    delete?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    connect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    update?: Prisma.CommentUserReactionUpdateWithWhereUniqueWithoutUserInput | Prisma.CommentUserReactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CommentUserReactionUpdateManyWithWhereWithoutUserInput | Prisma.CommentUserReactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CommentUserReactionScalarWhereInput | Prisma.CommentUserReactionScalarWhereInput[];
};
export type CommentUserReactionCreateNestedManyWithoutCommentInput = {
    create?: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutCommentInput, Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput> | Prisma.CommentUserReactionCreateWithoutCommentInput[] | Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.CommentUserReactionCreateOrConnectWithoutCommentInput | Prisma.CommentUserReactionCreateOrConnectWithoutCommentInput[];
    createMany?: Prisma.CommentUserReactionCreateManyCommentInputEnvelope;
    connect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
};
export type CommentUserReactionUncheckedCreateNestedManyWithoutCommentInput = {
    create?: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutCommentInput, Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput> | Prisma.CommentUserReactionCreateWithoutCommentInput[] | Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.CommentUserReactionCreateOrConnectWithoutCommentInput | Prisma.CommentUserReactionCreateOrConnectWithoutCommentInput[];
    createMany?: Prisma.CommentUserReactionCreateManyCommentInputEnvelope;
    connect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
};
export type CommentUserReactionUpdateManyWithoutCommentNestedInput = {
    create?: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutCommentInput, Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput> | Prisma.CommentUserReactionCreateWithoutCommentInput[] | Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.CommentUserReactionCreateOrConnectWithoutCommentInput | Prisma.CommentUserReactionCreateOrConnectWithoutCommentInput[];
    upsert?: Prisma.CommentUserReactionUpsertWithWhereUniqueWithoutCommentInput | Prisma.CommentUserReactionUpsertWithWhereUniqueWithoutCommentInput[];
    createMany?: Prisma.CommentUserReactionCreateManyCommentInputEnvelope;
    set?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    disconnect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    delete?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    connect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    update?: Prisma.CommentUserReactionUpdateWithWhereUniqueWithoutCommentInput | Prisma.CommentUserReactionUpdateWithWhereUniqueWithoutCommentInput[];
    updateMany?: Prisma.CommentUserReactionUpdateManyWithWhereWithoutCommentInput | Prisma.CommentUserReactionUpdateManyWithWhereWithoutCommentInput[];
    deleteMany?: Prisma.CommentUserReactionScalarWhereInput | Prisma.CommentUserReactionScalarWhereInput[];
};
export type CommentUserReactionUncheckedUpdateManyWithoutCommentNestedInput = {
    create?: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutCommentInput, Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput> | Prisma.CommentUserReactionCreateWithoutCommentInput[] | Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.CommentUserReactionCreateOrConnectWithoutCommentInput | Prisma.CommentUserReactionCreateOrConnectWithoutCommentInput[];
    upsert?: Prisma.CommentUserReactionUpsertWithWhereUniqueWithoutCommentInput | Prisma.CommentUserReactionUpsertWithWhereUniqueWithoutCommentInput[];
    createMany?: Prisma.CommentUserReactionCreateManyCommentInputEnvelope;
    set?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    disconnect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    delete?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    connect?: Prisma.CommentUserReactionWhereUniqueInput | Prisma.CommentUserReactionWhereUniqueInput[];
    update?: Prisma.CommentUserReactionUpdateWithWhereUniqueWithoutCommentInput | Prisma.CommentUserReactionUpdateWithWhereUniqueWithoutCommentInput[];
    updateMany?: Prisma.CommentUserReactionUpdateManyWithWhereWithoutCommentInput | Prisma.CommentUserReactionUpdateManyWithWhereWithoutCommentInput[];
    deleteMany?: Prisma.CommentUserReactionScalarWhereInput | Prisma.CommentUserReactionScalarWhereInput[];
};
export type EnumCommentReactionStateFieldUpdateOperationsInput = {
    set?: $Enums.CommentReactionState;
};
export type CommentUserReactionCreateWithoutUserInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comment: Prisma.CommentCreateNestedOneWithoutReactionsInput;
};
export type CommentUserReactionUncheckedCreateWithoutUserInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    commentId: string;
};
export type CommentUserReactionCreateOrConnectWithoutUserInput = {
    where: Prisma.CommentUserReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutUserInput, Prisma.CommentUserReactionUncheckedCreateWithoutUserInput>;
};
export type CommentUserReactionCreateManyUserInputEnvelope = {
    data: Prisma.CommentUserReactionCreateManyUserInput | Prisma.CommentUserReactionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CommentUserReactionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommentUserReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentUserReactionUpdateWithoutUserInput, Prisma.CommentUserReactionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutUserInput, Prisma.CommentUserReactionUncheckedCreateWithoutUserInput>;
};
export type CommentUserReactionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CommentUserReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentUserReactionUpdateWithoutUserInput, Prisma.CommentUserReactionUncheckedUpdateWithoutUserInput>;
};
export type CommentUserReactionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CommentUserReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentUserReactionUpdateManyMutationInput, Prisma.CommentUserReactionUncheckedUpdateManyWithoutUserInput>;
};
export type CommentUserReactionScalarWhereInput = {
    AND?: Prisma.CommentUserReactionScalarWhereInput | Prisma.CommentUserReactionScalarWhereInput[];
    OR?: Prisma.CommentUserReactionScalarWhereInput[];
    NOT?: Prisma.CommentUserReactionScalarWhereInput | Prisma.CommentUserReactionScalarWhereInput[];
    id?: Prisma.StringFilter<"CommentUserReaction"> | string;
    reaction?: Prisma.EnumCommentReactionStateFilter<"CommentUserReaction"> | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFilter<"CommentUserReaction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommentUserReaction"> | Date | string;
    userId?: Prisma.StringFilter<"CommentUserReaction"> | string;
    commentId?: Prisma.StringFilter<"CommentUserReaction"> | string;
};
export type CommentUserReactionCreateWithoutCommentInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCommentReactionsInput;
};
export type CommentUserReactionUncheckedCreateWithoutCommentInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
};
export type CommentUserReactionCreateOrConnectWithoutCommentInput = {
    where: Prisma.CommentUserReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutCommentInput, Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput>;
};
export type CommentUserReactionCreateManyCommentInputEnvelope = {
    data: Prisma.CommentUserReactionCreateManyCommentInput | Prisma.CommentUserReactionCreateManyCommentInput[];
    skipDuplicates?: boolean;
};
export type CommentUserReactionUpsertWithWhereUniqueWithoutCommentInput = {
    where: Prisma.CommentUserReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommentUserReactionUpdateWithoutCommentInput, Prisma.CommentUserReactionUncheckedUpdateWithoutCommentInput>;
    create: Prisma.XOR<Prisma.CommentUserReactionCreateWithoutCommentInput, Prisma.CommentUserReactionUncheckedCreateWithoutCommentInput>;
};
export type CommentUserReactionUpdateWithWhereUniqueWithoutCommentInput = {
    where: Prisma.CommentUserReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommentUserReactionUpdateWithoutCommentInput, Prisma.CommentUserReactionUncheckedUpdateWithoutCommentInput>;
};
export type CommentUserReactionUpdateManyWithWhereWithoutCommentInput = {
    where: Prisma.CommentUserReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.CommentUserReactionUpdateManyMutationInput, Prisma.CommentUserReactionUncheckedUpdateManyWithoutCommentInput>;
};
export type CommentUserReactionCreateManyUserInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    commentId: string;
};
export type CommentUserReactionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comment?: Prisma.CommentUpdateOneRequiredWithoutReactionsNestedInput;
};
export type CommentUserReactionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    commentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CommentUserReactionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    commentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CommentUserReactionCreateManyCommentInput = {
    id?: string;
    reaction: $Enums.CommentReactionState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
};
export type CommentUserReactionUpdateWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCommentReactionsNestedInput;
};
export type CommentUserReactionUncheckedUpdateWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CommentUserReactionUncheckedUpdateManyWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reaction?: Prisma.EnumCommentReactionStateFieldUpdateOperationsInput | $Enums.CommentReactionState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CommentUserReactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reaction?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    commentId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commentUserReaction"]>;
export type CommentUserReactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reaction?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    commentId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commentUserReaction"]>;
export type CommentUserReactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reaction?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    commentId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["commentUserReaction"]>;
export type CommentUserReactionSelectScalar = {
    id?: boolean;
    reaction?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    commentId?: boolean;
};
export type CommentUserReactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reaction" | "createdAt" | "updatedAt" | "userId" | "commentId", ExtArgs["result"]["commentUserReaction"]>;
export type CommentUserReactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
};
export type CommentUserReactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
};
export type CommentUserReactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    comment?: boolean | Prisma.CommentDefaultArgs<ExtArgs>;
};
export type $CommentUserReactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommentUserReaction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        comment: Prisma.$CommentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reaction: $Enums.CommentReactionState;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        commentId: string;
    }, ExtArgs["result"]["commentUserReaction"]>;
    composites: {};
};
export type CommentUserReactionGetPayload<S extends boolean | null | undefined | CommentUserReactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload, S>;
export type CommentUserReactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommentUserReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommentUserReactionCountAggregateInputType | true;
};
export interface CommentUserReactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommentUserReaction'];
        meta: {
            name: 'CommentUserReaction';
        };
    };
    findUnique<T extends CommentUserReactionFindUniqueArgs>(args: Prisma.SelectSubset<T, CommentUserReactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommentUserReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommentUserReactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommentUserReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommentUserReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommentUserReactionFindFirstArgs>(args?: Prisma.SelectSubset<T, CommentUserReactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommentUserReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommentUserReactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommentUserReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommentUserReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommentUserReactionFindManyArgs>(args?: Prisma.SelectSubset<T, CommentUserReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommentUserReactionCreateArgs>(args: Prisma.SelectSubset<T, CommentUserReactionCreateArgs<ExtArgs>>): Prisma.Prisma__CommentUserReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommentUserReactionCreateManyArgs>(args?: Prisma.SelectSubset<T, CommentUserReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommentUserReactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommentUserReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommentUserReactionDeleteArgs>(args: Prisma.SelectSubset<T, CommentUserReactionDeleteArgs<ExtArgs>>): Prisma.Prisma__CommentUserReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommentUserReactionUpdateArgs>(args: Prisma.SelectSubset<T, CommentUserReactionUpdateArgs<ExtArgs>>): Prisma.Prisma__CommentUserReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommentUserReactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommentUserReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommentUserReactionUpdateManyArgs>(args: Prisma.SelectSubset<T, CommentUserReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommentUserReactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommentUserReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommentUserReactionUpsertArgs>(args: Prisma.SelectSubset<T, CommentUserReactionUpsertArgs<ExtArgs>>): Prisma.Prisma__CommentUserReactionClient<runtime.Types.Result.GetResult<Prisma.$CommentUserReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommentUserReactionCountArgs>(args?: Prisma.Subset<T, CommentUserReactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommentUserReactionCountAggregateOutputType> : number>;
    aggregate<T extends CommentUserReactionAggregateArgs>(args: Prisma.Subset<T, CommentUserReactionAggregateArgs>): Prisma.PrismaPromise<GetCommentUserReactionAggregateType<T>>;
    groupBy<T extends CommentUserReactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommentUserReactionGroupByArgs['orderBy'];
    } : {
        orderBy?: CommentUserReactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommentUserReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentUserReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommentUserReactionFieldRefs;
}
export interface Prisma__CommentUserReactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    comment<T extends Prisma.CommentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommentDefaultArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommentUserReactionFieldRefs {
    readonly id: Prisma.FieldRef<"CommentUserReaction", 'String'>;
    readonly reaction: Prisma.FieldRef<"CommentUserReaction", 'CommentReactionState'>;
    readonly createdAt: Prisma.FieldRef<"CommentUserReaction", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CommentUserReaction", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"CommentUserReaction", 'String'>;
    readonly commentId: Prisma.FieldRef<"CommentUserReaction", 'String'>;
}
export type CommentUserReactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    where: Prisma.CommentUserReactionWhereUniqueInput;
};
export type CommentUserReactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    where: Prisma.CommentUserReactionWhereUniqueInput;
};
export type CommentUserReactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    where?: Prisma.CommentUserReactionWhereInput;
    orderBy?: Prisma.CommentUserReactionOrderByWithRelationInput | Prisma.CommentUserReactionOrderByWithRelationInput[];
    cursor?: Prisma.CommentUserReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentUserReactionScalarFieldEnum | Prisma.CommentUserReactionScalarFieldEnum[];
};
export type CommentUserReactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    where?: Prisma.CommentUserReactionWhereInput;
    orderBy?: Prisma.CommentUserReactionOrderByWithRelationInput | Prisma.CommentUserReactionOrderByWithRelationInput[];
    cursor?: Prisma.CommentUserReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentUserReactionScalarFieldEnum | Prisma.CommentUserReactionScalarFieldEnum[];
};
export type CommentUserReactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    where?: Prisma.CommentUserReactionWhereInput;
    orderBy?: Prisma.CommentUserReactionOrderByWithRelationInput | Prisma.CommentUserReactionOrderByWithRelationInput[];
    cursor?: Prisma.CommentUserReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentUserReactionScalarFieldEnum | Prisma.CommentUserReactionScalarFieldEnum[];
};
export type CommentUserReactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentUserReactionCreateInput, Prisma.CommentUserReactionUncheckedCreateInput>;
};
export type CommentUserReactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommentUserReactionCreateManyInput | Prisma.CommentUserReactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommentUserReactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    data: Prisma.CommentUserReactionCreateManyInput | Prisma.CommentUserReactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommentUserReactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommentUserReactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentUserReactionUpdateInput, Prisma.CommentUserReactionUncheckedUpdateInput>;
    where: Prisma.CommentUserReactionWhereUniqueInput;
};
export type CommentUserReactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommentUserReactionUpdateManyMutationInput, Prisma.CommentUserReactionUncheckedUpdateManyInput>;
    where?: Prisma.CommentUserReactionWhereInput;
    limit?: number;
};
export type CommentUserReactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommentUserReactionUpdateManyMutationInput, Prisma.CommentUserReactionUncheckedUpdateManyInput>;
    where?: Prisma.CommentUserReactionWhereInput;
    limit?: number;
    include?: Prisma.CommentUserReactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommentUserReactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    where: Prisma.CommentUserReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommentUserReactionCreateInput, Prisma.CommentUserReactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommentUserReactionUpdateInput, Prisma.CommentUserReactionUncheckedUpdateInput>;
};
export type CommentUserReactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
    where: Prisma.CommentUserReactionWhereUniqueInput;
};
export type CommentUserReactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentUserReactionWhereInput;
    limit?: number;
};
export type CommentUserReactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentUserReactionSelect<ExtArgs> | null;
    omit?: Prisma.CommentUserReactionOmit<ExtArgs> | null;
    include?: Prisma.CommentUserReactionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=CommentUserReaction.d.ts.map