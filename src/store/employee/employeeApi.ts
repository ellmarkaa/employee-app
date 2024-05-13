import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/constants";
import {EmployeeFilterType, IEmployee} from "@/store/employee/type";
import {CreateEmployeeType} from "@/types";

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Employee'],
  endpoints: builder => ({
    getEmployees: builder.query<IEmployee[], EmployeeFilterType>({
      query: (arg) => `/employees?${arg.filterBy}=${arg.filter}`,
      transformErrorResponse: (response) => response.data,
      providesTags: result => ['Employee']
    }),
    getEmployeeById: builder.query<IEmployee, string>({
      query: (employeeId) => `/employees/${employeeId}`,
      transformErrorResponse: (response) => response.data
    }),
    createEmployee: builder.mutation<IEmployee, CreateEmployeeType>({
      query: (employee) => ({
        url: '/employees',
        method: 'POST',
        body: employee
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: result => ['Employee']
    }),
    updateEmployee: builder.mutation<IEmployee, IEmployee>({
      query: (employee) => ({
        url: `/employees/${employee.id}`,
        method: 'PUT',
        body: employee
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: result => ['Employee']
    }),
    deleteEmployee: builder.mutation<void, string>({
      query: (employeeId) => ({
        url: `/employees/${employeeId}`,
        method: 'DELETE'
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: result => ['Employee']
    }),
  })
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetEmployeeByIdQuery
} = employeeApi;