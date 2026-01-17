export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly DEACTIVATED: "DEACTIVATED";
    readonly BANNED: "BANNED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const SystemRole: {
    readonly USER: "USER";
    readonly SYSTEM_CONTENT_CREATOR: "SYSTEM_CONTENT_CREATOR";
    readonly DEVELOPER: "DEVELOPER";
    readonly SUPER_ADMIN: "SUPER_ADMIN";
};
export type SystemRole = (typeof SystemRole)[keyof typeof SystemRole];
export declare const PostCategory: {
    readonly PROJECT: "PROJECT";
    readonly BLOG: "BLOG";
    readonly RESOURCE: "RESOURCE";
    readonly ARTICLE: "ARTICLE";
    readonly SHOWCASE: "SHOWCASE";
    readonly DISCUSSION: "DISCUSSION";
    readonly GUIDE: "GUIDE";
};
export type PostCategory = (typeof PostCategory)[keyof typeof PostCategory];
export declare const UpdateCategory: {
    readonly APP_UPDATE: "APP_UPDATE";
    readonly MARKETING: "MARKETING";
    readonly COMMUNITY: "COMMUNITY";
};
export type UpdateCategory = (typeof UpdateCategory)[keyof typeof UpdateCategory];
export declare const OpportunityType: {
    readonly FULL_TIME: "FULL_TIME";
    readonly PART_TIME: "PART_TIME";
    readonly CONTRACT: "CONTRACT";
    readonly INTERNSHIP: "INTERNSHIP";
};
export type OpportunityType = (typeof OpportunityType)[keyof typeof OpportunityType];
export declare const ThemePreference: {
    readonly LIGHT: "LIGHT";
    readonly DARK: "DARK";
    readonly SYSTEM: "SYSTEM";
};
export type ThemePreference = (typeof ThemePreference)[keyof typeof ThemePreference];
export declare const SharePlatform: {
    readonly TWITTER: "TWITTER";
    readonly FACEBOOK: "FACEBOOK";
    readonly LINKEDIN: "LINKEDIN";
    readonly EMAIL: "EMAIL";
    readonly WHATSAPP: "WHATSAPP";
    readonly REDDIT: "REDDIT";
    readonly LINK_COPIED: "LINK_COPIED";
    readonly INTERNAL_MESSAGE: "INTERNAL_MESSAGE";
    readonly OTHER: "OTHER";
};
export type SharePlatform = (typeof SharePlatform)[keyof typeof SharePlatform];
export declare const CommentReactionState: {
    readonly LIKED: "LIKED";
    readonly DISLIKED: "DISLIKED";
};
export type CommentReactionState = (typeof CommentReactionState)[keyof typeof CommentReactionState];
export declare const NotificationType: {
    readonly NEW_COMMENT: "NEW_COMMENT";
    readonly POST_LIKE: "POST_LIKE";
    readonly NEW_FOLLOWER: "NEW_FOLLOWER";
    readonly COMMENT_REPLY: "COMMENT_REPLY";
    readonly SYSTEM_UPDATE: "SYSTEM_UPDATE";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const ProjectUpdateCategory: {
    readonly FEATURE: "FEATURE";
    readonly BUG_FIX: "BUG_FIX";
    readonly REFACTOR: "REFACTOR";
    readonly DEPLOYMENT: "DEPLOYMENT";
    readonly DOCUMENTATION: "DOCUMENTATION";
    readonly CHORE: "CHORE";
    readonly OTHER: "OTHER";
};
export type ProjectUpdateCategory = (typeof ProjectUpdateCategory)[keyof typeof ProjectUpdateCategory];
//# sourceMappingURL=enums.d.ts.map