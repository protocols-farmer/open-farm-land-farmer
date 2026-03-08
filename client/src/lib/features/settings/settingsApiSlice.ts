//src/lib/features/settings/settingsApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import {
  SettingsResponse,
  UpdateSettingsPayload,
  UserSettingsDto,
} from "./settingsTypes";

export const settingsApiSlice = createApi({
  reducerPath: "settingsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Settings"],
  endpoints: (builder) => ({
    /**
     * Fetch the current user's settings.
     */
    getSettings: builder.query<UserSettingsDto, void>({
      query: () => "/settings",
      transformResponse: (response: SettingsResponse) => response.data,
      providesTags: ["Settings"],
    }),

    /**
     * Update user settings (theme, toggles, etc.)
     */
    updateSettings: builder.mutation<UserSettingsDto, UpdateSettingsPayload>({
      query: (body) => ({
        url: "/settings",
        method: "PATCH",
        body,
      }),
      transformResponse: (response: SettingsResponse) => response.data,
      invalidatesTags: ["Settings"],
      // Optimistic updates could be added here later if needed
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } =
  settingsApiSlice;
