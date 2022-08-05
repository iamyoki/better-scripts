type TaskArrayForm1 = [script: string, options?: TaskObjectForm];
type TaskArrayForm2 = [script: string, description: string, options?: TaskObjectForm];
type TaskArrayForm3 = [name: string, script: string, description: string, options?: TaskObjectForm];
type TaskObjectForm = {
  id: number | string;
  name?: string;
  script: string;
  description?: string;
  desc?: string;
  env?: {
    [k: string]: string;
  };
  tasks?: Task[]
};
type Task = TaskArrayForm1 | TaskArrayForm2 | TaskArrayForm3 | TaskObjectForm;

export interface BeginConfig {
  tasks: Task[];
}
