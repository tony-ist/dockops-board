import { useAppSelector } from '../../store/hooks';

// TODO: Rename or extract to Logs component
export const WebSocketMessages = () => {
  const messages = useAppSelector((state) => state.containerLogs.messages);

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
