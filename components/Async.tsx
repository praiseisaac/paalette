import { asyncComponent } from '../helpers/async-component.helper';

const AsyncComp = asyncComponent(async () => <div>test</div>);

export default AsyncComp;
