type TaskArrayForm1 = [script: string, description: string];
type TaskArrayForm2 = [name: string, script: string, description: string];
type TaskObjectForm = {
  name?: string;
  script: string;
  description: string;
};
type Task = TaskArrayForm1 | TaskArrayForm2 | TaskObjectForm;

export interface BeginConfig {
  tasks: Task[];
}
