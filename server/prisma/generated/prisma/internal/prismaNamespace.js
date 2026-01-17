"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.PageViewLogScalarFieldEnum = exports.VisitorSessionScalarFieldEnum = exports.PostViewScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.CommentUserReactionScalarFieldEnum = exports.PostShareScalarFieldEnum = exports.PostSaveScalarFieldEnum = exports.PostLikeScalarFieldEnum = exports.CommentScalarFieldEnum = exports.OpportunityTagScalarFieldEnum = exports.OpportunityScalarFieldEnum = exports.UpdateScalarFieldEnum = exports.ProjectUpdateScalarFieldEnum = exports.PostTagScalarFieldEnum = exports.TagScalarFieldEnum = exports.PostImageScalarFieldEnum = exports.GuideSectionScalarFieldEnum = exports.GuideStepScalarFieldEnum = exports.PostScalarFieldEnum = exports.FollowScalarFieldEnum = exports.UserSettingsScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.1.0",
    engine: "ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    RefreshToken: 'RefreshToken',
    UserSettings: 'UserSettings',
    Follow: 'Follow',
    Post: 'Post',
    GuideStep: 'GuideStep',
    GuideSection: 'GuideSection',
    PostImage: 'PostImage',
    Tag: 'Tag',
    PostTag: 'PostTag',
    ProjectUpdate: 'ProjectUpdate',
    Update: 'Update',
    Opportunity: 'Opportunity',
    OpportunityTag: 'OpportunityTag',
    Comment: 'Comment',
    PostLike: 'PostLike',
    PostSave: 'PostSave',
    PostShare: 'PostShare',
    CommentUserReaction: 'CommentUserReaction',
    Notification: 'Notification',
    PostView: 'PostView',
    VisitorSession: 'VisitorSession',
    PageViewLog: 'PageViewLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    username: 'username',
    email: 'email',
    hashedPassword: 'hashedPassword',
    bio: 'bio',
    title: 'title',
    location: 'location',
    profileImage: 'profileImage',
    bannerImage: 'bannerImage',
    joinedAt: 'joinedAt',
    updatedAt: 'updatedAt',
    status: 'status',
    systemRole: 'systemRole',
    deactivatedAt: 'deactivatedAt',
    twitterUrl: 'twitterUrl',
    githubUrl: 'githubUrl',
    linkedinUrl: 'linkedinUrl',
    websiteUrl: 'websiteUrl'
};
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    jti: 'jti',
    userId: 'userId',
    expiresAt: 'expiresAt',
    revoked: 'revoked',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UserSettingsScalarFieldEnum = {
    id: 'id',
    theme: 'theme',
    notificationsEnabled: 'notificationsEnabled',
    emailMarketing: 'emailMarketing',
    emailSocial: 'emailSocial',
    updatedAt: 'updatedAt',
    userId: 'userId'
};
exports.FollowScalarFieldEnum = {
    followerId: 'followerId',
    followingId: 'followingId',
    createdAt: 'createdAt'
};
exports.PostScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    category: 'category',
    isQuestion: 'isQuestion',
    isResolved: 'isResolved',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    externalLink: 'externalLink',
    githubLink: 'githubLink',
    upvotesCount: 'upvotesCount',
    likesCount: 'likesCount',
    viewsCount: 'viewsCount',
    savedCount: 'savedCount',
    sharesCount: 'sharesCount',
    commentsCount: 'commentsCount',
    authorId: 'authorId'
};
exports.GuideStepScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    order: 'order',
    postId: 'postId'
};
exports.GuideSectionScalarFieldEnum = {
    id: 'id',
    title: 'title',
    content: 'content',
    videoUrl: 'videoUrl',
    imageUrl: 'imageUrl',
    imagePublicId: 'imagePublicId',
    order: 'order',
    stepId: 'stepId'
};
exports.PostImageScalarFieldEnum = {
    id: 'id',
    url: 'url',
    publicId: 'publicId',
    altText: 'altText',
    order: 'order',
    postId: 'postId'
};
exports.TagScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt'
};
exports.PostTagScalarFieldEnum = {
    postId: 'postId',
    tagId: 'tagId'
};
exports.ProjectUpdateScalarFieldEnum = {
    id: 'id',
    version: 'version',
    date: 'date',
    title: 'title',
    description: 'description',
    category: 'category',
    imageUrl: 'imageUrl',
    imagePublicId: 'imagePublicId',
    createdAt: 'createdAt',
    postId: 'postId'
};
exports.UpdateScalarFieldEnum = {
    id: 'id',
    version: 'version',
    title: 'title',
    category: 'category',
    content: 'content',
    publishedAt: 'publishedAt',
    authorId: 'authorId'
};
exports.OpportunityScalarFieldEnum = {
    id: 'id',
    title: 'title',
    companyName: 'companyName',
    companyLogo: 'companyLogo',
    location: 'location',
    type: 'type',
    isRemote: 'isRemote',
    imageUrl: 'imageUrl',
    imagePublicId: 'imagePublicId',
    salaryRange: 'salaryRange',
    fullDescription: 'fullDescription',
    responsibilities: 'responsibilities',
    qualifications: 'qualifications',
    applyUrl: 'applyUrl',
    postedAt: 'postedAt',
    posterId: 'posterId'
};
exports.OpportunityTagScalarFieldEnum = {
    opportunityId: 'opportunityId',
    tagId: 'tagId'
};
exports.CommentScalarFieldEnum = {
    id: 'id',
    text: 'text',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    level: 'level',
    likesCount: 'likesCount',
    dislikesCount: 'dislikesCount',
    postId: 'postId',
    authorId: 'authorId',
    parentId: 'parentId'
};
exports.PostLikeScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    postId: 'postId'
};
exports.PostSaveScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    postId: 'postId'
};
exports.PostShareScalarFieldEnum = {
    id: 'id',
    platform: 'platform',
    createdAt: 'createdAt',
    postId: 'postId',
    sharerId: 'sharerId'
};
exports.CommentUserReactionScalarFieldEnum = {
    id: 'id',
    reaction: 'reaction',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    commentId: 'commentId'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    type: 'type',
    read: 'read',
    metadata: 'metadata',
    createdAt: 'createdAt',
    recipientId: 'recipientId',
    senderId: 'senderId',
    postId: 'postId',
    commentId: 'commentId'
};
exports.PostViewScalarFieldEnum = {
    id: 'id',
    firstViewedAt: 'firstViewedAt',
    lastViewedAt: 'lastViewedAt',
    viewCountByUser: 'viewCountByUser',
    userId: 'userId',
    postId: 'postId',
    anonymousVisitorId: 'anonymousVisitorId'
};
exports.VisitorSessionScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    initialIpAddress: 'initialIpAddress',
    initialUserAgent: 'initialUserAgent',
    initialPath: 'initialPath',
    userId: 'userId'
};
exports.PageViewLogScalarFieldEnum = {
    id: 'id',
    path: 'path',
    createdAt: 'createdAt',
    sessionId: 'sessionId'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map