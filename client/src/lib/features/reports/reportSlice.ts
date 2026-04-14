//src/lib/features/reports/reportSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReportStatus, ReportType } from "./reportTypes";

interface ReportState {
  adminFilters: {
    status: ReportStatus | "";
    type: ReportType | "";
    q: string;
  };
}

const initialState: ReportState = {
  adminFilters: {
    status: "",
    type: "",
    q: "",
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setAdminFilters: (
      state,
      action: PayloadAction<Partial<ReportState["adminFilters"]>>,
    ) => {
      state.adminFilters = { ...state.adminFilters, ...action.payload };
    },
    resetFilters: (state) => {
      state.adminFilters = initialState.adminFilters;
    },
  },
});

export const { setAdminFilters, resetFilters } = reportSlice.actions;
export default reportSlice.reducer;
