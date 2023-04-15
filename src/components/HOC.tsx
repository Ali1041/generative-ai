import { Header } from "./header"
import { ReactElement } from "react"

export const HOC = (WrappedComponent: any): ReactElement => {
    return (
        <>
        <Header />
        <div className="max-w-7xl mx-auto p-5">
        {WrappedComponent.children}
        </div>
        </>
    )
}