import { OnClickMenu } from '../modal/right-click-modal';

export const RightClickMenu = ({ x, y, showMenu }) => {
    const style = () => {
        return {
            top: y - 230,
            left: x - 364,
            position: 'absolute',
        }
    }


    return (
        <div style={style()}>
            <OnClickMenu isMenuOpen={showMenu} />
        </div>
    )
}