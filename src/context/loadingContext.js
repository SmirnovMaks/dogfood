import React from 'react'
export const LoadingContext = React.createContext({
    isLoading: true,
    onChangeLoading: () => { },
});

LoadingContext.displayName = 'LoadingContext'