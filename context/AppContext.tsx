import React from 'react';
import { AppState, context } from './index';

const AppContext = React.createContext<AppState>(context);

export default AppContext;
