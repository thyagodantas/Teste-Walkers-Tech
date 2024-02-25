export class Task {
  constructor(
    public name: string,
    public description: string,
    public date: string,
    public time: string,
    public completed: boolean = false
  ) {}
}
