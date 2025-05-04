// app/api/customers/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching customers data...");
    const response = await fetch(
        "https://raw.githubusercontent.com/ssssaravanakumar/Git-Sync/main/customers.json"
    );
    console.log("Fetching customers data...", response.status);

    if (!response.ok) {
      return new Response(
          JSON.stringify({ error: `GitHub API returned ${response.status}` }),
          {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
          }
      );
    }

    const data = await response.json();
    return new Response(
        JSON.stringify(data),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
    );
  } catch (error) {
    console.error("Error fetching customers:", error);
    return new Response(
        JSON.stringify({ error: "Failed to fetch customers data" }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
    );
  }
}