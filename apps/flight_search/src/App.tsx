import React from 'react';
import { FlightContainer, Bookings } from './components';
import './styles/styles.scss'
import GlobalProvider from './store/context';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient()

export const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalProvider>
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


                    <BrowserRouter>
                        <Routes>
                            <Route path="/bookings" element={<Bookings />} />
                            <Route path="*" element={<FlightContainer />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </GlobalProvider>
        </QueryClientProvider>
    );
}

export default App;
