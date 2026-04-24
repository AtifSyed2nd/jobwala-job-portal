// lib/api-response.ts

import { NextResponse } from "next/server";

type ApiResponseOptions = {
  message?: string;
  data?: unknown;
  errors?: unknown;
  status?: number;
};

export function successResponse({
  message = "Success",
  data = null,
  status = 200,
}: ApiResponseOptions) {
  return NextResponse.json(
    { success: true, message, data },
    { status }
  );
}

export function errorResponse({
  message = "Something went wrong",
  errors = null,
  status = 400,
}: ApiResponseOptions) {
  return NextResponse.json(
    { success: false, message, errors },
    { status }
  );
}