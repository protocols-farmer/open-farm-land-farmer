import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UpdateModel = runtime.Types.Result.DefaultSelection<Prisma.$UpdatePayload>;
export type AggregateUpdate = {
    _count: UpdateCountAggregateOutputType | null;
    _min: UpdateMinAggregateOutputType | null;
    _max: UpdateMaxAggregateOutputType | null;
};
export type UpdateMinAggregateOutputType = {
    id: string | null;
    version: string | null;
    title: string | null;
    category: $Enums.UpdateCategory | null;
    content: string | null;
    publishedAt: Date | null;
    authorId: string | null;
};
export type UpdateMaxAggregateOutputType = {
    id: string | null;
    version: string | null;
    title: string | null;
    category: $Enums.UpdateCategory | null;
    content: string | null;
    publishedAt: Date | null;
    authorId: string | null;
};
export type UpdateCountAggregateOutputType = {
    id: number;
    version: number;
    title: number;
    category: number;
    content: number;
    publishedAt: number;
    authorId: number;
    _all: number;
};
export type UpdateMinAggregateInputType = {
    id?: true;
    version?: true;
    title?: true;
    category?: true;
    content?: true;
    publishedAt?: true;
    authorId?: true;
};
export type UpdateMaxAggregateInputType = {
    id?: true;
    version?: true;
    title?: true;
    category?: true;
    content?: true;
    publishedAt?: true;
    authorId?: true;
};
export type UpdateCountAggregateInputType = {
    id?: true;
    version?: true;
    title?: true;
    category?: true;
    content?: true;
    publishedAt?: true;
    authorId?: true;
    _all?: true;
};
export type UpdateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UpdateWhereInput;
    orderBy?: Prisma.UpdateOrderByWithRelationInput | Prisma.UpdateOrderByWithRelationInput[];
    cursor?: Prisma.UpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UpdateCountAggregateInputType;
    _min?: UpdateMinAggregateInputType;
    _max?: UpdateMaxAggregateInputType;
};
export type GetUpdateAggregateType<T extends UpdateAggregateArgs> = {
    [P in keyof T & keyof AggregateUpdate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUpdate[P]> : Prisma.GetScalarType<T[P], AggregateUpdate[P]>;
};
export type UpdateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UpdateWhereInput;
    orderBy?: Prisma.UpdateOrderByWithAggregationInput | Prisma.UpdateOrderByWithAggregationInput[];
    by: Prisma.UpdateScalarFieldEnum[] | Prisma.UpdateScalarFieldEnum;
    having?: Prisma.UpdateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UpdateCountAggregateInputType | true;
    _min?: UpdateMinAggregateInputType;
    _max?: UpdateMaxAggregateInputType;
};
export type UpdateGroupByOutputType = {
    id: string;
    version: string | null;
    title: string;
    category: $Enums.UpdateCategory;
    content: string;
    publishedAt: Date;
    authorId: string;
    _count: UpdateCountAggregateOutputType | null;
    _min: UpdateMinAggregateOutputType | null;
    _max: UpdateMaxAggregateOutputType | null;
};
type GetUpdateGroupByPayload<T extends UpdateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UpdateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UpdateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UpdateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UpdateGroupByOutputType[P]>;
}>>;
export type UpdateWhereInput = {
    AND?: Prisma.UpdateWhereInput | Prisma.UpdateWhereInput[];
    OR?: Prisma.UpdateWhereInput[];
    NOT?: Prisma.UpdateWhereInput | Prisma.UpdateWhereInput[];
    id?: Prisma.StringFilter<"Update"> | string;
    version?: Prisma.StringNullableFilter<"Update"> | string | null;
    title?: Prisma.StringFilter<"Update"> | string;
    category?: Prisma.EnumUpdateCategoryFilter<"Update"> | $Enums.UpdateCategory;
    content?: Prisma.StringFilter<"Update"> | string;
    publishedAt?: Prisma.DateTimeFilter<"Update"> | Date | string;
    authorId?: Prisma.StringFilter<"Update"> | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UpdateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
};
export type UpdateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.UpdateWhereInput | Prisma.UpdateWhereInput[];
    OR?: Prisma.UpdateWhereInput[];
    NOT?: Prisma.UpdateWhereInput | Prisma.UpdateWhereInput[];
    version?: Prisma.StringNullableFilter<"Update"> | string | null;
    title?: Prisma.StringFilter<"Update"> | string;
    category?: Prisma.EnumUpdateCategoryFilter<"Update"> | $Enums.UpdateCategory;
    content?: Prisma.StringFilter<"Update"> | string;
    publishedAt?: Prisma.DateTimeFilter<"Update"> | Date | string;
    authorId?: Prisma.StringFilter<"Update"> | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type UpdateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    _count?: Prisma.UpdateCountOrderByAggregateInput;
    _max?: Prisma.UpdateMaxOrderByAggregateInput;
    _min?: Prisma.UpdateMinOrderByAggregateInput;
};
export type UpdateScalarWhereWithAggregatesInput = {
    AND?: Prisma.UpdateScalarWhereWithAggregatesInput | Prisma.UpdateScalarWhereWithAggregatesInput[];
    OR?: Prisma.UpdateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UpdateScalarWhereWithAggregatesInput | Prisma.UpdateScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Update"> | string;
    version?: Prisma.StringNullableWithAggregatesFilter<"Update"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"Update"> | string;
    category?: Prisma.EnumUpdateCategoryWithAggregatesFilter<"Update"> | $Enums.UpdateCategory;
    content?: Prisma.StringWithAggregatesFilter<"Update"> | string;
    publishedAt?: Prisma.DateTimeWithAggregatesFilter<"Update"> | Date | string;
    authorId?: Prisma.StringWithAggregatesFilter<"Update"> | string;
};
export type UpdateCreateInput = {
    id?: string;
    version?: string | null;
    title: string;
    category: $Enums.UpdateCategory;
    content: string;
    publishedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutUpdatesInput;
};
export type UpdateUncheckedCreateInput = {
    id?: string;
    version?: string | null;
    title: string;
    category: $Enums.UpdateCategory;
    content: string;
    publishedAt?: Date | string;
    authorId: string;
};
export type UpdateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumUpdateCategoryFieldUpdateOperationsInput | $Enums.UpdateCategory;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutUpdatesNestedInput;
};
export type UpdateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumUpdateCategoryFieldUpdateOperationsInput | $Enums.UpdateCategory;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UpdateCreateManyInput = {
    id?: string;
    version?: string | null;
    title: string;
    category: $Enums.UpdateCategory;
    content: string;
    publishedAt?: Date | string;
    authorId: string;
};
export type UpdateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumUpdateCategoryFieldUpdateOperationsInput | $Enums.UpdateCategory;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UpdateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumUpdateCategoryFieldUpdateOperationsInput | $Enums.UpdateCategory;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UpdateListRelationFilter = {
    every?: Prisma.UpdateWhereInput;
    some?: Prisma.UpdateWhereInput;
    none?: Prisma.UpdateWhereInput;
};
export type UpdateOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UpdateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
};
export type UpdateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
};
export type UpdateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
};
export type UpdateCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.UpdateCreateWithoutAuthorInput, Prisma.UpdateUncheckedCreateWithoutAuthorInput> | Prisma.UpdateCreateWithoutAuthorInput[] | Prisma.UpdateUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.UpdateCreateOrConnectWithoutAuthorInput | Prisma.UpdateCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.UpdateCreateManyAuthorInputEnvelope;
    connect?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
};
export type UpdateUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.UpdateCreateWithoutAuthorInput, Prisma.UpdateUncheckedCreateWithoutAuthorInput> | Prisma.UpdateCreateWithoutAuthorInput[] | Prisma.UpdateUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.UpdateCreateOrConnectWithoutAuthorInput | Prisma.UpdateCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.UpdateCreateManyAuthorInputEnvelope;
    connect?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
};
export type UpdateUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.UpdateCreateWithoutAuthorInput, Prisma.UpdateUncheckedCreateWithoutAuthorInput> | Prisma.UpdateCreateWithoutAuthorInput[] | Prisma.UpdateUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.UpdateCreateOrConnectWithoutAuthorInput | Prisma.UpdateCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.UpdateUpsertWithWhereUniqueWithoutAuthorInput | Prisma.UpdateUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.UpdateCreateManyAuthorInputEnvelope;
    set?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
    disconnect?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
    delete?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
    connect?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
    update?: Prisma.UpdateUpdateWithWhereUniqueWithoutAuthorInput | Prisma.UpdateUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.UpdateUpdateManyWithWhereWithoutAuthorInput | Prisma.UpdateUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.UpdateScalarWhereInput | Prisma.UpdateScalarWhereInput[];
};
export type UpdateUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.UpdateCreateWithoutAuthorInput, Prisma.UpdateUncheckedCreateWithoutAuthorInput> | Prisma.UpdateCreateWithoutAuthorInput[] | Prisma.UpdateUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.UpdateCreateOrConnectWithoutAuthorInput | Prisma.UpdateCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.UpdateUpsertWithWhereUniqueWithoutAuthorInput | Prisma.UpdateUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.UpdateCreateManyAuthorInputEnvelope;
    set?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
    disconnect?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
    delete?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
    connect?: Prisma.UpdateWhereUniqueInput | Prisma.UpdateWhereUniqueInput[];
    update?: Prisma.UpdateUpdateWithWhereUniqueWithoutAuthorInput | Prisma.UpdateUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.UpdateUpdateManyWithWhereWithoutAuthorInput | Prisma.UpdateUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.UpdateScalarWhereInput | Prisma.UpdateScalarWhereInput[];
};
export type EnumUpdateCategoryFieldUpdateOperationsInput = {
    set?: $Enums.UpdateCategory;
};
export type UpdateCreateWithoutAuthorInput = {
    id?: string;
    version?: string | null;
    title: string;
    category: $Enums.UpdateCategory;
    content: string;
    publishedAt?: Date | string;
};
export type UpdateUncheckedCreateWithoutAuthorInput = {
    id?: string;
    version?: string | null;
    title: string;
    category: $Enums.UpdateCategory;
    content: string;
    publishedAt?: Date | string;
};
export type UpdateCreateOrConnectWithoutAuthorInput = {
    where: Prisma.UpdateWhereUniqueInput;
    create: Prisma.XOR<Prisma.UpdateCreateWithoutAuthorInput, Prisma.UpdateUncheckedCreateWithoutAuthorInput>;
};
export type UpdateCreateManyAuthorInputEnvelope = {
    data: Prisma.UpdateCreateManyAuthorInput | Prisma.UpdateCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type UpdateUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.UpdateWhereUniqueInput;
    update: Prisma.XOR<Prisma.UpdateUpdateWithoutAuthorInput, Prisma.UpdateUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.UpdateCreateWithoutAuthorInput, Prisma.UpdateUncheckedCreateWithoutAuthorInput>;
};
export type UpdateUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.UpdateWhereUniqueInput;
    data: Prisma.XOR<Prisma.UpdateUpdateWithoutAuthorInput, Prisma.UpdateUncheckedUpdateWithoutAuthorInput>;
};
export type UpdateUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.UpdateScalarWhereInput;
    data: Prisma.XOR<Prisma.UpdateUpdateManyMutationInput, Prisma.UpdateUncheckedUpdateManyWithoutAuthorInput>;
};
export type UpdateScalarWhereInput = {
    AND?: Prisma.UpdateScalarWhereInput | Prisma.UpdateScalarWhereInput[];
    OR?: Prisma.UpdateScalarWhereInput[];
    NOT?: Prisma.UpdateScalarWhereInput | Prisma.UpdateScalarWhereInput[];
    id?: Prisma.StringFilter<"Update"> | string;
    version?: Prisma.StringNullableFilter<"Update"> | string | null;
    title?: Prisma.StringFilter<"Update"> | string;
    category?: Prisma.EnumUpdateCategoryFilter<"Update"> | $Enums.UpdateCategory;
    content?: Prisma.StringFilter<"Update"> | string;
    publishedAt?: Prisma.DateTimeFilter<"Update"> | Date | string;
    authorId?: Prisma.StringFilter<"Update"> | string;
};
export type UpdateCreateManyAuthorInput = {
    id?: string;
    version?: string | null;
    title: string;
    category: $Enums.UpdateCategory;
    content: string;
    publishedAt?: Date | string;
};
export type UpdateUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumUpdateCategoryFieldUpdateOperationsInput | $Enums.UpdateCategory;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UpdateUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumUpdateCategoryFieldUpdateOperationsInput | $Enums.UpdateCategory;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UpdateUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumUpdateCategoryFieldUpdateOperationsInput | $Enums.UpdateCategory;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UpdateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    title?: boolean;
    category?: boolean;
    content?: boolean;
    publishedAt?: boolean;
    authorId?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["update"]>;
