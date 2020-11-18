import Adapter from 'enzyme-adapter-react-16';
const { configure } = require("@testing-library/react");


configure({adapter: new Adapter()});