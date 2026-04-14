//src/lib/features/reports/reportApiSlice.ts
import {
  createApi,
  retry,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import {
  uploadStarted,
  uploadProgressUpdated,
  uploadSucceeded,
  uploadFailed,
} from "../upload/uploadProgressSlice";
import {
  GetReportsApiResponse,
  SingleReportApiResponse,
  ReportQuery,
  ReportStatus,
  Severity,
} from "./reportTypes";

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 2 });

export const reportApiSlice = createApi({
  reducerPath: "reportApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Reports", "AdminReports"],
  endpoints: (builder) => ({
    /**
     * Users submit a report with attachments (XHR used for progress tracking)
     */
    submitReport: builder.mutation<SingleReportApiResponse, FormData>({
      queryFn: async (formData, api) => {
        const { dispatch } = api;

        return new Promise<
          { data: SingleReportApiResponse } | { error: FetchBaseQueryError }
        >((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reports`,
          );
          xhr.withCredentials = true;

          dispatch(uploadStarted("Submitting Issue Report..."));

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded * 100) / event.total);
              dispatch(uploadProgressUpdated(progress));
            }
          };

          xhr.onload = () => {
            try {
              const response = JSON.parse(xhr.responseText);
              if (xhr.status >= 200 && xhr.status < 300) {
                dispatch(uploadSucceeded());
                resolve({ data: response });
              } else {
                dispatch(uploadFailed(response.message || "Submission failed"));
                resolve({
                  error: {
                    status: xhr.status,
                    data: response,
                  } as FetchBaseQueryError,
                });
              }
            } catch (e) {
              resolve({
                error: {
                  status: "PARSING_ERROR",
                  originalStatus: xhr.status,
                  data: xhr.responseText,
                  error: "Invalid JSON response",
                },
              });
            }
          };

          xhr.onerror = () => {
            const errorMsg = "Network error during submission.";
            dispatch(uploadFailed(errorMsg));
            resolve({
              error: {
                status: "FETCH_ERROR",
                error: errorMsg,
              },
            });
          };

          xhr.send(formData);
        });
      },
      invalidatesTags: ["AdminReports"],
    }),

    /**
     * Admin view: Get all reports with filters
     */
    getAdminReports: builder.query<GetReportsApiResponse, ReportQuery>({
      query: (params) => ({
        url: "/reports/admin/all",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.reports.map(({ id }) => ({
                type: "AdminReports" as const,
                id,
              })),
              { type: "AdminReports", id: "LIST" },
            ]
          : [{ type: "AdminReports", id: "LIST" }],
    }),

    /**
     * View a single report (User or Admin)
     */
    getReportById: builder.query<SingleReportApiResponse, string>({
      query: (id) => `/reports/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Reports", id }],
    }),

    /**
     * Admin: Update report status or notes
     */
    updateReportStatus: builder.mutation<
      SingleReportApiResponse,
      {
        id: string;
        status?: ReportStatus;
        adminNotes?: string;
        severity?: Severity;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/reports/admin/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "AdminReports", id },
        { type: "AdminReports", id: "LIST" },
        { type: "Reports", id },
      ],
    }),

    /**
     * Admin: Hard delete report
     */
    deleteReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reports/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminReports", "Reports"],
    }),
  }),
});

export const {
  useSubmitReportMutation,
  useGetAdminReportsQuery,
  useGetReportByIdQuery,
  useUpdateReportStatusMutation,
  useDeleteReportMutation,
} = reportApiSlice;
