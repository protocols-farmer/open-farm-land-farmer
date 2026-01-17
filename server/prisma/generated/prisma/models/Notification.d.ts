import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NotificationModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationPayload>;
export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
};
export type NotificationMinAggregateOutputType = {
    id: string | null;
    type: $Enums.NotificationType | null;
    read: boolean | null;
    createdAt: Date | null;
    recipientId: string | null;
    senderId: string | null;
    postId: string | null;
    commentId: string | null;
};
export type NotificationMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.NotificationType | null;
    read: boolean | null;
    createdAt: Date | null;
    recipientId: string | null;
    senderId: string | null;
    postId: string | null;
    commentId: string | null;
};
export type NotificationCountAggregateOutputType = {
    id: number;
    type: number;
    read: number;
    metadata: number;
    createdAt: number;
    recipientId: number;
    senderId: number;
    postId: number;
    commentId: number;
    _all: number;
};
export type NotificationMinAggregateInputType = {
    id?: true;
    type?: true;
    read?: true;
    createdAt?: true;
    recipientId?: true;
    senderId?: true;
    postId?: true;
    commentId?: true;
};
export type NotificationMaxAggregateInputType = {
    id?: true;
    type?: true;
    read?: true;
    createdAt?: true;
    recipientId?: true;
    senderId?: true;
    postId?: true;
    commentId?: true;
};
export type NotificationCountAggregateInputType = {
    id?: true;
    type?: true;
    read?: true;
    metadata?: true;
    createdAt?: true;
    recipientId?: true;
    senderId?: true;
    postId?: true;
    commentId?: true;
    _all?: true;
};
export type NotificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NotificationCountAggregateInputType;
    _min?: NotificationMinAggregateInputType;
    _max?: NotificationMaxAggregateInputType;
};
export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
    [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotification[P]> : Prisma.GetScalarType<T[P], AggregateNotification[P]>;
};
export type NotificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithAggregationInput | Prisma.NotificationOrderByWithAggregationInput[];
    by: Prisma.NotificationScalarFieldEnum[] | Prisma.NotificationScalarFieldEnum;
    having?: Prisma.NotificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationCountAggregateInputType | true;
    _min?: NotificationMinAggregateInputType;
    _max?: NotificationMaxAggregateInputType;
};
export type NotificationGroupByOutputType = {
    id: string;
    type: $Enums.NotificationType;
    read: boolean;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    recipientId: string;
    senderId: string;
    postId: string | null;
    commentId: string | null;
    _count: NotificationCountAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
};
type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]>;
}>>;
export type NotificationWhereInput = {
    AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    OR?: Prisma.NotificationWhereInput[];
    NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    id?: Prisma.StringFilter<"Notification"> | string;
    type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType;
    read?: Prisma.BoolFilter<"Notification"> | boolean;
    metadata?: Prisma.JsonNullableFilter<"Notification">;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    recipientId?: Prisma.StringFilter<"Notification"> | string;
    senderId?: Prisma.StringFilter<"Notification"> | string;
    postId?: Prisma.StringNullableFilter<"Notification"> | string | null;
    commentId?: Prisma.StringNullableFilter<"Notification"> | string | null;
    recipient?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    post?: Prisma.XOR<Prisma.PostNullableScalarRelationFilter, Prisma.PostWhereInput> | null;
    comment?: Prisma.XOR<Prisma.CommentNullableScalarRelationFilter, Prisma.CommentWhereInput> | null;
};
export type NotificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    postId?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    recipient?: Prisma.UserOrderByWithRelationInput;
    sender?: Prisma.UserOrderByWithRelationInput;
    post?: Prisma.PostOrderByWithRelationInput;
    comment?: Prisma.CommentOrderByWithRelationInput;
};
export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    OR?: Prisma.NotificationWhereInput[];
    NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType;
    read?: Prisma.BoolFilter<"Notification"> | boolean;
    metadata?: Prisma.JsonNullableFilter<"Notification">;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    recipientId?: Prisma.StringFilter<"Notification"> | string;
    senderId?: Prisma.StringFilter<"Notification"> | string;
    postId?: Prisma.StringNullableFilter<"Notification"> | string | null;
    commentId?: Prisma.StringNullableFilter<"Notification"> | string | null;
    recipient?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    post?: Prisma.XOR<Prisma.PostNullableScalarRelationFilter, Prisma.PostWhereInput> | null;
    comment?: Prisma.XOR<Prisma.CommentNullableScalarRelationFilter, Prisma.CommentWhereInput> | null;
}, "id">;
export type NotificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    postId?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.NotificationCountOrderByAggregateInput;
    _max?: Prisma.NotificationMaxOrderByAggregateInput;
    _min?: Prisma.NotificationMinOrderByAggregateInput;
};
export type NotificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    type?: Prisma.EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType;
    read?: Prisma.BoolWithAggregatesFilter<"Notification"> | boolean;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"Notification">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Notification"> | Date | string;
    recipientId?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    senderId?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    postId?: Prisma.StringNullableWithAggregatesFilter<"Notification"> | string | null;
    commentId?: Prisma.StringNullableWithAggregatesFilter<"Notification"> | string | null;
};
export type NotificationCreateInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipient: Prisma.UserCreateNestedOneWithoutNotificationsReceivedInput;
    sender: Prisma.UserCreateNestedOneWithoutNotificationsSentInput;
    post?: Prisma.PostCreateNestedOneWithoutNotificationsInput;
    comment?: Prisma.CommentCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipientId: string;
    senderId: string;
    postId?: string | null;
    commentId?: string | null;
};
export type NotificationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipient?: Prisma.UserUpdateOneRequiredWithoutNotificationsReceivedNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutNotificationsSentNestedInput;
    post?: Prisma.PostUpdateOneWithoutNotificationsNestedInput;
    comment?: Prisma.CommentUpdateOneWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationCreateManyInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipientId: string;
    senderId: string;
    postId?: string | null;
    commentId?: string | null;
};
export type NotificationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationListRelationFilter = {
    every?: Prisma.NotificationWhereInput;
    some?: Prisma.NotificationWhereInput;
    none?: Prisma.NotificationWhereInput;
};
export type NotificationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NotificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
};
export type NotificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
};
export type NotificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    read?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    recipientId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    commentId?: Prisma.SortOrder;
};
export type NotificationCreateNestedManyWithoutRecipientInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientInput, Prisma.NotificationUncheckedCreateWithoutRecipientInput> | Prisma.NotificationCreateWithoutRecipientInput[] | Prisma.NotificationUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutRecipientInput | Prisma.NotificationCreateOrConnectWithoutRecipientInput[];
    createMany?: Prisma.NotificationCreateManyRecipientInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutSenderInput, Prisma.NotificationUncheckedCreateWithoutSenderInput> | Prisma.NotificationCreateWithoutSenderInput[] | Prisma.NotificationUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutSenderInput | Prisma.NotificationCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.NotificationCreateManySenderInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUncheckedCreateNestedManyWithoutRecipientInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientInput, Prisma.NotificationUncheckedCreateWithoutRecipientInput> | Prisma.NotificationCreateWithoutRecipientInput[] | Prisma.NotificationUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutRecipientInput | Prisma.NotificationCreateOrConnectWithoutRecipientInput[];
    createMany?: Prisma.NotificationCreateManyRecipientInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUncheckedCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutSenderInput, Prisma.NotificationUncheckedCreateWithoutSenderInput> | Prisma.NotificationCreateWithoutSenderInput[] | Prisma.NotificationUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutSenderInput | Prisma.NotificationCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.NotificationCreateManySenderInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUpdateManyWithoutRecipientNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientInput, Prisma.NotificationUncheckedCreateWithoutRecipientInput> | Prisma.NotificationCreateWithoutRecipientInput[] | Prisma.NotificationUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutRecipientInput | Prisma.NotificationCreateOrConnectWithoutRecipientInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutRecipientInput | Prisma.NotificationUpsertWithWhereUniqueWithoutRecipientInput[];
    createMany?: Prisma.NotificationCreateManyRecipientInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutRecipientInput | Prisma.NotificationUpdateWithWhereUniqueWithoutRecipientInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutRecipientInput | Prisma.NotificationUpdateManyWithWhereWithoutRecipientInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutSenderInput, Prisma.NotificationUncheckedCreateWithoutSenderInput> | Prisma.NotificationCreateWithoutSenderInput[] | Prisma.NotificationUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutSenderInput | Prisma.NotificationCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutSenderInput | Prisma.NotificationUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.NotificationCreateManySenderInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutSenderInput | Prisma.NotificationUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutSenderInput | Prisma.NotificationUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUncheckedUpdateManyWithoutRecipientNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientInput, Prisma.NotificationUncheckedCreateWithoutRecipientInput> | Prisma.NotificationCreateWithoutRecipientInput[] | Prisma.NotificationUncheckedCreateWithoutRecipientInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutRecipientInput | Prisma.NotificationCreateOrConnectWithoutRecipientInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutRecipientInput | Prisma.NotificationUpsertWithWhereUniqueWithoutRecipientInput[];
    createMany?: Prisma.NotificationCreateManyRecipientInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutRecipientInput | Prisma.NotificationUpdateWithWhereUniqueWithoutRecipientInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutRecipientInput | Prisma.NotificationUpdateManyWithWhereWithoutRecipientInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutSenderInput, Prisma.NotificationUncheckedCreateWithoutSenderInput> | Prisma.NotificationCreateWithoutSenderInput[] | Prisma.NotificationUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutSenderInput | Prisma.NotificationCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutSenderInput | Prisma.NotificationUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.NotificationCreateManySenderInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutSenderInput | Prisma.NotificationUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutSenderInput | Prisma.NotificationUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutPostInput, Prisma.NotificationUncheckedCreateWithoutPostInput> | Prisma.NotificationCreateWithoutPostInput[] | Prisma.NotificationUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutPostInput | Prisma.NotificationCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.NotificationCreateManyPostInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutPostInput, Prisma.NotificationUncheckedCreateWithoutPostInput> | Prisma.NotificationCreateWithoutPostInput[] | Prisma.NotificationUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutPostInput | Prisma.NotificationCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.NotificationCreateManyPostInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutPostInput, Prisma.NotificationUncheckedCreateWithoutPostInput> | Prisma.NotificationCreateWithoutPostInput[] | Prisma.NotificationUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutPostInput | Prisma.NotificationCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutPostInput | Prisma.NotificationUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.NotificationCreateManyPostInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutPostInput | Prisma.NotificationUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutPostInput | Prisma.NotificationUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutPostInput, Prisma.NotificationUncheckedCreateWithoutPostInput> | Prisma.NotificationCreateWithoutPostInput[] | Prisma.NotificationUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutPostInput | Prisma.NotificationCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutPostInput | Prisma.NotificationUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.NotificationCreateManyPostInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutPostInput | Prisma.NotificationUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutPostInput | Prisma.NotificationUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationCreateNestedManyWithoutCommentInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutCommentInput, Prisma.NotificationUncheckedCreateWithoutCommentInput> | Prisma.NotificationCreateWithoutCommentInput[] | Prisma.NotificationUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutCommentInput | Prisma.NotificationCreateOrConnectWithoutCommentInput[];
    createMany?: Prisma.NotificationCreateManyCommentInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUncheckedCreateNestedManyWithoutCommentInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutCommentInput, Prisma.NotificationUncheckedCreateWithoutCommentInput> | Prisma.NotificationCreateWithoutCommentInput[] | Prisma.NotificationUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutCommentInput | Prisma.NotificationCreateOrConnectWithoutCommentInput[];
    createMany?: Prisma.NotificationCreateManyCommentInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUpdateManyWithoutCommentNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutCommentInput, Prisma.NotificationUncheckedCreateWithoutCommentInput> | Prisma.NotificationCreateWithoutCommentInput[] | Prisma.NotificationUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutCommentInput | Prisma.NotificationCreateOrConnectWithoutCommentInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutCommentInput | Prisma.NotificationUpsertWithWhereUniqueWithoutCommentInput[];
    createMany?: Prisma.NotificationCreateManyCommentInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutCommentInput | Prisma.NotificationUpdateWithWhereUniqueWithoutCommentInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutCommentInput | Prisma.NotificationUpdateManyWithWhereWithoutCommentInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUncheckedUpdateManyWithoutCommentNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutCommentInput, Prisma.NotificationUncheckedCreateWithoutCommentInput> | Prisma.NotificationCreateWithoutCommentInput[] | Prisma.NotificationUncheckedCreateWithoutCommentInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutCommentInput | Prisma.NotificationCreateOrConnectWithoutCommentInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutCommentInput | Prisma.NotificationUpsertWithWhereUniqueWithoutCommentInput[];
    createMany?: Prisma.NotificationCreateManyCommentInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutCommentInput | Prisma.NotificationUpdateWithWhereUniqueWithoutCommentInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutCommentInput | Prisma.NotificationUpdateManyWithWhereWithoutCommentInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType;
};
export type NotificationCreateWithoutRecipientInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    sender: Prisma.UserCreateNestedOneWithoutNotificationsSentInput;
    post?: Prisma.PostCreateNestedOneWithoutNotificationsInput;
    comment?: Prisma.CommentCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateWithoutRecipientInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    senderId: string;
    postId?: string | null;
    commentId?: string | null;
};
export type NotificationCreateOrConnectWithoutRecipientInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientInput, Prisma.NotificationUncheckedCreateWithoutRecipientInput>;
};
export type NotificationCreateManyRecipientInputEnvelope = {
    data: Prisma.NotificationCreateManyRecipientInput | Prisma.NotificationCreateManyRecipientInput[];
    skipDuplicates?: boolean;
};
export type NotificationCreateWithoutSenderInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipient: Prisma.UserCreateNestedOneWithoutNotificationsReceivedInput;
    post?: Prisma.PostCreateNestedOneWithoutNotificationsInput;
    comment?: Prisma.CommentCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateWithoutSenderInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipientId: string;
    postId?: string | null;
    commentId?: string | null;
};
export type NotificationCreateOrConnectWithoutSenderInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutSenderInput, Prisma.NotificationUncheckedCreateWithoutSenderInput>;
};
export type NotificationCreateManySenderInputEnvelope = {
    data: Prisma.NotificationCreateManySenderInput | Prisma.NotificationCreateManySenderInput[];
    skipDuplicates?: boolean;
};
export type NotificationUpsertWithWhereUniqueWithoutRecipientInput = {
    where: Prisma.NotificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutRecipientInput, Prisma.NotificationUncheckedUpdateWithoutRecipientInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientInput, Prisma.NotificationUncheckedCreateWithoutRecipientInput>;
};
export type NotificationUpdateWithWhereUniqueWithoutRecipientInput = {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutRecipientInput, Prisma.NotificationUncheckedUpdateWithoutRecipientInput>;
};
export type NotificationUpdateManyWithWhereWithoutRecipientInput = {
    where: Prisma.NotificationScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutRecipientInput>;
};
export type NotificationScalarWhereInput = {
    AND?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
    OR?: Prisma.NotificationScalarWhereInput[];
    NOT?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
    id?: Prisma.StringFilter<"Notification"> | string;
    type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType;
    read?: Prisma.BoolFilter<"Notification"> | boolean;
    metadata?: Prisma.JsonNullableFilter<"Notification">;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    recipientId?: Prisma.StringFilter<"Notification"> | string;
    senderId?: Prisma.StringFilter<"Notification"> | string;
    postId?: Prisma.StringNullableFilter<"Notification"> | string | null;
    commentId?: Prisma.StringNullableFilter<"Notification"> | string | null;
};
export type NotificationUpsertWithWhereUniqueWithoutSenderInput = {
    where: Prisma.NotificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutSenderInput, Prisma.NotificationUncheckedUpdateWithoutSenderInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutSenderInput, Prisma.NotificationUncheckedCreateWithoutSenderInput>;
};
export type NotificationUpdateWithWhereUniqueWithoutSenderInput = {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutSenderInput, Prisma.NotificationUncheckedUpdateWithoutSenderInput>;
};
export type NotificationUpdateManyWithWhereWithoutSenderInput = {
    where: Prisma.NotificationScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutSenderInput>;
};
export type NotificationCreateWithoutPostInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipient: Prisma.UserCreateNestedOneWithoutNotificationsReceivedInput;
    sender: Prisma.UserCreateNestedOneWithoutNotificationsSentInput;
    comment?: Prisma.CommentCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateWithoutPostInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipientId: string;
    senderId: string;
    commentId?: string | null;
};
export type NotificationCreateOrConnectWithoutPostInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutPostInput, Prisma.NotificationUncheckedCreateWithoutPostInput>;
};
export type NotificationCreateManyPostInputEnvelope = {
    data: Prisma.NotificationCreateManyPostInput | Prisma.NotificationCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type NotificationUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.NotificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutPostInput, Prisma.NotificationUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutPostInput, Prisma.NotificationUncheckedCreateWithoutPostInput>;
};
export type NotificationUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutPostInput, Prisma.NotificationUncheckedUpdateWithoutPostInput>;
};
export type NotificationUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.NotificationScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutPostInput>;
};
export type NotificationCreateWithoutCommentInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipient: Prisma.UserCreateNestedOneWithoutNotificationsReceivedInput;
    sender: Prisma.UserCreateNestedOneWithoutNotificationsSentInput;
    post?: Prisma.PostCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateWithoutCommentInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipientId: string;
    senderId: string;
    postId?: string | null;
};
export type NotificationCreateOrConnectWithoutCommentInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutCommentInput, Prisma.NotificationUncheckedCreateWithoutCommentInput>;
};
export type NotificationCreateManyCommentInputEnvelope = {
    data: Prisma.NotificationCreateManyCommentInput | Prisma.NotificationCreateManyCommentInput[];
    skipDuplicates?: boolean;
};
export type NotificationUpsertWithWhereUniqueWithoutCommentInput = {
    where: Prisma.NotificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutCommentInput, Prisma.NotificationUncheckedUpdateWithoutCommentInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutCommentInput, Prisma.NotificationUncheckedCreateWithoutCommentInput>;
};
export type NotificationUpdateWithWhereUniqueWithoutCommentInput = {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutCommentInput, Prisma.NotificationUncheckedUpdateWithoutCommentInput>;
};
export type NotificationUpdateManyWithWhereWithoutCommentInput = {
    where: Prisma.NotificationScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutCommentInput>;
};
export type NotificationCreateManyRecipientInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    senderId: string;
    postId?: string | null;
    commentId?: string | null;
};
export type NotificationCreateManySenderInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipientId: string;
    postId?: string | null;
    commentId?: string | null;
};
export type NotificationUpdateWithoutRecipientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.UserUpdateOneRequiredWithoutNotificationsSentNestedInput;
    post?: Prisma.PostUpdateOneWithoutNotificationsNestedInput;
    comment?: Prisma.CommentUpdateOneWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateWithoutRecipientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationUncheckedUpdateManyWithoutRecipientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipient?: Prisma.UserUpdateOneRequiredWithoutNotificationsReceivedNestedInput;
    post?: Prisma.PostUpdateOneWithoutNotificationsNestedInput;
    comment?: Prisma.CommentUpdateOneWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationUncheckedUpdateManyWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationCreateManyPostInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipientId: string;
    senderId: string;
    commentId?: string | null;
};
export type NotificationUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipient?: Prisma.UserUpdateOneRequiredWithoutNotificationsReceivedNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutNotificationsSentNestedInput;
    comment?: Prisma.CommentUpdateOneWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    commentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationCreateManyCommentInput = {
    id?: string;
    type: $Enums.NotificationType;
    read?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    recipientId: string;
    senderId: string;
    postId?: string | null;
};
export type NotificationUpdateWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipient?: Prisma.UserUpdateOneRequiredWithoutNotificationsReceivedNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutNotificationsSentNestedInput;
    post?: Prisma.PostUpdateOneWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationUncheckedUpdateManyWithoutCommentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType;
    read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipientId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NotificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    read?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    recipientId?: boolean;
    senderId?: boolean;
    postId?: boolean;
    commentId?: boolean;
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.Notification$postArgs<ExtArgs>;
    comment?: boolean | Prisma.Notification$commentArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    read?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    recipientId?: boolean;
    senderId?: boolean;
    postId?: boolean;
    commentId?: boolean;
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.Notification$postArgs<ExtArgs>;
    comment?: boolean | Prisma.Notification$commentArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    read?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    recipientId?: boolean;
    senderId?: boolean;
    postId?: boolean;
    commentId?: boolean;
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.Notification$postArgs<ExtArgs>;
    comment?: boolean | Prisma.Notification$commentArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectScalar = {
    id?: boolean;
    type?: boolean;
    read?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    recipientId?: boolean;
    senderId?: boolean;
    postId?: boolean;
    commentId?: boolean;
};
export type NotificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "read" | "metadata" | "createdAt" | "recipientId" | "senderId" | "postId" | "commentId", ExtArgs["result"]["notification"]>;
export type NotificationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.Notification$postArgs<ExtArgs>;
    comment?: boolean | Prisma.Notification$commentArgs<ExtArgs>;
};
export type NotificationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.Notification$postArgs<ExtArgs>;
    comment?: boolean | Prisma.Notification$commentArgs<ExtArgs>;
};
export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipient?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.Notification$postArgs<ExtArgs>;
    comment?: boolean | Prisma.Notification$commentArgs<ExtArgs>;
};
export type $NotificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Notification";
    objects: {
        recipient: Prisma.$UserPayload<ExtArgs>;
        sender: Prisma.$UserPayload<ExtArgs>;
        post: Prisma.$PostPayload<ExtArgs> | null;
        comment: Prisma.$CommentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.NotificationType;
        read: boolean;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
        recipientId: string;
        senderId: string;
        postId: string | null;
        commentId: string | null;
    }, ExtArgs["result"]["notification"]>;
    composites: {};
};
export type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationPayload, S>;
export type NotificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationCountAggregateInputType | true;
};
export interface NotificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Notification'];
        meta: {
            name: 'Notification';
        };
    };
    findUnique<T extends NotificationFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NotificationFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NotificationFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NotificationCreateArgs>(args: Prisma.SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NotificationCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends NotificationDeleteArgs>(args: Prisma.SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NotificationUpdateArgs>(args: Prisma.SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NotificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NotificationUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends NotificationUpsertArgs>(args: Prisma.SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NotificationCountArgs>(args?: Prisma.Subset<T, NotificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationCountAggregateOutputType> : number>;
    aggregate<T extends NotificationAggregateArgs>(args: Prisma.Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>;
    groupBy<T extends NotificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NotificationFieldRefs;
}
export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    recipient<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sender<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    post<T extends Prisma.Notification$postArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Notification$postArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    comment<T extends Prisma.Notification$commentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Notification$commentArgs<ExtArgs>>): Prisma.Prisma__CommentClient<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NotificationFieldRefs {
    readonly id: Prisma.FieldRef<"Notification", 'String'>;
    readonly type: Prisma.FieldRef<"Notification", 'NotificationType'>;
    readonly read: Prisma.FieldRef<"Notification", 'Boolean'>;
    readonly metadata: Prisma.FieldRef<"Notification", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"Notification", 'DateTime'>;
    readonly recipientId: Prisma.FieldRef<"Notification", 'String'>;
    readonly senderId: Prisma.FieldRef<"Notification", 'String'>;
    readonly postId: Prisma.FieldRef<"Notification", 'String'>;
    readonly commentId: Prisma.FieldRef<"Notification", 'String'>;
}
export type NotificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type NotificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type NotificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type NotificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>;
};
export type NotificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NotificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.NotificationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type NotificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>;
    where?: Prisma.NotificationWhereInput;
    limit?: number;
};
export type NotificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>;
    where?: Prisma.NotificationWhereInput;
    limit?: number;
    include?: Prisma.NotificationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type NotificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>;
};
export type NotificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    limit?: number;
};
export type Notification$postArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
};
export type Notification$commentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommentSelect<ExtArgs> | null;
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
};
export type NotificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Notification.d.ts.map