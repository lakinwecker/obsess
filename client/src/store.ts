import { Store, Message } from 'kaiju'
//import { update } from 'immupdate'

//--------------------------------------------------------------------------------------------------
export interface User {
  id: number,
  email: string
}

//--------------------------------------------------------------------------------------------------
export interface Tag {
  id: number,
  date_created: Date,
  date_modified: Date,
  name: string
}

export const addTag = Message<Task>('addTag')
export const editTag = Message<Task>('editTag')


//--------------------------------------------------------------------------------------------------
export interface Project {
  id: number,
  date_created: Date,
  date_modified: Date,
  date_completed: Date,
  name: string,
	tags: Tag[]
}

export const addProject = Message<Project>('addProject')
export const editProject = Message<Project>('editProject')
export const completeProject = Message<Project>('completeProject')

//--------------------------------------------------------------------------------------------------
export interface ProjectTag {
  project_id: number,
  tag_id: number
}
export const addTagToProject = Message<ProjectTag>('addTagToProject')

//--------------------------------------------------------------------------------------------------
export interface Task {
  id: number,
  project: Project,
  date_created: Date,
  date_modified: Date,
  name: string,
	tags: Tag[]
}

export const addTask = Message<Task>('addTask')
export const editTask = Message<Task>('editTask')
export const completeTask = Message<Task>('completeTask')
export const clockInToTask = Message<Task>('clockInToTask')
export const clockOutOfTask = Message<Task>('clockOutOfTask')

//--------------------------------------------------------------------------------------------------
export interface TaskTag {
  task_id: number,
  tag_id: number
}
export const addTagToTask = Message<TaskTag>('addTagToTask')

//--------------------------------------------------------------------------------------------------
export interface TaskTime {
  id: number,
  user: User,
  task: Task,
  start_time: Date,
  end_time: Date
}

export const editTaskTime = Message<Task>('editTaskTime')
export const deleteTaskTime = Message<Task>('deleteTaskTime')

export interface Obsess {
  projects: Project[],
  tasks: Task[],
}

const initialState = { projects: [], tasks: [] }

// This exports a store containing an observable ready to be used in a component's connect function
export default Store<Obsess>(initialState, () => {
})

