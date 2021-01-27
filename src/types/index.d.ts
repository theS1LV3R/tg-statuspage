export interface TestCase {
  Title: string;
  Description: string;
  Status: testStatus;
  Task: string;
}

export type testStatus = "ok" | "fail" | "skipped";
