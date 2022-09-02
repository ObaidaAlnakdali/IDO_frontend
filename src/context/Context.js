import { createContext, useState } from 'react'

export const Context = createContext()

export const ContextBody = ({ children }) => {
    const [showAddCard, setShowAddCard] = useState(false)
    const [search, setSearch] = useState('')
    const [render, setRender] = useState(false)

    return (
        <Context.Provider
            value={{
                setShowAddCard,
                setRender,
                setSearch,
                showAddCard,
                render,
                search
            }}
        >
            {children}
        </Context.Provider>
    )
}