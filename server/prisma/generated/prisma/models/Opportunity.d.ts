import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OpportunityModel = runtime.Types.Result.DefaultSelection<Prisma.$OpportunityPayload>;
export type AggregateOpportunity = {
    _count: OpportunityCountAggregateOutputType | null;
    _min: OpportunityMinAggregateOutputType | null;
    _max: OpportunityMaxAggregateOutputType | null;
};
export type OpportunityMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    companyName: string | null;
    companyLogo: string | null;
    location: string | null;
    type: $Enums.OpportunityType | null;
    isRemote: boolean | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    salaryRange: string | null;
    fullDescription: string | null;
    applyUrl: string | null;
    postedAt: Date | null;
    posterId: string | null;
};
export type OpportunityMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    companyName: string | null;
    companyLogo: string | null;
    location: string | null;
    type: $Enums.OpportunityType | null;
    isRemote: boolean | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    salaryRange: string | null;
    fullDescription: string | null;
    applyUrl: string | null;
    postedAt: Date | null;
    posterId: string | null;
};
export type OpportunityCountAggregateOutputType = {
    id: number;
    title: number;
    companyName: number;
    companyLogo: number;
    location: number;
    type: number;
    isRemote: number;
    imageUrl: number;
    imagePublicId: number;
    salaryRange: number;
    fullDescription: number;
    responsibilities: number;
    qualifications: number;
    applyUrl: number;
    postedAt: number;
    posterId: number;
    _all: number;
};
export type OpportunityMinAggregateInputType = {
    id?: true;
    title?: true;
    companyName?: true;
    companyLogo?: true;
    location?: true;
    type?: true;
    isRemote?: true;
    imageUrl?: true;
    imagePublicId?: true;
    salaryRange?: true;
    fullDescription?: true;
    applyUrl?: true;
    postedAt?: true;
    posterId?: true;
};
export type OpportunityMaxAggregateInputType = {
    id?: true;
    title?: true;
    companyName?: true;
    companyLogo?: true;
    location?: true;
    type?: true;
    isRemote?: true;
    imageUrl?: true;
    imagePublicId?: true;
    salaryRange?: true;
    fullDescription?: true;
    applyUrl?: true;
    postedAt?: true;
    posterId?: true;
};
export type OpportunityCountAggregateInputType = {
    id?: true;
    title?: true;
    companyName?: true;
    companyLogo?: true;
    location?: true;
    type?: true;
    isRemote?: true;
    imageUrl?: true;
    imagePublicId?: true;
    salaryRange?: true;
    fullDescription?: true;
    responsibilities?: true;
    qualifications?: true;
    applyUrl?: true;
    postedAt?: true;
    posterId?: true;
    _all?: true;
};
export type OpportunityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpportunityWhereInput;
    orderBy?: Prisma.OpportunityOrderByWithRelationInput | Prisma.OpportunityOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OpportunityCountAggregateInputType;
    _min?: OpportunityMinAggregateInputType;
    _max?: OpportunityMaxAggregateInputType;
};
export type GetOpportunityAggregateType<T extends OpportunityAggregateArgs> = {
    [P in keyof T & keyof AggregateOpportunity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOpportunity[P]> : Prisma.GetScalarType<T[P], AggregateOpportunity[P]>;
};
export type OpportunityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpportunityWhereInput;
    orderBy?: Prisma.OpportunityOrderByWithAggregationInput | Prisma.OpportunityOrderByWithAggregationInput[];
    by: Prisma.OpportunityScalarFieldEnum[] | Prisma.OpportunityScalarFieldEnum;
    having?: Prisma.OpportunityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OpportunityCountAggregateInputType | true;
    _min?: OpportunityMinAggregateInputType;
    _max?: OpportunityMaxAggregateInputType;
};
export type OpportunityGroupByOutputType = {
    id: string;
    title: string;
    companyName: string;
    companyLogo: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote: boolean;
    imageUrl: string | null;
    imagePublicId: string | null;
    salaryRange: string | null;
    fullDescription: string;
    responsibilities: string[];
    qualifications: string[];
    applyUrl: string;
    postedAt: Date;
    posterId: string;
    _count: OpportunityCountAggregateOutputType | null;
    _min: OpportunityMinAggregateOutputType | null;
    _max: OpportunityMaxAggregateOutputType | null;
};
type GetOpportunityGroupByPayload<T extends OpportunityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OpportunityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OpportunityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OpportunityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OpportunityGroupByOutputType[P]>;
}>>;
export type OpportunityWhereInput = {
    AND?: Prisma.OpportunityWhereInput | Prisma.OpportunityWhereInput[];
    OR?: Prisma.OpportunityWhereInput[];
    NOT?: Prisma.OpportunityWhereInput | Prisma.OpportunityWhereInput[];
    id?: Prisma.StringFilter<"Opportunity"> | string;
    title?: Prisma.StringFilter<"Opportunity"> | string;
    companyName?: Prisma.StringFilter<"Opportunity"> | string;
    companyLogo?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    location?: Prisma.StringFilter<"Opportunity"> | string;
    type?: Prisma.EnumOpportunityTypeFilter<"Opportunity"> | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFilter<"Opportunity"> | boolean;
    imageUrl?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    salaryRange?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    fullDescription?: Prisma.StringFilter<"Opportunity"> | string;
    responsibilities?: Prisma.StringNullableListFilter<"Opportunity">;
    qualifications?: Prisma.StringNullableListFilter<"Opportunity">;
    applyUrl?: Prisma.StringFilter<"Opportunity"> | string;
    postedAt?: Prisma.DateTimeFilter<"Opportunity"> | Date | string;
    posterId?: Prisma.StringFilter<"Opportunity"> | string;
    poster?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    tags?: Prisma.OpportunityTagListRelationFilter;
};
export type OpportunityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyLogo?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRemote?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    salaryRange?: Prisma.SortOrderInput | Prisma.SortOrder;
    fullDescription?: Prisma.SortOrder;
    responsibilities?: Prisma.SortOrder;
    qualifications?: Prisma.SortOrder;
    applyUrl?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    posterId?: Prisma.SortOrder;
    poster?: Prisma.UserOrderByWithRelationInput;
    tags?: Prisma.OpportunityTagOrderByRelationAggregateInput;
};
export type OpportunityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OpportunityWhereInput | Prisma.OpportunityWhereInput[];
    OR?: Prisma.OpportunityWhereInput[];
    NOT?: Prisma.OpportunityWhereInput | Prisma.OpportunityWhereInput[];
    title?: Prisma.StringFilter<"Opportunity"> | string;
    companyName?: Prisma.StringFilter<"Opportunity"> | string;
    companyLogo?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    location?: Prisma.StringFilter<"Opportunity"> | string;
    type?: Prisma.EnumOpportunityTypeFilter<"Opportunity"> | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFilter<"Opportunity"> | boolean;
    imageUrl?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    salaryRange?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    fullDescription?: Prisma.StringFilter<"Opportunity"> | string;
    responsibilities?: Prisma.StringNullableListFilter<"Opportunity">;
    qualifications?: Prisma.StringNullableListFilter<"Opportunity">;
    applyUrl?: Prisma.StringFilter<"Opportunity"> | string;
    postedAt?: Prisma.DateTimeFilter<"Opportunity"> | Date | string;
    posterId?: Prisma.StringFilter<"Opportunity"> | string;
    poster?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    tags?: Prisma.OpportunityTagListRelationFilter;
}, "id">;
export type OpportunityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyLogo?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRemote?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    salaryRange?: Prisma.SortOrderInput | Prisma.SortOrder;
    fullDescription?: Prisma.SortOrder;
    responsibilities?: Prisma.SortOrder;
    qualifications?: Prisma.SortOrder;
    applyUrl?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    posterId?: Prisma.SortOrder;
    _count?: Prisma.OpportunityCountOrderByAggregateInput;
    _max?: Prisma.OpportunityMaxOrderByAggregateInput;
    _min?: Prisma.OpportunityMinOrderByAggregateInput;
};
export type OpportunityScalarWhereWithAggregatesInput = {
    AND?: Prisma.OpportunityScalarWhereWithAggregatesInput | Prisma.OpportunityScalarWhereWithAggregatesInput[];
    OR?: Prisma.OpportunityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OpportunityScalarWhereWithAggregatesInput | Prisma.OpportunityScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Opportunity"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Opportunity"> | string;
    companyName?: Prisma.StringWithAggregatesFilter<"Opportunity"> | string;
    companyLogo?: Prisma.StringNullableWithAggregatesFilter<"Opportunity"> | string | null;
    location?: Prisma.StringWithAggregatesFilter<"Opportunity"> | string;
    type?: Prisma.EnumOpportunityTypeWithAggregatesFilter<"Opportunity"> | $Enums.OpportunityType;
    isRemote?: Prisma.BoolWithAggregatesFilter<"Opportunity"> | boolean;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Opportunity"> | string | null;
    imagePublicId?: Prisma.StringNullableWithAggregatesFilter<"Opportunity"> | string | null;
    salaryRange?: Prisma.StringNullableWithAggregatesFilter<"Opportunity"> | string | null;
    fullDescription?: Prisma.StringWithAggregatesFilter<"Opportunity"> | string;
    responsibilities?: Prisma.StringNullableListFilter<"Opportunity">;
    qualifications?: Prisma.StringNullableListFilter<"Opportunity">;
    applyUrl?: Prisma.StringWithAggregatesFilter<"Opportunity"> | string;
    postedAt?: Prisma.DateTimeWithAggregatesFilter<"Opportunity"> | Date | string;
    posterId?: Prisma.StringWithAggregatesFilter<"Opportunity"> | string;
};
export type OpportunityCreateInput = {
    id?: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote?: boolean;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    salaryRange?: string | null;
    fullDescription: string;
    responsibilities?: Prisma.OpportunityCreateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityCreatequalificationsInput | string[];
    applyUrl: string;
    postedAt?: Date | string;
    poster: Prisma.UserCreateNestedOneWithoutOpportunitiesInput;
    tags?: Prisma.OpportunityTagCreateNestedManyWithoutOpportunityInput;
};
export type OpportunityUncheckedCreateInput = {
    id?: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote?: boolean;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    salaryRange?: string | null;
    fullDescription: string;
    responsibilities?: Prisma.OpportunityCreateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityCreatequalificationsInput | string[];
    applyUrl: string;
    postedAt?: Date | string;
    posterId: string;
    tags?: Prisma.OpportunityTagUncheckedCreateNestedManyWithoutOpportunityInput;
};
export type OpportunityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poster?: Prisma.UserUpdateOneRequiredWithoutOpportunitiesNestedInput;
    tags?: Prisma.OpportunityTagUpdateManyWithoutOpportunityNestedInput;
};
export type OpportunityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posterId?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.OpportunityTagUncheckedUpdateManyWithoutOpportunityNestedInput;
};
export type OpportunityCreateManyInput = {
    id?: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote?: boolean;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    salaryRange?: string | null;
    fullDescription: string;
    responsibilities?: Prisma.OpportunityCreateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityCreatequalificationsInput | string[];
    applyUrl: string;
    postedAt?: Date | string;
    posterId: string;
};
export type OpportunityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OpportunityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posterId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OpportunityListRelationFilter = {
    every?: Prisma.OpportunityWhereInput;
    some?: Prisma.OpportunityWhereInput;
    none?: Prisma.OpportunityWhereInput;
};
export type OpportunityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type OpportunityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyLogo?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRemote?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    salaryRange?: Prisma.SortOrder;
    fullDescription?: Prisma.SortOrder;
    responsibilities?: Prisma.SortOrder;
    qualifications?: Prisma.SortOrder;
    applyUrl?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    posterId?: Prisma.SortOrder;
};
export type OpportunityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyLogo?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRemote?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    salaryRange?: Prisma.SortOrder;
    fullDescription?: Prisma.SortOrder;
    applyUrl?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    posterId?: Prisma.SortOrder;
};
export type OpportunityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyLogo?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRemote?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    imagePublicId?: Prisma.SortOrder;
    salaryRange?: Prisma.SortOrder;
    fullDescription?: Prisma.SortOrder;
    applyUrl?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    posterId?: Prisma.SortOrder;
};
export type OpportunityScalarRelationFilter = {
    is?: Prisma.OpportunityWhereInput;
    isNot?: Prisma.OpportunityWhereInput;
};
export type OpportunityCreateNestedManyWithoutPosterInput = {
    create?: Prisma.XOR<Prisma.OpportunityCreateWithoutPosterInput, Prisma.OpportunityUncheckedCreateWithoutPosterInput> | Prisma.OpportunityCreateWithoutPosterInput[] | Prisma.OpportunityUncheckedCreateWithoutPosterInput[];
    connectOrCreate?: Prisma.OpportunityCreateOrConnectWithoutPosterInput | Prisma.OpportunityCreateOrConnectWithoutPosterInput[];
    createMany?: Prisma.OpportunityCreateManyPosterInputEnvelope;
    connect?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
};
export type OpportunityUncheckedCreateNestedManyWithoutPosterInput = {
    create?: Prisma.XOR<Prisma.OpportunityCreateWithoutPosterInput, Prisma.OpportunityUncheckedCreateWithoutPosterInput> | Prisma.OpportunityCreateWithoutPosterInput[] | Prisma.OpportunityUncheckedCreateWithoutPosterInput[];
    connectOrCreate?: Prisma.OpportunityCreateOrConnectWithoutPosterInput | Prisma.OpportunityCreateOrConnectWithoutPosterInput[];
    createMany?: Prisma.OpportunityCreateManyPosterInputEnvelope;
    connect?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
};
export type OpportunityUpdateManyWithoutPosterNestedInput = {
    create?: Prisma.XOR<Prisma.OpportunityCreateWithoutPosterInput, Prisma.OpportunityUncheckedCreateWithoutPosterInput> | Prisma.OpportunityCreateWithoutPosterInput[] | Prisma.OpportunityUncheckedCreateWithoutPosterInput[];
    connectOrCreate?: Prisma.OpportunityCreateOrConnectWithoutPosterInput | Prisma.OpportunityCreateOrConnectWithoutPosterInput[];
    upsert?: Prisma.OpportunityUpsertWithWhereUniqueWithoutPosterInput | Prisma.OpportunityUpsertWithWhereUniqueWithoutPosterInput[];
    createMany?: Prisma.OpportunityCreateManyPosterInputEnvelope;
    set?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
    disconnect?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
    delete?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
    connect?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
    update?: Prisma.OpportunityUpdateWithWhereUniqueWithoutPosterInput | Prisma.OpportunityUpdateWithWhereUniqueWithoutPosterInput[];
    updateMany?: Prisma.OpportunityUpdateManyWithWhereWithoutPosterInput | Prisma.OpportunityUpdateManyWithWhereWithoutPosterInput[];
    deleteMany?: Prisma.OpportunityScalarWhereInput | Prisma.OpportunityScalarWhereInput[];
};
export type OpportunityUncheckedUpdateManyWithoutPosterNestedInput = {
    create?: Prisma.XOR<Prisma.OpportunityCreateWithoutPosterInput, Prisma.OpportunityUncheckedCreateWithoutPosterInput> | Prisma.OpportunityCreateWithoutPosterInput[] | Prisma.OpportunityUncheckedCreateWithoutPosterInput[];
    connectOrCreate?: Prisma.OpportunityCreateOrConnectWithoutPosterInput | Prisma.OpportunityCreateOrConnectWithoutPosterInput[];
    upsert?: Prisma.OpportunityUpsertWithWhereUniqueWithoutPosterInput | Prisma.OpportunityUpsertWithWhereUniqueWithoutPosterInput[];
    createMany?: Prisma.OpportunityCreateManyPosterInputEnvelope;
    set?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
    disconnect?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
    delete?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
    connect?: Prisma.OpportunityWhereUniqueInput | Prisma.OpportunityWhereUniqueInput[];
    update?: Prisma.OpportunityUpdateWithWhereUniqueWithoutPosterInput | Prisma.OpportunityUpdateWithWhereUniqueWithoutPosterInput[];
    updateMany?: Prisma.OpportunityUpdateManyWithWhereWithoutPosterInput | Prisma.OpportunityUpdateManyWithWhereWithoutPosterInput[];
    deleteMany?: Prisma.OpportunityScalarWhereInput | Prisma.OpportunityScalarWhereInput[];
};
export type OpportunityCreateresponsibilitiesInput = {
    set: string[];
};
export type OpportunityCreatequalificationsInput = {
    set: string[];
};
export type EnumOpportunityTypeFieldUpdateOperationsInput = {
    set?: $Enums.OpportunityType;
};
export type OpportunityUpdateresponsibilitiesInput = {
    set?: string[];
    push?: string | string[];
};
export type OpportunityUpdatequalificationsInput = {
    set?: string[];
    push?: string | string[];
};
export type OpportunityCreateNestedOneWithoutTagsInput = {
    create?: Prisma.XOR<Prisma.OpportunityCreateWithoutTagsInput, Prisma.OpportunityUncheckedCreateWithoutTagsInput>;
    connectOrCreate?: Prisma.OpportunityCreateOrConnectWithoutTagsInput;
    connect?: Prisma.OpportunityWhereUniqueInput;
};
export type OpportunityUpdateOneRequiredWithoutTagsNestedInput = {
    create?: Prisma.XOR<Prisma.OpportunityCreateWithoutTagsInput, Prisma.OpportunityUncheckedCreateWithoutTagsInput>;
    connectOrCreate?: Prisma.OpportunityCreateOrConnectWithoutTagsInput;
    upsert?: Prisma.OpportunityUpsertWithoutTagsInput;
    connect?: Prisma.OpportunityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OpportunityUpdateToOneWithWhereWithoutTagsInput, Prisma.OpportunityUpdateWithoutTagsInput>, Prisma.OpportunityUncheckedUpdateWithoutTagsInput>;
};
export type OpportunityCreateWithoutPosterInput = {
    id?: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote?: boolean;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    salaryRange?: string | null;
    fullDescription: string;
    responsibilities?: Prisma.OpportunityCreateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityCreatequalificationsInput | string[];
    applyUrl: string;
    postedAt?: Date | string;
    tags?: Prisma.OpportunityTagCreateNestedManyWithoutOpportunityInput;
};
export type OpportunityUncheckedCreateWithoutPosterInput = {
    id?: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote?: boolean;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    salaryRange?: string | null;
    fullDescription: string;
    responsibilities?: Prisma.OpportunityCreateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityCreatequalificationsInput | string[];
    applyUrl: string;
    postedAt?: Date | string;
    tags?: Prisma.OpportunityTagUncheckedCreateNestedManyWithoutOpportunityInput;
};
export type OpportunityCreateOrConnectWithoutPosterInput = {
    where: Prisma.OpportunityWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpportunityCreateWithoutPosterInput, Prisma.OpportunityUncheckedCreateWithoutPosterInput>;
};
export type OpportunityCreateManyPosterInputEnvelope = {
    data: Prisma.OpportunityCreateManyPosterInput | Prisma.OpportunityCreateManyPosterInput[];
    skipDuplicates?: boolean;
};
export type OpportunityUpsertWithWhereUniqueWithoutPosterInput = {
    where: Prisma.OpportunityWhereUniqueInput;
    update: Prisma.XOR<Prisma.OpportunityUpdateWithoutPosterInput, Prisma.OpportunityUncheckedUpdateWithoutPosterInput>;
    create: Prisma.XOR<Prisma.OpportunityCreateWithoutPosterInput, Prisma.OpportunityUncheckedCreateWithoutPosterInput>;
};
export type OpportunityUpdateWithWhereUniqueWithoutPosterInput = {
    where: Prisma.OpportunityWhereUniqueInput;
    data: Prisma.XOR<Prisma.OpportunityUpdateWithoutPosterInput, Prisma.OpportunityUncheckedUpdateWithoutPosterInput>;
};
export type OpportunityUpdateManyWithWhereWithoutPosterInput = {
    where: Prisma.OpportunityScalarWhereInput;
    data: Prisma.XOR<Prisma.OpportunityUpdateManyMutationInput, Prisma.OpportunityUncheckedUpdateManyWithoutPosterInput>;
};
export type OpportunityScalarWhereInput = {
    AND?: Prisma.OpportunityScalarWhereInput | Prisma.OpportunityScalarWhereInput[];
    OR?: Prisma.OpportunityScalarWhereInput[];
    NOT?: Prisma.OpportunityScalarWhereInput | Prisma.OpportunityScalarWhereInput[];
    id?: Prisma.StringFilter<"Opportunity"> | string;
    title?: Prisma.StringFilter<"Opportunity"> | string;
    companyName?: Prisma.StringFilter<"Opportunity"> | string;
    companyLogo?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    location?: Prisma.StringFilter<"Opportunity"> | string;
    type?: Prisma.EnumOpportunityTypeFilter<"Opportunity"> | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFilter<"Opportunity"> | boolean;
    imageUrl?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    imagePublicId?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    salaryRange?: Prisma.StringNullableFilter<"Opportunity"> | string | null;
    fullDescription?: Prisma.StringFilter<"Opportunity"> | string;
    responsibilities?: Prisma.StringNullableListFilter<"Opportunity">;
    qualifications?: Prisma.StringNullableListFilter<"Opportunity">;
    applyUrl?: Prisma.StringFilter<"Opportunity"> | string;
    postedAt?: Prisma.DateTimeFilter<"Opportunity"> | Date | string;
    posterId?: Prisma.StringFilter<"Opportunity"> | string;
};
export type OpportunityCreateWithoutTagsInput = {
    id?: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote?: boolean;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    salaryRange?: string | null;
    fullDescription: string;
    responsibilities?: Prisma.OpportunityCreateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityCreatequalificationsInput | string[];
    applyUrl: string;
    postedAt?: Date | string;
    poster: Prisma.UserCreateNestedOneWithoutOpportunitiesInput;
};
export type OpportunityUncheckedCreateWithoutTagsInput = {
    id?: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote?: boolean;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    salaryRange?: string | null;
    fullDescription: string;
    responsibilities?: Prisma.OpportunityCreateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityCreatequalificationsInput | string[];
    applyUrl: string;
    postedAt?: Date | string;
    posterId: string;
};
export type OpportunityCreateOrConnectWithoutTagsInput = {
    where: Prisma.OpportunityWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpportunityCreateWithoutTagsInput, Prisma.OpportunityUncheckedCreateWithoutTagsInput>;
};
export type OpportunityUpsertWithoutTagsInput = {
    update: Prisma.XOR<Prisma.OpportunityUpdateWithoutTagsInput, Prisma.OpportunityUncheckedUpdateWithoutTagsInput>;
    create: Prisma.XOR<Prisma.OpportunityCreateWithoutTagsInput, Prisma.OpportunityUncheckedCreateWithoutTagsInput>;
    where?: Prisma.OpportunityWhereInput;
};
export type OpportunityUpdateToOneWithWhereWithoutTagsInput = {
    where?: Prisma.OpportunityWhereInput;
    data: Prisma.XOR<Prisma.OpportunityUpdateWithoutTagsInput, Prisma.OpportunityUncheckedUpdateWithoutTagsInput>;
};
export type OpportunityUpdateWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poster?: Prisma.UserUpdateOneRequiredWithoutOpportunitiesNestedInput;
};
export type OpportunityUncheckedUpdateWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posterId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OpportunityCreateManyPosterInput = {
    id?: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    type: $Enums.OpportunityType;
    isRemote?: boolean;
    imageUrl?: string | null;
    imagePublicId?: string | null;
    salaryRange?: string | null;
    fullDescription: string;
    responsibilities?: Prisma.OpportunityCreateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityCreatequalificationsInput | string[];
    applyUrl: string;
    postedAt?: Date | string;
};
export type OpportunityUpdateWithoutPosterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tags?: Prisma.OpportunityTagUpdateManyWithoutOpportunityNestedInput;
};
export type OpportunityUncheckedUpdateWithoutPosterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tags?: Prisma.OpportunityTagUncheckedUpdateManyWithoutOpportunityNestedInput;
};
export type OpportunityUncheckedUpdateManyWithoutPosterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyLogo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumOpportunityTypeFieldUpdateOperationsInput | $Enums.OpportunityType;
    isRemote?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imagePublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    salaryRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fullDescription?: Prisma.StringFieldUpdateOperationsInput | string;
    responsibilities?: Prisma.OpportunityUpdateresponsibilitiesInput | string[];
    qualifications?: Prisma.OpportunityUpdatequalificationsInput | string[];
    applyUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OpportunityCountOutputType = {
    tags: number;
};
export type OpportunityCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tags?: boolean | OpportunityCountOutputTypeCountTagsArgs;
};
export type OpportunityCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityCountOutputTypeSelect<ExtArgs> | null;
};
export type OpportunityCountOutputTypeCountTagsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpportunityTagWhereInput;
};
export type OpportunitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    companyName?: boolean;
    companyLogo?: boolean;
    location?: boolean;
    type?: boolean;
    isRemote?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    salaryRange?: boolean;
    fullDescription?: boolean;
    responsibilities?: boolean;
    qualifications?: boolean;
    applyUrl?: boolean;
    postedAt?: boolean;
    posterId?: boolean;
    poster?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tags?: boolean | Prisma.Opportunity$tagsArgs<ExtArgs>;
    _count?: boolean | Prisma.OpportunityCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["opportunity"]>;
