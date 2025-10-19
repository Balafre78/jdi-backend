// -------------------- Auth --------------------
export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
}

export interface AuthResponse {
    message: string
    user: User
    token: string
    expiresIn: number
}

// -------------------- User --------------------
export interface User {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
}

// -------------------- Todolist --------------------
export interface Todolist {
    id: string
    title: string
    description: string
    archived: boolean
}

export interface CreateTodolistRequest {
    title: string
    description?: string
}

export interface UpdateTodolistRequest {
    title?: string
    description?: string
    archived?: boolean
}

// -------------------- Task --------------------
export enum TaskStatus {
    TODO = 'todo',
    DOING = 'doing',
    DONE = 'done'
}

export interface Task {
    id: string
    name: string
    description: string
    status: TaskStatus
}

export interface CreateTaskRequest {
    name: string
    description?: string
    status?: TaskStatus
}

export interface UpdateTaskRequest {
    name?: string
    description?: boolean
    status?: TaskStatus
}