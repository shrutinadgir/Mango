import { environment } from 'src/environments/environment';

export class ApiUrls {
  public static getProjectWidget = environment.baseUrl + '/demofe/projects';
  public static getTaskManagers = environment.baseUrl + '/tasks';
}
