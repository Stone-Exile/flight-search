import React, { useCallback, useState } from 'react';
import { Search, SearchResults, UserDetails, UserResults } from './components';
import { IFlight, ISearch, IUserDetail } from './interfaces';
import './styles/styles.scss'

export const App = () => {
    const [search, setSearch] = useState<ISearch | undefined>(undefined)
    const [flight, setFlight] = useState<IFlight | undefined>(undefined)
    const [userDetail, setUserDetail] = useState<IUserDetail | undefined>(undefined)

    const onSearchChange = useCallback((value: ISearch) => setSearch(value), [])
    const onFlightChange = useCallback((value: IFlight) => setFlight(value), [])
    const onUserSave = useCallback((value: IUserDetail) => setUserDetail(value), [])

    const onClose = useCallback(() => {
        setSearch(undefined)
        setFlight(undefined)
        setUserDetail(undefined)
    }, [])

    return (
        <div>
            <div className="site-header">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>Flight Search</h1>
                        </div>
                    </div>
                </div>
            </div>
            {!flight ? <>
                <Search onSearchChange={onSearchChange} />
                <SearchResults search={search} onFlightChange={onFlightChange} />
            </> : <>
                {!userDetail && search ? <UserDetails search={search} flight={flight} onUserSave={onUserSave} onClose={onClose}/> : undefined}
                {userDetail && flight && search ? <UserResults search={search} flight={flight} userDetail={userDetail} onClose={onClose} /> : undefined}
            </>}
        </div>
    );
}

export default App;