export type UpdateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    title?: boolean;
    category?: boolean;
    content?: boolean;
    publishedAt?: boolean;
    authorId?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["update"]>;
export type UpdateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    title?: boolean;
    category?: boolean;
    content?: boolean;
    publishedAt?: boolean;
    authorId?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["update"]>;
export type UpdateSelectScalar = {
    id?: boolean;
    version?: boolean;
    title?: boolean;
    category?: boolean;
    content?: boolean;
    publishedAt?: boolean;
    authorId?: boolean;
};
export type UpdateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "version" | "title" | "category" | "content" | "publishedAt" | "authorId", ExtArgs["result"]["update"]>;
export type UpdateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UpdateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UpdateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UpdatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Update";
    objects: {
        author: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        version: string | null;
        title: string;
        category: $Enums.UpdateCategory;
        content: string;
        publishedAt: Date;
        authorId: string;
    }, ExtArgs["result"]["update"]>;
    composites: {};
};
export type UpdateGetPayload<S extends boolean | null | undefined | UpdateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UpdatePayload, S>;
export type UpdateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UpdateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UpdateCountAggregateInputType | true;
};
export interface UpdateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Update'];
        meta: {
            name: 'Update';
        };
    };
    findUnique<T extends UpdateFindUniqueArgs>(args: Prisma.SelectSubset<T, UpdateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UpdateClient<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UpdateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UpdateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UpdateClient<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UpdateFindFirstArgs>(args?: Prisma.SelectSubset<T, UpdateFindFirstArgs<ExtArgs>>): Prisma.Prisma__UpdateClient<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UpdateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UpdateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UpdateClient<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UpdateFindManyArgs>(args?: Prisma.SelectSubset<T, UpdateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UpdateCreateArgs>(args: Prisma.SelectSubset<T, UpdateCreateArgs<ExtArgs>>): Prisma.Prisma__UpdateClient<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UpdateCreateManyArgs>(args?: Prisma.SelectSubset<T, UpdateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UpdateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UpdateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UpdateDeleteArgs>(args: Prisma.SelectSubset<T, UpdateDeleteArgs<ExtArgs>>): Prisma.Prisma__UpdateClient<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UpdateUpdateArgs>(args: Prisma.SelectSubset<T, UpdateUpdateArgs<ExtArgs>>): Prisma.Prisma__UpdateClient<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UpdateDeleteManyArgs>(args?: Prisma.SelectSubset<T, UpdateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UpdateUpdateManyArgs>(args: Prisma.SelectSubset<T, UpdateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UpdateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UpdateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UpdateUpsertArgs>(args: Prisma.SelectSubset<T, UpdateUpsertArgs<ExtArgs>>): Prisma.Prisma__UpdateClient<runtime.Types.Result.GetResult<Prisma.$UpdatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UpdateCountArgs>(args?: Prisma.Subset<T, UpdateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UpdateCountAggregateOutputType> : number>;
    aggregate<T extends UpdateAggregateArgs>(args: Prisma.Subset<T, UpdateAggregateArgs>): Prisma.PrismaPromise<GetUpdateAggregateType<T>>;
    groupBy<T extends UpdateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UpdateGroupByArgs['orderBy'];
    } : {
        orderBy?: UpdateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UpdateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUpdateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UpdateFieldRefs;
}
export interface Prisma__UpdateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UpdateFieldRefs {
    readonly id: Prisma.FieldRef<"Update", 'String'>;
    readonly version: Prisma.FieldRef<"Update", 'String'>;
    readonly title: Prisma.FieldRef<"Update", 'String'>;
    readonly category: Prisma.FieldRef<"Update", 'UpdateCategory'>;
    readonly content: Prisma.FieldRef<"Update", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"Update", 'DateTime'>;
    readonly authorId: Prisma.FieldRef<"Update", 'String'>;
}
export type UpdateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    where: Prisma.UpdateWhereUniqueInput;
};
export type UpdateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    where: Prisma.UpdateWhereUniqueInput;
};
export type UpdateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    where?: Prisma.UpdateWhereInput;
    orderBy?: Prisma.UpdateOrderByWithRelationInput | Prisma.UpdateOrderByWithRelationInput[];
    cursor?: Prisma.UpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UpdateScalarFieldEnum | Prisma.UpdateScalarFieldEnum[];
};
export type UpdateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    where?: Prisma.UpdateWhereInput;
    orderBy?: Prisma.UpdateOrderByWithRelationInput | Prisma.UpdateOrderByWithRelationInput[];
    cursor?: Prisma.UpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UpdateScalarFieldEnum | Prisma.UpdateScalarFieldEnum[];
};
export type UpdateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    where?: Prisma.UpdateWhereInput;
    orderBy?: Prisma.UpdateOrderByWithRelationInput | Prisma.UpdateOrderByWithRelationInput[];
    cursor?: Prisma.UpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UpdateScalarFieldEnum | Prisma.UpdateScalarFieldEnum[];
};
export type UpdateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UpdateCreateInput, Prisma.UpdateUncheckedCreateInput>;
};
export type UpdateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UpdateCreateManyInput | Prisma.UpdateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UpdateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    data: Prisma.UpdateCreateManyInput | Prisma.UpdateCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UpdateIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UpdateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UpdateUpdateInput, Prisma.UpdateUncheckedUpdateInput>;
    where: Prisma.UpdateWhereUniqueInput;
};
export type UpdateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UpdateUpdateManyMutationInput, Prisma.UpdateUncheckedUpdateManyInput>;
    where?: Prisma.UpdateWhereInput;
    limit?: number;
};
export type UpdateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UpdateUpdateManyMutationInput, Prisma.UpdateUncheckedUpdateManyInput>;
    where?: Prisma.UpdateWhereInput;
    limit?: number;
    include?: Prisma.UpdateIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UpdateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    where: Prisma.UpdateWhereUniqueInput;
    create: Prisma.XOR<Prisma.UpdateCreateInput, Prisma.UpdateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UpdateUpdateInput, Prisma.UpdateUncheckedUpdateInput>;
};
export type UpdateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
    where: Prisma.UpdateWhereUniqueInput;
};
export type UpdateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UpdateWhereInput;
    limit?: number;
};
export type UpdateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UpdateSelect<ExtArgs> | null;
    omit?: Prisma.UpdateOmit<ExtArgs> | null;
    include?: Prisma.UpdateInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Update.d.ts.map