import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootPage } from '../pages/root/RootPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { webSocketActions } from '../features/web-socket/webSocketSlice';

export const App = () => {
  const dispatch = useAppDispatch();
  const isWebSocketConnected = useAppSelector((state) => state.webSocket.isConnected);

  useEffect(() => {
    if (!isWebSocketConnected) {
      dispatch(webSocketActions.startConnecting());
    }
  }, [isWebSocketConnected]);

  if (!isWebSocketConnected) {
    return <div>Connecting to websocket...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RootPage />} />
        </Routes>
      </div>
    </Router>
  );
};
