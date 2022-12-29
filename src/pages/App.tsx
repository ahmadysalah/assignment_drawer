import { Header, Board, Tools } from '../components';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="app_main">
        <Board />
        <Tools />
      </main>
    </div>
  );
};

export default App;
