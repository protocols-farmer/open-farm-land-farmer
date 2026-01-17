import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type EnumSystemRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.SystemRole | Prisma.EnumSystemRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.SystemRole[] | Prisma.ListEnumSystemRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SystemRole[] | Prisma.ListEnumSystemRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSystemRoleFilter<$PrismaModel> | $Enums.SystemRole;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type EnumSystemRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SystemRole | Prisma.EnumSystemRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.SystemRole[] | Prisma.ListEnumSystemRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SystemRole[] | Prisma.ListEnumSystemRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSystemRoleWithAggregatesFilter<$PrismaModel> | $Enums.SystemRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSystemRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSystemRoleFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumThemePreferenceFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemePreference | Prisma.EnumThemePreferenceFieldRefInput<$PrismaModel>;
    in?: $Enums.ThemePreference[] | Prisma.ListEnumThemePreferenceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ThemePreference[] | Prisma.ListEnumThemePreferenceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumThemePreferenceFilter<$PrismaModel> | $Enums.ThemePreference;
};
export type EnumThemePreferenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemePreference | Prisma.EnumThemePreferenceFieldRefInput<$PrismaModel>;
    in?: $Enums.ThemePreference[] | Prisma.ListEnumThemePreferenceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ThemePreference[] | Prisma.ListEnumThemePreferenceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumThemePreferenceWithAggregatesFilter<$PrismaModel> | $Enums.ThemePreference;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumThemePreferenceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumThemePreferenceFilter<$PrismaModel>;
};
export type EnumPostCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PostCategory | Prisma.EnumPostCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.PostCategory[] | Prisma.ListEnumPostCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PostCategory[] | Prisma.ListEnumPostCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPostCategoryFilter<$PrismaModel> | $Enums.PostCategory;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type EnumPostCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostCategory | Prisma.EnumPostCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.PostCategory[] | Prisma.ListEnumPostCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PostCategory[] | Prisma.ListEnumPostCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPostCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PostCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPostCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPostCategoryFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type EnumProjectUpdateCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectUpdateCategory | Prisma.EnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.ProjectUpdateCategory[] | Prisma.ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProjectUpdateCategory[] | Prisma.ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProjectUpdateCategoryFilter<$PrismaModel> | $Enums.ProjectUpdateCategory;
};
export type EnumProjectUpdateCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectUpdateCategory | Prisma.EnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.ProjectUpdateCategory[] | Prisma.ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProjectUpdateCategory[] | Prisma.ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProjectUpdateCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ProjectUpdateCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProjectUpdateCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProjectUpdateCategoryFilter<$PrismaModel>;
};
export type EnumUpdateCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.UpdateCategory | Prisma.EnumUpdateCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.UpdateCategory[] | Prisma.ListEnumUpdateCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UpdateCategory[] | Prisma.ListEnumUpdateCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUpdateCategoryFilter<$PrismaModel> | $Enums.UpdateCategory;
};
export type EnumUpdateCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UpdateCategory | Prisma.EnumUpdateCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.UpdateCategory[] | Prisma.ListEnumUpdateCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UpdateCategory[] | Prisma.ListEnumUpdateCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUpdateCategoryWithAggregatesFilter<$PrismaModel> | $Enums.UpdateCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUpdateCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUpdateCategoryFilter<$PrismaModel>;
};
export type EnumOpportunityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OpportunityType | Prisma.EnumOpportunityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.OpportunityType[] | Prisma.ListEnumOpportunityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OpportunityType[] | Prisma.ListEnumOpportunityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOpportunityTypeFilter<$PrismaModel> | $Enums.OpportunityType;
};
export type EnumOpportunityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OpportunityType | Prisma.EnumOpportunityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.OpportunityType[] | Prisma.ListEnumOpportunityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OpportunityType[] | Prisma.ListEnumOpportunityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOpportunityTypeWithAggregatesFilter<$PrismaModel> | $Enums.OpportunityType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOpportunityTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOpportunityTypeFilter<$PrismaModel>;
};
export type EnumSharePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.SharePlatform | Prisma.EnumSharePlatformFieldRefInput<$PrismaModel>;
    in?: $Enums.SharePlatform[] | Prisma.ListEnumSharePlatformFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SharePlatform[] | Prisma.ListEnumSharePlatformFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSharePlatformFilter<$PrismaModel> | $Enums.SharePlatform;
};
export type EnumSharePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SharePlatform | Prisma.EnumSharePlatformFieldRefInput<$PrismaModel>;
    in?: $Enums.SharePlatform[] | Prisma.ListEnumSharePlatformFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SharePlatform[] | Prisma.ListEnumSharePlatformFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSharePlatformWithAggregatesFilter<$PrismaModel> | $Enums.SharePlatform;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSharePlatformFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSharePlatformFilter<$PrismaModel>;
};
export type EnumCommentReactionStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CommentReactionState | Prisma.EnumCommentReactionStateFieldRefInput<$PrismaModel>;
    in?: $Enums.CommentReactionState[] | Prisma.ListEnumCommentReactionStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommentReactionState[] | Prisma.ListEnumCommentReactionStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommentReactionStateFilter<$PrismaModel> | $Enums.CommentReactionState;
};
export type EnumCommentReactionStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommentReactionState | Prisma.EnumCommentReactionStateFieldRefInput<$PrismaModel>;
    in?: $Enums.CommentReactionState[] | Prisma.ListEnumCommentReactionStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommentReactionState[] | Prisma.ListEnumCommentReactionStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommentReactionStateWithAggregatesFilter<$PrismaModel> | $Enums.CommentReactionState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommentReactionStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommentReactionStateFilter<$PrismaModel>;
};
export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type NestedEnumSystemRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.SystemRole | Prisma.EnumSystemRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.SystemRole[] | Prisma.ListEnumSystemRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SystemRole[] | Prisma.ListEnumSystemRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSystemRoleFilter<$PrismaModel> | $Enums.SystemRole;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type NestedEnumSystemRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SystemRole | Prisma.EnumSystemRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.SystemRole[] | Prisma.ListEnumSystemRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SystemRole[] | Prisma.ListEnumSystemRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSystemRoleWithAggregatesFilter<$PrismaModel> | $Enums.SystemRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSystemRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSystemRoleFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumThemePreferenceFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemePreference | Prisma.EnumThemePreferenceFieldRefInput<$PrismaModel>;
    in?: $Enums.ThemePreference[] | Prisma.ListEnumThemePreferenceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ThemePreference[] | Prisma.ListEnumThemePreferenceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumThemePreferenceFilter<$PrismaModel> | $Enums.ThemePreference;
};
export type NestedEnumThemePreferenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemePreference | Prisma.EnumThemePreferenceFieldRefInput<$PrismaModel>;
    in?: $Enums.ThemePreference[] | Prisma.ListEnumThemePreferenceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ThemePreference[] | Prisma.ListEnumThemePreferenceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumThemePreferenceWithAggregatesFilter<$PrismaModel> | $Enums.ThemePreference;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumThemePreferenceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumThemePreferenceFilter<$PrismaModel>;
};
export type NestedEnumPostCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PostCategory | Prisma.EnumPostCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.PostCategory[] | Prisma.ListEnumPostCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PostCategory[] | Prisma.ListEnumPostCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPostCategoryFilter<$PrismaModel> | $Enums.PostCategory;
};
export type NestedEnumPostCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostCategory | Prisma.EnumPostCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.PostCategory[] | Prisma.ListEnumPostCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PostCategory[] | Prisma.ListEnumPostCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPostCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PostCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPostCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPostCategoryFilter<$PrismaModel>;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedEnumProjectUpdateCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectUpdateCategory | Prisma.EnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.ProjectUpdateCategory[] | Prisma.ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProjectUpdateCategory[] | Prisma.ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProjectUpdateCategoryFilter<$PrismaModel> | $Enums.ProjectUpdateCategory;
};
export type NestedEnumProjectUpdateCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectUpdateCategory | Prisma.EnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.ProjectUpdateCategory[] | Prisma.ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProjectUpdateCategory[] | Prisma.ListEnumProjectUpdateCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProjectUpdateCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ProjectUpdateCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProjectUpdateCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProjectUpdateCategoryFilter<$PrismaModel>;
};
export type NestedEnumUpdateCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.UpdateCategory | Prisma.EnumUpdateCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.UpdateCategory[] | Prisma.ListEnumUpdateCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UpdateCategory[] | Prisma.ListEnumUpdateCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUpdateCategoryFilter<$PrismaModel> | $Enums.UpdateCategory;
};
export type NestedEnumUpdateCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UpdateCategory | Prisma.EnumUpdateCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.UpdateCategory[] | Prisma.ListEnumUpdateCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UpdateCategory[] | Prisma.ListEnumUpdateCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUpdateCategoryWithAggregatesFilter<$PrismaModel> | $Enums.UpdateCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUpdateCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUpdateCategoryFilter<$PrismaModel>;
};
export type NestedEnumOpportunityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OpportunityType | Prisma.EnumOpportunityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.OpportunityType[] | Prisma.ListEnumOpportunityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OpportunityType[] | Prisma.ListEnumOpportunityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOpportunityTypeFilter<$PrismaModel> | $Enums.OpportunityType;
};
export type NestedEnumOpportunityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OpportunityType | Prisma.EnumOpportunityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.OpportunityType[] | Prisma.ListEnumOpportunityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OpportunityType[] | Prisma.ListEnumOpportunityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOpportunityTypeWithAggregatesFilter<$PrismaModel> | $Enums.OpportunityType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOpportunityTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOpportunityTypeFilter<$PrismaModel>;
};
export type NestedEnumSharePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.SharePlatform | Prisma.EnumSharePlatformFieldRefInput<$PrismaModel>;
    in?: $Enums.SharePlatform[] | Prisma.ListEnumSharePlatformFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SharePlatform[] | Prisma.ListEnumSharePlatformFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSharePlatformFilter<$PrismaModel> | $Enums.SharePlatform;
};
export type NestedEnumSharePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SharePlatform | Prisma.EnumSharePlatformFieldRefInput<$PrismaModel>;
    in?: $Enums.SharePlatform[] | Prisma.ListEnumSharePlatformFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SharePlatform[] | Prisma.ListEnumSharePlatformFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSharePlatformWithAggregatesFilter<$PrismaModel> | $Enums.SharePlatform;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSharePlatformFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSharePlatformFilter<$PrismaModel>;
};
export type NestedEnumCommentReactionStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CommentReactionState | Prisma.EnumCommentReactionStateFieldRefInput<$PrismaModel>;
    in?: $Enums.CommentReactionState[] | Prisma.ListEnumCommentReactionStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommentReactionState[] | Prisma.ListEnumCommentReactionStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommentReactionStateFilter<$PrismaModel> | $Enums.CommentReactionState;
};
export type NestedEnumCommentReactionStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommentReactionState | Prisma.EnumCommentReactionStateFieldRefInput<$PrismaModel>;
    in?: $Enums.CommentReactionState[] | Prisma.ListEnumCommentReactionStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommentReactionState[] | Prisma.ListEnumCommentReactionStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCommentReactionStateWithAggregatesFilter<$PrismaModel> | $Enums.CommentReactionState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCommentReactionStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCommentReactionStateFilter<$PrismaModel>;
};
export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
//# sourceMappingURL=commonInputTypes.d.ts.map