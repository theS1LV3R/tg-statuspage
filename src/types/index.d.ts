export interface TestCase {
  name: string;
  status_description: string;
  status_success: testStatus;
  Task: string;
}

export type testStatus = boolean;
