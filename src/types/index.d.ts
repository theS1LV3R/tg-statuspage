export interface LocalStation {
  id: number;
  success: boolean;
  lastUpdated: Date;
  testCases: TestCase[];
  station: Station;
}

export interface TestCase {
  id: string;
  track: string;
  task_shortname: string;
  shortname: string;
  name: string;
  description: string;
  sequence: number;
  timestamp: string;
  status_success: testStatus;
  status_description: string;
}

export interface Station {
  id: string;
  track: string;
  shortname: string;
  name: string;
  status: "active" | "dirty" | "maintenance";
  credentials: "";
  notes: string;
  timeslot: string;
}

export type testStatus = boolean;
