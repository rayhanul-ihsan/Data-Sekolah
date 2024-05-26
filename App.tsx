import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import Rooter from './Rooter';
export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Rooter/>
    </GluestackUIProvider>
  );
}

