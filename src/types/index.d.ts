export interface TestCase {
  name: string;
  status_description: string;
  status_success: testStatus;
  Task: string;
}

export interface Task {
  id: string;
  shortname: string;
  name: string;
  description: string;
  sequence: number;

  tests: Array<TestCase>;
}

export interface Server {
  id: "net";
  type: "net";
  name: "Network";

  /**
   * The ID of the station as a numeric string.
   *
   * @type {string}
   * @memberof Server
   */
  station_shortname: string;

  tasks: Array<Task>;
}

export interface ServerPoll {
  success: boolean;
  testCases: Array<TestCase>;
  lastUpdated?: Date;
}

export type testStatus = boolean;
