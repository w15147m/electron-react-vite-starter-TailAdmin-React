import { createRoot } from 'react-dom/client';
import StickyNotes from './pages/StickyNotes';
import './index.css';

const App = () =>{
    return (
        <>
            <StickyNotes />
        </>
    )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
