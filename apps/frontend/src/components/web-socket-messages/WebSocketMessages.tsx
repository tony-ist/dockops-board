import { useAppSelector } from '../../store/hooks';

export const WebSocketMessages = () => {
  const messages = useAppSelector((state) => state.webSocket.messages);

  if (messages.length === 0) {
    return <div>No messages</div>;
  }

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message.text}</div>
      ))}
    </div>
  );
};
