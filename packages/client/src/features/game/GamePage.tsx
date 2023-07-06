import ErrorBoundry from '@/components/ErrorBoundry';
import MainPageTemplate from '@/components/MainPageTemplate';
import GameCanvas from './components/GameCanvas';

const GamePage: React.FC = () => {
  return (
    <MainPageTemplate>
      <ErrorBoundry>
        <GameCanvas />
      </ErrorBoundry>
    </MainPageTemplate>
  );
};

export default GamePage;
