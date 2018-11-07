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
      <div>
        <h1>React TypeScript Todo list</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={currentTask.title}
            onChange={handleInputChange}
            placeholder="Add a task"
          />
          <button type="submit">Add Task</button>
        </form>
        <h2>TASKS</h2>
        <br/>

          {tasks.map((task: ITask) => (
            <div key={task.id} style={{display: 'flex', flexDirection: 'row'}}>
              <span>{task.title}</span>
              <button onClick={removeTask(task.id)} style={{ marginLeft: "20px" }}>Remove</button>
              <button onClick={toggleDone(task.id)} style={{ marginLeft: "20px" }}>Done</button>
            </div>
          ))}
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
