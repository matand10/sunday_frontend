import { OnClickMenu } from '../modal/right-click-modal';

export const RightClickMenu = ({ x, y, showMenu }) => {
    const style = () => {
        return {
            top: y,
            left: x - 260,
            position: 'absolute',
        }
    }


    return (
        <div style={style()}>
            <OnClickMenu isMenuOpen={showMenu} />
        </div>
    )
}