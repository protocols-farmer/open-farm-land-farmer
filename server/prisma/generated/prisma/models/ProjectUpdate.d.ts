import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProjectUpdateModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectUpdatePayload>;
export type AggregateProjectUpdate = {
    _count: ProjectUpdateCountAggregateOutputType | null;
    _min: ProjectUpdateMinAggregateOutputType | null;
    _max: ProjectUpdateMaxAggregateOutputType | null;
};
export type ProjectUpdateMinAggregateOutputType = {
    id: string | null;
    version: string | null;
    date: Date | null;
    title: string | null;
    description: string | null;
    category: $Enums.ProjectUpdateCategory | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    createdAt: Date | null;
    postId: string | null;
};
export type ProjectUpdateMaxAggregateOutputType = {
    id: string | null;
    version: string | null;
    date: Date | null;
    title: string | null;
    description: string | null;
    category: $Enums.ProjectUpdateCategory | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    createdAt: Date | null;
    postId: string | null;
};
export type ProjectUpdateCountAggregateOutputType = {
    id: number;
    version: number;
    date: number;
    title: number;
    description: number;
    category: number;
    imageUrl: number;
    imagePublicId: number;
    createdAt: number;
    postId: number;
    _all: number;
};
export type ProjectUpdateMinAggregateInputType = {
    id?: true;
    version?: true;
    date?: true;
    title?: true;
    description?: true;
    category?: true;
    imageUrl?: true;
    imagePublicId?: true;
    createdAt?: true;
    postId?: true;
};
export type ProjectUpdateMaxAggregateInputType = {
    id?: true;
    version?: true;
    date?: true;
    title?: true;
    description?: true;
    category?: true;
    imageUrl?: true;
    imagePublicId?: true;
    createdAt?: true;
    postId?: true;
};
export type ProjectUpdateCountAggregateInputType = {
    id?: true;
    version?: true;
    date?: true;
    title?: true;
    description?: true;
    category?: true;
    imageUrl?: true;
    imagePublicId?: true;
    createdAt?: true;
    postId?: true;
    _all?: true;
};
export type ProjectUpdateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectUpdateWhereInput;
    orderBy?: Prisma.ProjectUpdateOrderByWithRelationInput | Prisma.ProjectUpdateOrderByWithRelationInput[];
    cursor?: Prisma.ProjectUpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectUpdateCountAggregateInputType;
    _min?: ProjectUpdateMinAggregateInputType;
    _max?: ProjectUpdateMaxAggregateInputType;
};
export type GetProjectUpdateAggregateType<T extends ProjectUpdateAggregateArgs> = {
    [P in keyof T & keyof AggregateProjectUpdate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProjectUpdate[P]> : Prisma.GetScalarType<T[P], AggregateProjectUpdate[P]>;
};
export type ProjectUpdateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectUpdateWhereInput;
    orderBy?: Prisma.ProjectUpdateOrderByWithAggregationInput | Prisma.ProjectUpdateOrderByWithAggregationInput[];
    by: Prisma.ProjectUpdateScalarFieldEnum[] | Prisma.ProjectUpdateScalarFieldEnum;
    having?: Prisma.ProjectUpdateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectUpdateCountAggregateInputType | true;
    _min?: ProjectUpdateMinAggregateInputType;
    _max?: ProjectUpdateMaxAggregateInputType;
};
export type ProjectUpdateGroupByOutputType = {
    id: string;
    version: string;
    date: Date;
    title: string;
    description: string;
    category: $Enums.ProjectUpdateCategory;
    imageUrl: string | null;
    imagePublicId: string | null;
    createdAt: Date;
    postId: string;
    _count: ProjectUpdateCountAggregateOutputType | null;
    _min: ProjectUpdateMinAggregateOutputType | null;
    _max: ProjectUpdateMaxAggregateOutputType | null;
};
type GetProjectUpdateGroupByPayload<T extends ProjectUpdateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectUpdateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectUpdateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectUpdateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectUpdateGroupByOutputType[P]>;
}>>;
export type ProjectUpdateWhereInput = {
    AND?: Prisma.ProjectUpdateWhereInput | Prisma.ProjectUpdateWhereInput[];
    OR?: Prisma.ProjectUpdateWhereInput[];
    NOT?: Prisma.ProjectUpdateWhereInput | Prisma.ProjectUpdateWhereInput[];
    id?: Prisma.StringFilter<"ProjectUpdate"> | string;
    version?: Prisma.StringFilter<"ProjectUpdate"> | string;
    date?: Prisma.DateTimeFilter<"ProjectUpdate"> | Date | string;
    title?: Prisma.StringFilter<"ProjectUpdate"> | string;
    description?: Prisma.StringFilter<"ProjectUpdate"> | string;
    category?: Prisma.EnumProjectUpdateCategoryFilter<"ProjectUpdate"> | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.StringNullableFilter<"ProjectUpdate"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"ProjectUpdate"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProjectUpdate"> | Date | string;
    postId?: Prisma.StringFilter<"ProjectUpdate"> | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
};
export type ProjectUpdateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
};
export type ProjectUpdateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProjectUpdateWhereInput | Prisma.ProjectUpdateWhereInput[];
    OR?: Prisma.ProjectUpdateWhereInput[];
    NOT?: Prisma.ProjectUpdateWhereInput | Prisma.ProjectUpdateWhereInput[];
    version?: Prisma.StringFilter<"ProjectUpdate"> | string;
    date?: Prisma.DateTimeFilter<"ProjectUpdate"> | Date | string;
    title?: Prisma.StringFilter<"ProjectUpdate"> | string;
    description?: Prisma.StringFilter<"ProjectUpdate"> | string;
    category?: Prisma.EnumProjectUpdateCategoryFilter<"ProjectUpdate"> | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.StringNullableFilter<"ProjectUpdate"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"ProjectUpdate"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProjectUpdate"> | Date | string;
    postId?: Prisma.StringFilter<"ProjectUpdate"> | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
}, "id">;
export type ProjectUpdateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    _count?: Prisma.ProjectUpdateCountOrderByAggregateInput;
    _max?: Prisma.ProjectUpdateMaxOrderByAggregateInput;
    _min?: Prisma.ProjectUpdateMinOrderByAggregateInput;
};
export type ProjectUpdateScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectUpdateScalarWhereWithAggregatesInput | Prisma.ProjectUpdateScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectUpdateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectUpdateScalarWhereWithAggregatesInput | Prisma.ProjectUpdateScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProjectUpdate"> | string;
    version?: Prisma.StringWithAggregatesFilter<"ProjectUpdate"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"ProjectUpdate"> | Date | string;
    title?: Prisma.StringWithAggregatesFilter<"ProjectUpdate"> | string;
    description?: Prisma.StringWithAggregatesFilter<"ProjectUpdate"> | string;
    category?: Prisma.EnumProjectUpdateCategoryWithAggregatesFilter<"ProjectUpdate"> | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"ProjectUpdate"> | string | null;
    imagePublicId?: Prisma.StringNullableWithAggregatesFilter<"ProjectUpdate"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProjectUpdate"> | Date | string;
    postId?: Prisma.StringWithAggregatesFilter<"ProjectUpdate"> | string;
};
export type ProjectUpdateCreateInput = {
    id?: string;
    version: string;
    date: Date | string;
    title: string;
    description: string;
    category?: $Enums.ProjectUpdateCategory;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutProjectJourneyInput;
};
export type ProjectUpdateUncheckedCreateInput = {
    id?: string;
    version: string;
    date: Date | string;
    title: string;
    description: string;
    category?: $Enums.ProjectUpdateCategory;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    createdAt?: Date | string;
    postId: string;
};
export type ProjectUpdateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumProjectUpdateCategoryFieldUpdateOperationsInput | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutProjectJourneyNestedInput;
};
export type ProjectUpdateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumProjectUpdateCategoryFieldUpdateOperationsInput | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProjectUpdateCreateManyInput = {
    id?: string;
    version: string;
    date: Date | string;
    title: string;
    description: string;
    category?: $Enums.ProjectUpdateCategory;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    createdAt?: Date | string;
    postId: string;
};
export type ProjectUpdateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumProjectUpdateCategoryFieldUpdateOperationsInput | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUpdateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumProjectUpdateCategoryFieldUpdateOperationsInput | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProjectUpdateListRelationFilter = {
    every?: Prisma.ProjectUpdateWhereInput;
    some?: Prisma.ProjectUpdateWhereInput;
    none?: Prisma.ProjectUpdateWhereInput;
};
export type ProjectUpdateOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectUpdateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type ProjectUpdateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type ProjectUpdateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type ProjectUpdateCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.ProjectUpdateCreateWithoutPostInput, Prisma.ProjectUpdateUncheckedCreateWithoutPostInput> | Prisma.ProjectUpdateCreateWithoutPostInput[] | Prisma.ProjectUpdateUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.ProjectUpdateCreateOrConnectWithoutPostInput | Prisma.ProjectUpdateCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.ProjectUpdateCreateManyPostInputEnvelope;
    connect?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
};
export type ProjectUpdateUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.ProjectUpdateCreateWithoutPostInput, Prisma.ProjectUpdateUncheckedCreateWithoutPostInput> | Prisma.ProjectUpdateCreateWithoutPostInput[] | Prisma.ProjectUpdateUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.ProjectUpdateCreateOrConnectWithoutPostInput | Prisma.ProjectUpdateCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.ProjectUpdateCreateManyPostInputEnvelope;
    connect?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
};
export type ProjectUpdateUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectUpdateCreateWithoutPostInput, Prisma.ProjectUpdateUncheckedCreateWithoutPostInput> | Prisma.ProjectUpdateCreateWithoutPostInput[] | Prisma.ProjectUpdateUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.ProjectUpdateCreateOrConnectWithoutPostInput | Prisma.ProjectUpdateCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.ProjectUpdateUpsertWithWhereUniqueWithoutPostInput | Prisma.ProjectUpdateUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.ProjectUpdateCreateManyPostInputEnvelope;
    set?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
    disconnect?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
    delete?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
    connect?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
    update?: Prisma.ProjectUpdateUpdateWithWhereUniqueWithoutPostInput | Prisma.ProjectUpdateUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.ProjectUpdateUpdateManyWithWhereWithoutPostInput | Prisma.ProjectUpdateUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.ProjectUpdateScalarWhereInput | Prisma.ProjectUpdateScalarWhereInput[];
};
export type ProjectUpdateUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectUpdateCreateWithoutPostInput, Prisma.ProjectUpdateUncheckedCreateWithoutPostInput> | Prisma.ProjectUpdateCreateWithoutPostInput[] | Prisma.ProjectUpdateUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.ProjectUpdateCreateOrConnectWithoutPostInput | Prisma.ProjectUpdateCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.ProjectUpdateUpsertWithWhereUniqueWithoutPostInput | Prisma.ProjectUpdateUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.ProjectUpdateCreateManyPostInputEnvelope;
    set?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
    disconnect?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
    delete?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
    connect?: Prisma.ProjectUpdateWhereUniqueInput | Prisma.ProjectUpdateWhereUniqueInput[];
    update?: Prisma.ProjectUpdateUpdateWithWhereUniqueWithoutPostInput | Prisma.ProjectUpdateUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.ProjectUpdateUpdateManyWithWhereWithoutPostInput | Prisma.ProjectUpdateUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.ProjectUpdateScalarWhereInput | Prisma.ProjectUpdateScalarWhereInput[];
};
export type EnumProjectUpdateCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ProjectUpdateCategory;
};
export type ProjectUpdateCreateWithoutPostInput = {
    id?: string;
    version: string;
    date: Date | string;
    title: string;
    description: string;
    category?: $Enums.ProjectUpdateCategory;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    createdAt?: Date | string;
};
export type ProjectUpdateUncheckedCreateWithoutPostInput = {
    id?: string;
    version: string;
    date: Date | string;
    title: string;
    description: string;
    category?: $Enums.ProjectUpdateCategory;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    createdAt?: Date | string;
};
export type ProjectUpdateCreateOrConnectWithoutPostInput = {
    where: Prisma.ProjectUpdateWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectUpdateCreateWithoutPostInput, Prisma.ProjectUpdateUncheckedCreateWithoutPostInput>;
};
export type ProjectUpdateCreateManyPostInputEnvelope = {
    data: Prisma.ProjectUpdateCreateManyPostInput | Prisma.ProjectUpdateCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type ProjectUpdateUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.ProjectUpdateWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateUpdateWithoutPostInput, Prisma.ProjectUpdateUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.ProjectUpdateCreateWithoutPostInput, Prisma.ProjectUpdateUncheckedCreateWithoutPostInput>;
};
export type ProjectUpdateUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.ProjectUpdateWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateUpdateWithoutPostInput, Prisma.ProjectUpdateUncheckedUpdateWithoutPostInput>;
};
export type ProjectUpdateUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.ProjectUpdateScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateUpdateManyMutationInput, Prisma.ProjectUpdateUncheckedUpdateManyWithoutPostInput>;
};
export type ProjectUpdateScalarWhereInput = {
    AND?: Prisma.ProjectUpdateScalarWhereInput | Prisma.ProjectUpdateScalarWhereInput[];
    OR?: Prisma.ProjectUpdateScalarWhereInput[];
    NOT?: Prisma.ProjectUpdateScalarWhereInput | Prisma.ProjectUpdateScalarWhereInput[];
    id?: Prisma.StringFilter<"ProjectUpdate"> | string;
    version?: Prisma.StringFilter<"ProjectUpdate"> | string;
    date?: Prisma.DateTimeFilter<"ProjectUpdate"> | Date | string;
    title?: Prisma.StringFilter<"ProjectUpdate"> | string;
    description?: Prisma.StringFilter<"ProjectUpdate"> | string;
    category?: Prisma.EnumProjectUpdateCategoryFilter<"ProjectUpdate"> | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.StringNullableFilter<"ProjectUpdate"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"ProjectUpdate"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProjectUpdate"> | Date | string;
    postId?: Prisma.StringFilter<"ProjectUpdate"> | string;
};
export type ProjectUpdateCreateManyPostInput = {
    id?: string;
    version: string;
    date: Date | string;
    title: string;
    description: string;
    category?: $Enums.ProjectUpdateCategory;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    createdAt?: Date | string;
};
export type ProjectUpdateUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumProjectUpdateCategoryFieldUpdateOperationsInput | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUpdateUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumProjectUpdateCategoryFieldUpdateOperationsInput | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUpdateUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumProjectUpdateCategoryFieldUpdateOperationsInput | $Enums.ProjectUpdateCategory;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUpdateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    date?: boolean;
    title?: boolean;
    description?: boolean;
    category?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    createdAt?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectUpdate"]>;
