import { Shape } from './elements';

const Tools: React.FC = () => {
  return (
    <div className="main_drawer">
      <Shape type="rectangle" />
      <Shape type="circle" />
      <Shape type="square" />
    </div>
  );
};

export default Tools;
