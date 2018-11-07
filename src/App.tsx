import * as React from 'react';
import './App.css';

export default class App extends React.Component<{}, IState> {

  public state = {
    currentTask: {
      completed: false,
      id: 0,
      title: '',
    },
    tasks: []
  }

  public componentDidMount() {
    document.title = 'TODO';
  }

  public componentDidUpdate() {
    document.title = 'TODO';
  }

  public handleInputChange = (event: any) => {
    event.preventDefault();
    event.persist();
    const taskTitle = event.target.value;
    const currentTask = {
      completed: false,
      id: this._timeInMilliseconds(),
      title: taskTitle,
    }
    this.setState(() => ({
      currentTask
    }))
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.persist();
    this.setState((state) => ({
      currentTask: {
        completed: false,
        id: 0,
        title: '',
      },
      tasks: [
        ...state.tasks,
        {
          completed: false,
          id: this._timeInMilliseconds(),
          title: state.currentTask.title,
        }
      ]
    }))
  }

  public removeTask = (id: number) => (event: React.MouseEvent<HTMLButtonElement>): void => {
    const filteredTasks: ITask[] = this.state.tasks.filter((task: ITask) => task.id !== id);
    this.setState(() => ({
      tasks: filteredTasks
    }))
  }

  public toggleDone = (index: number) => (event: React.MouseEvent<HTMLButtonElement>): void => {
    const tasksInState: ITask[] = this.state.tasks.slice();
    const mutatedTaskList: ITask[] = tasksInState.map(task => {
      return task.id !== index ? task : {...task, completed: !task.completed }
    })
    console.log(mutatedTaskList);
    this.setState({ tasks: mutatedTaskList });
  }

  public render(): JSX.Element {
    const {
      state: { currentTask, tasks },
      handleInputChange,
      handleSubmit,
      removeTask,
      toggleDone
    } = this;

    return (
      <div className="mother-wrapper">
        <h1>TODO</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="tdl-input"
            value={currentTask.title}
            onChange={handleInputChange}
            placeholder="Add a task"
          />
          <button type="submit">Add Task</button>
        </form>
        <section>
          {tasks.map((task: ITask) => (
            <div key={task.id} className="tdl-task">
              <span className={task.completed ? 'is-completed' : ''}>{task.title}</span>
              <button className="custom-button" onClick={removeTask(task.id)}>Remove</button>
              <button className="custom-button" onClick={toggleDone(task.id)}>{task.completed ? 'Unfinish' : 'Finish'}</button>
            </div>
          ))}
        </section>
      </div>
    );
  }

  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }
}

interface IState {
  currentTask: ITask,
  tasks: ITask[]
}

interface ITask {
  id: number,
  title: string,
  completed: boolean
}
