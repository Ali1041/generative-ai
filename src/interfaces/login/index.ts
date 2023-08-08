export interface errorState{
    error: boolean,
    helperText: string
}

export interface inputState extends errorState {
    value: string,
}