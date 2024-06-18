import App from './components/App';
import './styles/style.scss';

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);
const app = new App();
app.render();