export type OpportunitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    companyName?: boolean;
    companyLogo?: boolean;
    location?: boolean;
    type?: boolean;
    isRemote?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    salaryRange?: boolean;
    fullDescription?: boolean;
    responsibilities?: boolean;
    qualifications?: boolean;
    applyUrl?: boolean;
    postedAt?: boolean;
    posterId?: boolean;
    poster?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["opportunity"]>;
export type OpportunitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    companyName?: boolean;
    companyLogo?: boolean;
    location?: boolean;
    type?: boolean;
    isRemote?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    salaryRange?: boolean;
    fullDescription?: boolean;
    responsibilities?: boolean;
    qualifications?: boolean;
    applyUrl?: boolean;
    postedAt?: boolean;
    posterId?: boolean;
    poster?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["opportunity"]>;
export type OpportunitySelectScalar = {
    id?: boolean;
    title?: boolean;
    companyName?: boolean;
    companyLogo?: boolean;
    location?: boolean;
    type?: boolean;
    isRemote?: boolean;
    imageUrl?: boolean;
    imagePublicId?: boolean;
    salaryRange?: boolean;
    fullDescription?: boolean;
    responsibilities?: boolean;
    qualifications?: boolean;
    applyUrl?: boolean;
    postedAt?: boolean;
    posterId?: boolean;
};
export type OpportunityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "companyName" | "companyLogo" | "location" | "type" | "isRemote" | "imageUrl" | "imagePublicId" | "salaryRange" | "fullDescription" | "responsibilities" | "qualifications" | "applyUrl" | "postedAt" | "posterId", ExtArgs["result"]["opportunity"]>;
export type OpportunityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poster?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tags?: boolean | Prisma.Opportunity$tagsArgs<ExtArgs>;
    _count?: boolean | Prisma.OpportunityCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OpportunityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poster?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OpportunityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poster?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $OpportunityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Opportunity";
    objects: {
        poster: Prisma.$UserPayload<ExtArgs>;
        tags: Prisma.$OpportunityTagPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        companyName: string;
        companyLogo: string | null;
        location: string;
        type: $Enums.OpportunityType;
        isRemote: boolean;
        imageUrl: string | null;
        imagePublicId: string | null;
        salaryRange: string | null;
        fullDescription: string;
        responsibilities: string[];
        qualifications: string[];
        applyUrl: string;
        postedAt: Date;
        posterId: string;
    }, ExtArgs["result"]["opportunity"]>;
    composites: {};
};
export type OpportunityGetPayload<S extends boolean | null | undefined | OpportunityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OpportunityPayload, S>;
export type OpportunityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OpportunityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OpportunityCountAggregateInputType | true;
};
export interface OpportunityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Opportunity'];
        meta: {
            name: 'Opportunity';
        };
    };
    findUnique<T extends OpportunityFindUniqueArgs>(args: Prisma.SelectSubset<T, OpportunityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OpportunityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OpportunityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OpportunityFindFirstArgs>(args?: Prisma.SelectSubset<T, OpportunityFindFirstArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OpportunityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OpportunityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OpportunityFindManyArgs>(args?: Prisma.SelectSubset<T, OpportunityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OpportunityCreateArgs>(args: Prisma.SelectSubset<T, OpportunityCreateArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OpportunityCreateManyArgs>(args?: Prisma.SelectSubset<T, OpportunityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OpportunityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OpportunityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OpportunityDeleteArgs>(args: Prisma.SelectSubset<T, OpportunityDeleteArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OpportunityUpdateArgs>(args: Prisma.SelectSubset<T, OpportunityUpdateArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OpportunityDeleteManyArgs>(args?: Prisma.SelectSubset<T, OpportunityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OpportunityUpdateManyArgs>(args: Prisma.SelectSubset<T, OpportunityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OpportunityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OpportunityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OpportunityUpsertArgs>(args: Prisma.SelectSubset<T, OpportunityUpsertArgs<ExtArgs>>): Prisma.Prisma__OpportunityClient<runtime.Types.Result.GetResult<Prisma.$OpportunityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OpportunityCountArgs>(args?: Prisma.Subset<T, OpportunityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OpportunityCountAggregateOutputType> : number>;
    aggregate<T extends OpportunityAggregateArgs>(args: Prisma.Subset<T, OpportunityAggregateArgs>): Prisma.PrismaPromise<GetOpportunityAggregateType<T>>;
    groupBy<T extends OpportunityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OpportunityGroupByArgs['orderBy'];
    } : {
        orderBy?: OpportunityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OpportunityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpportunityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OpportunityFieldRefs;
}
export interface Prisma__OpportunityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    poster<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tags<T extends Prisma.Opportunity$tagsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Opportunity$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpportunityTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OpportunityFieldRefs {
    readonly id: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly title: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly companyName: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly companyLogo: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly location: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly type: Prisma.FieldRef<"Opportunity", 'OpportunityType'>;
    readonly isRemote: Prisma.FieldRef<"Opportunity", 'Boolean'>;
    readonly imageUrl: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly imagePublicId: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly salaryRange: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly fullDescription: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly responsibilities: Prisma.FieldRef<"Opportunity", 'String[]'>;
    readonly qualifications: Prisma.FieldRef<"Opportunity", 'String[]'>;
    readonly applyUrl: Prisma.FieldRef<"Opportunity", 'String'>;
    readonly postedAt: Prisma.FieldRef<"Opportunity", 'DateTime'>;
    readonly posterId: Prisma.FieldRef<"Opportunity", 'String'>;
}
export type OpportunityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    where: Prisma.OpportunityWhereUniqueInput;
};
export type OpportunityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    where: Prisma.OpportunityWhereUniqueInput;
};
export type OpportunityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    where?: Prisma.OpportunityWhereInput;
    orderBy?: Prisma.OpportunityOrderByWithRelationInput | Prisma.OpportunityOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OpportunityScalarFieldEnum | Prisma.OpportunityScalarFieldEnum[];
};
export type OpportunityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    where?: Prisma.OpportunityWhereInput;
    orderBy?: Prisma.OpportunityOrderByWithRelationInput | Prisma.OpportunityOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OpportunityScalarFieldEnum | Prisma.OpportunityScalarFieldEnum[];
};
export type OpportunityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    where?: Prisma.OpportunityWhereInput;
    orderBy?: Prisma.OpportunityOrderByWithRelationInput | Prisma.OpportunityOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OpportunityScalarFieldEnum | Prisma.OpportunityScalarFieldEnum[];
};
export type OpportunityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpportunityCreateInput, Prisma.OpportunityUncheckedCreateInput>;
};
export type OpportunityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OpportunityCreateManyInput | Prisma.OpportunityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OpportunityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    data: Prisma.OpportunityCreateManyInput | Prisma.OpportunityCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OpportunityIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OpportunityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpportunityUpdateInput, Prisma.OpportunityUncheckedUpdateInput>;
    where: Prisma.OpportunityWhereUniqueInput;
};
export type OpportunityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OpportunityUpdateManyMutationInput, Prisma.OpportunityUncheckedUpdateManyInput>;
    where?: Prisma.OpportunityWhereInput;
    limit?: number;
};
export type OpportunityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpportunityUpdateManyMutationInput, Prisma.OpportunityUncheckedUpdateManyInput>;
    where?: Prisma.OpportunityWhereInput;
    limit?: number;
    include?: Prisma.OpportunityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OpportunityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    where: Prisma.OpportunityWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpportunityCreateInput, Prisma.OpportunityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OpportunityUpdateInput, Prisma.OpportunityUncheckedUpdateInput>;
};
export type OpportunityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
    where: Prisma.OpportunityWhereUniqueInput;
};
export type OpportunityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpportunityWhereInput;
    limit?: number;
};
export type Opportunity$tagsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunityTagSelect<ExtArgs> | null;
    omit?: Prisma.OpportunityTagOmit<ExtArgs> | null;
    include?: Prisma.OpportunityTagInclude<ExtArgs> | null;
    where?: Prisma.OpportunityTagWhereInput;
    orderBy?: Prisma.OpportunityTagOrderByWithRelationInput | Prisma.OpportunityTagOrderByWithRelationInput[];
    cursor?: Prisma.OpportunityTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OpportunityTagScalarFieldEnum | Prisma.OpportunityTagScalarFieldEnum[];
};
export type OpportunityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpportunitySelect<ExtArgs> | null;
    omit?: Prisma.OpportunityOmit<ExtArgs> | null;
    include?: Prisma.OpportunityInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Opportunity.d.ts.map