export type ProjectUpdateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    date?: boolean;
    title?: boolean;
    description?: boolean;
    category?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    createdAt?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectUpdate"]>;
export type ProjectUpdateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    version?: boolean;
    date?: boolean;
    title?: boolean;
    description?: boolean;
    category?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    createdAt?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectUpdate"]>;
export type ProjectUpdateSelectScalar = {
    id?: boolean;
    version?: boolean;
    date?: boolean;
    title?: boolean;
    description?: boolean;
    category?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    createdAt?: boolean;
    postId?: boolean;
};
export type ProjectUpdateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "version" | "date" | "title" | "description" | "category" | "imageUrl" | "imagePublicId" | "createdAt" | "postId", ExtArgs["result"]["projectUpdate"]>;
export type ProjectUpdateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type ProjectUpdateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type ProjectUpdateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type $ProjectUpdatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProjectUpdate";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        version: string;
        date: Date;
        title: string;
        description: string;
        category: $Enums.ProjectUpdateCategory;
        imageUrl: string | null;
        imagePublicId: string | null;
        createdAt: Date;
        postId: string;
    }, ExtArgs["result"]["projectUpdate"]>;
    composites: {};
};
export type ProjectUpdateGetPayload<S extends boolean | null | undefined | ProjectUpdateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload, S>;
export type ProjectUpdateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectUpdateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectUpdateCountAggregateInputType | true;
};
export interface ProjectUpdateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProjectUpdate'];
        meta: {
            name: 'ProjectUpdate';
        };
    };
    findUnique<T extends ProjectUpdateFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectUpdateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectUpdateClient<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectUpdateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectUpdateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectUpdateClient<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectUpdateFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectUpdateFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectUpdateClient<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectUpdateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectUpdateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectUpdateClient<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectUpdateFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectUpdateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectUpdateCreateArgs>(args: Prisma.SelectSubset<T, ProjectUpdateCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectUpdateClient<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectUpdateCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectUpdateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectUpdateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectUpdateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectUpdateDeleteArgs>(args: Prisma.SelectSubset<T, ProjectUpdateDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectUpdateClient<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectUpdateUpdateArgs>(args: Prisma.SelectSubset<T, ProjectUpdateUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectUpdateClient<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectUpdateDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectUpdateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectUpdateUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectUpdateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectUpdateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectUpdateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectUpdateUpsertArgs>(args: Prisma.SelectSubset<T, ProjectUpdateUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectUpdateClient<runtime.Types.Result.GetResult<Prisma.$ProjectUpdatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectUpdateCountArgs>(args?: Prisma.Subset<T, ProjectUpdateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectUpdateCountAggregateOutputType> : number>;
    aggregate<T extends ProjectUpdateAggregateArgs>(args: Prisma.Subset<T, ProjectUpdateAggregateArgs>): Prisma.PrismaPromise<GetProjectUpdateAggregateType<T>>;
    groupBy<T extends ProjectUpdateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectUpdateGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectUpdateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectUpdateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectUpdateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectUpdateFieldRefs;
}
export interface Prisma__ProjectUpdateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectUpdateFieldRefs {
    readonly id: Prisma.FieldRef<"ProjectUpdate", 'String'>;
    readonly version: Prisma.FieldRef<"ProjectUpdate", 'String'>;
    readonly date: Prisma.FieldRef<"ProjectUpdate", 'DateTime'>;
    readonly title: Prisma.FieldRef<"ProjectUpdate", 'String'>;
    readonly description: Prisma.FieldRef<"ProjectUpdate", 'String'>;
    readonly category: Prisma.FieldRef<"ProjectUpdate", 'ProjectUpdateCategory'>;
    readonly imageUrl: Prisma.FieldRef<"ProjectUpdate", 'String'>;
    readonly imagePublicId: Prisma.FieldRef<"ProjectUpdate", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProjectUpdate", 'DateTime'>;
    readonly postId: Prisma.FieldRef<"ProjectUpdate", 'String'>;
}
export type ProjectUpdateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    where: Prisma.ProjectUpdateWhereUniqueInput;
};
export type ProjectUpdateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    where: Prisma.ProjectUpdateWhereUniqueInput;
};
export type ProjectUpdateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    where?: Prisma.ProjectUpdateWhereInput;
    orderBy?: Prisma.ProjectUpdateOrderByWithRelationInput | Prisma.ProjectUpdateOrderByWithRelationInput[];
    cursor?: Prisma.ProjectUpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectUpdateScalarFieldEnum | Prisma.ProjectUpdateScalarFieldEnum[];
};
export type ProjectUpdateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    where?: Prisma.ProjectUpdateWhereInput;
    orderBy?: Prisma.ProjectUpdateOrderByWithRelationInput | Prisma.ProjectUpdateOrderByWithRelationInput[];
    cursor?: Prisma.ProjectUpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectUpdateScalarFieldEnum | Prisma.ProjectUpdateScalarFieldEnum[];
};
export type ProjectUpdateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    where?: Prisma.ProjectUpdateWhereInput;
    orderBy?: Prisma.ProjectUpdateOrderByWithRelationInput | Prisma.ProjectUpdateOrderByWithRelationInput[];
    cursor?: Prisma.ProjectUpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectUpdateScalarFieldEnum | Prisma.ProjectUpdateScalarFieldEnum[];
};
export type ProjectUpdateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateCreateInput, Prisma.ProjectUpdateUncheckedCreateInput>;
};
export type ProjectUpdateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectUpdateCreateManyInput | Prisma.ProjectUpdateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectUpdateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    data: Prisma.ProjectUpdateCreateManyInput | Prisma.ProjectUpdateCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectUpdateIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpdateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateUpdateInput, Prisma.ProjectUpdateUncheckedUpdateInput>;
    where: Prisma.ProjectUpdateWhereUniqueInput;
};
export type ProjectUpdateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectUpdateUpdateManyMutationInput, Prisma.ProjectUpdateUncheckedUpdateManyInput>;
    where?: Prisma.ProjectUpdateWhereInput;
    limit?: number;
};
export type ProjectUpdateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateUpdateManyMutationInput, Prisma.ProjectUpdateUncheckedUpdateManyInput>;
    where?: Prisma.ProjectUpdateWhereInput;
    limit?: number;
    include?: Prisma.ProjectUpdateIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpdateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    where: Prisma.ProjectUpdateWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectUpdateCreateInput, Prisma.ProjectUpdateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectUpdateUpdateInput, Prisma.ProjectUpdateUncheckedUpdateInput>;
};
export type ProjectUpdateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
    where: Prisma.ProjectUpdateWhereUniqueInput;
};
export type ProjectUpdateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectUpdateWhereInput;
    limit?: number;
};
export type ProjectUpdateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectUpdateSelect<ExtArgs> | null;
    omit?: Prisma.ProjectUpdateOmit<ExtArgs> | null;
    include?: Prisma.ProjectUpdateInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ProjectUpdate.d.ts.map