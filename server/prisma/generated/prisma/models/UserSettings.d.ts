import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserSettingsModel = runtime.Types.Result.DefaultSelection<Prisma.$UserSettingsPayload>;
export type AggregateUserSettings = {
    _count: UserSettingsCountAggregateOutputType | null;
    _min: UserSettingsMinAggregateOutputType | null;
    _max: UserSettingsMaxAggregateOutputType | null;
};
export type UserSettingsMinAggregateOutputType = {
    id: string | null;
    theme: $Enums.ThemePreference | null;
    notificationsEnabled: boolean | null;
    emailMarketing: boolean | null;
    emailSocial: boolean | null;
    updatedAt: Date | null;
    userId: string | null;
};
export type UserSettingsMaxAggregateOutputType = {
    id: string | null;
    theme: $Enums.ThemePreference | null;
    notificationsEnabled: boolean | null;
    emailMarketing: boolean | null;
    emailSocial: boolean | null;
    updatedAt: Date | null;
    userId: string | null;
};
export type UserSettingsCountAggregateOutputType = {
    id: number;
    theme: number;
    notificationsEnabled: number;
    emailMarketing: number;
    emailSocial: number;
    updatedAt: number;
    userId: number;
    _all: number;
};
export type UserSettingsMinAggregateInputType = {
    id?: true;
    theme?: true;
    notificationsEnabled?: true;
    emailMarketing?: true;
    emailSocial?: true;
    updatedAt?: true;
    userId?: true;
};
export type UserSettingsMaxAggregateInputType = {
    id?: true;
    theme?: true;
    notificationsEnabled?: true;
    emailMarketing?: true;
    emailSocial?: true;
    updatedAt?: true;
    userId?: true;
};
export type UserSettingsCountAggregateInputType = {
    id?: true;
    theme?: true;
    notificationsEnabled?: true;
    emailMarketing?: true;
    emailSocial?: true;
    updatedAt?: true;
    userId?: true;
    _all?: true;
};
export type UserSettingsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSettingsWhereInput;
    orderBy?: Prisma.UserSettingsOrderByWithRelationInput | Prisma.UserSettingsOrderByWithRelationInput[];
    cursor?: Prisma.UserSettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserSettingsCountAggregateInputType;
    _min?: UserSettingsMinAggregateInputType;
    _max?: UserSettingsMaxAggregateInputType;
};
export type GetUserSettingsAggregateType<T extends UserSettingsAggregateArgs> = {
    [P in keyof T & keyof AggregateUserSettings]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserSettings[P]> : Prisma.GetScalarType<T[P], AggregateUserSettings[P]>;
};
export type UserSettingsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSettingsWhereInput;
    orderBy?: Prisma.UserSettingsOrderByWithAggregationInput | Prisma.UserSettingsOrderByWithAggregationInput[];
    by: Prisma.UserSettingsScalarFieldEnum[] | Prisma.UserSettingsScalarFieldEnum;
    having?: Prisma.UserSettingsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserSettingsCountAggregateInputType | true;
    _min?: UserSettingsMinAggregateInputType;
    _max?: UserSettingsMaxAggregateInputType;
};
export type UserSettingsGroupByOutputType = {
    id: string;
    theme: $Enums.ThemePreference;
    notificationsEnabled: boolean;
    emailMarketing: boolean;
    emailSocial: boolean;
    updatedAt: Date;
    userId: string;
    _count: UserSettingsCountAggregateOutputType | null;
    _min: UserSettingsMinAggregateOutputType | null;
    _max: UserSettingsMaxAggregateOutputType | null;
};
type GetUserSettingsGroupByPayload<T extends UserSettingsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserSettingsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserSettingsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserSettingsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserSettingsGroupByOutputType[P]>;
}>>;
export type UserSettingsWhereInput = {
    AND?: Prisma.UserSettingsWhereInput | Prisma.UserSettingsWhereInput[];
    OR?: Prisma.UserSettingsWhereInput[];
    NOT?: Prisma.UserSettingsWhereInput | Prisma.UserSettingsWhereInput[];
    id?: Prisma.StringFilter<"UserSettings"> | string;
    theme?: Prisma.EnumThemePreferenceFilter<"UserSettings"> | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolFilter<"UserSettings"> | boolean;
    emailMarketing?: Prisma.BoolFilter<"UserSettings"> | boolean;
    emailSocial?: Prisma.BoolFilter<"UserSettings"> | boolean;
    updatedAt?: Prisma.DateTimeFilter<"UserSettings"> | Date | string;
    userId?: Prisma.StringFilter<"UserSettings"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserSettingsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    theme?: Prisma.SortOrder;
    notificationsEnabled?: Prisma.SortOrder;
    emailMarketing?: Prisma.SortOrder;
    emailSocial?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.UserSettingsWhereInput | Prisma.UserSettingsWhereInput[];
    OR?: Prisma.UserSettingsWhereInput[];
    NOT?: Prisma.UserSettingsWhereInput | Prisma.UserSettingsWhereInput[];
    theme?: Prisma.EnumThemePreferenceFilter<"UserSettings"> | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolFilter<"UserSettings"> | boolean;
    emailMarketing?: Prisma.BoolFilter<"UserSettings"> | boolean;
    emailSocial?: Prisma.BoolFilter<"UserSettings"> | boolean;
    updatedAt?: Prisma.DateTimeFilter<"UserSettings"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type UserSettingsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    theme?: Prisma.SortOrder;
    notificationsEnabled?: Prisma.SortOrder;
    emailMarketing?: Prisma.SortOrder;
    emailSocial?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.UserSettingsCountOrderByAggregateInput;
    _max?: Prisma.UserSettingsMaxOrderByAggregateInput;
    _min?: Prisma.UserSettingsMinOrderByAggregateInput;
};
export type UserSettingsScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserSettingsScalarWhereWithAggregatesInput | Prisma.UserSettingsScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserSettingsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserSettingsScalarWhereWithAggregatesInput | Prisma.UserSettingsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserSettings"> | string;
    theme?: Prisma.EnumThemePreferenceWithAggregatesFilter<"UserSettings"> | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolWithAggregatesFilter<"UserSettings"> | boolean;
    emailMarketing?: Prisma.BoolWithAggregatesFilter<"UserSettings"> | boolean;
    emailSocial?: Prisma.BoolWithAggregatesFilter<"UserSettings"> | boolean;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserSettings"> | Date | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserSettings"> | string;
};
export type UserSettingsCreateInput = {
    id?: string;
    theme?: $Enums.ThemePreference;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSettingsInput;
};
export type UserSettingsUncheckedCreateInput = {
    id?: string;
    theme?: $Enums.ThemePreference;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: Date | string;
    userId: string;
};
export type UserSettingsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    theme?: Prisma.EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailMarketing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailSocial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSettingsNestedInput;
};
export type UserSettingsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    theme?: Prisma.EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailMarketing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailSocial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserSettingsCreateManyInput = {
    id?: string;
    theme?: $Enums.ThemePreference;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: Date | string;
    userId: string;
};
export type UserSettingsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    theme?: Prisma.EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailMarketing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailSocial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSettingsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    theme?: Prisma.EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailMarketing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailSocial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserSettingsNullableScalarRelationFilter = {
    is?: Prisma.UserSettingsWhereInput | null;
    isNot?: Prisma.UserSettingsWhereInput | null;
};
export type UserSettingsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    theme?: Prisma.SortOrder;
    notificationsEnabled?: Prisma.SortOrder;
    emailMarketing?: Prisma.SortOrder;
    emailSocial?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type UserSettingsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    theme?: Prisma.SortOrder;
    notificationsEnabled?: Prisma.SortOrder;
    emailMarketing?: Prisma.SortOrder;
    emailSocial?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type UserSettingsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    theme?: Prisma.SortOrder;
    notificationsEnabled?: Prisma.SortOrder;
    emailMarketing?: Prisma.SortOrder;
    emailSocial?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type UserSettingsCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserSettingsCreateWithoutUserInput, Prisma.UserSettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserSettingsCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserSettingsWhereUniqueInput;
};
export type UserSettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserSettingsCreateWithoutUserInput, Prisma.UserSettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserSettingsCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserSettingsWhereUniqueInput;
};
export type UserSettingsUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserSettingsCreateWithoutUserInput, Prisma.UserSettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserSettingsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserSettingsUpsertWithoutUserInput;
    disconnect?: Prisma.UserSettingsWhereInput | boolean;
    delete?: Prisma.UserSettingsWhereInput | boolean;
    connect?: Prisma.UserSettingsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserSettingsUpdateToOneWithWhereWithoutUserInput, Prisma.UserSettingsUpdateWithoutUserInput>, Prisma.UserSettingsUncheckedUpdateWithoutUserInput>;
};
export type UserSettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserSettingsCreateWithoutUserInput, Prisma.UserSettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserSettingsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserSettingsUpsertWithoutUserInput;
    disconnect?: Prisma.UserSettingsWhereInput | boolean;
    delete?: Prisma.UserSettingsWhereInput | boolean;
    connect?: Prisma.UserSettingsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserSettingsUpdateToOneWithWhereWithoutUserInput, Prisma.UserSettingsUpdateWithoutUserInput>, Prisma.UserSettingsUncheckedUpdateWithoutUserInput>;
};
export type EnumThemePreferenceFieldUpdateOperationsInput = {
    set?: $Enums.ThemePreference;
};
export type UserSettingsCreateWithoutUserInput = {
    id?: string;
    theme?: $Enums.ThemePreference;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: Date | string;
};
export type UserSettingsUncheckedCreateWithoutUserInput = {
    id?: string;
    theme?: $Enums.ThemePreference;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: Date | string;
};
export type UserSettingsCreateOrConnectWithoutUserInput = {
    where: Prisma.UserSettingsWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSettingsCreateWithoutUserInput, Prisma.UserSettingsUncheckedCreateWithoutUserInput>;
};
export type UserSettingsUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.UserSettingsUpdateWithoutUserInput, Prisma.UserSettingsUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserSettingsCreateWithoutUserInput, Prisma.UserSettingsUncheckedCreateWithoutUserInput>;
    where?: Prisma.UserSettingsWhereInput;
};
export type UserSettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.UserSettingsWhereInput;
    data: Prisma.XOR<Prisma.UserSettingsUpdateWithoutUserInput, Prisma.UserSettingsUncheckedUpdateWithoutUserInput>;
};
export type UserSettingsUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    theme?: Prisma.EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailMarketing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailSocial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSettingsUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    theme?: Prisma.EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference;
    notificationsEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailMarketing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailSocial?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSettingsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    theme?: boolean;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSettings"]>;
export type UserSettingsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    theme?: boolean;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSettings"]>;
export type UserSettingsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    theme?: boolean;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSettings"]>;
export type UserSettingsSelectScalar = {
    id?: boolean;
    theme?: boolean;
    notificationsEnabled?: boolean;
    emailMarketing?: boolean;
    emailSocial?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
};
export type UserSettingsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "theme" | "notificationsEnabled" | "emailMarketing" | "emailSocial" | "updatedAt" | "userId", ExtArgs["result"]["userSettings"]>;
export type UserSettingsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserSettingsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserSettingsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserSettingsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserSettings";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        theme: $Enums.ThemePreference;
        notificationsEnabled: boolean;
        emailMarketing: boolean;
        emailSocial: boolean;
        updatedAt: Date;
        userId: string;
    }, ExtArgs["result"]["userSettings"]>;
    composites: {};
};
export type UserSettingsGetPayload<S extends boolean | null | undefined | UserSettingsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload, S>;
export type UserSettingsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserSettingsCountAggregateInputType | true;
};
export interface UserSettingsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserSettings'];
        meta: {
            name: 'UserSettings';
        };
    };
    findUnique<T extends UserSettingsFindUniqueArgs>(args: Prisma.SelectSubset<T, UserSettingsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserSettingsClient<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserSettingsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserSettingsClient<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserSettingsFindFirstArgs>(args?: Prisma.SelectSubset<T, UserSettingsFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserSettingsClient<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserSettingsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserSettingsClient<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserSettingsFindManyArgs>(args?: Prisma.SelectSubset<T, UserSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserSettingsCreateArgs>(args: Prisma.SelectSubset<T, UserSettingsCreateArgs<ExtArgs>>): Prisma.Prisma__UserSettingsClient<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserSettingsCreateManyArgs>(args?: Prisma.SelectSubset<T, UserSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserSettingsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserSettingsDeleteArgs>(args: Prisma.SelectSubset<T, UserSettingsDeleteArgs<ExtArgs>>): Prisma.Prisma__UserSettingsClient<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserSettingsUpdateArgs>(args: Prisma.SelectSubset<T, UserSettingsUpdateArgs<ExtArgs>>): Prisma.Prisma__UserSettingsClient<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserSettingsDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserSettingsUpdateManyArgs>(args: Prisma.SelectSubset<T, UserSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserSettingsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserSettingsUpsertArgs>(args: Prisma.SelectSubset<T, UserSettingsUpsertArgs<ExtArgs>>): Prisma.Prisma__UserSettingsClient<runtime.Types.Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserSettingsCountArgs>(args?: Prisma.Subset<T, UserSettingsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserSettingsCountAggregateOutputType> : number>;
    aggregate<T extends UserSettingsAggregateArgs>(args: Prisma.Subset<T, UserSettingsAggregateArgs>): Prisma.PrismaPromise<GetUserSettingsAggregateType<T>>;
    groupBy<T extends UserSettingsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserSettingsGroupByArgs['orderBy'];
    } : {
        orderBy?: UserSettingsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserSettingsFieldRefs;
}
export interface Prisma__UserSettingsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserSettingsFieldRefs {
    readonly id: Prisma.FieldRef<"UserSettings", 'String'>;
    readonly theme: Prisma.FieldRef<"UserSettings", 'ThemePreference'>;
    readonly notificationsEnabled: Prisma.FieldRef<"UserSettings", 'Boolean'>;
    readonly emailMarketing: Prisma.FieldRef<"UserSettings", 'Boolean'>;
    readonly emailSocial: Prisma.FieldRef<"UserSettings", 'Boolean'>;
    readonly updatedAt: Prisma.FieldRef<"UserSettings", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"UserSettings", 'String'>;
}
export type UserSettingsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    where: Prisma.UserSettingsWhereUniqueInput;
};
export type UserSettingsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    where: Prisma.UserSettingsWhereUniqueInput;
};
export type UserSettingsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    where?: Prisma.UserSettingsWhereInput;
    orderBy?: Prisma.UserSettingsOrderByWithRelationInput | Prisma.UserSettingsOrderByWithRelationInput[];
    cursor?: Prisma.UserSettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSettingsScalarFieldEnum | Prisma.UserSettingsScalarFieldEnum[];
};
export type UserSettingsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    where?: Prisma.UserSettingsWhereInput;
    orderBy?: Prisma.UserSettingsOrderByWithRelationInput | Prisma.UserSettingsOrderByWithRelationInput[];
    cursor?: Prisma.UserSettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSettingsScalarFieldEnum | Prisma.UserSettingsScalarFieldEnum[];
};
export type UserSettingsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    where?: Prisma.UserSettingsWhereInput;
    orderBy?: Prisma.UserSettingsOrderByWithRelationInput | Prisma.UserSettingsOrderByWithRelationInput[];
    cursor?: Prisma.UserSettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSettingsScalarFieldEnum | Prisma.UserSettingsScalarFieldEnum[];
};
export type UserSettingsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSettingsCreateInput, Prisma.UserSettingsUncheckedCreateInput>;
};
export type UserSettingsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserSettingsCreateManyInput | Prisma.UserSettingsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserSettingsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    data: Prisma.UserSettingsCreateManyInput | Prisma.UserSettingsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserSettingsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserSettingsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSettingsUpdateInput, Prisma.UserSettingsUncheckedUpdateInput>;
    where: Prisma.UserSettingsWhereUniqueInput;
};
export type UserSettingsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserSettingsUpdateManyMutationInput, Prisma.UserSettingsUncheckedUpdateManyInput>;
    where?: Prisma.UserSettingsWhereInput;
    limit?: number;
};
export type UserSettingsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSettingsUpdateManyMutationInput, Prisma.UserSettingsUncheckedUpdateManyInput>;
    where?: Prisma.UserSettingsWhereInput;
    limit?: number;
    include?: Prisma.UserSettingsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserSettingsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    where: Prisma.UserSettingsWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSettingsCreateInput, Prisma.UserSettingsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserSettingsUpdateInput, Prisma.UserSettingsUncheckedUpdateInput>;
};
export type UserSettingsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
    where: Prisma.UserSettingsWhereUniqueInput;
};
export type UserSettingsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSettingsWhereInput;
    limit?: number;
};
export type UserSettingsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingsSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingsOmit<ExtArgs> | null;
    include?: Prisma.UserSettingsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=UserSettings.d.ts.map